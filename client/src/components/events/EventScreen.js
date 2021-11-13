import React, { useState } from "react";
// import {useHistory} from 'react-router-dom';
import "../../css/eventScreen.css";
import Navbar from "../header/Navbar";
import SliderHome from "../home/slider_home";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import { fas,faFacebook } from "@fortawesome/free-brands-svg-icons";
import EventSlider from "./eventSlider";
// import EventCard from './EventCard';
import User from "../../config/user_credentials";
import { Link } from "react-router-dom";

function EventScreen() {
  const [user, setuser] = useState(User);
  const logOutfunction = () => {
    alert("Logout Function Exceuted");
    User.username = "";
    setuser({ username: "" });
    localStorage.removeItem( 'token' )
  };
  return (
    <div>
      <section className="event-screen">
        <div className="row">
          {/* The left side display screen */}
          <div className="display-screen">
            <Navbar username={user.username} />
            <div className="event-screen-scroller-heading">
              <h4 className="event-screen-scroller-heading-title">Events</h4>
            </div>
            <hr />
            <div className="event-screen-scroller-body">
              {/* <EventCard/> */}
              <EventSlider />
            </div>
            {/* <hr/>
        <div className="event-screen-scroller-footer">
        <ul className="social-media-list">
        <li className="social-media-icon">
        <p>Icon-1</p>
        </li>
        <li className="social-media-icon">
        <p> Icon-2 </p>
        </li>
        <li className="social-media-icon">
        <p> Icon-3 </p>
        </li>
        </ul>
        <div className="copyright-text">
        <p> &copy; Copyright 2021 Coding Club</p>
        </div>
        </div> */}
          </div>
          {/* The Right side scroller screen */}
          <div className="scroller event-scroller">
            <div className="row scroller-header">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  {user.username === "" ? (
                    <a className="btn nav-link" href="/login">
                      Login
                    </a>
                  ) : (
                    <a
                      className="btn nav-link"
                      onClick={logOutfunction}
                      href="/"
                    >
                      Logout
                    </a>
                  )}
                </li>
                <li className="nav-item">
                  {user.username === "" ? (
                    <a className="btn nav-link signup" href="/signup">
                      Sign Up
                    </a>
                  ) : (
                    <Link className="btn nav-link signup">
                      {" "}
                      {user.username}{" "}
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            <div>
              <SliderHome />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventScreen;
