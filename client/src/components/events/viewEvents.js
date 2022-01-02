import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../css/viewevents.css";
import logo from "../../assets/img/logo.png";

function ViewEvents(props) {
  const [presenter, setpresenter] = useState("");
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState(new Date());
  const [link, setlink] = useState("");
  const [url, seturl] = useState("");
  useEffect(() => {
    Axios.get(`/api/events/${props.match.params.id}`)
      .then((result) => {
        if (result.data.success) {
          setpresenter(result.data.presentername);
          settitle(result.data.title);
          setdescription(result.data.description);
          setdate(new Date(result.data.date));
          setlink(result.data.link);
          seturl(result.data.url);
        }
      }, [])
      .catch((err) => {
        if (err) {
          console.log(err.toString());
        }
      });
  });
  return (
    <div className="content-background">
      <div class="content-wrapper">
        <div><a href={'/events-home'} className={'back-to-home'}> &lt; Back to Home</a></div>
        <img className="logo" src={logo} alt="logo"></img>
        <h4 className="title">Psg Tech Coding Club</h4>
        <div className="event-wrapper">
          <h2>{title}</h2>
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md row-1">
              <img
                className="img1 img-fluid"
                src={url}
                alt="event-img"
              ></img>
            </div>
            <div class="col-md wrap">
              <div className="text-wrapper">
                <h5>{presenter}</h5>
                <h5>{new Date(date).toDateString()}</h5>
                <h5>
                  {description}
                </h5>
                <button type="button" class="btn btn-dark">
                  <a target={'_blank'} href={link} className={"anchor-style"}> View Event</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEvents;
