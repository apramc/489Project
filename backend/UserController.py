from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from pydantic import BaseModel
from database import SessionLocal
import models

router = APIRouter()

class UserBase(BaseModel):
    username: str
    email: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/signup")
async def signup(user: UserBase, db: db_dependency):
    return {"message": "User signed up successfully!", "user": user}

@router.post("/login")
async def login(user: UserBase, db: db_dependency):
    return {"message": "User logged in successfully!", "user": user}