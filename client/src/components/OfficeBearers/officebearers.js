import React, { Component } from "react";
import "../../css/officebarers.css";
import "../../css/whatwedo.css";
import logo from "../../assets/img/logo.png";
import officebearer1 from "../../assets/img/office bearers 1.jpg";
import officebearer2 from "../../assets/img/office bearers 2.jpg";
import officebearer3 from "../../assets/img/office bearers 3.jpg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
//import {Carousel} from "bootstrap";

export default class Officebearers extends Component {
  render() {
    return (
      //   <div>
      //     <div className="mycontainer">
      //       <Box sx={{ flexGrow: 1 }}>
      //         <AppBar color="transparent" elevation={0} position="static">
      //           <Toolbar>
      //             <Link to="/events-home">
      //               <IconButton
      //                 size="large"
      //                 edge="start"
      //                 color="inherit"
      //                 aria-label="menu"
      //                 sx={{ mr: 2 }}
      //               >
      //                 <img
      //                   src={logo}
      //                   alt="can't fetch"
      //                   style={{ height: "50px", width: "90px" }}
      //                 />
      //               </IconButton>
      //             </Link>
      //             <Typography
      //               variant="h5"
      //               component="div"
      //               sx={{ flexGrow: 1, fontWeight: "bold" }}
      //             >
      //               PSG Tech Coding Club
      //             </Typography>
      //           </Toolbar>
      //         </AppBar>
      //       </Box>
      //       <p>
      //         <div className="row">
      //           <div className="heading">
      //             {/*<span className="text-primary">Office</span> Bearers*/}
      //             {/*<span className="text-primary">TEAM</span>*/}
      //           </div>
      //         </div>
      //         <div className="row">
      //           <div className="col d-flex justify-content-center">
      //             <div
      //               id="carouselExampleCaptions"
      //               className="carousel slide carousel-fade"
      //               data-bs-ride="carousel"
      //             >
      //               <div className="carousel-indicators">
      //                 <button
      //                   type="button"
      //                   data-bs-target="#carouselExampleCaptions"
      //                   data-bs-slide-to="0"
      //                   className="active"
      //                   aria-current="true"
      //                   aria-label="Slide 1"
      //                 />
      //                 <button
      //                   type="button"
      //                   data-bs-target="#carouselExampleCaptions"
      //                   data-bs-slide-to="1"
      //                   aria-label="Slide 2"
      //                 />
      //                 <button
      //                   type="button"
      //                   data-bs-target="#carouselExampleCaptions"
      //                   data-bs-slide-to="2"
      //                   aria-label="Slide 3"
      //                 />
      //               </div>
      //               <div className="carousel-inner">
      //                 <div className="carousel-item active">
      //                   <img
      //                     src={officebearer1}
      //                     className="d-block w-100"
      //                     alt="..."
      //                   />
      //                 </div>
      //                 <div className="carousel-item">
      //                   <img
      //                     src={officebearer2}
      //                     className="d-block w-100"
      //                     alt="..."
      //                   />
      //                 </div>
      //                 <div className="carousel-item">
      //                   <img
      //                     src={officebearer3}
      //                     className="d-block w-100"
      //                     alt="..."
      //                   />
      //                 </div>
      //               </div>
      //               <button
      //                 className="carousel-control-prev"
      //                 type="button"
      //                 data-bs-target="#carouselExampleCaptions"
      //                 data-bs-slide="prev"
      //               >
      //                 <span
      //                   className="carousel-control-prev-icon"
      //                   aria-hidden="true"
      //                 />
      //                 <span className="visually-hidden">Previous</span>
      //               </button>
      //               <button
      //                 className="carousel-control-next"
      //                 type="button"
      //                 data-bs-target="#carouselExampleCaptions"
      //                 data-bs-slide="next"
      //               >
      //                 <span
      //                   className="carousel-control-next-icon"
      //                   aria-hidden="true"
      //                 />
      //                 <span className="visually-hidden">Next</span>
      //               </button>
      //             </div>
      //           </div>
      //         </div>
      //         <hr />
      //         <div>
      //           <ul className="social-media-list">
      //             <li className="social-media-icon">
      //               <Link to="/" class="fa fa-instagram" />
      //             </li>
      //             <li>
      //               <Link to="/" class="fa fa-facebook" />
      //             </li>
      //             <li className="social-media-icon">
      //               <Link to="/" class="fa fa-envelope-square" />
      //             </li>
      //           </ul>
      //           <span className="copyright-text">
      //             <p>
      //               {" "}
      //               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      //               &copy; Copyright 2021 Coding Club
      //             </p>
      //           </span>
      //         </div>
      //       </p>
      //     </div>
      //   </div>
      <div className="content-wrapper cont">
        <div className="main-header">
          <img className="logo1" src={logo} />
          <h3 className="main-title">Office Bearers</h3>
        </div>
        {/* Carousel */}
        <div
          id="carouselExampleFade"
          class="carousel slide carousel-dark caro"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="d-block w-100">
                <h3>DR. K. PRAKASAN</h3>
                <h6>PRINCIPAL</h6>
                <h3 className="new">DR. R. NADARAJAN</h3>
                <h6>DEAN - PAT</h6>
                <h3 className="new">DR. R. ENGELS</h3>
                <h6>ASSOCIATE DEAN - PAT</h6>
                <h3 className="new">DR. V. SENTHIL KUMARAN</h3>
                <h6>FACULTY ADVISOR - CODING CLUB</h6>
              </div>
            </div>
            <div class="carousel-item">
              <div class="d-block w-100">
                <div class="container">
                  <div class="row">
                    <div class="col-lg col-md-6 col-sm">
                      <h3>DR. NIRMALA VARGHESE</h3>
                      <h6>APPAREL & FASION DESIGN</h6>
                      <h3 className="new">DR. J. NIRESH</h3>
                      <h6>AUTOMOBILE</h6>
                      <h3 className="new">DR. S. PRAVEEN KUMAR</h3>
                      <h6>CIVIL</h6>
                      <h3 className="new">DR. K. VASANTHAMANI</h3>
                      <h6>ECE</h6>
                      <h3 className="new">DR. S. RAJAN</h3>
                      <h6>ICE</h6>
                    </div>
                    <div class="col-lg col-md-6 col-sm mid-col">
                      <h3>DR. K. THILLAIRAJAN</h3>
                      <h6>METALLURGY</h6>
                      <h3 className="new">DR. V. SENTHIL KUMARAN</h3>
                      <h6>AMCS</h6>
                      <h3 className="new">DR. D. BRINDHA</h3>
                      <h6>BIOMEDICAL</h6>
                      <h3 className="new">DR. S. BHAMA</h3>
                      <h6>COMPUTER APPLICATIONS</h6>
                      <h3 className="new">DR. A. NATARAJAN</h3>
                      <h6>EEE</h6>
                    </div>
                    <div class="col-lg col-md-6 col-sm bot-col">
                      <h3>DR. R. SENTHIL PRABHA</h3>
                      <h6>INFORMATION TECHNOLOGY</h6>
                      <h3 className="new">MR. R. RAJESH</h3>
                      <h6>PRODUCTION</h6>
                      <h3 className="new">DR. R. MURUGAN</h3>
                      <h6>TEXTILE</h6>
                      <h3 className="new">MR. SUBRAMANIAN SS</h3>
                      <h6>APPLIED SCIENCE</h6>
                      <h3 className="new">MR. G. KARTHIK VIJAYAKUMAR</h3>
                      <h6>BIOTECHNOLOGY</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="d-block w-100">
                <div class="container">
                  <div class="row">
                    <div class="col-lg col-md-6 col-sm">
                      <h3>DR. K. SATHIYA PRIYA</h3>
                      <h6>CSE</h6>
                      <h3 className="new">DR. V. PARTHASARATHI</h3>
                      <h6>FASHION TECHNOLOGY</h6>
                      <h3 className="new">MR. V. VIJAY ANAND</h3>
                      <h6>MECHANICAL</h6>
                      <h3 className="new">DR. M. SURESH</h3>
                      <h6>RAE</h6>
                      <h3 className="new">D. KANAGADURGA</h3>
                      <h6>APPAREL & FASHION DESIGN</h6>
                    </div>
                    <div class="col-lg col-md-6 col-sm mid-col">
                      <h3>D. HEMANTH SIDHARTHA </h3>
                      <h6>AUTOMOBILE</h6>
                      <h3 className="new">C. GOKUL RAM</h3>
                      <h6>CIVIL</h6>
                      <h3 className="new">N.S VIBOOSITHASRI</h3>
                      <h6>ECE</h6>
                      <h3 className="new">M. NITHYASHRI</h3>
                      <h6>ICE</h6>
                      <h3 className="new">T. DHARUN PRAKASH</h3>
                      <h6>METALLURGY</h6>
                    </div>
                    <div class="col-lg col-md-6 col-sm bot-col">
                      <h3>I. SAI KRISHNA</h3>
                      <h6>AMCS - DATA SCEINCE</h6>
                      <h3 className="new">M. SUSHMITHA</h3>
                      <h6>BIOMEDICAL</h6>
                      <h3 className="new">V. ASHOK RAJ</h3>
                      <h6>COMPUTER APPLICATIONS</h6>
                      <h3 className="new">P. VIJAY SHANKAR</h3>
                      <h6>(SW) EEE</h6>
                      <h3 className="new">K. MOUNIKA</h3>
                      <h6>INFORMATION TECHNOLOGY</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="d-block w-100">
                <div class="container">
                  <div class="row">
                    <div class="col-lg col-md-6 col-sm">
                      <h3>R. NAVEEN RAJ</h3>
                      <h6>(SW) PRODUCTION</h6>
                      <h3 className="new">R. DIVYA LAXMI</h3>
                      <h6>TEXTILE</h6>
                      <h3 className="new">M. NASEEMA SHYMA</h3>
                      <h6>APPLIED SCIENCE</h6>
                      <h3 className="new">D. GAYATRI</h3>
                      <h6>BIOTECHNOLOGY</h6>
                      <h3 className="new">S. SWATHI</h3>
                      <h6>CSE</h6>
                    </div>
                    <div class="col-lg col-md-6 col-sm mid-col">
                      <h3>S. SMIRIDHI</h3>
                      <h6>FASHION TECHNOLOGY</h6>
                      <h3 className="new">J.L. SURIYA PRAKAASH</h3>
                      <h6>MECHANICAL</h6>
                      <h3 className="new">V.E. JAYANTH AKASH</h3>
                      <h6>RAE</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  }
}
