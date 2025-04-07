from fastapi import APIRouter
from pydantic import BaseModel
import database

router = APIRouter()

class User(BaseModel):
    username: str
    password: str
    email: str

@router.post("/home")
async def home():
    return {"message": "Welcome to the FastAPI backend!"}

@router.post("/signup")
async def signup(user: User):
    return {"message": "User signed up successfully!", "user": user}

@router.post("/login")
async def login(user: User):
    return {"message": "User logged in successfully!", "user": user}

@router.post("/admin")
async def login():
    return {"message": "Admin dashboard loaded successfully!!"}