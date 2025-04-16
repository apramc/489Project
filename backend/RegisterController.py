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

class RegisterRequest(BaseModel):
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

def hash_password(password: str) -> str:
    return password_context.hash(password)

@router.post("/register")
async def register(user: RegisterRequest, db: db_dependency):
    # Check if user email already exists
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash the password
    hashed_password = hash_password(user.password)

    # Create a new user instance
    new_user = models.User(
        username=user.username,
        email=user.email,
        password=hashed_password,
    )
    
    # Add the new user to the database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully!"}