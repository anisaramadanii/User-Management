import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import image from "../images/background.jpg";

const UserDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const allUsers = location.state?.allUsers || [];

 
    const localUser = allUsers.find((u) => u.id.toString() === id);
    if (localUser) {
      setUser(localUser);
    } else {
    
      const fetchUser = async () => {
        try {
          const res = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );
          setUser(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUser();
    }
  }, [id, location.state]);

  if (!user) return <Container>Loading...</Container>;

  const allUsers = location.state?.allUsers || [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 20,
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container sx={{ maxWidth: "sm" }}>
        <Paper sx={{ p: 3, backgroundColor: "rgba(255,255,255,0.85)" }}>
          <Button
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={() => navigate("/", { state: { allUsers } })}
          >
            ← Back
          </Button>

          <Typography variant="h5" sx={{ mb: 2 }}>
            {user.name}
          </Typography>
          <Box>
            <Typography>Email: {user.email}</Typography>
            <Typography>Phone: {user.phone}</Typography>
            <Typography>Website: {user.website}</Typography>
            <Typography>
              Address: {user.address?.suite}, {user.address?.street},{" "}
              {user.address?.city}, {user.address?.zipcode}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserDetails;