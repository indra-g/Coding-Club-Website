import React, { useEffect, useState } from "react";
import "../../css/eventScreen.css";
import { Link, useHistory } from "react-router-dom";
import User from "../../config/user_credentials";
import jwt from "jsonwebtoken";
import logo from "../../assets/img/logo.png";
import img1 from "../../assets/img/1.jpg";
import img2 from "../../assets/img/2.jpg";
import img3 from "../../assets/img/3.jpg";
import EventSlider from "./eventSlider";

function EventScreen() {
  const history = useHistory();
  const [user, setuser] = useState(User);

  let decode = jwt.decode(localStorage.getItem("token"));

  const logOutFunction = () => {
    alert("Logout Function Exceuted");
    User.username = "";
    setuser({ username: "" });
    console.log("Username after logged out", user);
    localStorage.removeItem("token");
    history.push("/events-home");
  };

  const addLibraries = () => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js";
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.href = "https://unpkg.com/flickity@2/dist/flickity.min.css";
    console.log(document.body.appendChild(link));
  };

  return (
    <div class="content-wrapper">
      <div class="row">
        <div class="col-lg-8 content-background ">
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
                  {localStorage.getItem("token") ? null : (
                    <li class="nav-item">
                      {" "}
                      <a
                        className="nav-link active align-middle login"
                        href="/login"
                        aria-current="page"
                      >
                        {" "}
                        Login{" "}
                      </a>{" "}
                    </li>
                  )}
                  <li class="nav-item">
                    {" "}
                    <a
                      class="nav-link active align-middle login"
                      href="/about"
                      aria-current="page"
                    >
                      About
                    </a>{" "}
                  </li>
                  <li class="nav-item">
                    {" "}
                    <a
                      class="nav-link active align-middle login"
                      href="/officebearers"
                      aria-current="page"
                    >
                      Team
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link active align-middle login"
                      href="/what"
                      aria-current="page"
                    >
                      What we do
                    </a>
                  </li>
                  {localStorage.getItem("token") ? null : (
                    <li className="nav-item">
                      <a
                        className="nav-link active align-middle login"
                        href="/contribute-scripts"
                        aria-current="page"
                      >
                        Contribute Scripts
                      </a>
                    </li>
                  )}
                  {localStorage.getItem("token") ? (
                    <li class="nav-item">
                      <a
                        className="nav-link active align-middle login"
                        href={"/add-event"}
                        aria-current="page"
                      >
                        Add Event
                      </a>
                    </li>
                  ) : null}
                  {localStorage.getItem("token") ? (
                    <li class="nav-item">
                      <a
                        className="nav-link active align-middle login"
                        href={"/add-script"}
                        aria-current="page"
                      >
                        Add Script
                      </a>
                    </li>
                  ) : null}
                  {localStorage.getItem("token") ? (
                    <li class="nav-item">
                      <a
                        className="nav-link active align-middle login"
                        href={"/contributed-scripts-home"}
                        aria-current="page"
                      >
                        View Contributed Scripts
                      </a>
                    </li>
                  ) : null}
                  {/*{localStorage.getItem("token")? <li class="nav-item"><a className="nav-link active align-middle login" href={"/allEvents"} aria-current="page">All Events</a></li> :null}*/}
                  {/*{localStorage.getItem("token")? <li class="nav-item"><a className="nav-link active align-middle login" href={"/allScripts"} aria-current="page">All Scripts</a></li> :null}*/}
                  {localStorage.getItem("token") ? (
                    <li class="nav-item">
                      {" "}
                      <a
                        className="nav-link active align-middle login"
                        href="/signup"
                        aria-current="page"
                      >
                        Create New User
                      </a>
                    </li>
                  ) : null}
                  {localStorage.getItem("token") ? (
                    <li class="nav-item">
                      <a
                        className="nav-link active align-middle login logout-style"
                        onClick={logOutFunction}
                        aria-current="page"
                      >
                        Logout
                      </a>
                    </li>
                  ) : null}

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
                      {localStorage.getItem("token") ? null : (
                        <li>
                          <a
                            className="dropdown-item"
                            href="/contribute-scripts"
                          >
                            Contribute Scripts
                          </a>
                        </li>
                      )}
                      {localStorage.getItem("token") ? (
                        <li>
                          <a className="dropdown-item" href={"/add-event"}>
                            Add Event
                          </a>
                        </li>
                      ) : null}
                      {localStorage.getItem("token") ? (
                        <li>
                          <a className="dropdown-item" href={"/add-script"}>
                            Add Script
                          </a>
                        </li>
                      ) : null}
                      {localStorage.getItem("token") ? (
                        <li>
                          <a
                            className="dropdown-item"
                            href={"/contributed-scripts-home"}
                          >
                            View Contributed Scripts
                          </a>
                        </li>
                      ) : null}
                      {/*{localStorage.getItem("token")? <li><a className="dropdown-item" href={"/allEvents"}>All Events</a></li>:null}*/}
                      {/*{localStorage.getItem("token")? <li><a className="dropdown-item" href={"/allScripts"}>All Scripts</a></li>:null}*/}
                      {localStorage.getItem("token") ? (
                        <li>
                          <a className="dropdown-item" href="/signup">
                            Create New User
                          </a>
                        </li>
                      ) : null}
                      {localStorage.getItem("token") ? (
                        <li>
                          <a
                            className="dropdown-item logout-style"
                            onClick={logOutFunction}
                          >
                            Logout
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="content-wrapperr">
            <EventSlider />
          </div>
          {/*<hr size="3" className="line bot-line"></hr>*/}
          <div className="footer">
            <Link to="/" class="fa fa-instagram" />
            <Link to="/" class="fa fa-facebook" />
            <Link to="/" class="fa fa-envelope-square" />
            <span className="copyright-text">
              <p>© Copyright 2021 Coding Club</p>
            </span>
          </div>
        </div>
        <div class="col rightBox content-background">
          {localStorage.getItem("token") ? (
            <a className="btn nav-link margin">{decode.username}</a>
          ) : (
            <a className="btn nav-link margin" href="/login">
              Login
            </a>
          )}
          <div className="content-wrapperr">
            <div className="carousel" data-flickity>
              <img className="carousel-cell" src={img1}></img>
              <img className="carousel-cell" src={img2}></img>
              <img className="carousel-cell" src={img3}></img>
            </div>
          </div>
        </div>
      </div>
      {addLibraries()}
    </div>
  );
}

export default EventScreen;
