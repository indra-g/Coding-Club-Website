import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "../../css/ScriptsScreen.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import food from "../../assets/img/food.jpg";
import { grey } from "@mui/material/colors";

function ScriptsScreen() {
  const grey800 = grey[800];
  const [scriptsList, setList] = useState([]);
  const [scriptsUpdate, setUpdate] = useState(1);
  useEffect(() => {
    Axios.get("/api/scripts/")
      .then((result) => {
        if (result.data) {
          setList(result.data);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }, [scriptsUpdate]);
  // const editfunction=(id)=>{
  //     history.replace(`/edit-script/${id}`)
  //     // Axios.put(`/api/scripts/${id}`,{
  //     // })
  //     // .then((result)=>{
  //     //     if(result.data.succes){
  //     //         alert('Edited Successfully!!');
  //     //     }
  //     // })
  //     // .catch((err)=>{console.log(err.toString())});
  // }
  const deletefunction = (id) => {
    Axios.delete(`/api/scripts/${id}`)
      .then((result) => {
        if (result.data.success) {
          alert("Deleted Successfully!!");
          setUpdate(scriptsUpdate + 1);
        }
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };
  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div className="scripts-screen">
            <h1>Scripts Page</h1>
            {scriptsList &&
              scriptsList.map((script) => {
                return (
                  // <div className="scripts-card">
                  //     <h2>Title : {script.Title}</h2>
                  //     <p>{script.Content}</p>
                  //     <h4>Contributor : {script.Contributor}</h4>
                  //     <h6>{script.Email}</h6>
                  //     <button className="read-script-button"><a href={`/view-script/${script._id}`}> Read Script </a></button>
                  //     <div className="scripts-button-area">
                  //         <button className='card-buttons'><Link to= {`/edit-script/${script._id}`}> Edit </Link></button>
                  //         <button className='card-buttons' onClick={()=>deletefunction(script._id)}> Delete </button>
                  //     </div>
                  // </div>
                  <div className="col">
                    <Card
                      sx={{ maxWidth: 345, borderRadius: 5 }}
                      style={{ backgroundColor: "black", color: "white" }}
                    >
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
                          {script.Title}
                        </Typography>
                        <Typography sx={{ mx: "auto", pb: 1 }} variant="body2">
                          {script.Contributor}
                        </Typography>
                        <Typography sx={{ mx: "auto" }} variant="body2">
                          {script.Content}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ pb: 3 }}>
                        <Button
                          sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
                          size="small"
                          style={{ backgroundColor: grey800, color: "white" }}
                        >
                          Read
                        </Button>
                        <Button
                          sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
                          size="small"
                          style={{ backgroundColor: grey800, color: "white" }}
                        >
                          Write
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScriptsScreen;
