import React from "react";
import MultiActionAreaCard from "./card";
import { useState, useEffect } from "react";
import Axios from "axios";
import logo from "../../assets/img/logoCropped.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "../../css/eventScreen.css";

const ListofScripts = () => {
  const [scriptsList, setList] = useState([]);
  const [scriptsUpdate, setUpdate] = useState(1);
  useEffect(() => {
    Axios.get("/api/scripts/")
      .then((result) => {
        if (result.data) {
          setList(result.data);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }, [scriptsUpdate]);
  // const editfunction=(id)=>{
  //     history.replace(`/edit-script/${id}`)
  //     // Axios.put(`/api/scripts/${id}`,{
  //     // })
  //     // .then((result)=>{
  //     //     if(result.data.succes){
  //     //         alert('Edited Successfully!!');
  //     //     }
  //     // })
  //     // .catch((err)=>{console.log(err.toString())});
  // }
  // const deletefunction = (id) => {
  //   Axios.delete(`/api/scripts/${id}`)
  //     .then((result) => {
  //       if (result.data.success) {
  //         alert("Deleted Successfully!!");
  //         setUpdate(scriptsUpdate + 1);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.toString());
  //     });
  // };

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
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {scriptsList &&
            scriptsList.map((script) => {
              return (
                <div className="col" key={script._id}>
                  <MultiActionAreaCard scriptData={script} />
                </div>
              );
            })}
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
};
export default ListofScripts;
