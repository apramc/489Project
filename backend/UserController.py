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