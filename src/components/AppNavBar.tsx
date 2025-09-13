import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function AppNavBar(){
  const navigate = useNavigate();
  const token = localStorage.getItem("smarterr_token");
  const role = (localStorage.getItem("smarterr_role") || "seeker");

  const logout = () => {
    localStorage.removeItem("smarterr_token");
    localStorage.removeItem("smarterr_userId");
    localStorage.removeItem("smarterr_role");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
        <Typography component={RouterLink} to="/" color="inherit" variant="h6" sx={{textDecoration:"none"}}>Smarterr</Typography>
        <div>
          <Button color="inherit" component={RouterLink} to="/providers">Providers</Button>
          <Button color="inherit" component={RouterLink} to="/requests">Requests</Button>
          {role === "provider" && <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>}
          <Button color="inherit" component={RouterLink} to="/profile">Profile</Button>
          {token ? <Button color="inherit" onClick={logout}>Logout</Button>
                 : <Button color="inherit" component={RouterLink} to="/login">Login</Button>}
        </div>
      </Toolbar>
    </AppBar>
  );
}
