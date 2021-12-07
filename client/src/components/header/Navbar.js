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
import {Nav, NavDropdown} from "react-bootstrap";
import User from "../../config/user_credentials";
import {useState} from "react";

export default function ButtonAppBar() {
  const history = useHistory();
  const [user, setuser] = useState(User);

  const logOutfunction = () => {
    alert("Logout Function Exceuted");
    User.username = "";
    setuser({ username: "" });
    console.log("Username after logged out",user);
    localStorage.removeItem("token");
    history.push('/');
  };

  const goToPage = (page) => {
    if (page === "script") history.push("/allScripts");
    else if(page === "add-event") history.push("/add-event");
    else if(page === "add-script") history.push("/add-script");
    else if(page === "contribute-script") history.push("/contribute-scripts");
    else if( page === "about" ) history.push("/about");
    else if( page === "what" ) history.push("/what");
    else if( page === "officeBearers" ) history.push("/officebearers");
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
            <Button onClick={() => goToPage("about")} color="inherit">
              About
            </Button>
            <Button onClick={() => goToPage("what")} color="inherit">
              What
            </Button>
            <Button onClick={() => goToPage("officeBearers")} color="inherit">
              Team
            </Button>

            <IconButton size="large">
              <MenuIcon />
              <Nav>
                <NavDropdown>
                  {localStorage.getItem( 'token' )?
                      <NavDropdown.Item>
                        <Button onClick={() => goToPage("add-event")} color="inherit">
                          Add Events
                        </Button>
                      </NavDropdown.Item>
                      :<NavDropdown.Item>
                        <Button onClick={() => goToPage("contribute-script")} color="inherit">
                          Contribute Scripts
                        </Button>
                      </NavDropdown.Item>
                  }
                  {localStorage.getItem( 'token' )?
                      <NavDropdown.Item>
                        <Button onClick={() => goToPage("add-script")} color="inherit">
                          Add Scripts
                        </Button>
                      </NavDropdown.Item>
                      :null
                  }
                  {localStorage.getItem( 'token' )?
                      <NavDropdown.Item>
                        <Button onClick={logOutfunction} color="inherit">
                          Log Out
                        </Button>
                      </NavDropdown.Item>
                      :null
                  }
                </NavDropdown>
              </Nav>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
  );
}
