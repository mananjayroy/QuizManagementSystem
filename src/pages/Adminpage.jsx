/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import "../styles/pages/Adminpage.css";

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [showLogoutDelete, setShowLogoutDelete] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const loggedInEmail = localStorage.getItem("loggedInUserEmail");
  const navigate = useNavigate();
  //for edit model
  const [showEditModel, setShowEditModel] = useState(false);
  const [editUserData, setEditUserData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  const handelEditClick = (userData) => {
    setEditUserData(userData);
    setShowEditModel(true);
  };

  const handelEditChange = (e) => {
    const { name, value } = e.target;
    setEditUserData({ ...editUserData, [name]: value });
  };

  const handelEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:8087/api/users/${editUserData.id}`,
        editUserData
      );
      //again fetch updated list again
      const res = await axios.put(
        `http://localhost:8087/api/users/${editUserData.id}`,
        editUserData
      );
      console.log(res.data);
      window.location.reload();
      // setAllUsers(res.data);
      setShowEditModel(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user with email:", loggedInEmail);
        const res = await axios.get(
          `http://localhost:8087/api/users/email/${loggedInEmail}`
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8087/api/users");
        console.log("Fetched all users:", res.data);
        setAllUsers(res.data);
      } catch (err) {
        console.log("Failed to fetch all users", err);
      }
    };

    if (loggedInEmail) {
      console.log("Calling fetchUser for:", loggedInEmail);
      fetchUser();
      fetchAllUsers();
    } else {
      console.log("No logged-in email found in localStorage");
    }
  }, [loggedInEmail]);

  const confirmDelete = () => {
    setShowLogoutDelete(false);
    if (userIdToDelete !== null) {
      handleDeleteUser(userIdToDelete);
      setUserIdToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowLogoutDelete(false);
    setUserIdToDelete(null);
  };

  const handleDeleteUser = async (userId) => {
    try {
      console.log(`Deleting user with ID ${userId}...`);
      await axios.delete(`http://localhost:8087/api/users/${userId}`);
      console.log(`User with ID ${userId} deleted successfully.`);
      setAllUsers(allUsers.filter((u) => u.id !== userId));
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      alert(`Failed to delete user with ID ${userId}. Please try again.`);
    }
  };
  // const isDeletable = false;
  // const customStyle = isDeletable
  // ? { marginLeft: "100px", padding: "5px" }
  // : { marginLeft: "0px", padding: "0px" };

  if (!user) {
    return (
      <>
        <NavbarAdmin />
        <div className="loader-container">
          <div className="bouncing-dots">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavbarAdmin />
      <div className="container-fluid dashboard">
        <div className="row">
          <div className="col">
            <div className="dashboard-content bg-white p-4 rounded shadow-sm mb-4">
              <h2 className="mb-3">Welcome Admin</h2>
              <div className="user-card">
                <h3>Logged-In User Details:</h3>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="all-users-section">
              <h3 className="mb-3">All Registered Users:</h3>
              <div className="table-responsive">
                <table className="table table-striped table-bordered user-table">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                      <th>Create Quiz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handelEditClick(u)}
                          >
                            Edit
                          </button>
                          {"  "}
                          {user && user.id !== u.id && (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                setUserIdToDelete(u.id);
                                setShowLogoutDelete(true);
                              }}
                            >
                              Delete
                            </button>
                          )}

                          {user && user.id === u.id && (
                            <button
                              style={{
                                color: "#ff0000",
                                fontStyle: "italic",
                                marginLeft: "0px",
                              }}
                            >
                              You can't delete yourself
                            </button>
                          )}
                        </td>
                        <td>
                          {user && u.role === "admin" && (
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => {
                                navigate("/create-quiz");
                              }}
                              style={{ marginLeft: "0px", padding: "8px" }}
                            >
                              Click to Create Quiz
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {showLogoutDelete && (
          <div className="logout-confirmation">
            <div>
              <p>Are you sure you want to Delete?</p>
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          </div>
        )}
      </div>
      {showEditModel && (
        <div className="edit-user-model">
          <div className="edit-user-model-content">
            <h4>EditUser</h4>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editUserData.name}
              onChange={handelEditChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={editUserData.email}
              onChange={handelEditChange}
            />
            <label>Role:</label>
            <select
              name="role"
              value={editUserData.role}
              onChange={handelEditChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <div className="modal-actions">
              <button onClick={handelEditSave}>Save</button>
              <button onClick={() => setShowEditModel(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AdminPage;
