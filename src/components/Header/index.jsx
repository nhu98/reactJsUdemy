import StorefrontIcon from "@mui/icons-material/Storefront";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Register from "features/Auth/components/Register/index";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Login from "features/Auth/components/Login";
import { useDispatch, useSelector } from "react-redux";
import StorageKeys from "constants/storage-key";
import { AccountCircle } from "@mui/icons-material";
import { logout } from "features/Auth/userSlice";

const useStyles = makeStyles({
  link: {
    color: "#fff",
    textDecoration: "none",
  },
});

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};

export default function Header() {
  const classes = useStyles();

  const loggedInUser = useSelector((state) => state.user.current);

  const isLoggedIn = !!loggedInUser.id;

  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState(MODE.LOGIN);

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  const dispatch = useDispatch();

  function handleClickUserMenu(event) {
    setAnchorEl(event.currentTarget);
  }
  // const handleClickUserMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setAnchorEl(null);
  // };
  function handleCloseMenu() {
    setAnchorEl(null);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleLogoutClick() {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
  }

  const getUser = JSON.parse(localStorage.getItem(StorageKeys.USER));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StorefrontIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={classes.link} to="/">
              HQN Shop
            </Link>
          </Typography>

          <NavLink
            className={classes.link}
            to="/todos"
            activeClassName="active-menu"
          >
            <Button color="inherit">TODOS</Button>
          </NavLink>
          <NavLink
            className={classes.link}
            to="/albums"
            activeClassName="active"
          >
            <Button color="inherit">AlBUMS</Button>
          </NavLink>

          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}

          {isLoggedIn && (
            <Box>
              {`❤️${getUser ? getUser.fullName : ""}❤️`}
              <IconButton color="inherit" onClick={handleClickUserMenu}>
                <AccountCircle />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8, color: "grey" }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>

        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
}
