import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/wsu-logo-no-bg.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === "admin1@gmail.com" && password === "admin123") {
      navigate("/admin");
    } else {
      console.log("Login with", email, password);
      alert("Invalid credentials!");
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="px-4 py-5 px-md-5 text-center text-lg-center"
        style={{
          backgroundColor: "#f8f9fa",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <div className="container">
          <div className="row gx-lg-5 justify-content-center align-items-center">
            <div
              className="col-lg-6 mb-5 mb-lg-0"
              style={{
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={logo}
                alt="wsu logo"
                className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                style={{
                  height: "600px",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card mx-auto">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleLogin}>
                    {/* Email input */}
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form2Example1"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form2Example1">
                        Email address
                      </label>
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form2Example2"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form2Example2">
                        Password
                      </label>
                    </div>
                    {/* Remember me and Forgot password */}
                    <div className="row mb-4">
                      <div className="col d-flex justify-content-center">
                        <div className="form-check d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="form2Example31"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example31"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col text-center">
                        <a href="#!">Forgot password?</a>
                      </div>
                    </div>
                    {/* Sign in button */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      style={{
                        backgroundColor: "#ca1237",
                        borderColor: "#ca1237",
                      }}
                    >
                      Sign in
                    </button>
                    {/* Sign up link */}
                    <div className="text-center mb-4">
                      <p>
                        Don't have an account? <a href="/signup">Sign up</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
