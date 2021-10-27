import React from 'react'
import '../css/signupScreen.css';
import {useState} from 'react';
import Axios from 'axios';
import '../css/signupScreen.css'
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/img/Finalwhitelogo.png'


function SignUpScreen() {
    const [emailid,setEmailid]=useState('');
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    // const [name,setname]=useState('');
    const history = useHistory();

    const submitfunction = ()=>{
        Axios.post('/api/login/add',{
            email:emailid,
            password:password,
            username:username,
            name:username
        }).then((result)=>{
            if(result.data.success){
                alert('You are successfully registered!');
                history.push('/login');
            }
            else{
                alert('Not Added!!');
            }
        }).catch((err)=>{
            console.log(err.toString());
        });
    }
    // return (
    //     <div className="signup-screen">
    //         <input type="text" placeholder="Enter Name" name="name" onChange={(e)=>{setname(e.target.value)}}/>
    //         <input type="text" placeholder="Enter NickName" name="username" onChange={(e)=>{setusername(e.target.value)}}/>
    //         <input type="text" placeholder="Enter Email" name="email" onChange={(e)=>{setemail(e.target.value)}}/>
    //         <input type="password" placeholder="Enter Password" name="password" onChange={(e)=>{setpassword(e.target.value)}}/>
    //         <button type="submit" onClick={submitfunction}> Submit </button>
    //     </div>
    // )
    return (
        <div className="container loginTop">
            <div className="row">
                <div className="col-md-12 col-lg-9">
                    <div className="col"></div>
                    <div className="col-sm-10 col-md-8 leftbox">
                        <div className="row">
            <div className="col"></div>
            <div className="col-6 login">
            <center className="mb-4 loginTitle">Sign Up</center>
                <div className="mb-3">
                <label className="form-label formLabel">Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control inputField" id="UserName1"/>
                </div>
                <div className="mb-3">
                <label className="form-label formLabel">Email address</label>
                    <input type="email" value={emailid} onChange={e => setEmailid(e.target.value)} className="form-control inputField" id="Email1"/>
                </div>
                <div className="mb-3">
                <label className="form-label formLabel">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control inputField" id="Password1"/>
                </div>
                <center>
                <div className="row">
                    <div className="col" >
                        <button type="submit" onClick={submitfunction} className="mt-4 btn btn-primary loginbutton">Signup</button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col" >
                        Already Registered ? <Link to="/login">Login</Link>
                    </div>                    
                </div>
                </center>
            </div>
            <div className="col"></div>
        </div>
                    </div>
                    <div className="col"></div>
                </div>
                
                    <div className="col-lg-3 rightbox textStyle d-none d-lg-block d-xl-block">
                        <br/><br/><br/>
                        <br/><br/><br/>
                    <div className="img_container">
                        <center>
                            <img src={logo} alt="can't fetch"/>
                        </center>
                            <br/><br/><br/>
                            <div className="text-block">
                                <h4><b>Psg Tech Coding Club</b></h4>
                                Simple things should be simple, complex
                                things should be possible.
                            </div>
                        </div>
                    </div>
            </div>
        </div>
  
    );
}

export default SignUpScreen
