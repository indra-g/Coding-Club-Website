import * as React from "react";
import Card from "@mui/material/Card";
import "../../css/card.css"
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { useHistory } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import {useEffect, useState} from "react";
import Axios from "axios";

export default function MediaCard(props) {
  const grey800 = grey[800];
  const history = useHistory();

  const [data, setData] = useState({
    ImageUrl:'',
    EventTitle:'',
    PresenterName:'',
    Date:'',
    EventLink:''
  });

  useEffect(() => {
    setData(props.eventData);
  },[props.eventData]);

  const editEvent = (id) =>{
    console.log(id);
    history.push(`/edit-event/${id}`);
  }

  const deleteEvent = async (id) => {
    console.log(id);
    Axios.delete(`/api/events/${id}`)
        .then((result) => {
          if (result.data.success) {
            alert("Deleted Successfully!!");
            history.push("/events-home");
          }
        })
        .catch((err) => {
          console.log(err.toString());
        });
  };

  const viewEvent = (id) => {
    console.log(id);
    history.push(`/view-event/${id}`);
  };

  return (
    <Card
      sx={{ maxHeight: 345, maxWidth: 295, borderRadius: 5}}
      style={{ backgroundColor: "black", color: "white" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data?data.ImageUrl:''}
          alt="green iguana"
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            sx={{ fontWeight: 700, fontSize: 18, pb: 2 }}
            gutterBottom
            component="div"
          >
            {data?data.EventTitle:''}
          </Typography>
          <Typography sx={{ mx: "auto", pb: 1 }} variant="body2">
            {data?data.PresenterName:''}
          </Typography>
          <Typography sx={{ mx: "auto" }} variant="body2">
            {data?new Date(data.Date).toDateString():''}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ pb: 3 }}>
        <Button onClick={() => viewEvent(props.eventData._id)}
          sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
          size="small"
          style={{ backgroundColor: grey800, color: "white" }}>
          View
        </Button>
        {localStorage.getItem('token')?
            <Button
                sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
                size="medium"
                style={{ backgroundColor: grey800, color: "white" }}
                onClick={() => editEvent(props.eventData._id)}
            >
              Edit
            </Button>
            :null}

        {localStorage.getItem('token')?
            <Button
                sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
                size="medium"
                style={{ backgroundColor: grey800, color: "white" }}
                onClick={() => deleteEvent(props.eventData._id)}
            >
              Delete
            </Button>
            :null}
      </CardActions>
    </Card>
  );
}
