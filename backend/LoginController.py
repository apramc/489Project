from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from pydantic import BaseModel
from passlib.context import CryptContext
from database import SessionLocal
import models

router = APIRouter()

# Password hashing
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class LoginRequest(BaseModel):
    email: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_context.verify(plain_password, hashed_password)

@router.post("/login")
async def login(user: LoginRequest, db: db_dependency):
    # Check if user exists
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Verify the password
    if not verify_password(user.password, existing_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {"message": "User logged in successfully!", "user": {"username": existing_user.username, "email": existing_user.email}}