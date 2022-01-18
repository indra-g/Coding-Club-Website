import React, { Component } from "react";
import "../../css/whatwedo.css";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

export default class What extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <div className="main-header">
          <img className="logo1" src={logo} />
          <h3 className="main-title">
            <span className="color">What</span> we do
          </h3>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg col-md-6 col-sm wrap">
              <div className="closer">
                <i class="fa fa-desktop" style={{ fontSize: "35px" }} />
                <b>Weekly Webinars</b>
              </div>
              <p>
                Experienced professionals from the tech and education industry
                and fellow Techians with specializations in the different fields
                pertaining to technology and problem solving are invited to
                share their insights and impart the knowledge they’ve gained
                from experience. Topics that require the interdisciplinary
                application of programming to solve real-life problems are
                encouraged, and sessions are conducted at a time conducive to
                students’ class schedules
              </p>
            </div>
            <div class="col-lg col-md-6 sol-sm wrap">
              <div className="closer">
                <i className="fa fa-code" style={{ fontSize: "35px" }} />
                <b>Weekly Coding</b>
              </div>
              <p>
                A weekly programming contest with questions that are curated and
                customized according to varying problem-solving skill levels by
                utilizing HackerRank and Examly to scale contests from beginner
                to intermediate to advanced levels. This provides an environment
                where students are provided with resources to gain mastery in
                various programming languages, as well as progress at their own
                pace.
              </p>
            </div>
            <div class="col-lg col-md-6 col-sm wrap">
              <div className="closer">
                <i className="fa fa-laptop" style={{ fontSize: "35px" }} />
                <b>Coding Starters</b>
              </div>
              <p>
                This event creates a platform for learning through effective
                discussion for complete beginners—to both increase their
                understanding of current concepts and also help them learn to
                code effectively. Student experts in programming from various
                departments are invited to deliver concise and beginner-friendly
                tutorials and lessons on fundamental concepts. This facilitates
                a bidirectional learning environment that allows for both
                gaining knowledge and clarification of doubts and queries.
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
            <p className="copyright">© Copyright 2021 Coding Club</p>
          </span>
        </div>
      </div>
    );
  }
}
