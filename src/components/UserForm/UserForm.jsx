
import React, { useState } from "react";
import "./UserForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    job: "",
    gender: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {

      if (![...value].every(ch => ch >= "0" && ch <= "9")) {
        setError("Only numbers are allowed in contact number.");
        return;
      }


      setError("");
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (formData.contact.length !== 10) {
      setError("Contact number must be exactly 10 digits.");
      return;
    }

    setError("");

    const existingData = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([...existingData, formData]));

    alert("User data submitted successfully!");
    setFormData({
      name: "",
      email: "",
      contact: "",
      job: "",
      gender: "",
      password: ""
    });
  };

  return (
    <div className="form-container">
      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <hr />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <hr />
        <input
          type="tel"
          name="contact"
          placeholder="Contact No"
          value={formData.contact}
          onChange={handleChange}
          maxLength="10"
          required
        />
        <hr />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          name="job"
          placeholder="Job"
          value={formData.job}
          onChange={handleChange}
          required
        />
        <hr />

        <div className="gender-container">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <hr />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <hr />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
