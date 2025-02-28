import React, { useEffect } from 'react';
import { RiNotification2Fill, RiMessage2Fill, RiSearchLine  } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";

import './Homepage.css'

function Homepage() {
  useEffect(() => {
    document.title = 'Homepage'
  })

  return (
    <>
      <div className="homepage-header">
        <a href="/">
          <img src="src/assets/wsu-logo.png" alt="WSU Logo" />
        </a>
        <div className="header-title">
          <h2>College Essentials Marketplace</h2>
        </div>
        <div className="search-bar">
          <a href=""><RiSearchLine size={25} color='black' className="search-icon" /></a>
          <input type="text" placeholder="" className="search-input" />
        </div>
        <div className="menu-nav">
          <nav>
            <ul>
              <li><a href="/"><AiFillHome size={30}/></a></li>
              <li><a href="/"><RiMessage2Fill size={30}/></a></li>
              <li><a href="/"><RiNotification2Fill size={30}/></a></li>
              <li><a href="/"><IoMdPerson size={30}/></a></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="homepage-content">
        <div className="sidebar">
          <h3>Filters</h3>
          <ul>
            <li>
              <label htmlFor="course">Course</label>
              <select id="course" name="course">
                <option value="course1">Course 1</option>
                <option value="course2">Course 2</option>
                <option value="course3">Course 3</option>
              </select>
            </li>
            <li>
              <label htmlFor="price">Price</label>
              <input type="number" id="min-price" name="min-price" placeholder="Min" />
              <input type="number" id="max-price" name="max-price" placeholder="Max" />
            </li>
            <li>
              <label>
                <input type="checkbox" name="new" />
                New
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="used" />
                Used
              </label>
            </li>
          </ul>
        </div>
        <div className="listings">

        </div>
      </div>
    </>
  );
}

export default Homepage