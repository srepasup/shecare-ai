from fastapi import APIRouter, HTTPException
from app.schemas import DailyLog
from app.supabase import supabase

router = APIRouter()

@router.post("/log-entry")
def create_log(log: DailyLog):
    try:
        # Convert Pydantic model to dict
        log_data = log.dict()

        # Ensure date is in ISO string format (important for JSON serialization)
        log_data["date"] = log_data["date"].isoformat()

        user_check = supabase.table("users").select("id").eq("id", log.user_id).execute()

        if not user_check.data:
            raise HTTPException(status_code=404, detail="User ID not found.")

        # Insert into Supabase
        response = supabase.table("daily_logs").insert(log_data).execute()

        # Check if data was inserted successfully
        if not response.data:
            # If no data returned, extract the full response and show error if any
            full_response = response.model_dump()
            raise HTTPException(
                status_code=400,
                detail=full_response.get("error", "Unknown Supabase error")
            )

        return {
            "message": "Log entry saved successfully",
            "data": response.data
        }

    except Exception as e:
        # Print the error on the server log (optional but useful for dev)
        print("Error while creating log entry:", e)
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
