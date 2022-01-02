import React from "react";
import { useState } from "react";
import "../../css/ScriptsScreen.css";
import {Link, useHistory} from "react-router-dom";
import img1 from "../../assets/img/articles.jpg";
import img2 from "../../assets/img/articles2.jpg";
import img3 from "../../assets/img/img3.jpg";
import img4 from "../../assets/img/img4.jpg";
import img6 from "../../assets/img/img5.jpg";
import img5 from "../../assets/img/img6.jpg";
import img7 from "../../assets/img/img7.jpg";
import logo from "../../assets/img/logo.png";
import User from "../../config/user_credentials";
import jwt from "jsonwebtoken";
import ScriptSlider from "./scriptSlider";

function ScriptsScreen() {

  const history = useHistory();
  const [user, setuser] = useState(User);

  let decode = jwt.decode(localStorage.getItem("token"));

  const logOutFunction = () => {
    alert("Logout Function Executed");
    User.username = "";
    setuser({ username: "" });
    console.log("Username after logged out",user);
    localStorage.removeItem("token");
    history.push('/events-home');
  };

  const addLibraries = () => {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js";
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.href = "https://unpkg.com/flickity@2/dist/flickity.min.css";
    console.log(document.body.appendChild(link));
  }

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
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item"><a className="nav-link active align-middle" href="/events-home">Events</a></li>
                  <li className="nav-item"><a className="nav-link active align-middle events" aria-current="page" href="/scripts">Scripts</a></li>
                  {localStorage.getItem("token") ? null :
                      <li className="nav-item"><a className="nav-link active align-middle login" href="/login"> Login </a></li>}
                  <li className="nav-item"><a className="nav-link active align-middle login" href="/about">About</a></li>
                  <li className="nav-item"><a className="nav-link active align-middle login" href="/officebearers">Team</a></li>
                  <li className="nav-item"><a className="nav-link active align-middle login" href="/what">What we do</a></li>
                  {localStorage.getItem("token") ? null :
                      <li className="nav-item"><a className="nav-link active align-middle login" href="/contribute-scripts">Contribute Scripts</a></li>}
                  {localStorage.getItem("token") ?
                      <li className="nav-item"><a className="nav-link active align-middle login" href={"/add-event"}>Add Event</a></li> : null}
                  {localStorage.getItem("token") ?
                      <li className="nav-item"><a className="nav-link active align-middle login" href={"/add-script"}>Add Script</a></li> : null}
                  {localStorage.getItem("token") ?
                      <li className="nav-item"><a className="nav-link active align-middle login" href="/contributed-scripts-home">View Contributed Scripts</a></li> : null}
                  {localStorage.getItem("token") ?
                      <li className="nav-item"><a className="nav-link active align-middle login" href="/signup">Create New User</a></li> : null}
                  {localStorage.getItem("token") ?
                      <li className="nav-item"><a className="nav-link active align-middle login logout-style" onClick={logOutFunction}>Logout</a></li> : null}

                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">More</a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" href="/what">What we do</a></li>
                      <li><a className="dropdown-item" href="/officebearers">Team</a></li>
                      <li><a className="dropdown-item" href="/about">About</a></li>
                      {localStorage.getItem("token") ? null :
                          <li><a className="dropdown-item" href="/contribute-scripts">Contribute Scripts</a></li>}
                      {localStorage.getItem("token") ? <li><a className="dropdown-item" href={"/add-event"}>Add Event</a></li> : null}
                      {localStorage.getItem("token") ? <li><a className="dropdown-item" href={"/add-script"}>Add Script</a></li> : null}
                      {localStorage.getItem("token") ? <li><a className="dropdown-item" href={"/contributed-scripts-home"}>View Contributed Scripts</a></li> : null}
                      {localStorage.getItem("token") ? <li><a className="dropdown-item" href="/signup">Create New User</a></li> : null}
                      {localStorage.getItem("token") ?
                          <li><a className="dropdown-item logout-style" onClick={logOutFunction}>Logout</a></li> : null}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="content-wrapperr">
            <ScriptSlider />
          </div>
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
          {localStorage.getItem("token")?
              <a className="btn nav-link margin">{decode.username}</a>
              :
              <a className="btn nav-link margin" href="/login">Login</a>
          }
          <div className="content-wrapperr">
            <div className="carousel" data-flickity>
              <img className="carousel-cell" src={img1}></img>
              <img className="carousel-cell" src={img2}></img>
              <img className="carousel-cell" src={img3}></img>
              <img className="carousel-cell" src={img4}></img>
              <img className="carousel-cell" src={img5}></img>
              <img className="carousel-cell" src={img6}></img>
              <img className="carousel-cell" src={img7}></img>
            </div>
          </div>
        </div>
      </div>
      {addLibraries()}
    </div>
  );
}

export default ScriptsScreen;
