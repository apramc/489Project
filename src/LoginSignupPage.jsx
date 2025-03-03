import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

function LoginSignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === 'admin1@gmail.com' && password === 'admin123') {
      // Check if the credentials match admin credentials
      navigate('/admin');  // Redirect to admin dashboard
    } else {
      // Here, implement your logic for normal user authentication
      console.log("Login with", email, password);
      alert('Invalid credentials!'); 
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Log In</button>
      </form>
      <div>
        Don't have an account? <Link to="/signup">Sign up now</Link>
      </div>
    </div>
  );
}

export default LoginSignupPage;
