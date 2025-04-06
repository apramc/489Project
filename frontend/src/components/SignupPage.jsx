import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    dob: '' // Date of Birth
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the submission to your backend
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default SignupPage;
