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

  // Fetch existing listings from the backend
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:8000/listings");
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

    fetchListings();
  }, []);

  const handleListingCreated = (newListing) => {
    setListings([...listings, newListing]);
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
                  to="/"
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
                onClick={() => alert("Button clicked!")}
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
        <div className="listings"></div>
      </div>
    </>
  );
}

export default Homepage;
