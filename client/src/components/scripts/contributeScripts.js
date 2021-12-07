import React from 'react'
import {useState} from 'react';
import Axios from 'axios';
import '../../css/contributeScriptsScreen.css';
function ContributeScripts() {
    const [contributor,setcontributor]=useState('')
    const [title,settitle]=useState('')
    const [content,setcontent]=useState('')
    const [email,setemail]=useState('')
    const submitfunction = ()=>{
        Axios.post('/api/contribute-scripts',{
            'contributor':contributor,
            'title':title,
            'content':content,
            'email':email
        })
        .then((result)=>{
            if(result.data.success){
                alert('Script Contributed!!');
            }
        })
        .catch((err)=>{
            console.log(err.toString())
        })
    }
    return (
        <div className="contribute-scripts-screen">
            <input type="text" placeholder="Enter Contributor's Name" name="contributor" value={contributor} onChange={(e)=>{setcontributor(e.target.value)}}/>
            <input type="text" placeholder="Enter Title" name="=title" value={title} onChange={(e)=>{settitle(e.target.value)}}/>
            <input type="text" placeholder="Enter Email ID" name="email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            <textarea placeholder="Enter Content" value={content} onChange={(e)=>{setcontent(e.target.value)}}></textarea>
            <button onClick={submitfunction}> Submit </button>
        </div>
    )
}

export default ContributeScripts
