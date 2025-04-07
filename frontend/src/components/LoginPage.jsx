import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "75%",
        backgroundColor: "#f8f9fa",
        marginTop: "80px",
        marginBottom: "80px",
      }}
    >
      <section className="text-center text-lg-start">
        <style>
          {`
            .rounded-t-5 {
              border-top-left-radius: 0.5rem;
              border-top-right-radius: 0.5rem;
            }

            @media (min-width: 992px) {
              .rounded-tr-lg-0 {
                border-top-right-radius: 0;
              }

              .rounded-bl-lg-5 {
                border-bottom-left-radius: 0.5rem;
              }
            }
          `}
        </style>
        <div className="card mb-3">
          <div className="row g-0 d-flex align-items-center">
            <div className="col-lg-4 d-none d-lg-flex">
              <img
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                alt="Trendy Pants and Shoes"
                className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
              />
            </div>
            <div className="col-lg-8">
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
                  <style>
                    {`
                              .btn-primary {
                              background-color: #ca1237 !important;
                              border-color: #ca1237 !important;
                              }
                              .form-check-input:checked {
                              background-color: #ca1237 !important;
                              border-color: #ca1237 !important;
                              }
                            `}
                  </style>
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
                  {/* 2 column grid layout for inline styling */}
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

                    <div
                      className="text-center mb-4"
                      style={{ marginTop: "20px", marginBottom: "0px" }}
                    >
                      <p>
                        Don't have an account? <a href="/signup">Sign up</a>
                      </p>
                    </div>
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
