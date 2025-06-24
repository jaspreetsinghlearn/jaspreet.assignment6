import React from "react";

function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <h4>{user.name}</h4>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <button onClick={() => onEdit(user)} style={{ marginRight: "10px" }}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
}

export default UserCard;
