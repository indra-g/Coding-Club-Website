import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../css/ScriptsScreen.css";
import logo from "../../assets/img/logoCropped.png";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

function ViewScripts(props) {
  const [contributor, setcontributor] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [email, setemail] = useState("");

  useEffect(() => {
    Axios.get(`/api/scripts/${props.match.params.id}`)
      .then((script) => {
        setcontributor(script.data.Contributor);
        settitle(script.data.Title);
        setemail(script.data.Email);
        console.log('Email at viewScripts :',email)
        setcontent(script.data.Content);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
      <div className="row">
        <div
          className="card border-secondary"
          style={{ margin: "10px", borderRadius: "10px" }}
        >
          <div className="card-header">
            <div className="row">
              <div className="col-sm-1">
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
              </div>
              <div className="col-sm-4">
                <h3>
                  <b>PSG TECH CODING CLUB</b>
                </h3>
              </div>
              <div className="col-sm-7"></div>
            </div>
          </div>
          <div className="card-body" style={{ background: "#f2f2f2" }}>
            <h1 className="card-title text-center">{title}</h1>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <p>{content}</p>
          </div>
          <div className="card-footer text-muted">{contributor}</div>
        </div>
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

export default ViewScripts;
