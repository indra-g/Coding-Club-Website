import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../css/ScriptsScreen.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
//import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
//import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logoCropped.png";

function EditScripts(props) {
  const history = useHistory();
  const [contributor, setcontributor] = useState("");
  const [title, settitle] = useState("");
  const [email, setemail] = useState("");
  const [content, setcontent] = useState("");

  const goToAllScriptsPage = () => {
    history.goBack();
  };

  const submitfunction = () => {
    Axios.post(`/api/scripts/${props.match.params.id}`, {
      title: title,
      contributor: contributor,
      email: email,
      content: content,
    })
      .then((result) => {
        if (result.data.success) {
          alert("Edited Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    Axios.get(`/api/scripts/${props.match.params.id}`)
      .then((result) => {
        setcontributor(result.data.Contributor);
        settitle(result.data.Title);
        setemail(result.data.Email);
        setcontent(result.data.Content);
      })
      .catch((err) => {
        console.log(err.toString());
      });
  }, [props.match.params.id]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="transparent" elevation={0} position="static">
          <Toolbar>
            <Link to="/">
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
            </Link>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              PSG Tech Coding Club
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <hr />
      <div className="edit-scripts-screen">
        <input
          type="text"
          name=""
          placeholder="Enter Contributor Name"
          value={contributor}
          onChange={(e) => {
            setcontributor(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => {
            setcontent(e.target.value);
          }}
        />
        <button type="submit" onClick={submitfunction}>
          {" "}
          Submit{" "}
        </button>
        <button onClick={goToAllScriptsPage}> Back to Scripts Page</button>
      </div>

      <div className="event-screen-scroller-footer">
        <hr />
        <ul className="social-media-list">
          <li className="social-media-icon">
            <Link to="/" class="fa fa-instagram"></Link>
          </li>
          <li>
            <Link to="/" class="fa fa-facebook"></Link>
          </li>
          <li className="social-media-icon">
            <Link to="/" class="fa fa-envelope-square"></Link>
          </li>
        </ul>
        <div className="copyright-text">
          <p> &copy; Copyright 2021 Coding Club</p>
        </div>
      </div>
    </div>
  );
}

export default EditScripts;
