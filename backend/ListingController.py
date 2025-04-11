from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from pydantic import BaseModel
from database import SessionLocal
import models

router = APIRouter()

class ListingBase(BaseModel):
    name: str
    price: float
    description: str
    image: str
    date: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/home", response_model=ListingBase)
async def create_listing(listing: ListingBase, db: db_dependency):
    db_listing = models.Listing(**listing.model_dump())
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)
    return db_listing