import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import food from "../../assets/img/food.jpg";
import { grey } from "@mui/material/colors";
import { useHistory } from "react-router-dom";
import { CardActionArea } from "@mui/material";

export default function MediaCard(props) {
  const grey800 = grey[800];
  const history = useHistory();

  const viewEventsPage = () => {
    history.push("/view-event/123");
  };

  return (
    <Card
      sx={{ maxWidth: 345, borderRadius: 5 }}
      style={{ backgroundColor: "black", color: "white" }}
    >
      <CardActionArea onClick={viewEventsPage}>
        <CardMedia
          component="img"
          height="140"
          image={food}
          alt="green iguana"
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            sx={{ fontWeight: 700, fontSize: 18, pb: 2 }}
            gutterBottom
            component="div"
          >
            {props.eventData.EventTitle}
          </Typography>
          <Typography sx={{ mx: "auto", pb: 1 }} variant="body2">
            {props.eventData.PresenterName}
          </Typography>
          <Typography sx={{ mx: "auto" }} variant="body2">
            {props.eventData.Date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ pb: 3 }}>
        <Button
          sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
          size="small"
          style={{ backgroundColor: grey800, color: "white" }}
        >
          Join
        </Button>
      </CardActions>
    </Card>
  );
}
