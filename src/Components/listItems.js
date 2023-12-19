import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function MainListItems() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    auth.role == "Administrador" ? (
      <React.Fragment>
        <ListItemButton
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            navigate("/usuarios");
          }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            navigate("/edificios");
          }}
        >
          <ListItemIcon>
            <ApartmentIcon />
          </ListItemIcon>
          <ListItemText primary="Edificios" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            navigate("/reclamos");
          }}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reclamos" />
        </ListItemButton>
      </React.Fragment>
    ) : (
      
      <React.Fragment>
        <ListItemButton
          onClick={() => {
            navigate("/reclamos");
          }}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reclamos" />
        </ListItemButton>
      </React.Fragment>
    )
    );
  }

export function SecondaryListItems() {

  const { auth } = useAuth();

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        {auth.username}
      </ListSubheader>
      <ListItemButton component={Link} to={"/login"}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="log Out" />
      </ListItemButton>
    </React.Fragment>
  );
}
