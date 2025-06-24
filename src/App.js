import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", username: "" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState("");

  // Fetch users
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // Add or Update user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.username) {
      setError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Enter a valid email.");
      return;
    }

    setError("");

    if (editingUserId) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${editingUserId}`, formData)
        .then((res) => {
          setUsers(users.map(u => u.id === editingUserId ? res.data : u));
          setEditingUserId(null);
          setFormData({ name: "", email: "", username: "" });
        })
        .catch(() => setError("Failed to update user."));
    } else {
      axios.post("https://jsonplaceholder.typicode.com/users", formData)
        .then((res) => {
          setUsers([...users, { ...res.data, id: Date.now() }]); // Mock id
          setFormData({ name: "", email: "", username: "" });
        })
        .catch(() => setError("Failed to add user."));
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({ name: user.name, email: user.email, username: user.username });
  };

  // Delete user
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => {
          setUsers(users.filter(u => u.id !== id));
        })
        .catch(() => setError("Failed to delete user."));
    }
  };

  return (
    <div className="container">
  <h2>User Management App</h2>

  {error && <p className="error">{error}</p>}

  <UserForm
    formData={formData}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    isEditing={editingUserId !== null}
  />

  {loading ? (
    <p>Loading users...</p>
  ) : (
    <div className="user-list">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )}
</div>

  );
}

export default App;
