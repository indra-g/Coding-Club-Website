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
import img1 from "../../assets/img/articles.jpg";
import img2 from "../../assets/img/articles2.jpg";
import img3 from "../../assets/img/img3.jpg";
import img4 from "../../assets/img/img4.jpg";
import img6 from "../../assets/img/img5.jpg";
import img5 from "../../assets/img/img6.jpg";
import img7 from "../../assets/img/img7.jpg";
import logo from "../../assets/img/logo.png";

function ScriptsScreen() {
  const grey800 = grey[800];
  const [scriptsList, setList] = useState([]);
  //const [scriptsUpdate, setUpdate] = useState(1);
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
  });

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

  /* Delete Function */
  // const deletefunction = (id) => {
  //   Axios.delete(`/api/scripts/${id}`)
  //     .then((result) => {
  //       if (result.data.success) {
  //         alert("Deleted Successfully!!");
  //         setUpdate(scriptsUpdate + 1);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.toString());
  //     });
  // };
  return (
    // <div className="album py-5 bg-light">
    //   <div className="container">
    //     <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    //       <div className="scripts-screen">
    //         <h1>Scripts Page</h1>
    //         {scriptsList &&
    //           scriptsList.map((script) => {
    //             return (
    //               // <div className="scripts-card">
    //               //     <h2>Title : {script.Title}</h2>
    //               //     <p>{script.Content}</p>
    //               //     <h4>Contributor : {script.Contributor}</h4>
    //               //     <h6>{script.Email}</h6>
    //               //     <button className="read-script-button"><a href={`/view-script/${script._id}`}> Read Script </a></button>
    //               //     <div className="scripts-button-area">
    //               //         <button className='card-buttons'><Link to= {`/edit-script/${script._id}`}> Edit </Link></button>
    //               //         <button className='card-buttons' onClick={()=>deletefunction(script._id)}> Delete </button>
    //               //     </div>
    //               // </div>
    //               <div className="col">
    //                 <Card
    //                   sx={{ maxWidth: 345, borderRadius: 5 }}
    //                   style={{ backgroundColor: "black", color: "white" }}
    //                 >
    //                   <CardMedia
    //                     component="img"
    //                     height="140"
    //                     image={food}
    //                     alt="green iguana"
    //                   />
    //                   <CardContent sx={{ textAlign: "center" }}>
    //                     <Typography
    //                       sx={{ fontWeight: 700, fontSize: 18, pb: 2 }}
    //                       gutterBottom
    //                       component="div"
    //                     >
    //                       {script.Title}
    //                     </Typography>
    //                     <Typography sx={{ mx: "auto", pb: 1 }} variant="body2">
    //                       {script.Contributor}
    //                     </Typography>
    //                     <Typography sx={{ mx: "auto" }} variant="body2">
    //                       {script.Content}
    //                     </Typography>
    //                   </CardContent>
    //                   <CardActions sx={{ pb: 3 }}>
    //                     <Button
    //                       sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
    //                       size="small"
    //                       style={{ backgroundColor: grey800, color: "white" }}
    //                     >
    //                       Read
    //                     </Button>
    //                     <Button
    //                       sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
    //                       size="small"
    //                       style={{ backgroundColor: grey800, color: "white" }}
    //                     >
    //                       Write
    //                     </Button>
    //                   </CardActions>
    //                 </Card>
    //               </div>
    //             );
    //           })}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div class="content-wrapper">
      <div class="row">
        <div class="col-lg-8 background ">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <img className="logo" src={logo} alt="logo"></img>
              <h4 className="title">Psg Tech Coding Club</h4>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a
                      class="nav-link active align-middle"
                      aria-current="page"
                      href="/events-home"
                    >
                      Events
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link active align-middle events"
                      aria-current="page"
                      href="/scripts"
                    >
                      Scripts
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link active align-middle login"
                      aria-current="page"
                      href="/login"
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a class="nav-link active align-middle login" href="/about">
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      class="nav-link active align-middle login"
                      href="/officebearers"
                    >
                      Team
                    </a>
                  </li>
                  <li>
                    <a class="nav-link active align-middle login" href="/what">
                      What we do
                    </a>
                  </li>
                  <li>
                    <a
                      class="nav-link active align-middle login"
                      href="/add-script"
                    >
                      Contribute Scripts
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      More
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <a class="dropdown-item" href="/what">
                          What we do
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/officebearers">
                          Team
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/about">
                          About
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/add-script">
                          Contribute Scripts
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <h4 className="heading">Scripts</h4>
          <hr className="line" />
        </div>
        <div class="col rightBox background">
          <a className="btn nav-link margin" href="/login">
            Login
          </a>
          <div className="content-wrapperr">
            <div class="carousel" data-flickity>
              <img class="carousel-cell" src={img1}></img>
              <img class="carousel-cell" src={img2}></img>
              <img class="carousel-cell" src={img3}></img>
              <img class="carousel-cell" src={img4}></img>
              <img class="carousel-cell" src={img5}></img>
              <img class="carousel-cell" src={img6}></img>
              <img class="carousel-cell" src={img7}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScriptsScreen;
