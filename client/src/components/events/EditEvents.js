import React from 'react'
import {useEffect,useState} from 'react';
import Axios from 'axios';
import '../../css/eventScreen.css';

function EditEvents(props) {
    const [presentername,setpresenter]=useState('');
    const [title,settitle]=useState('');
    const [description,setdescription]=useState('');
    const [link,setlink]=useState('');
    const [imageurl,seturl]=useState('');
    const [date,setdate]=useState(new Date());


    const submitfunction =()=>{
        Axios.post(`/api/events/${props.match.params.id}`,{
            presentername: presentername,
            title:title,
            description:description,
            link:link,
            imageurl:imageurl,
            date:new Date(date).toISOString().substr(0,10)
        })
        .then((result)=>{
            if(result.data.success){
                alert('Edited Successfully!!');
            }
        })
        .catch((err)=>{
            console.log(err.toString()); 
        })
    }
    useEffect(()=>{
        Axios.get(`/api/events/${props.match.params.id}`)
        .then((result)=>{
            if(result.data.success){
                setpresenter(result.data.presentername);
                settitle(result.data.title);
                setdescription(result.data.description);
                setlink(result.data.link);
                seturl(result.data.url);
                setdate(result.data.date);
                console.log(result.data.date);
            }
        }).catch((err)=>{
            console.log(err.toString());
        })
    },[])
    return (
        <div className="edit-events-screen">
            {/* <h1>{props.match.params.id}</h1> */}
            <input type="text" placeholder="Enter Presenter Name" name="presentername" value={presentername} onChange={(e)=>{setpresenter(e.target.value)}}/>
            <input type="text" placeholder="Enter Event Title"name="title" value={title} onChange={(e)=>{settitle(e.target.value)}}/>
            <input type="text" placeholder="Enter Event Description"name="description" value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
            <input type="date" placeholder="Enter Date Of Event" name="date" value={new Date(date).toISOString().substr(0,10)} onChange={(e)=>{setdate(e.target.value)}}/>
            <input type="text" placeholder="Enter Event Link" name="link" value={link} onChange={(e)=>{setlink(e.target.value)}}/>
            <input type="text" placeholder="Enter Image URL" name="url" value={imageurl} onChange={(e)=>{seturl(e.target.value)}}/>
            <button type="submit" onClick={submitfunction}>Submit </button>
            <a href="/">Back To Events</a>
        </div>
    )
}

export default EditEvents
