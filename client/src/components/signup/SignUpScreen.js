import React from 'react'
import '../../css/signupScreen.css';
import {useState} from 'react';
import Axios from 'axios';
import '../../css/signupScreen.css'
import validator from 'validator'
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/img/Finalwhitelogo.png'
import userObj from "../../config/user_credentials";


function SignUpScreen() {
    const [emailid,setEmailid]=useState('');
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const [error,setError]=useState('');
    const [showError,setShowError]=useState(false);
    const history = useHistory();

    //For Username Validation
    const [nameError,setNameError] = useState(null);
    const validateName = (name) => {
        (name.length >= 3)?setNameError(null):setNameError("Invalid Name, Need atleast three characters");
    }

    // For Email Validation
    const [emailError, setEmailError] = useState(null)
    const validateEmail = (email) => {
        //var email = e.target.value

        if (validator.isEmail(email)) {
            setEmailError(null)
        } else {
            setEmailError('Enter valid Email!')
        }
    }

    // For Password Validation
    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorColor, setPasswordErrorColor] = useState('red');

    const validatePassword = (value) => {

        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setPasswordError('Strong Password!')
            setPasswordErrorColor('green')
        } else {
            setPasswordError('Password is weak!')
            setPasswordErrorColor('red')
        }
    }

    const submitfunction = ()=>{

        if (emailid !== "" && password !== "") {
            if (emailid.includes("@psgtech.ac.in")) {

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
                                    <input type="text" value={username} onChange={e => setUsername(validateName(e.target.value))} className="form-control inputField" id="UserName1"/>
                                    {nameError?<p>{nameError}</p>:null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label formLabel">Email address</label>
                                    <input type="email" value={emailid} onChange={e => setEmailid(validateEmail(e.target.value))} className="form-control inputField" id="Email1"/>
                                    {emailError?<p>Invalid Email!</p>:null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label formLabel">Password</label>
                                    <input type="password" value={password} onChange={e => setPassword(validatePassword(e.target.value))} className="form-control inputField" id="Password1"/>
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: passwordErrorColor,
                                    }}>{passwordError}</span>
                                    {(passwordError === "Password is weak!")?
                                        <p>Minimum of 8 characters needed with atleast one character belonging to lowercase, uppercase, numbers and symbols. </p>
                                        :null
                                    }
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
