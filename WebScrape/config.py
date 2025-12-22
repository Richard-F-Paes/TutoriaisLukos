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
    # Categories
    category_id: str = "CategoryId"
    category_name: str = "Name"
    category_parent_id: str = "ParentCategoryId"
    category_sort: str = "SortOrder"

    # Tutorials
    tutorial_id: str = "TutorialId"
    tutorial_category_id: str = "CategoryId"
    tutorial_title: str = "Title"
    tutorial_description: str = "Description"
    tutorial_url_original: str = "UrlOriginal"
    tutorial_content: str = "ContentHtml"
    tutorial_sort: str = "SortOrder"

    # Steps
    step_id: str = "TutorialStepId"
    step_tutorial_id: str = "TutorialId"
    step_number: str = "StepNumber"
    step_title: str = "Title"
    step_content: str = "ContentHtml"
    step_sort: str = "SortOrder"

    # Media
    media_id: str = "MediaId"
    media_tutorial_id: str = "TutorialId"
    media_step_id: str = "TutorialStepId"
    media_type: str = "MediaType"
    media_url: str = "Url"
    media_file_path: str = "FilePath"
    media_file_name: str = "FileName"
    media_file_size: str = "FileSize"
    media_mime_type: str = "MimeType"
    media_thumbnail_url: str = "ThumbnailUrl"


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

    data_dir: Path
    media_dir: Path

    sqlserver_driver: str
    sqlserver_server: str
    sqlserver_database: str
    sqlserver_trusted_connection: bool
    sqlserver_username: str | None
    sqlserver_password: str | None

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


def _env_bool(name: str, default: bool) -> bool:
    val = os.getenv(name)
    if val is None:
        return default
    return val.strip().lower() in {"1", "true", "yes", "y", "on"}


def _env_int(name: str, default: int) -> int:
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

    tables = DbTableMapping(
        schema=os.getenv("DB_SCHEMA", "dbo").strip(),
        categories=os.getenv("TBL_CATEGORIES", "Categories").strip(),
        tutorials=os.getenv("TBL_TUTORIALS", "Tutorials").strip(),
        tutorial_steps=os.getenv("TBL_TUTORIAL_STEPS", "TutorialSteps").strip(),
        media=os.getenv("TBL_MEDIA", "Media").strip(),
    )

    columns = DbColumnMapping(
        category_id=os.getenv("COL_CATEGORY_ID", "CategoryId").strip(),
        category_name=os.getenv("COL_CATEGORY_NAME", "Name").strip(),
        category_parent_id=os.getenv("COL_CATEGORY_PARENT_ID", "ParentCategoryId").strip(),
        category_sort=os.getenv("COL_CATEGORY_SORT", "SortOrder").strip(),
        tutorial_id=os.getenv("COL_TUTORIAL_ID", "TutorialId").strip(),
        tutorial_category_id=os.getenv("COL_TUTORIAL_CATEGORY_ID", "CategoryId").strip(),
        tutorial_title=os.getenv("COL_TUTORIAL_TITLE", "Title").strip(),
        tutorial_description=os.getenv("COL_TUTORIAL_DESCRIPTION", "Description").strip(),
        tutorial_url_original=os.getenv("COL_TUTORIAL_URL_ORIGINAL", "UrlOriginal").strip(),
        tutorial_content=os.getenv("COL_TUTORIAL_CONTENT", "ContentHtml").strip(),
        tutorial_sort=os.getenv("COL_TUTORIAL_SORT", "SortOrder").strip(),
        step_id=os.getenv("COL_STEP_ID", "TutorialStepId").strip(),
        step_tutorial_id=os.getenv("COL_STEP_TUTORIAL_ID", "TutorialId").strip(),
        step_number=os.getenv("COL_STEP_NUMBER", "StepNumber").strip(),
        step_title=os.getenv("COL_STEP_TITLE", "Title").strip(),
        step_content=os.getenv("COL_STEP_CONTENT", "ContentHtml").strip(),
        step_sort=os.getenv("COL_STEP_SORT", "SortOrder").strip(),
        media_id=os.getenv("COL_MEDIA_ID", "MediaId").strip(),
        media_tutorial_id=os.getenv("COL_MEDIA_TUTORIAL_ID", "TutorialId").strip(),
        media_step_id=os.getenv("COL_MEDIA_STEP_ID", "TutorialStepId").strip(),
        media_type=os.getenv("COL_MEDIA_TYPE", "MediaType").strip(),
        media_url=os.getenv("COL_MEDIA_URL", "Url").strip(),
        media_file_path=os.getenv("COL_MEDIA_FILE_PATH", "FilePath").strip(),
        media_file_name=os.getenv("COL_MEDIA_FILE_NAME", "FileName").strip(),
        media_file_size=os.getenv("COL_MEDIA_FILE_SIZE", "FileSize").strip(),
        media_mime_type=os.getenv("COL_MEDIA_MIME_TYPE", "MimeType").strip(),
        media_thumbnail_url=os.getenv("COL_MEDIA_THUMBNAIL_URL", "ThumbnailUrl").strip(),
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
        data_dir=data_dir,
        media_dir=media_dir,
        sqlserver_driver=os.getenv("SQLSERVER_DRIVER", "ODBC Driver 18 for SQL Server").strip(),
        sqlserver_server=os.getenv("SQLSERVER_SERVER", "localhost").strip(),
        sqlserver_database=os.getenv("SQLSERVER_DATABASE", "TutoriaisLukos").strip(),
        sqlserver_trusted_connection=_env_bool("SQLSERVER_TRUSTED_CONNECTION", True),
        sqlserver_username=(os.getenv("SQLSERVER_USERNAME") or "").strip() or None,
        sqlserver_password=(os.getenv("SQLSERVER_PASSWORD") or "").strip() or None,
        tables=tables,
        columns=columns,
    )


