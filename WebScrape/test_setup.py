#!/usr/bin/env python3
"""
Script de teste para validar a configuração do webscrape.
Verifica importações, configurações e estrutura básica.
"""

from __future__ import annotations

import sys
from pathlib import Path


def test_imports():
    """Testa se todas as importações funcionam."""
    print("=" * 60)
    print("TESTE 1: Verificando importações...")
    print("=" * 60)
    
    try:
        from config import load_settings, DbColumnMapping, DbTableMapping
        print("✓ config importado com sucesso")
    except Exception as e:
        print(f"✗ Erro ao importar config: {e}")
        return False
    
    try:
        from src.database.inserter import build_schema_checks, insert_all, InsertResult
        print("✓ inserter importado com sucesso")
    except Exception as e:
        print(f"✗ Erro ao importar inserter: {e}")
        return False
    
    try:
        from src.database.schema_check import check_schema, TableCheck
        print("✓ schema_check importado com sucesso")
    except Exception as e:
        print(f"✗ Erro ao importar schema_check: {e}")
        return False
    
    try:
        from src.database.sqlserver import SqlServerConfig, connect, build_connection_string
        print("✓ sqlserver importado com sucesso")
    except Exception as e:
        print(f"✗ Erro ao importar sqlserver: {e}")
        return False
    
    try:
        from src.scraper.discoverer import discover_pages, serialize_pages
        print("✓ discoverer importado com sucesso")
    except Exception as e:
        print(f"✗ Erro ao importar discoverer: {e}")
        return False
    
    try:
        from src.scraper.extractor import extract_page
        print("✓ extractor importado com sucesso")
    except Exception as e:
        print(f"✗ Erro ao importar extractor: {e}")
        return False
    
    try:
        from src.scraper.processor import process_raw_page
        print("✓ processor importado com sucesso")
    except Exception as e:
        print(f"✗ Erro ao importar processor: {e}")
        return False
    
    try:
        from src.utils.urls import slugify, url_id, normalize_url
        print("✓ urls utils importado com sucesso")
    except Exception as e:
        print(f"✗ Erro ao importar urls utils: {e}")
        return False
    
    return True


def test_config_structure():
    """Testa se a estrutura de configuração está correta."""
    print("\n" + "=" * 60)
    print("TESTE 2: Verificando estrutura de configuração...")
    print("=" * 60)
    
    try:
        from config import DbColumnMapping, DbTableMapping
        
        # Testar DbTableMapping
        tables = DbTableMapping()
        assert hasattr(tables, 'categories'), "DbTableMapping deve ter 'categories'"
        assert hasattr(tables, 'tutorials'), "DbTableMapping deve ter 'tutorials'"
        assert hasattr(tables, 'tutorial_steps'), "DbTableMapping deve ter 'tutorial_steps'"
        assert hasattr(tables, 'media'), "DbTableMapping deve ter 'media'"
        print("✓ DbTableMapping estrutura correta")
        
        # Testar DbColumnMapping
        cols = DbColumnMapping()
        
        # Categories
        assert hasattr(cols, 'category_name'), "DbColumnMapping deve ter 'category_name'"
        assert hasattr(cols, 'category_slug'), "DbColumnMapping deve ter 'category_slug'"
        assert hasattr(cols, 'category_parent_id'), "DbColumnMapping deve ter 'category_parent_id'"
        print("✓ DbColumnMapping - Categories campos corretos")
        
        # Tutorials
        assert hasattr(cols, 'tutorial_title'), "DbColumnMapping deve ter 'tutorial_title'"
        assert hasattr(cols, 'tutorial_slug'), "DbColumnMapping deve ter 'tutorial_slug'"
        assert hasattr(cols, 'tutorial_content'), "DbColumnMapping deve ter 'tutorial_content'"
        assert hasattr(cols, 'tutorial_created_by'), "DbColumnMapping deve ter 'tutorial_created_by'"
        assert hasattr(cols, 'tutorial_updated_by'), "DbColumnMapping deve ter 'tutorial_updated_by'"
        print("✓ DbColumnMapping - Tutorials campos corretos")
        
        # Steps
        assert hasattr(cols, 'step_tutorial_id'), "DbColumnMapping deve ter 'step_tutorial_id'"
        assert hasattr(cols, 'step_title'), "DbColumnMapping deve ter 'step_title'"
        assert hasattr(cols, 'step_sort'), "DbColumnMapping deve ter 'step_sort'"
        print("✓ DbColumnMapping - Steps campos corretos")
        
        # Media
        assert hasattr(cols, 'media_file_name'), "DbColumnMapping deve ter 'media_file_name'"
        assert hasattr(cols, 'media_original_name'), "DbColumnMapping deve ter 'media_original_name'"
        assert hasattr(cols, 'media_mime_type'), "DbColumnMapping deve ter 'media_mime_type'"
        assert hasattr(cols, 'media_size'), "DbColumnMapping deve ter 'media_size'"
        assert hasattr(cols, 'media_url'), "DbColumnMapping deve ter 'media_url'"
        assert hasattr(cols, 'media_uploaded_by'), "DbColumnMapping deve ter 'media_uploaded_by'"
        print("✓ DbColumnMapping - Media campos corretos")
        
        return True
    except AssertionError as e:
        print(f"✗ Erro de estrutura: {e}")
        return False
    except Exception as e:
        print(f"✗ Erro ao testar estrutura: {e}")
        return False


def test_schema_checks():
    """Testa se os schema checks estão corretos."""
    print("\n" + "=" * 60)
    print("TESTE 3: Verificando schema checks...")
    print("=" * 60)
    
    try:
        from config import DbColumnMapping, DbTableMapping
        from src.database.inserter import build_schema_checks
        
        tables = DbTableMapping()
        cols = DbColumnMapping()
        
        checks = build_schema_checks(tables, cols)
        
        assert len(checks) == 4, "Deve haver 4 schema checks (Categories, Tutorials, Steps, Media)"
        print(f"✓ {len(checks)} schema checks criados")
        
        # Verificar Categories
        cat_check = next((c for c in checks if c.table == tables.categories), None)
        assert cat_check is not None, "Deve haver check para Categories"
        assert cols.category_name in cat_check.required_columns, "Categories deve verificar 'name'"
        assert cols.category_slug in cat_check.required_columns, "Categories deve verificar 'slug'"
        print("✓ Schema check para Categories correto")
        
        # Verificar Tutorials
        tut_check = next((c for c in checks if c.table == tables.tutorials), None)
        assert tut_check is not None, "Deve haver check para Tutorials"
        assert cols.tutorial_title in tut_check.required_columns, "Tutorials deve verificar 'title'"
        assert cols.tutorial_slug in tut_check.required_columns, "Tutorials deve verificar 'slug'"
        assert cols.tutorial_content in tut_check.required_columns, "Tutorials deve verificar 'content'"
        print("✓ Schema check para Tutorials correto")
        
        # Verificar Steps
        step_check = next((c for c in checks if c.table == tables.tutorial_steps), None)
        assert step_check is not None, "Deve haver check para TutorialSteps"
        assert cols.step_tutorial_id in step_check.required_columns, "Steps deve verificar 'TutorialId'"
        print("✓ Schema check para TutorialSteps correto")
        
        # Verificar Media
        media_check = next((c for c in checks if c.table == tables.media), None)
        assert media_check is not None, "Deve haver check para Media"
        assert cols.media_file_name in media_check.required_columns, "Media deve verificar 'FileName'"
        assert cols.media_uploaded_by in media_check.required_columns, "Media deve verificar 'UploadedBy'"
        print("✓ Schema check para Media correto")
        
        return True
    except AssertionError as e:
        print(f"✗ Erro no schema check: {e}")
        return False
    except Exception as e:
        print(f"✗ Erro ao testar schema checks: {e}")
        return False


def test_inserter_functions():
    """Testa se as funções do inserter estão corretas."""
    print("\n" + "=" * 60)
    print("TESTE 4: Verificando funções do inserter...")
    print("=" * 60)
    
    try:
        from config import DbColumnMapping, DbTableMapping
        from src.database.inserter import _insert_categories, _insert_tutorials, _insert_steps, _insert_media
        
        tables = DbTableMapping()
        cols = DbColumnMapping()
        
        # Verificar se as funções existem e têm a assinatura correta
        import inspect
        
        # _insert_categories
        sig = inspect.signature(_insert_categories)
        params = list(sig.parameters.keys())
        assert 'cur' in params, "_insert_categories deve ter parâmetro 'cur'"
        assert 'tables' in params, "_insert_categories deve ter parâmetro 'tables'"
        assert 'cols' in params, "_insert_categories deve ter parâmetro 'cols'"
        assert 'categories' in params, "_insert_categories deve ter parâmetro 'categories'"
        assert 'cat_map' in params, "_insert_categories deve ter parâmetro 'cat_map'"
        assert 'dry_run' in params, "_insert_categories deve ter parâmetro 'dry_run'"
        print("✓ _insert_categories assinatura correta")
        
        # _insert_tutorials
        sig = inspect.signature(_insert_tutorials)
        params = list(sig.parameters.keys())
        assert 'default_user_id' in params, "_insert_tutorials deve ter parâmetro 'default_user_id'"
        print("✓ _insert_tutorials assinatura correta")
        
        # _insert_media
        sig = inspect.signature(_insert_media)
        params = list(sig.parameters.keys())
        assert 'default_user_id' in params, "_insert_media deve ter parâmetro 'default_user_id'"
        print("✓ _insert_media assinatura correta")
        
        return True
    except AssertionError as e:
        print(f"✗ Erro na assinatura: {e}")
        return False
    except Exception as e:
        print(f"✗ Erro ao testar inserter: {e}")
        return False


def test_config_loading():
    """Testa se a configuração pode ser carregada (sem .env)."""
    print("\n" + "=" * 60)
    print("TESTE 5: Verificando carregamento de configuração...")
    print("=" * 60)
    
    try:
        from config import load_settings
        
        # Tentar carregar com valores padrão (sem .env)
        settings = load_settings()
        
        assert settings.base_url, "base_url deve estar definido"
        assert settings.browser, "browser deve estar definido"
        assert settings.data_dir, "data_dir deve estar definido"
        assert settings.media_dir, "media_dir deve estar definido"
        assert settings.tables, "tables deve estar definido"
        assert settings.columns, "columns deve estar definido"
        print("✓ Configuração carregada com sucesso (valores padrão)")
        
        # Verificar valores padrão importantes
        assert settings.tables.categories == "Categories", "Nome da tabela Categories deve ser 'Categories'"
        assert settings.columns.category_name == "name", "Nome da coluna category_name deve ser 'name'"
        assert settings.columns.category_slug == "slug", "Nome da coluna category_slug deve ser 'slug'"
        print("✓ Valores padrão corretos")
        
        return True
    except Exception as e:
        print(f"✗ Erro ao carregar configuração: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_utils():
    """Testa funções utilitárias."""
    print("\n" + "=" * 60)
    print("TESTE 6: Verificando funções utilitárias...")
    print("=" * 60)
    
    try:
        from src.utils.urls import slugify, url_id, normalize_url
        
        # Testar slugify
        result = slugify("Teste de Slug")
        assert result == "teste-de-slug", f"slugify deve funcionar, obteve: {result}"
        print("✓ slugify funciona corretamente")
        
        # Testar url_id
        result = url_id("https://example.com")
        assert len(result) == 16, f"url_id deve retornar 16 caracteres, obteve: {len(result)}"
        print("✓ url_id funciona corretamente")
        
        # Testar normalize_url
        result = normalize_url("https://example.com/path#fragment")
        assert "#" not in result, "normalize_url deve remover fragmentos"
        print("✓ normalize_url funciona corretamente")
        
        return True
    except AssertionError as e:
        print(f"✗ Erro no teste de utils: {e}")
        return False
    except Exception as e:
        print(f"✗ Erro ao testar utils: {e}")
        return False


def test_file_structure():
    """Verifica se a estrutura de arquivos está correta."""
    print("\n" + "=" * 60)
    print("TESTE 7: Verificando estrutura de arquivos...")
    print("=" * 60)
    
    base_dir = Path(__file__).parent
    
    required_files = [
        "config.py",
        "requirements.txt",
        "run_scraper.py",
        "README.md",
        "src/main.py",
        "src/database/inserter.py",
        "src/database/schema_check.py",
        "src/database/sqlserver.py",
        "src/scraper/discoverer.py",
        "src/scraper/extractor.py",
        "src/scraper/processor.py",
        "src/utils/urls.py",
    ]
    
    missing = []
    for file in required_files:
        path = base_dir / file
        if not path.exists():
            missing.append(file)
        else:
            print(f"✓ {file} existe")
    
    if missing:
        print(f"✗ Arquivos faltando: {', '.join(missing)}")
        return False
    
    return True


def main():
    """Executa todos os testes."""
    print("\n" + "=" * 60)
    print("TESTES DE VALIDAÇÃO DO WEBSRAPE")
    print("=" * 60 + "\n")
    
    tests = [
        ("Importações", test_imports),
        ("Estrutura de Configuração", test_config_structure),
        ("Schema Checks", test_schema_checks),
        ("Funções do Inserter", test_inserter_functions),
        ("Carregamento de Configuração", test_config_loading),
        ("Funções Utilitárias", test_utils),
        ("Estrutura de Arquivos", test_file_structure),
    ]
    
    results = []
    for name, test_func in tests:
        try:
            result = test_func()
            results.append((name, result))
        except Exception as e:
            print(f"\n✗ Erro inesperado em '{name}': {e}")
            import traceback
            traceback.print_exc()
            results.append((name, False))
    
    # Resumo
    print("\n" + "=" * 60)
    print("RESUMO DOS TESTES")
    print("=" * 60)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✓ PASSOU" if result else "✗ FALHOU"
        print(f"{status}: {name}")
    
    print("\n" + "=" * 60)
    print(f"Total: {passed}/{total} testes passaram")
    print("=" * 60)
    
    if passed == total:
        print("\n🎉 Todos os testes passaram! O sistema está pronto para uso.")
        return 0
    else:
        print(f"\n⚠️  {total - passed} teste(s) falharam. Revise os erros acima.")
        return 1


if __name__ == "__main__":
    sys.exit(main())

