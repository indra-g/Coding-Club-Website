import React from 'react';
import { useState } from 'react';
import '../../css/loginScreen.css';
import Axios from 'axios';
import userObj from '../../config/user_credentials';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/img/Finalwhitelogo.png'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function LoginScreen() {
    const [emailid,setEmailid]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const [showError,setShowError]=useState(false);
    const history = useHistory();
    const submitFunction = () => {
        
        if (emailid !== "" && password !== "") {
            if (emailid.includes("@psgtech.ac.in")) {
                Axios.post('/api/login',{
                email:emailid,
                password:password
                }).then((result)=>{
                    if(result.data.success){
                        userObj.username = result.data.username;
                        alert('Successfully Logged In');
                        history.push("/");
                        // Object.freeze(User);
                    }
                    else {
                        console.log(result);
                        setShowError(true);
                        setError(result.data.message);
                        setTimeout(() => setShowError(false) , 3000)

                    }
                }).catch((err)=>{
                    console.log(err);
                    
                });
            }
            else {
                setShowError(true);
                setError("Only PSG mails are allowed");
                setTimeout(() => setShowError(false) , 3000)

            }
        }
        else {
            setShowError(true);
            setError("Email address and password are required");
            setTimeout(() => setShowError(false) , 3000)
        }

        


    }
        // return (
        //     <div className="login-area">
        //         <input type="text" name="email" placeholder="Enter Your Email" onChange={(e)=>{setemailState(e.target.value)}}/>
        //         <input type="password" name="password" placeholder="Enter Your Password" onChange={(e)=>{setpasswordState(e.target.value)}}/>
        //         <button type="submit" onClick={submitFunction}> Submit </button>
        //         <a href="/"> Back to Homepage </a>
        //     </div>
        // );
    
        return (
        <div className="container loginTop">
            <div className="row">
                <div className="col-md-12 col-lg-9">
                    <div className="col"></div>
                    <div className="col-sm-10 col-md-8 leftbox">
                        <div className="row">
                            <div className="col"></div>
                                <div className="col-6 login">
                                    <center>
                            {showError &&
                                <Stack sx={{ width: '80%' }} >
                                    <Alert variant="filled" severity="error">
                                        {error}
                                    </Alert>
                                </Stack>                
                            }
                            </center>
                            <center className="mb-4 loginTitle">Log In</center>
                                <div className="mb-3">
                                <label className="form-label formLabel">Email address</label>
                                    <input type="email" value={emailid} onChange={e => setEmailid(e.target.value)} className="form-control inputField" id="Email1"/>
                                </div>
                                <div className="mb-3">
                                <label className="form-label formLabel">Password</label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control inputField" id="Password1"/>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        Not a member? <Link to="/signup">Register</Link> 
                                    </div>
                                    <div className="col">
                                        <Link style={{float:"right"}} to="/forgetpassword">Forget Password?</Link>
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                <div className="col"></div>
                                    <div className="col">
                                        <button type="submit" onClick={submitFunction} className="mt-4 btn btn-primary loginbutton">Login</button>
                                    </div>
                                        
                            
                                <div className="col"></div>
                                </div>
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
export default LoginScreen
