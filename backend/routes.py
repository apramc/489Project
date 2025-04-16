from fastapi import APIRouter
from RegisterController import router as register_router
from LoginController import router as login_router
from ListingController import router as listing_router
from AdminController import router as admin_router

router = APIRouter()

# Routes to controllers
router.include_router(register_router, tags=["Register"])
router.include_router(login_router, tags=["Login"])
router.include_router(listing_router, prefix="/home", tags=["Listings"])
router.include_router(admin_router, prefix="/admin", tags=["Admin"])
