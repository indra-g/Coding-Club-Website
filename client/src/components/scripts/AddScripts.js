import React from 'react'
import {useState,useEffect} from 'react';
import Axios from 'axios';
import '../../css/ScriptsScreen.css';

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
            <div className="modal-body row">
                <div className="col-md-6">
                    <div className={"label-style"}>Contributor's name</div>
                    <input placeholder="Enter Contributor Name" name='contributor' onChange={(e)=>{setcontributor(e.target.value)}}/>
                    <div className={"label-style"}>Title</div>
                    <input placeholder="Enter Title" name='title' onChange={(e)=>{settitle(e.target.value)}}/>
                    <div className={"label-style"}>Email</div>
                    <input placeholder="Enter Email" name='email' onChange={(e)=>{setemail(e.target.value)}}/>
                    <div className={"label-style"}>Content</div>
                    <textarea placeholder="Enter content" name='content' onChange={(e)=>{setcontent(e.target.value)}}/>
                    <button type="submit" onClick={submitfunction}> Submit </button>
                </div>
            </div>
        </div>
    )
}

export default AddScripts 
