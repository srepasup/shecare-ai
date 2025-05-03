from pydantic import BaseModel
from typing import Optional
from datetime import date

class DailyLog(BaseModel):
    user_id: str
    date: date
    symptoms: Optional[str]
    sleep_quality: Optional[int]
    cycle_length: Optional[int]
    period_length: Optional[int]
    blood_flow: Optional[str]
    water_intake_ml: Optional[int]
    has_pcod: Optional[bool] = False
    has_pcos: Optional[bool] = False
