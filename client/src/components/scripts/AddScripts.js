import React from "react";
import { useState } from "react";
import Axios from "axios";
import "../../css/eventScreen.css";
import "../../css/add-scripts.css";
import "../../css/loginScreen.css";
import img1 from "../../assets/img/articles.jpg";
import img2 from "../../assets/img/articles2.jpg";
import img3 from "../../assets/img/img3.jpg";
import img4 from "../../assets/img/img4.jpg";
import img6 from "../../assets/img/img5.jpg";
import img5 from "../../assets/img/img6.jpg";
import img7 from "../../assets/img/img7.jpg";
import logo from "../../assets/img/logo.png";
import { useHistory } from "react-router-dom";

function AddScripts() {
  const history = useHistory();
  const [contributor, setcontributor] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [email, setemail] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitfunction = () => {
    Axios.post("/api/scripts", {
      contributor: contributor,
      title: title,
      content: content,
      email: email,
    })
      .then((result) => {
        if (result.data.success) {
          alert("Scripts Contributed");
          setRedirect(true);
        }
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };

  if (redirect) {
    history.push("/allScripts");
  }
  return (
    // <div className='add-scripts'>
    //     <div className="modal-body row">
    //         <div className="col-md-6">
    //             <div className={"label-style"}>Contributor's name</div>
    //             <input placeholder="Enter Contributor Name" name='contributor' onChange={(e)=>{setcontributor(e.target.value)}}/>
    //             <div className={"label-style"}>Title</div>
    //             <input placeholder="Enter Title" name='title' onChange={(e)=>{settitle(e.target.value)}}/>
    //             <div className={"label-style"}>Email</div>
    //             <input placeholder="Enter Email" name='email' onChange={(e)=>{setemail(e.target.value)}}/>
    //             <div className={"label-style"}>Content</div>
    //             <textarea placeholder="Enter content" name='content' onChange={(e)=>{setcontent(e.target.value)}}/>
    //             <button type="submit" onClick={submitfunction}> Submit </button>
    //         </div>
    //     </div>
    // </div>
    <div class="wrapper">
      <div class="row top-box">
        <div class="col-8 background">
          <div class="login-wrapper">
            <h1 className="heading-text">Contribute Script</h1>
            <label className="form-labell formLabel">Name</label>
            <input
              type="text"
              name="contributor"
              placeholder="Enter Your Name"
              onChange={(e) => {
                setcontributor(e.target.value);
              }}
              className="form-control inputField"
              id="UserName1"
            />
            <label className="form-labell formLabel">Email id</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              className="form-control inputField"
              id="Email1"
            />
            <label className="form-labell formLabel">Title</label>
            <input
              type="text"
              placeholder="Enter Your Title"
              onChange={(e) => {
                setcontent(e.target.value);
              }}
              className="form-control inputField"
              id="Content"
            />
            <label for="formFile" class="form-labell formLabel">
              Upload your image
            </label>
            <input class="form-control inputField" type="file" id="formFile" />
            <label for="formFile" class="form-labell formLabel">
              Your Script
            </label>
            <textarea
              id="formFile1"
              className="form-control inputField"
              rows="6"
              cols="50"
              placeholder="Enter your script here"
            ></textarea>
          </div>
        </div>
        <div class="col rightbox background">
          <div className="content-wrapper">
            <img className="img" src={logo} alt="logo" />
            <h4 className="texts">Psg Tech Coding Club</h4>
            <h5 className="texts bot-text1">
              Simple things should be simple, complex things should be possible
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddScripts;
