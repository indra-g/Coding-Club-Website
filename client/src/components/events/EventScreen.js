import React, { useState } from "react";
import "../../css/eventScreen.css";
import SliderHome from "../home/slider_home";
import EventSlider from "./eventSlider";
import User from "../../config/user_credentials";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import img1 from "../../assets/img/articles.jpg";
import img2 from "../../assets/img/articles2.jpg";
import img3 from "../../assets/img/img3.jpg";
import img4 from "../../assets/img/img4.jpg";
import img6 from "../../assets/img/img5.jpg";
import img5 from "../../assets/img/img6.jpg";
import img7 from "../../assets/img/img7.jpg";
import logo from "../../assets/img/logo.png";

function EventScreen() {
  const user = useState(User);
  console.log(jwt.decode(localStorage.getItem("token")));
  let decode = jwt.decode(localStorage.getItem("token"));

  return (
    // <div className="container page-top">
    //     <div className="row">
    //         <div className="col-md-12 col-lg-9">
    //             <div className="col"/>
    //             <div className="col-sm-10 col-md-8 left-box">
    //                 <div className={"row"}>
    //                     <div className="col"></div>
    //                     <div className="col">
    //                         <Navbar username={user.username} />
    //                         <EventSlider />
    //                         <div>
    //                             <ul className="social-media-list">
    //                                 <li className="social-media-icon">
    //                                     <Link to="/" class="fa fa-instagram"/>
    //                                 </li>
    //                                 <li>
    //                                     <Link to="/" class="fa fa-facebook"/>
    //                                 </li>
    //                                 <li className="social-media-icon">
    //                                     <Link to="/" class="fa fa-envelope-square"/>
    //                                 </li>
    //                             </ul>
    //                             <span className="copyright-text"><p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &copy; Copyright 2021 Coding Club</p></span>
    //                         </div>
    //                     </div>
    //                     <div className="col"></div>
    //                 </div>
    //             </div>
    //             <div className="col"/>
    //         </div>
    //         <div className="col-lg-3 right-box textStyle d-none d-lg-block d-xl-block">
    //             <div>
    //                 <div className="row scroller-header">
    //                     <ul className="nav justify-content-end">
    //                         <li className="nav-item">
    //                             {localStorage.getItem("token")!=null?
    //                                 <div style={{ color: 'white'}}>
    //                                     {" "}
    //                                     {localStorage.getItem("token") && decode && decode.username}{" "}
    //                                 </div>
    //                                 :null
    //                             }
    //                         </li>
    //                         &nbsp;&nbsp;&nbsp;
    //                         <li className="nav-item">
    //                             {localStorage.getItem("token")!=null ?
    //                                 <a className="btn nav-link signup" href="/signup">
    //                                     Create New User
    //                                 </a>
    //                                 :null
    //                             }
    //                         </li>
    //                         <li className="nav-item">
    //                             {localStorage.getItem("token")==null ?
    //                                 <a className="btn nav-link" href="/login">Login</a>
    //                                 :null
    //                                 // :<a className="btn nav-link" onClick={logOutfunction} href="/">Logout</a>
    //                             }
    //                         </li>
    //                     </ul>
    //                 </div>
    //                 <div>
    //                     <SliderHome />
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <div class="content-wrapper">
      <div class="row">
        <div class="col-lg-8 background ">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <img className="logo" src={logo} alt="logo"></img>
              <h4 className="title">Psg Tech Coding Club</h4>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a
                      class="nav-link active align-middle events"
                      aria-current="page"
                      href="/events-home"
                    >
                      Events
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link active align-middle"
                      aria-current="page"
                      href="/scripts"
                    >
                      Scripts
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link active align-middle login"
                      aria-current="page"
                      href="/login"
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a class="nav-link active align-middle login" href="/about">
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      class="nav-link active align-middle login"
                      href="/officebearers"
                    >
                      Team
                    </a>
                  </li>
                  <li>
                    <a class="nav-link active align-middle login" href="/what">
                      What we do
                    </a>
                  </li>
                  <li>
                    <a
                      class="nav-link active align-middle login"
                      href="/add-script"
                    >
                      Contribute Scripts
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      More
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <a class="dropdown-item" href="/what">
                          What we do
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/officebearers">
                          Team
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/about">
                          About
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/add-script">
                          Contribute Scripts
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <h4 className="heading">Events</h4>
          <hr className="line" />
        </div>
        <div class="col rightBox background">
          <a className="btn nav-link margin" href="/login">
            Login
          </a>
          <div className="content-wrapperr">
            <div class="carousel" data-flickity>
              <img class="carousel-cell" src={img1}></img>
              <img class="carousel-cell" src={img2}></img>
              <img class="carousel-cell" src={img3}></img>
              <img class="carousel-cell" src={img4}></img>
              <img class="carousel-cell" src={img5}></img>
              <img class="carousel-cell" src={img6}></img>
              <img class="carousel-cell" src={img7}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventScreen;
