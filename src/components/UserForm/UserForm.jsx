import React, { useState } from "react";
import "./UserForm.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    job: "",
    gender: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="contact" placeholder="Contact No" value={formData.contact} onChange={handleChange} required />
        <input type="text" name="job" placeholder="Job" value={formData.job} onChange={handleChange} required />

        {/* <div className="gender-container">
          <label>
            <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female
          </label>
        </div> */}

        <div className="gender-container">
          <label htmlFor="gender">Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>


        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
