import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    contact: "",
    job: "",
    gender: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(users[index]);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUsers = [...users];
    updatedUsers[editIndex] = editData;
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditIndex(null);
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="dashboard-container">
      <h2>Registered Users</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search"
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Job</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                {editIndex === index ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="contact"
                        value={editData.contact}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="job"
                        value={editData.job}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <select
                        name="gender"
                        value={editData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </td>
                    <td colSpan="2">
                      <button onClick={handleSave}>Save</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.contact}</td>
                    <td>{user.job}</td>
                    <td>{user.gender}</td>
                    <td>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
