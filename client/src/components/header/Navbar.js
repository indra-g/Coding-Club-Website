import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";
import logo from "../../assets/img/logoCropped.png";

export default function ButtonAppBar() {
  const history = useHistory();

  const goToPage = (page) => {
    if (page === "script") history.push("/allScripts");
    else history.push("/allEvents");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" elevation={0} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img
              src={logo}
              alt="can't fetch"
              style={{ height: "50px", width: "90px" }}
            />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight:"bold" }}>
            PSG Tech Coding Club
          </Typography>
          <Button onClick={() => goToPage("script")} color="inherit">
            Scripts
          </Button>
          <Button onClick={() => goToPage("event")} color="inherit">
            Events
          </Button>
          <IconButton size="large">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
