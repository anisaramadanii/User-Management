import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const UserForm = ({ onAddUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser = {
      id: Date.now(),
      name,
      email,
      company: { name: "N/A" }
    };

    onAddUser(newUser);
    setName("");
    setEmail("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: "flex", gap: 2 }}>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Button type="submit" variant="contained">Add User</Button>
    </Box>
  );
};

export default UserForm;