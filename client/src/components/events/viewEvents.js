import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../css/eventScreen.css";
import "../../css/viewevents.css";
import logo from "../../assets/img/logo.png";
import food from "../../assets/img/food.jpg";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import sampleImg from "../../assets/img/SUPER DREAM OFFERS 2.png";

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
    // <div className="view-events-screen">
    //     <h1>{title}</h1>
    //     <div className="body">
    //         <div className="image-container">
    //             <img className="img-view-events" src={url}/>
    //         </div>
    //         <div className="content-container">
    //             <h3>{presenter}</h3>
    //             <h4>{new Date(date).toDateString()}</h4>
    //             <h4>{description}</h4>
    //             <button className="view-events-button">
    //                 {/*<a href={link}>Join Now</a>*/}
    //                 <a target={'_blank'} href={link} className={"anchor-style"}> View Event</a>
    //             </button>
    //         </div>
    //     </div>
    // </div>
    // <div className="row">
    //   <Typography
    //     sx={{ textAlign: "center", fontWeight: "bold", py: 7 }}
    //     variant="h3"
    //   >
    //       {title}
    //   </Typography>
    //   <div className="col-md-7 order-md-1">
    //     <img className="img-view-events" src={url} alt="event" />
    //   </div>
    //   <div className="col-md-5 order-md-2">
    //     <Typography variant="h5" sx={{ fontWeight: "bold", pb: 3, pt:5 }}>
    //       {presenter}
    //     </Typography>
    //     <Typography variant="h5" sx={{ fontWeight: "bold", pb: 3 }}>
    //       {new Date(date).toDateString()}
    //     </Typography>
    //     <Typography variant="h5" sx={{ fontWeight: "bold", pb: 3 }}>
    //       {description}
    //     </Typography>
    // <Button
    //   sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
    //   size="large"
    //   style={{ backgroundColor: "black", color: "white" }}
    // >
    // <a target={'_blank'} href={link} className={"anchor-style"}> View Event</a>
    // </Button>
    //   </div>
    // </div>
    <div className="background">
      <div class="content-wrapper">
        <img className="logo" src={logo} alt="logo"></img>
        <h4 className="title">Psg Tech Coding Club</h4>
        <div className="event-wrapper">
          <h3>Super dream companies at your reach</h3>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md row-1">
              <img
                className="img1 img-fluid"
                src={sampleImg}
                alt="event-img"
              ></img>
            </div>
            <div class="col-md wrap">
              <div className="text-wrapper">
                <h5>Aishvarya G</h5>
                <h5>13th Sept 2021</h5>
                <h5>
                  How to crack big company interviews and become Elon Musk
                </h5>
                <button type="button" class="btn btn-dark">
                  Join Event
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
