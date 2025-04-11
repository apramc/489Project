from fastapi import APIRouter
from UserController import router as user_router
from ListingController import router as listing_router

router = APIRouter()

# Routes to controllers
router.include_router(user_router, prefix="/users", tags=["Users"])
router.include_router(listing_router, prefix="/home", tags=["Listings"])
