import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserTable = ({ users, onDelete, onUpdate }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.company?.name || "N/A"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  sx={{ mr: 1 }}
                  onClick={() =>
                    navigate(`/users/${user.id}`, { state: { allUsers: users } })
                  }
                >
                  Details
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mr: 1 }}
                  onClick={() => onUpdate(user)}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(user)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;