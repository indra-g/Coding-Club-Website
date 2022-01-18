import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../css/EditScripts.css";
import logo from "../../assets/img/logo.png";

function EditScripts(props) {
  const history = useHistory();
  const [contributor, setcontributor] = useState("");
  const [title, settitle] = useState("");
  const [email, setemail] = useState("");
  const [content, setcontent] = useState("");
  const [selectedimage, setselectedimage] = useState(null);
  const [imageurl,seturl]=useState('');
  const [preview, setpreview] = useState();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!selectedimage) {
      setpreview(undefined)
      return
    }
    const objecturl = URL.createObjectURL(selectedimage)
    setpreview(objecturl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objecturl)
  }, [selectedimage]);

  const onselectimage = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setselectedimage(undefined)
      return
    }
    setselectedimage(e.target.files[0])
  }

  const submitfunction = () => {

    if(contributor===''){alert('Name could not be empty');return;}
    if(title===''){alert('Title could not be empty');return;}
    if(content===''){alert('Content could not be empty');return;}
    if(email===''){alert('Email could not be empty');return;}
    // if(selectedimage===null){alert('No Image Uploaded');return;}

    const record = new FormData();
    record.append("contributor",contributor);
    record.append("title",title);
    record.append("content",content);
    record.append("email",email);
    if(selectedimage!==null) record.append('image',selectedimage,contributor);

    Axios.post(`/api/scripts/${props.match.params.id}`,record).then((result)=>{
      if(result.data.success){
        alert("Script Edited Successfully");
        setRedirect(true);
      }else{
        alert(result.data.message);
      }
    }).catch((err)=>{
      console.log(err.toString());
    });
  };

  useEffect(() => {
    Axios.get(`/api/scripts/${props.match.params.id}`)
      .then((result) => {
        setcontributor(result.data.Contributor);
        settitle(result.data.Title);
        setemail(result.data.Email);
        setcontent(result.data.Content);
        seturl(result.data.ImageUrl);
      })
      .catch((err) => {
        console.log(err.toString());
      });
  }, [props.match.params.id]);

  if (redirect) {
    history.push("/allScripts");
  }

  return (
      <div className="wrapper">
        <div className="row top-box">
          <div className="col-8 content-background">
            <div className="login-wrapper">
              <h1 className="heading-text">Edit Script</h1>
              {selectedimage ?
                  <img src={preview} alt="loaded event" className={'image-style'}/>
                  : <img src={imageurl} alt="loaded event" className={'image-style'}/>}
              <label className="form-labell formLabel">Name</label>
              <input
                  type="text"
                  name="contributor"
                  placeholder="Enter Your Name"
                  value={contributor}
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
                  value={email}
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
                  value={title}
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                  className="form-control inputField"
                  id="Content"
              />
              <label htmlFor="formFile" className="form-labell formLabel">
                Upload your image
              </label>
              <input className="form-control inputField" type="file" id="formFile" onChange={onselectimage}/>
              <label htmlFor="formFile" className="form-labell formLabel">
                Your Script
              </label>
              <textarea
                  id="formFile1"
                  className="form-control inputField"
                  rows="6"
                  cols="50"
                  value={content}
                  placeholder="Enter your script here"
                  onChange={(e) => {
                    setcontent(e.target.value);
                  }}
              />
              <button type="submit" onClick={submitfunction}> Submit</button>
            </div>
          </div>
          <div className="col rightbox content-background">
            <div className="login-content-wrapper">
              <img className="sidebar-img" src={logo} alt="logo"/>
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

export default EditScripts;
