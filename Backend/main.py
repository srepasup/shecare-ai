from fastapi import FastAPI
from app.routes import router

app = FastAPI()
app.include_router(router)

@app.get("/")
def root():
    return {"message": "PCOS Tracker API is running"}
