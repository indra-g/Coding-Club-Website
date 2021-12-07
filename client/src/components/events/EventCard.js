import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
function EventCard({event,deletefun}) {
    const [title,settitle]=useState('')
    const [presenter,setpresenter]=useState('');
    const [link,setlink]=useState('');
    const [url,seturl]=useState('');
    const deletefunction = deletefun;
    
    useEffect(()=>{
        settitle(event.EventTitle);
        setpresenter(event.PresenterName);
        setlink(event.EventLink);
        seturl(event.ImageUrl);
        console.log(title,presenter);
    },[]);
    // 'https://images.pexels.com/photos/7551752/pexels-photo-7551752.jpeg?cs=srgb&dl=pexels-rodnae-productions-7551752.jpg&fm=jpg'
    return (
        <div className="event-card">
            <div className="event-card-header">
                <a href={`/view-event/${event._id}`}>
                <img alt="Event Image" className='event-header-image' src={url} /></a>
            </div>
            <div className="event-card-body">
                <h4 className="event-title">{title}</h4><br/>
                <h5 className="event-presenter-title">Presented By</h5>
                <h5 className="event-presenter-value">{presenter}</h5><br/>
                <a href={`${link}`} className="event-btn btn btn-dark">Join Now</a>
                <div className="card-buttons">
                    <button><Link to={`/edit-event/${event._id}`}> Edit </Link></button>
                    <button onClick={()=>{deletefunction(event._id)}}> Delete </button>
                </div>
            </div>
        </div>
    );
}

export default EventCard
