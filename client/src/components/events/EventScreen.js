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
import jwt from "jsonwebtoken";

function EventScreen() {
  const user = useState(User);
  console.log(jwt.decode(localStorage.getItem("token")));
  let decode = jwt.decode(localStorage.getItem("token"));
  // console.log(decode.username);

  // const logOutfunction = () => {
  //   alert("Logout Function Exceuted");
  //   User.username = "";
  //   setuser({ username: "" });
  //   localStorage.removeItem("token");
  // };

  return (
    // <div>
    //   <section className="event-screen">
    //     <div className="row">
    //       {/* The left side display screen */}
    //       <div className="display-screen">
    //         <Navbar username={user.username} />
    //         <div className="event-screen-scroller-heading">
    //           <h4 className="event-screen-scroller-heading-title">Events</h4>
    //         </div>
    //         <hr/>
    //         <div className="event-screen-scroller-body">
    //           {/* <EventCard/> */}
    //           <EventSlider />
    //         </div>
    //         <hr/>
    //         {/*<div className="event-screen-scroller-footer">*/}
    //         <div>
    //           <ul className="social-media-list">
    //             <li className="social-media-icon">
    //               <Link to="/" class="fa fa-instagram"/>
    //             </li>
    //             <li>
    //               <Link to="/" class="fa fa-facebook"/>
    //             </li>
    //             <li className="social-media-icon">
    //               <Link to="/" class="fa fa-envelope-square"/>
    //             </li>
    //           </ul>
    //           <span className="copyright-text">
    //             <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &copy; Copyright 2021 Coding Club</p>
    //           </span>
    //         </div>
    //       </div>
    //       {/* The Right side scroller screen */}
    //       <div className="scroller event-scroller">
    //         <div className="row scroller-header">
    //           <ul className="nav justify-content-end">
    //             <li className="nav-item">
    //               {localStorage.getItem("token")==null?
    //                   <a className="btn nav-link signup" href="/signup">
    //                     Sign Up
    //                   </a>
    //                   :<div style={{ color: 'white'}}>
    //                     {" "}
    //                     {decode && decode.username}{" "}
    //                   </div>
    //               }
    //             </li>
    //             <li className="nav-item">
    //               {localStorage.getItem("token")==null ?
    //                 <a className="btn nav-link" href="/login">Login</a>
    //                   :null
    //                   // :<a className="btn nav-link" onClick={logOutfunction} href="/">Logout</a>
    //               }
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <SliderHome />
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>

    <div className="container page-top">
      <div className="row">
        <div className="col-md-12 col-lg-9">
          <div className="col"/>
          <div className="col-sm-10 col-md-8 left-box">
            {/*<div className="display-screen">*/}
              <Navbar username={user.username} />
              <div className="event-screen-scroller-heading">
                <h4 className="event-screen-scroller-heading-title">Events</h4>
              </div>
              <hr/>
              <div className="event-screen-scroller-body">
                {/* <EventCard/> */}
                <EventSlider />
              </div>
              <hr/>
              {/*<div className="event-screen-scroller-footer">*/}
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
          </div>
          <div className="col"/>
        </div>
        <div className="col-lg-3 right-box textStyle d-none d-lg-block d-xl-block">
            <div>
            <div className="row scroller-header">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  {localStorage.getItem("token")==null?
                      <a className="btn nav-link signup" href="/signup">
                        Sign Up
                      </a>
                      :<div style={{ color: 'white'}}>
                        {" "}
                        {localStorage.getItem("token") && decode && decode.username}{" "}
                      </div>
                  }
                </li>
                <li className="nav-item">
                  {localStorage.getItem("token")==null ?
                      <a className="btn nav-link" href="/login">Login</a>
                      :null
                    // :<a className="btn nav-link" onClick={logOutfunction} href="/">Logout</a>
                  }
                </li>
              </ul>
            </div>
            <div>
              <SliderHome />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventScreen;
