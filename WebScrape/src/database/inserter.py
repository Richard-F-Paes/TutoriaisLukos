from __future__ import annotations

import logging
import uuid
from dataclasses import dataclass
from datetime import datetime
from typing import Any

import pyodbc

from config import DbColumnMapping, DbTableMapping
from src.database.schema_check import TableCheck, check_schema


log = logging.getLogger(__name__)


@dataclass(frozen=True)
class InsertResult:
    categories_inserted: int
    tutorials_inserted: int
    steps_inserted: int
    media_inserted: int


def build_schema_checks(tables: DbTableMapping, cols: DbColumnMapping) -> list[TableCheck]:
    return [
        TableCheck(
            schema=tables.schema,
            table=tables.categories,
            required_columns=[cols.category_name, cols.category_slug, cols.category_parent_id],
        ),
        TableCheck(
            schema=tables.schema,
            table=tables.tutorials,
            required_columns=[
                cols.tutorial_title,
                cols.tutorial_slug,
                cols.tutorial_content,
                cols.tutorial_created_by,
                cols.tutorial_updated_by,
            ],
        ),
        TableCheck(
            schema=tables.schema,
            table=tables.tutorial_steps,
            required_columns=[cols.step_tutorial_id, cols.step_title, cols.step_sort],
        ),
        TableCheck(
            schema=tables.schema,
            table=tables.media,
            required_columns=[cols.media_file_name, cols.media_original_name, cols.media_mime_type, cols.media_size, cols.media_url, cols.media_uploaded_by],
        ),
    ]


def insert_all(
    conn: pyodbc.Connection,
    *,
    tables: DbTableMapping,
    cols: DbColumnMapping,
    processed: dict[str, Any],
    dry_run: bool = False,
    default_user_id: int = 1,
) -> InsertResult:
    """
    Expects processed dict:
      { "categories": [...], "tutorials":[...], "steps":[...], "media":[...] }

    IMPORTANT: Because real DB schemas vary, this inserter checks column presence
    and fails with a clear error if the mapping doesn't match.
    
    default_user_id: ID do usuário padrão para CreatedBy/UpdatedBy/UploadedBy
    """
    missing = check_schema(conn, build_schema_checks(tables, cols))
    if missing:
        msg = "DB schema mismatch. Missing required columns:\n" + "\n".join(
            f"- {tbl}: {cols_}" for tbl, cols_ in missing.items()
        )
        raise RuntimeError(msg)

    categories = processed.get("categories") or []
    tutorials = processed.get("tutorials") or []
    steps = processed.get("steps") or []
    media = processed.get("media") or []

    cur = conn.cursor()
    
    # Contar registros ANTES da inserção (para comparação)
    count_before = {}
    if not dry_run:
        try:
            count_before["cats"] = cur.execute(f"SELECT COUNT(*) FROM {tables.schema}.{tables.categories};").fetchone()[0]
            count_before["tuts"] = cur.execute(f"SELECT COUNT(*) FROM {tables.schema}.{tables.tutorials};").fetchone()[0]
            count_before["steps"] = cur.execute(f"SELECT COUNT(*) FROM {tables.schema}.{tables.tutorial_steps};").fetchone()[0]
        except Exception as e:
            pass
    
    # Não usar BEGIN TRANSACTION explícito - pyodbc com autocommit=False já inicia transação automaticamente
    # Usar BEGIN TRANSACTION pode causar problemas com o commit

    cat_map: dict[str, Any] = {}  # processed category id -> db id

    try:
        cats_inserted = _insert_categories(cur, tables=tables, cols=cols, categories=categories, cat_map=cat_map, dry_run=dry_run)
        tuts_inserted, tut_map = _insert_tutorials(
            cur, tables=tables, cols=cols, tutorials=tutorials, cat_map=cat_map, default_user_id=default_user_id, dry_run=dry_run
        )
        steps_inserted, step_map = _insert_steps(
            cur, tables=tables, cols=cols, steps=steps, tut_map=tut_map, dry_run=dry_run
        )
        media_inserted = _insert_media(
            cur, tables=tables, cols=cols, media=media, tut_map=tut_map, step_map=step_map, default_user_id=default_user_id, dry_run=dry_run
        )

        if not dry_run:
            # IMPORTANTE: Não fechar o cursor antes do commit em pyodbc!
            # A transação está associada ao cursor, então precisamos fazer o commit ANTES de fechar
            # Usar conn.commit() para commitar a transação
            conn.commit()
            # Agora podemos fechar o cursor após o commit
            cur.close()
        
        return InsertResult(
            categories_inserted=cats_inserted,
            tutorials_inserted=tuts_inserted,
            steps_inserted=steps_inserted,
            media_inserted=media_inserted,
        )
    except Exception as e:
        if not dry_run:
            cur.close()
            conn.rollback()
        raise


def _insert_categories(
    cur: pyodbc.Cursor,
    *,
    tables: DbTableMapping,
    cols: DbColumnMapping,
    categories: list[dict[str, Any]],
    cat_map: dict[str, Any],
    dry_run: bool,
) -> int:
    """
    Inserts categories in parent-first order. categories elements:
      { id, name, parent_id }
    Schema real: name, slug (obrigatório), ParentId, SortOrder
    """
    from src.utils.urls import slugify
    
    # Simple loop with retries until no progress (handles arbitrary ordering)
    pending = categories[:]
    inserted = 0
    for _ in range(len(categories) + 2):
        if not pending:
            break
        next_pending: list[dict[str, Any]] = []
        progressed = False
        for c in pending:
            pid = c.get("parent_id")
            if pid and pid not in cat_map:
                next_pending.append(c)
                continue
            db_parent = cat_map.get(pid)
            
            name = c.get("name") or "Unnamed"
            slug = slugify(name)

            # Verificar se a categoria já existe (por slug e parent_id para garantir unicidade)
            if not dry_run:
                check_sql = f"SELECT {cols.category_id} FROM {tables.schema}.{tables.categories} WHERE {cols.category_slug} = ? AND ({cols.category_parent_id} = ? OR ({cols.category_parent_id} IS NULL AND ? IS NULL));"
                check_params = (slug, db_parent, db_parent)
                existing = cur.execute(check_sql, check_params).fetchone()
                if existing:
                    # Categoria já existe, usar o ID existente
                    existing_id = existing[0]
                    # Garantir que é INT
                    try:
                        existing_id = int(existing_id)
                    except (ValueError, TypeError):
                        log.error("ID de categoria existente inválido: %s (tipo: %s)", existing_id, type(existing_id))
                        continue
                    cat_map[c["id"]] = existing_id
                    log.debug("Categoria já existe (slug=%s, parent=%s), usando ID=%s", slug, db_parent, existing_id)
                    # Não incrementar inserted pois não foi inserida
                    progressed = True
                    continue

            # Incluir CreatedAt e UpdatedAt (NOT NULL no schema)
            now = datetime.now()
            sql = f"INSERT INTO {tables.schema}.{tables.categories} ({cols.category_name}, {cols.category_slug}, {cols.category_parent_id}, {cols.category_sort}, CreatedAt, UpdatedAt) VALUES (?, ?, ?, ?, ?, ?);"
            params = (name, slug, db_parent, c.get("sort_order") or 0, now, now)
            if dry_run:
                log.info("[dry-run] %s %s", sql, params)
                cat_map[c["id"]] = c["id"]  # fake mapping
            else:
                try:
                    cur.execute(sql, params)
                    # Buscar o ID inserido - tentar múltiplas formas
                    new_id = None
                    try:
                        # Método 1: SCOPE_IDENTITY() (mais confiável)
                        result = cur.execute("SELECT SCOPE_IDENTITY();").fetchone()
                        if result:
                            new_id = result[0]
                    except Exception:
                        pass
                    
                    if new_id is None:
                        try:
                            # Método 2: Buscar pelo slug (único)
                            lookup_sql = f"SELECT {cols.category_id} FROM {tables.schema}.{tables.categories} WHERE {cols.category_slug} = ? AND ({cols.category_parent_id} = ? OR ({cols.category_parent_id} IS NULL AND ? IS NULL));"
                            lookup_params = (slug, db_parent, db_parent)
                            result = cur.execute(lookup_sql, lookup_params).fetchone()
                            if result:
                                new_id = result[0]
                        except Exception:
                            pass
                    
                    if new_id is None:
                        log.error("Não foi possível obter ID da categoria inserida (slug=%s). Isso pode causar problemas.", slug)
                        # Não adicionar ao cat_map se não conseguirmos o ID
                        continue
                    
                    # Garantir que é INT
                    try:
                        new_id = int(new_id)
                    except (ValueError, TypeError):
                        log.error("ID de categoria inválido retornado: %s (tipo: %s)", new_id, type(new_id))
                        continue
                    
                    cat_map[c["id"]] = new_id
                except pyodbc.IntegrityError as e:
                    # Se ainda assim houver erro de duplicata (race condition), tentar buscar novamente
                    if "UNIQUE KEY constraint" in str(e) or "duplicate key" in str(e).lower():
                        log.warning("Erro de duplicata ao inserir categoria (slug=%s), tentando buscar existente", slug)
                        existing = cur.execute(check_sql, check_params).fetchone()
                        if existing:
                            existing_id = existing[0]
                            # Garantir que é INT
                            try:
                                existing_id = int(existing_id)
                            except (ValueError, TypeError):
                                log.error("ID de categoria encontrada após erro inválido: %s (tipo: %s)", existing_id, type(existing_id))
                                continue
                            cat_map[c["id"]] = existing_id
                            log.debug("Categoria encontrada após erro, usando ID=%s", existing_id)
                            continue
                    raise
            inserted += 1
            progressed = True

        if not progressed and next_pending:
            # Can't resolve parents; break to avoid infinite loop.
            raise RuntimeError("Could not insert categories due to unresolved parents. Check category tree data.")
        pending = next_pending
    return inserted


def _insert_tutorials(
    cur: pyodbc.Cursor,
    *,
    tables: DbTableMapping,
    cols: DbColumnMapping,
    tutorials: list[dict[str, Any]],
    cat_map: dict[str, Any],
    default_user_id: int,
    dry_run: bool,
) -> tuple[int, dict[str, Any]]:
    from src.utils.urls import slugify
    
    tut_map: dict[str, Any] = {}  # tutorial url -> db id
    inserted = 0
    for t in tutorials:
        cat_key = t.get("category_db_key")
        db_cat_raw = cat_map.get(cat_key) if cat_key else None
        # Garantir que db_cat seja sempre INT ou None, nunca string
        if db_cat_raw is not None:
            try:
                db_cat = int(db_cat_raw)
            except (ValueError, TypeError):
                log.warning("Category ID inválido no cat_map para key=%s: %s (tipo: %s), usando None", cat_key, db_cat_raw, type(db_cat_raw))
                db_cat = None
        else:
            db_cat = None
        
        title = t.get("title") or "Untitled"
        base_slug = slugify(title)
        slug = base_slug
        
        # Verificar se o slug já existe e gerar um único se necessário
        if not dry_run:
            check_sql = f"SELECT {cols.tutorial_id} FROM {tables.schema}.{tables.tutorials} WHERE {cols.tutorial_slug} = ?;"
            existing = cur.execute(check_sql, (slug,)).fetchone()
            if existing:
                # Slug já existe, adicionar sufixo numérico
                counter = 1
                while True:
                    slug = f"{base_slug}-{counter}"
                    existing = cur.execute(check_sql, (slug,)).fetchone()
                    if not existing:
                        break
                    counter += 1
                    if counter > 1000:  # Safety limit
                        log.error("Não foi possível gerar slug único após 1000 tentativas para: %s", base_slug)
                        raise RuntimeError(f"Não foi possível gerar slug único para tutorial: {title}")
                log.debug("Slug duplicado '%s', usando '%s'", base_slug, slug)
        
        # Usar shareHash do tutorial se fornecido, senão gerar um novo
        share_hash = t.get("share_hash")
        if not share_hash:
            # Gerar ShareHash único (32 caracteres, sem hífens, como no backend)
            # Verificar se já existe antes de inserir
            if not dry_run:
                max_attempts = 10
                for attempt in range(max_attempts):
                    candidate_hash = uuid.uuid4().hex[:32]
                    check_sql = f"SELECT {cols.tutorial_id} FROM {tables.schema}.{tables.tutorials} WHERE ShareHash = ?;"
                    existing = cur.execute(check_sql, (candidate_hash,)).fetchone()
                    if not existing:
                        share_hash = candidate_hash
                        break
                if not share_hash:
                    # Fallback: usar UUID completo se não conseguir gerar um único em 10 tentativas
                    share_hash = uuid.uuid4().hex[:32]
                    log.warning("Não foi possível gerar ShareHash único após %d tentativas, usando: %s", max_attempts, share_hash)
            else:
                # Para dry-run, usar um hash fake
                share_hash = "dry-run-hash-" + uuid.uuid4().hex[:24]
        else:
            # Verificar se o shareHash fornecido já existe no banco
            if not dry_run:
                check_sql = f"SELECT {cols.tutorial_id} FROM {tables.schema}.{tables.tutorials} WHERE ShareHash = ?;"
                existing = cur.execute(check_sql, (share_hash,)).fetchone()
                if existing:
                    # ShareHash já existe, gerar um novo
                    log.warning("ShareHash fornecido já existe no banco (%s), gerando novo", share_hash)
                    max_attempts = 10
                    for attempt in range(max_attempts):
                        candidate_hash = uuid.uuid4().hex[:32]
                        check_sql = f"SELECT {cols.tutorial_id} FROM {tables.schema}.{tables.tutorials} WHERE ShareHash = ?;"
                        existing = cur.execute(check_sql, (candidate_hash,)).fetchone()
                        if not existing:
                            share_hash = candidate_hash
                            break
                    if not share_hash or share_hash == t.get("share_hash"):
                        share_hash = uuid.uuid4().hex[:32]
                        log.warning("Não foi possível gerar ShareHash único após verificação, usando: %s", share_hash)
        
        # Incluir CreatedAt e UpdatedAt (NOT NULL no schema)
        # Incluir também campos com DEFAULT para evitar problemas de ordem
        # Ordem: title, slug, description, content, CategoryId, ViewCount, IsPublished, IsFeatured, ShareHash, CreatedBy, UpdatedBy, CreatedAt, UpdatedAt
        now = datetime.now()
        sql = (
            f"INSERT INTO {tables.schema}.{tables.tutorials} "
            f"({cols.tutorial_title}, {cols.tutorial_slug}, {cols.tutorial_description}, {cols.tutorial_content}, {cols.tutorial_category_id}, ViewCount, IsPublished, IsFeatured, ShareHash, {cols.tutorial_created_by}, {cols.tutorial_updated_by}, CreatedAt, UpdatedAt) "
            f"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        )
        params = (
            title,
            slug,
            t.get("description"),
            t.get("content_html") or "",
            db_cat,
            0,  # ViewCount DEFAULT 0
            1,  # IsPublished = 1 (publicado) para aparecer no frontend
            0,  # IsFeatured DEFAULT 0 (BIT = 0/1)
            share_hash,
            default_user_id,
            default_user_id,
            now,
            now,
        )
        
        if dry_run:
            log.info("[dry-run] %s %s", sql, tuple(_safe_param(p) for p in params))
            tut_map[t.get("url_original", "")] = t.get("url_original", "")
        else:
            try:
                cur.execute(sql, params)
            except pyodbc.IntegrityError as e:
                error_str = str(e)
                # Tratar erro de slug duplicado
                if "Tutorials_slug_key" in error_str or "duplicate key" in error_str.lower() or "UNIQUE KEY constraint" in error_str:
                    log.warning("Slug duplicado detectado durante inserção (slug=%s), tentando buscar existente", slug)
                    # Buscar tutorial existente pelo slug
                    lookup_sql = f"SELECT {cols.tutorial_id} FROM {tables.schema}.{tables.tutorials} WHERE {cols.tutorial_slug} = ?;"
                    existing = cur.execute(lookup_sql, (slug,)).fetchone()
                    if existing:
                        existing_id = existing[0]
                        try:
                            existing_id = int(existing_id)
                        except (ValueError, TypeError):
                            log.error("ID de tutorial existente inválido: %s", existing_id)
                            raise
                        tut_map[t.get("url_original", "")] = existing_id
                        log.debug("Tutorial já existe (slug=%s), usando ID=%s", slug, existing_id)
                        continue
                raise
            except Exception as e:
                raise
            # Buscar o ID inserido - tentar múltiplas formas
            new_id = None
            try:
                # Método 1: SCOPE_IDENTITY() (mais confiável)
                result = cur.execute("SELECT SCOPE_IDENTITY();").fetchone()
                if result:
                    new_id = result[0]
            except Exception:
                pass
            
            if new_id is None:
                try:
                    # Método 2: Buscar pelo slug (único)
                    lookup_sql = f"SELECT {cols.tutorial_id} FROM {tables.schema}.{tables.tutorials} WHERE {cols.tutorial_slug} = ?;"
                    result = cur.execute(lookup_sql, (slug,)).fetchone()
                    if result:
                        new_id = result[0]
                except Exception:
                    pass
            
            if new_id is None:
                log.error("Não foi possível obter ID do tutorial inserido (slug=%s). Isso pode causar problemas.", slug)
                # Não adicionar ao tut_map se não conseguirmos o ID
                continue
            
            # Garantir que é INT
            try:
                new_id = int(new_id)
            except (ValueError, TypeError):
                log.error("ID de tutorial inválido retornado: %s (tipo: %s)", new_id, type(new_id))
                continue
            
            tut_map[t.get("url_original", "")] = new_id
        inserted += 1
    return inserted, tut_map


def _insert_steps(
    cur: pyodbc.Cursor,
    *,
    tables: DbTableMapping,
    cols: DbColumnMapping,
    steps: list[dict[str, Any]],
    tut_map: dict[str, Any],
    dry_run: bool,
) -> tuple[int, dict[tuple[str, int], Any]]:
    step_map: dict[tuple[str, int], Any] = {}
    inserted = 0
    for s in steps:
        tut_url = s.get("tutorial_url")
        if not tut_url or tut_url not in tut_map:
            continue
        db_tut_raw = tut_map[tut_url]
        # Garantir que db_tut seja sempre INT, nunca string
        try:
            db_tut = int(db_tut_raw)
        except (ValueError, TypeError):
            log.warning("Tutorial ID inválido no tut_map para url=%s: %s (tipo: %s), pulando step", tut_url, db_tut_raw, type(db_tut_raw))
            continue
        step_number = int(s.get("step_number") or 1)
        # Incluir CreatedAt e UpdatedAt (NOT NULL no schema)
        # Incluir também VideoUrl e ImageUrl se disponíveis
        now = datetime.now()
        image_url = s.get("image_url")
        video_url = s.get("video_url")
        
        # Truncar título para 300 caracteres (limite do banco)
        step_title = s.get("title") or f"Passo {step_number}"
        if len(step_title) > 300:
            step_title = step_title[:297] + "..."
        
        sql = (
            f"INSERT INTO {tables.schema}.{tables.tutorial_steps} "
            f"({cols.step_tutorial_id}, {cols.step_title}, {cols.step_content}, {cols.step_sort}, VideoUrl, ImageUrl, CreatedAt, UpdatedAt) "
            f"VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
        )
        params = (
            db_tut, 
            step_title, 
            s.get("content_html") or "", 
            step_number,
            video_url,
            image_url,
            now, 
            now
        )
        if dry_run:
            log.info("[dry-run] %s %s", sql, tuple(_safe_param(p) for p in params))
            step_map[(tut_url, step_number)] = f"{tut_url}#step{step_number}"
        else:
            cur.execute(sql, params)
            try:
                new_id = cur.execute("SELECT SCOPE_IDENTITY();").fetchone()[0]
            except Exception:
                new_id = None
            step_map[(tut_url, step_number)] = new_id
        inserted += 1
    return inserted, step_map


def _insert_media(
    cur: pyodbc.Cursor,
    *,
    tables: DbTableMapping,
    cols: DbColumnMapping,
    media: list[dict[str, Any]],
    tut_map: dict[str, Any],
    step_map: dict[tuple[str, int], Any],
    default_user_id: int,
    dry_run: bool,
) -> int:
    inserted = 0
    for m in media:
        tut_url = m.get("tutorial_url")
        if not tut_url or tut_url not in tut_map:
            continue

        file_name = m.get("file_name") or "unknown"
        original_name = file_name
        url = m.get("url") or ""
        mime_type = m.get("mime_type") or "application/octet-stream"
        file_size = m.get("file_size") or 0

        # Incluir CreatedAt (Media não tem UpdatedAt no schema)
        now = datetime.now()
        sql = (
            f"INSERT INTO {tables.schema}.{tables.media} "
            f"({cols.media_file_name}, {cols.media_original_name}, {cols.media_mime_type}, {cols.media_size}, {cols.media_url}, {cols.media_thumbnail_url}, {cols.media_uploaded_by}, CreatedAt) "
            f"VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
        )
        params = (
            file_name,
            original_name,
            mime_type,
            file_size,
            url,
            m.get("thumbnail_url"),
            default_user_id,
            now,
        )
        if dry_run:
            log.info("[dry-run] %s %s", sql, tuple(_safe_param(p) for p in params))
        else:
            cur.execute(sql, params)
        inserted += 1
    return inserted


def _safe_param(p: Any) -> Any:
    # Avoid logging multi-MB HTML bodies
    if isinstance(p, str) and len(p) > 200:
        return p[:200] + "...(truncated)"
    return p


