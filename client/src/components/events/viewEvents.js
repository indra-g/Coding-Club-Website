import React from "react";
// import { useState, useEffect } from "react";
// import Axios from "axios";
import "../../css/eventScreen.css";
import food from "../../assets/img/food.jpg";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

function ViewEvents(props) {
  //   const [presenter, setpresenter] = useState("");
  //   const [title, settitle] = useState("");
  //   const [description, setdescription] = useState("");
  //   const [date, setdate] = useState(new Date());
  //   const [link, setlink] = useState("");
  //   const [url, seturl] = useState("");
  //   useEffect(() => {
  //     Axios.get(`/api/events/${props.match.params.id}`)
  //       .then((result) => {
  //         if (result.data.success) {
  //           setpresenter(result.data.presentername);
  //           settitle(result.data.title);
  //           setdescription(result.data.description);
  //           setdate(new Date(result.data.date));
  //           setlink(result.data.link);
  //           seturl(result.data.url);
  //         }
  //       }, [])
  //       .catch((err) => {
  //         if (err) {
  //           console.log(err.toString());
  //         }
  //       });
  //   });
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
    //             <button className="view-events-button"> <a href={link}>Join Now</a></button>
    //         </div>
    //     </div>
    // </div>
    <div className="row">
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold", py: 7 }}
        variant="h3"
      >
        Super dream companies at your reach
      </Typography>
      <div className="col-md-7 order-md-1">
        <img className="img-view-events" src={food} alt="event" />
      </div>
      <div className="col-md-5 order-md-2">
        <Typography variant="h5" sx={{ fontWeight: "bold", pb: 3, pt:5 }}>
          Aishvarya G
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", pb: 3 }}>
          13th Oct 2021
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", pb: 3 }}>
          How to crack big company interviews and become Elon Musk
        </Typography>
        <Button
          sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
          size="large"
          style={{ backgroundColor: "black", color: "white" }}
        >
          Join now
        </Button>
      </div>
    </div>
  );
}

export default ViewEvents;
