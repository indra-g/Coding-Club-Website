import React from 'react'
import {useState,useEffect} from 'react';
import Axios from 'axios';
import '../../css/eventScreen.css';

function ViewEvents(props) {
    const [presenter,setpresenter]=useState('');
    const [title,settitle]=useState('');
    const [description,setdescription]=useState('');
    const [date,setdate]=useState(new Date());
    const [link,setlink]=useState('');
    const [url,seturl]=useState('');
    useEffect(()=>{
        Axios.get(`/api/events/${props.match.params.id}`)
        .then((result)=>{
            if(result.data.success){
                setpresenter(result.data.presentername)
                settitle(result.data.title)
                setdescription(result.data.description)
                setdate(new Date(result.data.date))
                setlink(result.data.link)
                seturl(result.data.url)
            }
        },[])
        .catch((err)=>{
            if(err){
                console.log(err.toString())
            }
        })
    })
    return (
        <div className="view-events-screen">
            <h1>{title}</h1>
            <div className="body">
                <div className="image-container">
                    <img className="img-view-events" src={url}/>
                </div>
                <div className="content-container">
                    <h3>{presenter}</h3>
                    <h4>{new Date(date).toDateString()}</h4>
                    <h4>{description}</h4>
                    <button className="view-events-button"> <a href={link}>Join Now</a></button>
                </div>
            </div>
        </div>
    )
}

export default ViewEvents
