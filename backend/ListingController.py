from fastapi import APIRouter, Form, UploadFile, File, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from pydantic import BaseModel
from database import SessionLocal
import models
import os
import shutil

router = APIRouter()

UPLOAD_DIR = "uploads"  # Directory to save uploaded files

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

# Fetch all listings
@router.get("/")
async def get_listings(db: db_dependency):
    listings = db.query(models.Listing).all()
    return listings

# Create a new listing
@router.post("/")
async def create_listing(
    db: db_dependency,  # Correct usage of Annotated
    name: str = Form(...),
    price: float = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...),
    date: str = Form(...),
):
    # Ensure the upload directory exists
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # Save the uploaded file
    file_path = os.path.join(UPLOAD_DIR, image.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Save the listing to the database
    new_listing = models.Listing(
        name=name,
        price=price,
        description=description,
        image=f"uploads/{image.filename}",  # Use URL for the image
        date=date,
    )
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)

    return {"message": "Listing created successfully!", "listing": new_listing}