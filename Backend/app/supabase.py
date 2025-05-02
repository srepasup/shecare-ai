from supabase import create_client
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Real connection test: attempt to list from a known table
try:
    response = supabase.table("Orders").select("*").limit(1).execute()
    print("Supabase connection is successful!")
except Exception as e:
    print(f"Error while connecting to Supabase: {e}")
