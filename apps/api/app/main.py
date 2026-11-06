
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.endpoints import router as v1_router
from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup lifecycle
    yield
    # Shutdown lifecycle


app = FastAPI(
    title=settings.app_name,
    description="Football intelligence, analytics and prediction platform",
    version=settings.app_version,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include v1 API router
app.include_router(v1_router, prefix=settings.api_v1_prefix)


@app.get("/")
async def root():
    return {
        "project": settings.app_name,
        "status": "operational",
        "version": settings.app_version,
        "docs_url": "/docs",
        "api_v1": settings.api_v1_prefix,
    }

