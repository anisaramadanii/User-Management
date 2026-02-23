import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import UserDetails from "./pages/UserDetails";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserDetails />} />
    </Routes>
  </Router>
);

export default App;
