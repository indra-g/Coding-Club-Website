import React, { Component } from "react";
import "../../css/eventScreen.css";
import logo from "../../assets/img/about_us_img.jpg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../css/about.css";
import { Link } from "react-router-dom";

export default class About extends Component {
  render() {
    return (
      // <div>
      //     <div className="mycontainer">
      //     <Box sx={{ flexGrow: 1 }}>
      //         <AppBar color="transparent" elevation={0} position="static">
      //             <Toolbar>
      //                 <Link to="/events-home">
      //                 <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      // <img
      //     src={logo}
      //     alt="can't fetch"
      //     style={{ height: "50px", width: "90px" }}
      // />
      //                 </IconButton>
      //                 </Link>
      //                 <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight:"bold" }}>
      //                     PSG Tech Coding Club
      //                 </Typography>

      //             </Toolbar>

      //         </AppBar>
      //     </Box>
      //     <p>
      //         <div className="heading">
      //             <span className="text-primary">About</span> Us
      //         </div>
      //         <span className="text-primary">Path to Binaries</span>
      //         <br/>
      //         <br/>
      // The Coding Club Of PSG College Of Technology is a student community that intuitively works
      //     on promoting inherent problem-solving skills present in students, irrespective of the
      //     discipline they hail from. We strive to bring programming and the associated thinking
      //     not as a separate entity, but as an integrated part of any real-world problem.
      //         <br/><br/>
      // A unit initiated by Principal Dr.K.Prakasan, Dean Dr.R.Nadarajan, and Associate Dean
      //     of Placement and Training cell Dr.R.Engels ,
      //     the coding club is constituted by a team of representatives comprised of one member
      //     each from the Student Executive Committee of all departments, functioning,
      //     under the expertise of Faculty Advisor Dr.V.Senthil Kumaran.
      //     </p>
      //     <hr/>
      // <div>
      // <ul className="social-media-list">
      //     <li className="social-media-icon">
      //         <Link to="/" class="fa fa-instagram"/>
      //     </li>
      //     <li>
      //         <Link to="/" class="fa fa-facebook"/>
      //     </li>
      //     <li className="social-media-icon">
      //         <Link to="/" class="fa fa-envelope-square"/>
      //     </li>
      // </ul>
      // <span className="copyright-text"><p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &copy; Copyright 2021 Coding Club</p></span>
      // </div>
      // </div>
      // </div>
      <div className="content-wrapper">
        <div className="img-wrapper">
          <img className="img-fluid main-image" src={logo} alt="img" />
        </div>
        <div class="about-wrapper">
          <div class="row">
            <div class="col-lg">
              <h4 className="heading-about">ABOUT US</h4>
              <p className="inside-text">
                The Coding Club Of PSG College Of Technology is a student
                community that intuitively works on promoting inherent
                problem-solving skills present in students, irrespective of the
                discipline they hail from. We strive to bring programming and
                the associated thinking not as a separate entity, but as an
                integrated part of any real-world problem.
              </p>
            </div>
            <div class="col-lg">
              <p className="inside-text inside-text-2">
                A unit initiated by Principal Dr.K.Prakasan, Dean
                Dr.R.Nadarajan, and Associate Dean of Placement and Training
                cell Dr.R.Engels , the coding club is constituted by a team of
                representatives comprised of one member each from the Student
                Executive Committee of all departments, functioning, under the
                expertise of Faculty Advisor Dr.V.Senthil Kumaran.
              </p>
            </div>
          </div>
        </div>
        <hr size="3" className="line"></hr>
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
  }
}
