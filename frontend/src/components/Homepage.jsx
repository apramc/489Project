import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  RiNotification2Fill,
  RiMessage2Fill,
  RiSearchLine,
} from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";

import CreateListing from "./CreateListing";

import logo from "../assets/wsu-logo.png";
import "../../public/styles/Homepage.css";

function Homepage() {
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(false); // For creating a listing
  const [showViewModal, setShowViewModal] = useState(false); // For viewing a listing
  const [selectedListing, setSelectedListing] = useState(null); // Selected listing for the view modal
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    tags: "",
    image: null,
    date: new Date().toISOString().split("T")[0], // Default to today's date
  });

  // Fetch existing listings from the backend
  const fetchListings = async () => {
    try {
      const response = await fetch("http://localhost:8000/home");
      if (response.ok) {
        const data = await response.json();
        setListings(data);
      } else {
        console.error("Failed to fetch listings");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleListingCreated = (newListing) => {
    setListings([...listings, newListing]);
    fetchListings();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image); // Append the file
    formDataToSend.append("date", formData.date);

    try {
      const response = await fetch("http://localhost:8000/home", {
        method: "POST",
        body: formDataToSend, // Send as FormData
      });

      if (response.ok) {
        const newListing = await response.json();
        handleListingCreated(newListing); // Update the listings
        setShowModal(false); // Close the modal
        setFormData({
          name: "",
          price: "",
          description: "",
          image: null,
          date: new Date().toISOString().split("T")[0], // Reset the date
        }); // Reset the form
      } else {
        console.error("Failed to create listing");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle card click to view listing
  const handleCardClick = (listing) => {
    setSelectedListing(listing);
    setShowViewModal(true);
  };

  return (
    <>
      <div className="homepage-header">
        <a href="/home" style={{ color: "inherit", textDecoration: "none" }}>
          <img src={logo} alt="WSU Logo" />
        </a>
        <div className="header-title">
          <h2>College Essentials Marketplace</h2>
        </div>
        <div className="search-bar">
          <a href="" style={{ color: "inherit", textDecoration: "none" }}>
            <RiSearchLine size={25} color="black" className="search-icon" />
          </a>
          <input
            type="text"
            placeholder="Search for items..."
            className="search-input"
          />
        </div>
        <div className="menu-nav">
          <nav>
            <ul>
              <li>
                <Link
                  to="/home"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <AiFillHome size={30} />
                </Link>
              </li>
              <li>
                <Link
                  to="/messages"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <RiMessage2Fill size={30} />
                </Link>
              </li>
              <li>
                <Link
                  to="/notifications"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <RiNotification2Fill size={30} />
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <IoMdPerson size={30} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="homepage-content">
        <div className="sidebar">
          <h3>Filters</h3>
          <div className="card">
            <article
              className="card-group-item"
              style={{
                marginBottom: "20px",
                marginTop: "70px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                className="btn btn-primary"
                style={{
                  width: "80%",
                  marginTop: "10px",
                  backgroundColor: "#ca1237",
                }}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Create a listing
              </button>
            </article>
            <article
              className="card-group-item"
              style={{ marginBottom: "20px" }}
            >
              <header className="card-header">
                <h6 className="title">Price</h6>
              </header>
              <div className="filter-content">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="minPrice">Min</label>
                      <input
                        type="number"
                        className="form-control"
                        id="minPrice"
                        placeholder="$0"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="maxPrice">Max</label>
                      <input
                        type="number"
                        className="form-control"
                        id="maxPrice"
                        placeholder="$1,000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article className="card-group-item">
              <header className="card-header">
                <h6 className="title">Categories </h6>
              </header>
              <div className="filter-content">
                <div className="list-group list-group-flush">
                  <a
                    href="#"
                    className="list-group-item"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Apparel{" "}
                  </a>
                  <a
                    href="#"
                    className="list-group-item"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Electronics{" "}
                  </a>
                  <a
                    href="#"
                    className="list-group-item"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Home Goods{" "}
                  </a>
                  <a
                    href="#"
                    className="list-group-item"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Sporting Goods{" "}
                  </a>
                </div>
              </div>
            </article>
            <article className="card-group-item" style={{ marginTop: "20px" }}>
              <header className="card-header">
                <h6 className="title">Courses</h6>
              </header>
              <div className="filter-content">
                <div className="card-body">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check101"
                    />
                    <label className="custom-control-label" htmlFor="Check101">
                      CPTS 101
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check111"
                    />
                    <label className="custom-control-label" htmlFor="Check111">
                      CPTS 111
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check121"
                    />
                    <label className="custom-control-label" htmlFor="Check121">
                      CPTS 121
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check122"
                    />
                    <label className="custom-control-label" htmlFor="Check122">
                      CPTS 122
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check131"
                    />
                    <label className="custom-control-label" htmlFor="Check131">
                      CPTS 131
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check132"
                    />
                    <label className="custom-control-label" htmlFor="Check132">
                      CPTS 132
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check215"
                    />
                    <label className="custom-control-label" htmlFor="Check215">
                      CPTS 215
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check223"
                    />
                    <label className="custom-control-label" htmlFor="Check223">
                      CPTS 223
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check224"
                    />
                    <label className="custom-control-label" htmlFor="Check224">
                      CPTS 224
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check233"
                    />
                    <label className="custom-control-label" htmlFor="Check233">
                      CPTS 233
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check260"
                    />
                    <label className="custom-control-label" htmlFor="Check260">
                      CPTS 260
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check302"
                    />
                    <label className="custom-control-label" htmlFor="Check302">
                      CPTS 302
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check315"
                    />
                    <label className="custom-control-label" htmlFor="Check315">
                      CPTS 315
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check317"
                    />
                    <label className="custom-control-label" htmlFor="Check317">
                      CPTS 317
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check321"
                    />
                    <label className="custom-control-label" htmlFor="Check321">
                      CPTS 321
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check322"
                    />
                    <label className="custom-control-label" htmlFor="Check322">
                      CPTS 322
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check323"
                    />
                    <label className="custom-control-label" htmlFor="Check323">
                      CPTS 323
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check327"
                    />
                    <label className="custom-control-label" htmlFor="Check327">
                      CPTS 327
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check350"
                    />
                    <label className="custom-control-label" htmlFor="Check350">
                      CPTS 350
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check355"
                    />
                    <label className="custom-control-label" htmlFor="Check355">
                      CPTS 355
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check360"
                    />
                    <label className="custom-control-label" htmlFor="Check360">
                      CPTS 360
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check370"
                    />
                    <label className="custom-control-label" htmlFor="Check370">
                      CPTS 370
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check401"
                    />
                    <label className="custom-control-label" htmlFor="Check401">
                      CPTS 401
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Check411"
                    />
                    <label className="custom-control-label" htmlFor="Check411">
                      CPTS 411
                    </label>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div className="create-listing"></div>

        {/* Create Listing Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Create a Listing</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="file"
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  required
                />
                <input type="date" name="date" value={formData.date} readOnly />
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* View Listing Modal */}
        {showViewModal && selectedListing && (
          <div
            className="modal-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              className="modal-content"
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                width: "700px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2>{selectedListing.name}</h2>
              <p>{selectedListing.description}</p>
              <p>Price: ${selectedListing.price}</p>
              <img
                src={`http://localhost:8000/uploads/${selectedListing.image}`}
                alt={selectedListing.name}
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between", // Space between the buttons
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => setShowViewModal(false)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#ca1237",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
                <button
                  onClick={() => setShowViewModal(false)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#ca1237",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Listings */}
        <div
          className="listings"
          style={{
            marginTop: "100px",
            marginLeft: "35px",
          }}
        >
          <div className="row">
            {listings.map((listing, index) => (
              <div
                className="col-md-6 col-lg-4"
                key={index}
                style={{
                  width: "300px", // Card width
                  padding: "10px", // Card padding
                  margin: "20px", // Gap between cards
                }}
                onClick={() => handleCardClick(listing)} // Make card clickable
              >
                <div
                  className="card listing-card hover-img overflow-hidden rounded-2"
                  style={{
                    width: "300px", // Card width
                    height: "300px", // Card height
                    border: "1px solid #ccc", // Card border
                    borderRadius: "25px", // Card border radius
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Card box shadow
                    overflow: "hidden", // Ensure content doesn't overflow
                    display: "flex", // Center the card
                    flexDirection: "column", // Ensure vertical alignment
                  }}
                >
                  <div className="card-body p-0">
                    <img
                      src={`http://localhost:8000/uploads/${listing.image}`} // Use the image path from the backend
                      alt={listing.name}
                      className="img-fluid w-100 object-fit-cover"
                      style={{
                        height: "220px", // Adjust the height of the image
                        width: "100%", // Ensure the image takes full width
                        objectFit: "cover", // Ensure the image covers the area
                      }}
                    />
                    <div
                      className="p-4 d-flex align-items-center justify-content-between"
                      style={{
                        height: "50px", // Adjust the height of the text container
                        display: "flex",
                        flexDirection: "row", // Align name and price side by side
                        justifyContent: "space-between", // Space between name and price
                        alignItems: "center", // Vertically align items
                        marginTop: "15px", // Add some margin to the top
                      }}
                    >
                      <h6
                        className="fw-semibold mb-0 fs-4"
                        style={{
                          fontSize: "18px", // Adjust font size for the title
                          fontWeight: "600", // Make the title bold
                          margin: "0", // Remove margin for proper alignment
                        }}
                      >
                        {listing.name}
                      </h6>
                      <span
                        className="text-dark fs-2"
                        style={{
                          fontSize: "12px", // Adjust font size for the price
                          color: "#333", // Set a dark color for the price
                          marginLeft: "10px", // Add spacing between name and price
                        }}
                      >
                        ${listing.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
