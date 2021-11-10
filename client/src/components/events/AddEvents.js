import React from 'react'
import {useState} from 'react';
import Axios from 'axios';
import '../../css/eventScreen.css';
function AddEvents() {
    const [presentername,setpresenter]=useState('');
    const [eventtitle,settitle]=useState('');
    const [description,setdescription]=useState('');
    const [date,setdate]=useState(new Date());
    const [eventlink,setlink]=useState('');
    const [imageurl,setimage]=useState('');
    const submitfunction=()=>{
        Axios.post('/api/events',{
            presenter_name:presentername,
            event_title:eventtitle,
            description:description,
            link:eventlink,
            imageUrl:imageurl,
            date:(new Date(date)).toISOString().substr(0,10)
        }).then((result)=>{
            if(result.data.success){
                alert('Event Added Successfully!!');
            }
        }).catch((err)=>{
            console.log(err.toString());
        });
    }
    return (
        <div className="add-events-screen">
            <input type="text" placeholder="Enter Presenter Name" name="presentername" onChange={(e)=>{setpresenter(e.target.value)}}/>
            <input type="text" placeholder="Enter Event Title" name="title" onChange={(e)=>{settitle(e.target.value)}}/>
            <input type="text" placeholder="Enter Description" name="description" onChange={(e)=>{setdescription(e.target.value)}}/>
            <input type="date" placeholder="Enter Date Of Event" name="date" onChange={(e)=>{setdate(e.target.value)}}/>
            <input type="text" placeholder="Enter Event Link" name="link" onChange={(e)=>{setlink(e.target.value)}}/>
            <input type="text" placeholder="Enter Image URL" name="imageurl" onChange={(e)=>{setimage(e.target.value)}}/>
            <button type="submit" onClick={submitfunction}> Submit </button>
        </div>
    )
}

export default AddEvents
