import os
from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from json import load, dump, JSONDecodeError
from datetime import datetime, timezone


description = """
Get-Aboard API. 🚀
"""

app = FastAPI(
    title="Get-Aboard-App",
    description=description,
    summary="The API for Get-Aboard app.",
    version="0.0.1",
    contact={
        "name": "Saul",
        "url": "https://twitter.com/node_srojas1",
        "email": "luckly083@gmail.com",
    },
    servers=[
        {
            "url": os.getenv("BASE_PATH_API", "http://127.0.0.1:8000"),
            "description": "The Base path for the API"
        }
    ]
)

origins = [
    "http://localhost:3000",
    "https://get-aboard.vercel.app",
    "https://get-aboard-production.up.railway.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_model=dict)
async def home():
    return {"message": "hello"}


emails_db_name = "emails.json"


@app.get("/get-emails", tags=["marketing"], response_model=dict, status_code=status.HTTP_200_OK)
async def get_emails():
    with open(emails_db_name, 'r') as file:
        try:
            emails_db: dict = load(file)
        except JSONDecodeError as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="error while loading db"
            )
    return emails_db


@app.post("/register-email", tags=["marketing"], response_model=dict, status_code=status.HTTP_200_OK)
async def register_email(email: str):
    with open(emails_db_name, 'r') as file:
        try:
            emails_db: dict = load(file)
        except JSONDecodeError:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="error while loading db"
            )

    record = emails_db.get(email, None)
    if record is None:
        emails_db[email] = {
            "email": email,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc),
            "registered_counter": 1
        }
    else:
        emails_db[email]["updated_at"] = datetime.now(timezone.utc)
        emails_db[email]["registered_counter"] += 1

    with open(emails_db_name, 'w') as file:
        dump(emails_db, file, default=str)

    return {"message": "email registered"}
