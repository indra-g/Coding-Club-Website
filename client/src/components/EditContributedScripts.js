import React from 'react'
import {useState,useEffect} from 'react';
import Axios from 'axios';
import '../css/contributeScriptsScreen.css';
function EditContributedScripts(props) {
    const [contributor,setcontributor]=useState('')
    const [title,settitle]=useState('')
    const [content,setcontent]=useState('')
    const [email,setemail]=useState('')
    const [acceptor,setacceptor]=useState('')
    const submitfunction=()=>{
        Axios.post(`/api/contribute-scripts/${props.match.params.id}`,{
            'contributor':contributor,
            'title':title,
            'content':content,
            'email':email,
            'acceptor':acceptor
        })
        .then((result)=>{
            if(result.data.success){
                alert('Edited Successfully!!!')
            }
            else{
                console.log(result.data.message)
            }
        })
        .catch((err)=>{
            console.log(err.toString())
        })
    }
    useEffect(()=>{
        Axios.get(`/api/contribute-scripts/${props.match.params.id}`).then((result)=>{
                setcontributor(result.data.Contributor)
                settitle(result.data.Title)
                setcontent(result.data.Content)
                setemail(result.data.Email)
                setacceptor(result.data.Acceptor)
        })
        .catch((err)=>{
            console.log(err.toString())
        })
    },[])
    return (
        <div className="edit-contribute-screen">
            <input type="text" placeholder="Enter Contributor" value={contributor} onChange={(e)=>{setcontributor(e.target.value)}}/>
            <input type="text" placeholder="Enter Title" value={title} onChange={(e)=>{settitle(e.target.value)}}/>
            <input type="text" placeholder="Enter Email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            <textarea  value={content} onChange={(e)=>{setcontent(e.target.value)}}/>
            <button type="submit" onClick={submitfunction}>Submit </button>
        </div>
    )
}

export default EditContributedScripts
