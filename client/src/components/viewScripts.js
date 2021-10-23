import React from 'react'
import {useState,useEffect} from 'react';
import Axios from 'axios';
import '../css/ScriptsScreen.css';

function ViewScripts(props) {
    const [contributor,setcontributor]=useState('');
    const [title,settitle]=useState('')
    const [content,setcontent]=useState('')
    const [email,setemail]=useState('')

    useEffect(()=>{
        Axios.get(`/api/scripts/${props.match.params.id}`)
        .then((script)=>{
            setcontributor(script.data.Contributor)
            settitle(script.data.Title)
            setemail(script.data.Email)
            setcontent(script.data.Content)
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    return (
        <div className="view-scripts-screen">
            <h1> {title} </h1>
            <div className="content-box">
                <p>{content}</p>
            </div>
            <div className="contributor-box">
                <p>{contributor}</p>
                <p>{email}</p>
            </div>
        </div>
    )
}

export default ViewScripts
