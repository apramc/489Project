import React, { useEffect } from 'react';

import './Homepage.css'

function Homepage() {
  useEffect(() => {
    document.title = 'Homepage'
  })

  return (
    <div className="homepage-header">
      <div className="top-header">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Profile</a></li>
          </ul>
        </nav>
      </div>
      <div className="bottom-header">
        <h1>College Essentials Marketplace</h1>
      </div>
    </div>
  )
}

export default Homepage
