from fastapi import APIRouter, HTTPException
from app.schemas import DailyLog
from app.supabase import supabase

router = APIRouter()

@router.post("/log-entry")
def create_log(log: DailyLog):
    try:
        log_data = log.dict()
        log_data["date"] = log_data["date"].isoformat()

        response = supabase.table("daily_logs").insert(log_data).execute()

        if not response.data:
            full_response = response.model_dump()
            raise HTTPException(status_code=400, detail=full_response.get("error", "Unknown Supabase error"))

        return {"message": "Log entry saved successfully", "data": response.data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/logs")
def get_logs(user_id: str):
    try:
        # Fetch logs for the specific user
        response = supabase.table("daily_logs").select("*").eq("user_id", user_id).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="No logs found for this user")

        return {"logs": response.data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
