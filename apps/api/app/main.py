
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="VYNDIA FOOTBALL INTELLIGENCE API",
    description="Football intelligence, analytics and prediction platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "project": "VYNDIA FOOTBALL INTELLIGENCE",
        "status": "operational",
        "version": "0.1.0",
    }


@app.get("/api/v1/health")
async def health_check():
    return {
        "status": "healthy",
        "backend": "online",
        "environment": "development",
    }
