import React from 'react'
import {useState,useEffect} from 'react';
import Axios from 'axios';

function AddScripts() {
    const [contributor,setcontributor]=useState('');
    const [title,settitle]=useState('');
    const [content,setcontent]=useState('');
    const [email,setemail]=useState('');
    const submitfunction = ()=>{
        Axios.post('/api/scripts',{
            contributor:contributor,
            title:title,
            content:content,
            email:email,
        }).then((result)=>{
            if(result.data.success){
                alert("Scripts Contributed");
            }
        }).catch((err)=>{
            console.log(err.toString());
        });
    }
    return (
        <div className='add-scripts'>
            <input placeholder="Enter Contributor Name" name='contributor' onChange={(e)=>{setcontributor(e.target.value)}}/>
            <input placeholder="Enter Title" name='title' onChange={(e)=>{settitle(e.target.value)}}/>
            <input placeholder="Enter Email" name='email' onChange={(e)=>{setemail(e.target.value)}}/>
            <textarea placeholder="Enter content" name='content' onChange={(e)=>{setcontent(e.target.value)}}/>
            <button type="submit" onClick={submitfunction}> Submit </button>
        </div>
    )
}

export default AddScripts 
