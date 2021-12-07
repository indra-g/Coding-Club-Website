import React, { Component } from "react";
import '../../css/eventScreen.css';
import logo from "../../assets/img/logoCropped.png";
import officebearer1 from "../../assets/img/office bearers 1.jpg";
import officebearer2 from "../../assets/img/office bearers 2.jpg";
import officebearer3 from "../../assets/img/office bearers 3.jpg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import '../../css/about.css';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";
//import {Carousel} from "bootstrap";

export default class Officebearers extends Component {
    render() {
        return (
            <div>
                <div className="mycontainer">

                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar color="transparent" elevation={0} position="static">
                            <Toolbar>
                                <Link to="/events-home">
                                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                    <img
                                        src={logo}
                                        alt="can't fetch"
                                        style={{ height: "50px", width: "90px" }}
                                    />
                                </IconButton>
                                </Link>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight:"bold" }}>
                                    PSG Tech Coding Club
                                </Typography>

                            </Toolbar>
                        </AppBar>
                    </Box>
                    <p>
                        <div className="row">
                            <div className="heading">
                                {/*<span className="text-primary">Office</span> Bearers*/}
                                {/*<span className="text-primary">TEAM</span>*/}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col d-flex justify-content-center">
                                <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel">
                                    <div className="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
    className="active" aria-current="true" aria-label="Slide 1"/>
                                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
    aria-label="Slide 2"/>
                                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
    aria-label="Slide 3"/>
                                    </div>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src={officebearer1} className="d-block w-100"
                                                 alt="..."/>
                                        </div>
                                        <div className="carousel-item">
                                            <img src={officebearer2} className="d-block w-100"
                                                 alt="..."/>
                                        </div>
                                        <div className="carousel-item">
                                            <img src={officebearer3} className="d-block w-100"
                                                 alt="..."/>
                                        </div>
                                    </div>
                                    <button className="carousel-control-prev" type="button"
                                            data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button"
                                            data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <ul className="social-media-list">
                                <li className="social-media-icon">
                                    <Link to="/" class="fa fa-instagram"/>
                                </li>
                                <li>
                                    <Link to="/" class="fa fa-facebook"/>
                                </li>
                                <li className="social-media-icon">
                                    <Link to="/" class="fa fa-envelope-square"/>
                                </li>
                            </ul>
                            <span className="copyright-text"><p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &copy; Copyright 2021 Coding Club</p></span>
                        </div>
                    </p>
                </div>
            </div>
        );
    }
}
