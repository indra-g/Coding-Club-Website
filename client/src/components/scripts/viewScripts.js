import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../css/whatwedo.css";
import "../../css/viewscripts.css";
import logo from "../../assets/img/logo.png";
import img from "../../assets/img/img5.jpg";

function ViewScripts(props) {
  const [contributor, setcontributor] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [email, setemail] = useState("");
  const [date, setdate] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    Axios.get(`/api/scripts/${props.match.params.id}`)
      .then((script) => {
        setcontributor(script.data.Contributor);
        settitle(script.data.Title);
        setemail(script.data.Email);
        setdate(script.data.Date);
        setImageUrl(script.data.ImageUrl);
        console.log("Email at viewScripts :", email);
        setcontent(script.data.Content);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="content-wrapper">
      <div className="main-header">
          <img className="logo1" src={logo} />
          <h3 className="main-title sc">Psg Tech Coding Club</h3>
      </div>
      <div className="content">
        <div className="title">
          <h3>{title}</h3>
        </div>
        <p className="para">
          {content}
        </p>
        <div className="writer-profile">
          <img src={imageUrl} className="profile-img" />
          <div className="info-container">
            <h3 className="name">{contributor}</h3>
            <h4 className="date">{new Date(date).toDateString()}</h4>
          </div>
        </div>
      </div>
        <div><a href={'/scripts'} className={'back-to-home'}> &lt; Back to Home</a></div>
    </div>
  );
}

export default ViewScripts;
