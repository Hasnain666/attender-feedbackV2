import React, { useState } from "react";
import "./signup.css";
import { auth } from "./firebase_config"; // Import auth from firebase_config.js
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    id: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      await auth.createUserWithEmailAndPassword(email, password); // Use auth from firebase_config.js
      await auth.currentUser.updateProfile({
        displayName: formData.name + " " + formData.surname,
      });
      console.log("User signed up successfully!");
      navigate("/Home");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="image-container">
        <img
          src="https://cdn.glitch.global/07931069-62a9-4bd9-a047-47fd7905975d/scott-graham-5fNmWej4tAA-unsplash.jpg?v=1708541537104"
          alt="signup"
        />
        <div className="white-box">
          <p className="text_1">SIGN UP</p>
          <form onSubmit={handleSubmit} name="form">
            <div className="form-container">
              <input
                type="text"
                placeholder="Name"
                className="text_2"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-container">
              <input
                type="text"
                placeholder="Family name"
                className="text_2"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-container">
              <input
                type="text"
                placeholder="ID"
                className="text_2"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-container">
              <input
                type="email"
                placeholder="Email"
                className="text_2"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-container">
              <input
                type="password"
                placeholder="Password"
                className="text_2"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-container">
              <input type="submit" value="Sign Up" className="button" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
