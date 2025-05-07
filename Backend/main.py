from fastapi import FastAPI
from app.routes import router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="SheCare AI Backend",
    description="Backend API for Menstrual Health Tracking App",
    version="1.0.0"
)

# Allow requests from your React frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or ["*"] for all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(router)

@app.get("/")
def root():
    return {"message": "SheCare AI backend is running!"}
