import React from "react";
import MediaCard from "./card";
import { useState, useEffect } from "react";
import Axios from "axios";
import logo from "../../assets/img/logoCropped.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import "../../css/eventScreen.css";

const ListOfEvents = () => {
  const [eventsList, setList] = useState([]);
  useEffect(() => {
    Axios.get("/api/events/")
      .then((result) => {
        if (result.data.success) {
          setList(result.data.events);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  });

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="transparent" elevation={0} position="static">
          <Toolbar>
            <Link to="/events-home">
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
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {eventsList &&
            eventsList.map((event) => {
              return (
                <div className="col" key={event._id}>
                  <MediaCard eventData={event} />
                </div>
              );
            })}
        </div>
      </div>
      <hr/>
        <div className="footer">
            <Link to="/" class="fa fa-instagram" />
            <Link to="/" class="fa fa-facebook" />
            <Link to="/" class="fa fa-envelope-square" />
            <span className="copyright-text">
              <p>© Copyright 2021 Coding Club</p>
            </span>
        </div>
    </div>
  );
};
export default ListOfEvents;
