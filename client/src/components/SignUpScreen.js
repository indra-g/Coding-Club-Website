import React from 'react'
import '../css/signupScreen.css';
import {useState,useEffect} from 'react';
import Axios  from 'axios';
function SignUpScreen() {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [username,setusername]=useState('');
    const [name,setname]=useState('');

    const submitfunction = ()=>{
        Axios.post('/api/login/add',{
            email:email,
            password:password,
            username:username,
            name:name
        }).then((result)=>{
            if(result.data.success){
                alert('Successfully Added!!');
            }
            else{
                alert('Not Added!!');
            }
        }).catch((err)=>{
            console.log(err.toString());
        });
    }
    return (
        <div className="signup-screen">
            <input type="text" placeholder="Enter Name" name="name" onChange={(e)=>{setname(e.target.value)}}/>
            <input type="text" placeholder="Enter NickName" name="username" onChange={(e)=>{setusername(e.target.value)}}/>
            <input type="text" placeholder="Enter Email" name="email" onChange={(e)=>{setemail(e.target.value)}}/>
            <input type="password" placeholder="Enter Password" name="password" onChange={(e)=>{setpassword(e.target.value)}}/>
            <button type="submit" onClick={submitfunction}> Submit </button>
        </div>
    )
}

export default SignUpScreen
