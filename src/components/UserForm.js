import React from "react";

function UserForm({ formData, handleChange, handleSubmit, isEditing }) {
  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        name="username"
        placeholder="Enter username"
        value={formData.username}
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />
      <button type="submit">{isEditing ? "Update User" : "Add User"}</button>
    </form>
  );
}

export default UserForm;
