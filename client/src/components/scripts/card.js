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
import Axios from "axios";

export default function MediaCard(props) {
  const grey800 = grey[800];
  const history = useHistory();

  const individualScript = (id, btnType) => {
    if (btnType === "edit") history.push(`/edit-script/${id}`);
    else history.push(`/view-script/${id}`);
  };

  const deletefunction = (id) => {
    Axios.delete(`/api/scripts/${id}`)
      .then((result) => {
        if (result.data.success) {
          alert("Deleted Successfully!!");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };

  return (
    <Card
      sx={{ maxWidth: 345, borderRadius: 5 }}
      style={{ backgroundColor: "black", color: "white" }}
    >
      {/*<CardMedia component="img" height="140" image={food} alt="green iguana" style={{objectFit:"contain"}} />*/}
      <CardMedia component="img" height="140" image={food} alt="green iguana"/>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          sx={{ fontWeight: 700, fontSize: 18, pb: 2 }}
          gutterBottom
          component="div"
        >
          {props.scriptData.Title}
        </Typography>
        <Typography sx={{ mx: "auto", pb: 1 }} variant="body2">
          {props.scriptData.Contributor}
        </Typography>
        <Typography sx={{ mx: "auto" }} variant="body2">
          Date here
        </Typography>
      </CardContent>
      <CardActions sx={{ pb: 3 }}>
        <Button
          sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
          size="medium"
          style={{ backgroundColor: grey800, color: "white" }}
          onClick={() => individualScript(props.scriptData._id, "read")}
        >
          Read
        </Button>
        {localStorage.getItem('token')?
            <Button
                sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
                size="medium"
                style={{ backgroundColor: grey800, color: "white" }}
                onClick={() => individualScript(props.scriptData._id, "edit")}
            >
              Edit
            </Button>
            :null}

        {localStorage.getItem('token')?
        <Button
          sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
          size="medium"
          style={{ backgroundColor: grey800, color: "white" }}
          onClick={() => deletefunction(props.scriptData._id)}
        >
          Delete
        </Button>
            :null}
      </CardActions>
    </Card>
  );
}
