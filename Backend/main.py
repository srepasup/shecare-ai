from fastapi import FastAPI
from app.routes import router

app = FastAPI(
    title="SheCare AI Backend",
    description="Backend API for Menstrual Health Tracking App",
    version="1.0.0"
)

# Register routes
app.include_router(router)

@app.get("/")
def root():
    return {"message": "SheCare AI backend is running!"}
