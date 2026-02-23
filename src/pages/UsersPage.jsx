import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchUsers } from "../services/api";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import SearchBar from "../components/SearchBar";
import image from "../images/background.jpg";
import {
  Container,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const UsersPage = () => {
  const location = useLocation();
  const [users, setUsers] = useState(location.state?.allUsers || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    if (users.length === 0) {
      const getUsers = async () => {
        const data = await fetchUsers();
        setUsers(data);
      };
      getUsers();
    }
  }, [users.length]);

  const sortUsers = (list) =>
    [...list].sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  const handleAddUser = (user) => {
    const newList = [...users, user];
    setUsers(sortUsers(newList));
  };

  const handleOpenDeleteDialog = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleUpdateUser = (updatedUser) => {
    const newName = prompt("Enter new name:", updatedUser.name);
    const newEmail = prompt("Enter new email:", updatedUser.email);

    if (newName && newEmail) {
      const newList = users.map((u) =>
        u.id === updatedUser.id ? { ...u, name: newName, email: newEmail } : u
      );
      setUsers(sortUsers(newList));
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = sortUsers(filteredUsers);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        pt: 5,
        pb: 5,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3 }}>
          User Management
        </Typography>

        <UserForm onAddUser={handleAddUser} />
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

        <Box sx={{ mb: 2 }}>
          <Button variant="outlined" onClick={() => setSortAsc(!sortAsc)}>
            Sort {sortAsc ? "A → Z" : "Z → A"}
          </Button>
        </Box>

        <UserTable
          users={sortedUsers}
          onDelete={handleOpenDeleteDialog}
          onUpdate={handleUpdateUser}
        />

        <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete user "{userToDelete?.name}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button color="error" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default UsersPage;