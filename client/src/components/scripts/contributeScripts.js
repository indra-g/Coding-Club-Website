import React, {useEffect} from 'react'
import {useState} from 'react';
import Axios from 'axios';
import '../../css/contributeScriptsScreen.css';
import logo from "../../assets/img/logo.png";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";

function ContributeScripts() {
    let decode = jwt.decode(localStorage.getItem("token"));
    const history = useHistory();
    const [contributor,setcontributor]=useState('')
    const [title,settitle]=useState('')
    const [content,setcontent]=useState('')
    const [email,setemail]=useState('')
    const [selectedimage, setselectedimage] = useState(null);
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

    const submitfunction = ()=>{

        if(contributor===''){alert('Name could not be empty');return;}
        if(title===''){alert('Title could not be empty');return;}
        if(content===''){alert('Content could not be empty');return;}
        if(email===''){alert('Email could not be empty');return;}
        if(selectedimage===null){alert('No Image Uploaded');return;}

        const record = new FormData();
        record.append("contributor",contributor);
        record.append("title",title);
        record.append("content",content);
        record.append("email",email);
        record.append("image",selectedimage,contributor);

        Axios.post('/api/contribute-scripts',record).then((result)=>{
            if(result.data.success){
                alert("Your Scripts will be added after Approval");
                setRedirect(true);
            }else{
                alert(result.data.message);
            }
        }).catch((err)=>{
            console.log(err.toString());
        });
    }

    if (redirect) {
        history.push("/allScripts");
    }

    return (

        <div className="wrapper">
            <div className="row top-box">
                <div className="col-8 content-background">
                    <div className="login-wrapper">
                        <h1 className="heading-text">Contribute Script</h1>
                        {selectedimage ?
                            <img src={preview} alt="loaded event" className={'image-style'}/>
                            : <img src={logo} alt="loaded event" className={'image-style'}/>}
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
                        <img className="img" src={logo} alt="logo"/>
                        <h4 className="texts">Psg Tech Coding Club</h4>
                        <h5 className="texts bot-text1">
                            Simple things should be simple, complex things should be possible
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContributeScripts
