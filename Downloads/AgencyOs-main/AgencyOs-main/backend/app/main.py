from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.api import tasks
# Create the database tables based on the defined models
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = "Task Board API",
    description = "B2B Task Board App",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Include the tasks router to handle task-related endpoints
app.include_router(tasks.router)