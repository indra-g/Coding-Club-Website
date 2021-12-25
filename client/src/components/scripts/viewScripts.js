import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../css/whatwedo.css";
import "../../css/viewscripts.css";
import logo from "../../assets/img/logo.png";
import img from "../../assets/img/img5.jpg";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

function ViewScripts(props) {
  const [contributor, setcontributor] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [email, setemail] = useState("");

  useEffect(() => {
    Axios.get(`/api/scripts/${props.match.params.id}`)
      .then((script) => {
        setcontributor(script.data.Contributor);
        settitle(script.data.Title);
        setemail(script.data.Email);
        console.log("Email at viewScripts :", email);
        setcontent(script.data.Content);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    // <div>
    //   <div className="row">
    //     <div
    //       className="card border-secondary"
    //       style={{ margin: "10px", borderRadius: "10px" }}
    //     >
    //       <div className="card-header">
    //         <div className="row">
    //           <div className="col-sm-1">
    //             <Link to="/">
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
    //           </div>
    //           <div className="col-sm-4">
    //             <h3>
    //               <b>PSG TECH CODING CLUB</b>
    //             </h3>
    //           </div>
    //           <div className="col-sm-7"></div>
    //         </div>
    //       </div>
    //       <div className="card-body" style={{ background: "#f2f2f2" }}>
    //         <h1 className="card-title text-center">{title}</h1>
    //         <p className="card-text">
    //           With supporting text below as a natural lead-in to additional
    //           content.
    //         </p>
    //         <p>{content}</p>
    //       </div>
    //       <div className="card-footer text-muted">{contributor}</div>
    //     </div>
    //   </div>
    //   <div className="event-screen-scroller-footer">
    //     <hr />
    //     <ul className="social-media-list">
    //       <li className="social-media-icon">
    //         <Link to="/" class="fa fa-instagram"></Link>
    //       </li>
    //       <li>
    //         <Link to="/" class="fa fa-facebook"></Link>
    //       </li>
    //       <li className="social-media-icon">
    //         <Link to="/" class="fa fa-envelope-square"></Link>
    //       </li>
    //     </ul>
    //     <div className="copyright-text">
    //       <p> &copy; Copyright 2021 Coding Club</p>
    //     </div>
    //   </div>
    // </div>
    <div className="content-wrapper">
      <div className="main-header">
        <img className="logo1" src={logo} />
        <h3 className="main-title sc">Psg Tech Coding Club</h3>
      </div>
      <div className="content">
        <div className="title">
          <h3>Code, Sleep, Repeat</h3>
        </div>
        <p className="para">
          Eat,eat and eat! Nowadays,many teens are overweight and unfit. Many
          surveys had found out that more and more young people suffer from
          obesity,damaging their health. Therefore, stop eating too much!That is
          not alone about your appearance, but also abut your health. Lack of
          sport is a major problem causing teenagers overweight. Without
          consumption of calorioes, they will accumlate in your body. Then,you
          will get fatter and fatter. Unfortunately, most young people love
          playing video games and computer rather than sport.Of course, the
          intake of the diet cannot be cancelled out.Overweight body is resulted
          eventually. Another reason is due to high content of calories in the
          diet.Eat too much calories is harmful as they will deposit in our
          blood vessels. This leads to fat bodies and then heart dieases.
          Youngsters are under stress as the school work is so busy. Eating
          candies and snack is a common method to relieve pressure. However,it
          is unwise because candies and snack doom you to gain weight easily. In
          fact,we can only use one rule to solve the problem-the uptake should
          be always greater than the intake ! Playing sport is a good method to
          lose weight.Besides,you will feel more comfortable after played sport.
          Hence, you cann see it as a relaxing practise to relieve stress.
        </p>
        <div className="writer-profile">
          <img src={img} className="profile-img" />
          <div className="info-container">
            <h3 className="name">Indra Shekar G</h3>
            <h4 className="date">15 Dec 2021</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewScripts;
