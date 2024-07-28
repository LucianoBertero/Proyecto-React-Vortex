import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import { Link } from "@mui/material";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const settings = ["Perfil", "Salir"];

export const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    console.log(setting);
    if (setting === "Salir") {
      navigate("/auth/login/");
    }
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/employee/list");
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              data-rjs="2"
              className="logo-main logo-reg"
              src="https://vortex-it.com/wp-content/uploads/2022/04/LOGO-VORTEX-PNG@4x-230x35.png"
              height="22"
              width="145"
              alt="Vortex"
            ></img>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Link
                component="button"
                variant="body2"
                onClick={handleClick}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    cursor: "pointer",
                    color: "primary.main",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    ml: { xs: 0, md: -30 },
                    display: { xs: "none", md: "block" },
                  }}
                >
                  Gestión de Empleados
                </Typography>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
