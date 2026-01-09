from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import os

from dotenv import load_dotenv


@dataclass(frozen=True)
class DbTableMapping:
    schema: str = "dbo"
    categories: str = "Categories"
    tutorials: str = "Tutorials"
    tutorial_steps: str = "TutorialSteps"
    media: str = "Media"


@dataclass(frozen=True)
class DbColumnMapping:
    # Categories - Schema real: id, name, ParentId, SortOrder, slug (obrigatório)
    category_id: str = "id"
    category_name: str = "name"
    category_parent_id: str = "ParentId"
    category_sort: str = "SortOrder"
    category_slug: str = "slug"

    # Tutorials - Schema real: id, title, content, CategoryId, slug (obrigatório), CreatedBy, UpdatedBy
    tutorial_id: str = "id"
    tutorial_category_id: str = "CategoryId"
    tutorial_title: str = "title"
    tutorial_description: str = "description"
    tutorial_content: str = "content"
    tutorial_slug: str = "slug"
    tutorial_created_by: str = "CreatedBy"
    tutorial_updated_by: str = "UpdatedBy"

    # Steps - Schema real: id, TutorialId, title, content, SortOrder
    step_id: str = "id"
    step_tutorial_id: str = "TutorialId"
    step_title: str = "title"
    step_content: str = "content"
    step_sort: str = "SortOrder"

    # Media - Schema real: id, FileName, OriginalName, MimeType, size, url, ThumbnailUrl, UploadedBy
    # Nota: Media não tem relação direta com Tutorials/Steps no schema atual
    media_id: str = "id"
    media_file_name: str = "FileName"
    media_original_name: str = "OriginalName"
    media_mime_type: str = "MimeType"
    media_size: str = "size"
    media_url: str = "url"
    media_thumbnail_url: str = "ThumbnailUrl"
    media_uploaded_by: str = "UploadedBy"


@dataclass(frozen=True)
class Settings:
    base_url: str

    browser: str
    headless: bool
    page_load_timeout_seconds: int
    wait_timeout_seconds: int

    user_agent: str
    request_timeout_seconds: int
    request_retries: int
    request_backoff_seconds: float
    respect_robots: bool
    download_max_workers_pages: int
    download_max_workers_media: int
    download_max_media_per_page: int | None
    download_remove_size_params: bool
    download_delay_seconds: float
    download_validate_integrity: bool

    extract_content_check_min_words: int
    extract_wait_delay_seconds: float
    extract_max_wait_attempts: int
    extract_delay_between_pages: float
    extract_enable_debug_log: bool

    data_dir: Path
    media_dir: Path

    # Mapping / Canonicalization
    # NOTE: These are used to keep the scraper behavior aligned with the plan:
    # - hierarchy comes from the Google Sites menu
    # - tutorial title comes from menu first, then H1/H2, then slug
    category_source: str
    title_source: str
    ignore_non_leaf_pages: bool
    normalize_menu_labels: bool
    report_mismatches: bool

    sqlserver_driver: str
    sqlserver_server: str
    sqlserver_database: str
    sqlserver_trusted_connection: bool
    sqlserver_username: str | None
    sqlserver_password: str | None
    sqlserver_port: int | None

    default_user_id: int

    tables: DbTableMapping
    columns: DbColumnMapping

    def raw_content_dir(self) -> Path:
        return self.data_dir / "raw_content"

    def processed_dir(self) -> Path:
        return self.data_dir / "processed_data"

    def images_dir(self) -> Path:
        return self.media_dir / "images"

    def documents_dir(self) -> Path:
        return self.media_dir / "documents"
    
    def videos_dir(self) -> Path:
        """Directory for videos. Uses backend/uploads/videos if BACKEND_UPLOADS_DIR is set."""
        backend_uploads = os.getenv("BACKEND_UPLOADS_DIR")
        if backend_uploads:
            return Path(backend_uploads) / "videos"
        # Fallback: try to find backend/uploads relative to WebScrape directory
        import os as os_module
        webscrape_dir = Path(__file__).parent
        backend_uploads_fallback = webscrape_dir.parent / "backend" / "uploads"
        if backend_uploads_fallback.exists():
            return backend_uploads_fallback / "videos"
        return self.media_dir / "videos"
    
    def backend_images_dir(self) -> Path:
        """Directory for images in backend. Uses backend/uploads/images if BACKEND_UPLOADS_DIR is set."""
        backend_uploads = os.getenv("BACKEND_UPLOADS_DIR")
        if backend_uploads:
            return Path(backend_uploads) / "images"
        # Fallback: try to find backend/uploads relative to WebScrape directory
        import os as os_module
        webscrape_dir = Path(__file__).parent
        backend_uploads_fallback = webscrape_dir.parent / "backend" / "uploads"
        if backend_uploads_fallback.exists():
            return backend_uploads_fallback / "images"
        return self.images_dir()


def _env_bool(name: str, default: bool) -> bool:
    val = os.getenv(name)
    if val is None:
        return default
    return val.strip().lower() in {"1", "true", "yes", "y", "on"}


def _env_int(name: str, default: int | None) -> int | None:
    val = os.getenv(name)
    if val is None or not val.strip():
        return default
    return int(val)


def _env_float(name: str, default: float) -> float:
    val = os.getenv(name)
    if val is None or not val.strip():
        return default
    return float(val)


def load_settings(dotenv_path: str | os.PathLike[str] | None = None) -> Settings:
    # If user didn't provide dotenv_path, we *try* local ".env" (even if not committed).
    # Some environments block creating .env.example; using config/env.example as a template.
    if dotenv_path is None:
        load_dotenv(override=False)
    else:
        load_dotenv(dotenv_path=dotenv_path, override=False)

    base_url = os.getenv("BASE_URL", "https://sites.google.com/view/lukos-tutoriais/").strip()

    data_dir = Path(os.getenv("DATA_DIR", "data")).resolve()
    media_dir = Path(os.getenv("MEDIA_DIR", "media")).resolve()

    category_source = os.getenv("CATEGORY_SOURCE", "menu").strip().lower()
    title_source = os.getenv("TITLE_SOURCE", "menu_first").strip().lower()
    ignore_non_leaf_pages = _env_bool("IGNORE_NON_LEAF_PAGES", True)
    normalize_menu_labels = _env_bool("NORMALIZE_MENU_LABELS", True)
    report_mismatches = _env_bool("REPORT_MISMATCHES", True)

    tables = DbTableMapping(
        schema=os.getenv("DB_SCHEMA", "dbo").strip(),
        categories=os.getenv("TBL_CATEGORIES", "Categories").strip(),
        tutorials=os.getenv("TBL_TUTORIALS", "Tutorials").strip(),
        tutorial_steps=os.getenv("TBL_TUTORIAL_STEPS", "TutorialSteps").strip(),
        media=os.getenv("TBL_MEDIA", "Media").strip(),
    )

    columns = DbColumnMapping(
        category_id=os.getenv("COL_CATEGORY_ID", "id").strip(),
        category_name=os.getenv("COL_CATEGORY_NAME", "name").strip(),
        category_parent_id=os.getenv("COL_CATEGORY_PARENT_ID", "ParentId").strip(),
        category_sort=os.getenv("COL_CATEGORY_SORT", "SortOrder").strip(),
        category_slug=os.getenv("COL_CATEGORY_SLUG", "slug").strip(),
        tutorial_id=os.getenv("COL_TUTORIAL_ID", "id").strip(),
        tutorial_category_id=os.getenv("COL_TUTORIAL_CATEGORY_ID", "CategoryId").strip(),
        tutorial_title=os.getenv("COL_TUTORIAL_TITLE", "title").strip(),
        tutorial_description=os.getenv("COL_TUTORIAL_DESCRIPTION", "description").strip(),
        tutorial_content=os.getenv("COL_TUTORIAL_CONTENT", "content").strip(),
        tutorial_slug=os.getenv("COL_TUTORIAL_SLUG", "slug").strip(),
        tutorial_created_by=os.getenv("COL_TUTORIAL_CREATED_BY", "CreatedBy").strip(),
        tutorial_updated_by=os.getenv("COL_TUTORIAL_UPDATED_BY", "UpdatedBy").strip(),
        step_id=os.getenv("COL_STEP_ID", "id").strip(),
        step_tutorial_id=os.getenv("COL_STEP_TUTORIAL_ID", "TutorialId").strip(),
        step_title=os.getenv("COL_STEP_TITLE", "title").strip(),
        step_content=os.getenv("COL_STEP_CONTENT", "content").strip(),
        step_sort=os.getenv("COL_STEP_SORT", "SortOrder").strip(),
        media_id=os.getenv("COL_MEDIA_ID", "id").strip(),
        media_file_name=os.getenv("COL_MEDIA_FILE_NAME", "FileName").strip(),
        media_original_name=os.getenv("COL_MEDIA_ORIGINAL_NAME", "OriginalName").strip(),
        media_mime_type=os.getenv("COL_MEDIA_MIME_TYPE", "MimeType").strip(),
        media_size=os.getenv("COL_MEDIA_SIZE", "size").strip(),
        media_url=os.getenv("COL_MEDIA_URL", "url").strip(),
        media_thumbnail_url=os.getenv("COL_MEDIA_THUMBNAIL_URL", "ThumbnailUrl").strip(),
        media_uploaded_by=os.getenv("COL_MEDIA_UPLOADED_BY", "UploadedBy").strip(),
    )

    return Settings(
        base_url=base_url,
        browser=os.getenv("BROWSER", "edge").strip().lower(),
        headless=_env_bool("HEADLESS", True),
        page_load_timeout_seconds=_env_int("PAGE_LOAD_TIMEOUT_SECONDS", 45),
        wait_timeout_seconds=_env_int("WAIT_TIMEOUT_SECONDS", 20),
        user_agent=os.getenv(
            "USER_AGENT",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        ).strip(),
        request_timeout_seconds=_env_int("REQUEST_TIMEOUT_SECONDS", 45),
        request_retries=_env_int("REQUEST_RETRIES", 3),
        request_backoff_seconds=_env_float("REQUEST_BACKOFF_SECONDS", 1.0),
        respect_robots=_env_bool("RESPECT_ROBOTS", True),
        download_max_workers_pages=_env_int("DOWNLOAD_MAX_WORKERS_PAGES", 4),
        download_max_workers_media=_env_int("DOWNLOAD_MAX_WORKERS_MEDIA", 8),
        download_max_media_per_page=_env_int("DOWNLOAD_MAX_MEDIA_PER_PAGE", None),
        download_remove_size_params=_env_bool("DOWNLOAD_REMOVE_SIZE_PARAMS", True),
        download_delay_seconds=_env_float("DOWNLOAD_DELAY_SECONDS", 0.1),
        download_validate_integrity=_env_bool("DOWNLOAD_VALIDATE_INTEGRITY", True),
        extract_content_check_min_words=_env_int("EXTRACT_CONTENT_CHECK_MIN_WORDS", 10),
        extract_wait_delay_seconds=_env_float("EXTRACT_WAIT_DELAY_SECONDS", 0.3),
        extract_max_wait_attempts=_env_int("EXTRACT_MAX_WAIT_ATTEMPTS", 2),
        extract_delay_between_pages=_env_float("EXTRACT_DELAY_BETWEEN_PAGES", 0.5),
        extract_enable_debug_log=_env_bool("EXTRACT_ENABLE_DEBUG_LOG", False),
        data_dir=data_dir,
        media_dir=media_dir,
        category_source=category_source,
        title_source=title_source,
        ignore_non_leaf_pages=ignore_non_leaf_pages,
        normalize_menu_labels=normalize_menu_labels,
        report_mismatches=report_mismatches,
        sqlserver_driver=os.getenv("SQLSERVER_DRIVER", "ODBC Driver 17 for SQL Server").strip(),
        sqlserver_server=os.getenv("SQLSERVER_SERVER", "localhost").strip(),
        sqlserver_database=os.getenv("SQLSERVER_DATABASE", "TutoriaisLukos").strip(),
        sqlserver_trusted_connection=_env_bool("SQLSERVER_TRUSTED_CONNECTION", True),
        sqlserver_username=(os.getenv("SQLSERVER_USERNAME") or "").strip() or None,
        sqlserver_password=(os.getenv("SQLSERVER_PASSWORD") or "").strip() or None,
        sqlserver_port=_env_int("SQLSERVER_PORT", None) if os.getenv("SQLSERVER_PORT") else None,
        default_user_id=_env_int("DEFAULT_USER_ID", 1),
        tables=tables,
        columns=columns,
    )


