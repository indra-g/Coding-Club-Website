import React from 'react';
import { useEffect,useState } from 'react';
import '../css/loginScreen.css';
import Axios from 'axios';
import userObj from '../config/user_credentials';
import { useHistory } from 'react-router-dom';
function LoginScreen() {
    const [emailState,setemailState]=useState('');
    const [passwordState,setpasswordState]=useState('');
    const history = useHistory();
    const submitFunction=()=>{
        Axios.post('/api/login',{
            email:emailState,
            password:passwordState
        }).then((result)=>{
            if(result.data.success){
                userObj.username = result.data.username;
                alert('Successfully Logged In');
                history.push("/");
                // Object.freeze(User);
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
        return (

            <div className="login-area">
                <input type="text" name="email" placeholder="Enter Your Email" onChange={(e)=>{setemailState(e.target.value)}}/>
                <input type="password" name="password" placeholder="Enter Your Password" onChange={(e)=>{setpasswordState(e.target.value)}}/>
                <button type="submit" onClick={submitFunction}> Submit </button>
                <a href="/"> Back to Homepage </a>
            </div>
        );
}
export default LoginScreen
