"""
Central settings, loaded from environment variables (.env). See
.env.example for the full list and defaults.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "sqlite:///./aarogyanet.db"

    jwt_secret_key: str = "dev-only-change-me-before-any-real-deployment"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 1440

    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"

    seed_demo_data: bool = True

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
