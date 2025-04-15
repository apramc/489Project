# AdminController.py

from fastapi import APIRouter, HTTPException
import sqlite3

router = APIRouter()

def get_db_connection():
    conn = sqlite3.connect("database.db")  # Update path if needed
    conn.row_factory = sqlite3.Row
    return conn

@router.get("/listings")
def get_all_listings():
    """
    Returns all listings so an admin can view them in the dashboard.
    """
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM listings").fetchall()
    conn.close()

    listings = [dict(row) for row in rows]
    return listings

@router.delete("/listings/{listing_id}")
def delete_listing(listing_id: int):
    """
    Deletes the specified listing by ID.
    """
    conn = get_db_connection()
    # Ensure the listing exists
    row = conn.execute("SELECT id FROM listings WHERE id = ?", (listing_id,)).fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Listing not found")

    conn.execute("DELETE FROM listings WHERE id = ?", (listing_id,))
    conn.commit()
    conn.close()
    return {"message": "Listing deleted"}

@router.post("/listings/{listing_id}/approve")
def approve_listing(listing_id: int):
    """
    Approves (or "thumbs up") a listing by setting an 'approved' column to 1.
    Make sure you've run:
      ALTER TABLE listings ADD COLUMN approved INTEGER DEFAULT 0;
    if you don't already have that column.
    """
    conn = get_db_connection()
    row = conn.execute("SELECT id FROM listings WHERE id = ?", (listing_id,)).fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Listing not found")

    conn.execute("UPDATE listings SET approved = 1 WHERE id = ?", (listing_id,))
    conn.commit()
    conn.close()
    return {"message": "Listing approved"}

@router.get("/analytics")
def get_analytics():
    """
    Returns basic stats: number of users and total listings.
    Requires a 'users' table to exist for counting rows.
    """
    conn = get_db_connection()

    # Count how many users
    user_count_row = conn.execute("SELECT COUNT(*) AS count FROM users").fetchone()
    user_count = user_count_row["count"] if user_count_row else 0

    # Count how many listings
    listing_count_row = conn.execute("SELECT COUNT(*) AS count FROM listings").fetchone()
    listing_count = listing_count_row["count"] if listing_count_row else 0

    conn.close()
    return {
        "userCount": user_count,
        "listingCount": listing_count
    }
