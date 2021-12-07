import React, { Component } from "react";
import '../../css/eventScreen.css';
import logo from "../../assets/img/logoCropped.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import '../../css/about.css';
import {Link} from "react-router-dom";

export default class What extends Component {
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
                        <div className="heading">
                            <span className="text-primary">What</span> We Do
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-sm-3">
                                <span className="content">
                                    <i class="fa fa-desktop" style={{fontSize: "35px", textAlign: "center"}}/>
                                    <b>&nbsp;&nbsp;&nbsp;Weekly Webinars</b>
                                    <br/>
                                    Experienced professionals from the tech and education industry and fellow Techians with specializations in the different fields pertaining to technology and problem solving are invited to share their insights and impart the knowledge they’ve gained from experience. Topics that require the interdisciplinary application of programming to solve real-life problems are encouraged, and sessions are conducted at a time conducive to students’ class schedules
                                </span>
                            </div>
                            <div className="col-sm-3">
                                <span className="content">
                                    <i className="fa fa-code" style={{fontSize: "35px", textAlign: "center"}}/>
                                    <b>&nbsp;&nbsp;&nbsp;Weekly Coding</b>
                                    <br/>
                                    A weekly programming contest with questions that are curated and customized according to varying problem-solving skill levels by utilizing HackerRank and Examly to scale contests from beginner to intermediate to advanced levels. This provides an environment where students are provided with resources to gain mastery in various programming languages, as well as progress at their own pace.
                                </span>
                            </div>
                            <div className="col-sm-3">
                                <span className="content">
                                    <i className="fa fa-laptop" style={{fontSize: "35px", textAlign: "center"}}/>
                                    <b>&nbsp;&nbsp;&nbsp;Coding Starters</b>
                                    <br/>
                                    This event creates a platform for learning through effective discussion for complete beginners—to both increase their understanding of current concepts and also help them learn to code effectively. Student experts in programming from various departments are invited to deliver concise and beginner-friendly tutorials and lessons on fundamental concepts. This facilitates a bidirectional learning environment that allows for both gaining knowledge and clarification of doubts and queries.
                                </span>
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
                            <span className="copyright-text">
                                <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &copy; Copyright 2021 Coding Club</p>
                            </span>
                        </div>
                    </p>
                </div>
            </div>
        );
    }
}
