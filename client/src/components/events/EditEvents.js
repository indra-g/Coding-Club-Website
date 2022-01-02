import React from 'react'
import {useEffect,useState} from 'react';
import Axios from 'axios';
import '../../css/EditEvents.css';
import logo from "../../assets/img/logo.png";
import {useHistory} from "react-router-dom";

function EditEvents(props) {

    const history = useHistory()
    const [presentername,setpresenter]=useState('');
    const [eventtitle,settitle]=useState('');
    const [description,setdescription]=useState('');
    const [date,setdate]=useState(null);
    const [eventlink,setlink]=useState('');
    const [imageurl,seturl]=useState('');
    const [selectedimage, setselectedimage] = useState(null);
    const [preview, setpreview] = useState();
    const [redirect, setRedirect] = useState(false);

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

        if (!selectedimage) {
            setpreview(undefined)
            return
        }
        const objecturl = URL.createObjectURL(selectedimage)
        setpreview(objecturl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objecturl)
    },[props.match.params.id,selectedimage])

    const onselectimage = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setselectedimage(undefined)
            return
        }
        setselectedimage(e.target.files[0])
    }

    const submitfunction =()=>{

        // Axios.post(`/api/events/${props.match.params.id}`,{
        //     presentername: presentername,
        //     title:title,
        //     description:description,
        //     link:link,
        //     imageurl:imageurl,
        //     date:new Date(date).toISOString().substr(0,10)
        // })
        // .then((result)=>{
        //     if(result.data.success){
        //         alert('Edited Successfully!!');
        //     }
        // })
        // .catch((err)=>{
        //     console.log(err.toString());
        // })

        if(presentername===''){alert("Presenter Name Could not be Empty.");return;}
        if(eventtitle===''){alert("Event Title Name Could not be Empty.");return;}
        if(description===''){alert("Event Description Name Could not be Empty.");return;}
        if(eventlink===''){alert("Event Link Name Could not be Empty.");return;}
        // if(selectedimage===null){alert("No Image Uploaded");return;}
        if(date===null){alert("Event Date Could not be Empty.");return;}

        const record = new FormData();
        record.append("presenter_name",presentername);
        record.append("event_title",eventtitle);
        record.append("description",description);
        record.append("link",eventlink);
        if(selectedimage!==null) record.append('image',selectedimage,presentername);
        record.append('date',(new Date(date)).toISOString().substr(0,10));

        Axios.post(`/api/events/${props.match.params.id}`,record)
            .then((result)=>{
                if(result.data.success){
                    alert('Edited Successfully!!');
                    setRedirect(true);
                }
            })
            .catch((err)=>{
                console.log(err.toString());
            })
    }

    if(redirect){
        history.push('/allEvents');
    }

    return (
        // <div className="edit-events-screen">
        //     {/* <h1>{props.match.params.id}</h1> */}
        //     <input type="text" placeholder="Enter Presenter Name" name="presentername" value={presentername} onChange={(e)=>{setpresenter(e.target.value)}}/>
        //     <input type="text" placeholder="Enter Event Title"name="title" value={title} onChange={(e)=>{settitle(e.target.value)}}/>
        //     <input type="text" placeholder="Enter Event Description"name="description" value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
        //     <input type="date" placeholder="Enter Date Of Event" name="date" value={new Date(date).toISOString().substr(0,10)} onChange={(e)=>{setdate(e.target.value)}}/>
        //     <input type="text" placeholder="Enter Event Link" name="link" value={link} onChange={(e)=>{setlink(e.target.value)}}/>
        //     <input type="text" placeholder="Enter Image URL" name="url" value={imageurl} onChange={(e)=>{seturl(e.target.value)}}/>
        //     <button type="submit" onClick={submitfunction}>Submit </button>
        //     <a href="/">Back To Events</a>
        // </div>

    <div className="content-background">
        <div className="modal-body row">
            <div className="col-md-6">
                <div><a href={'/events-home'} className={'back-to-home'}> &lt; Back to Home</a></div>
                <img className="logo" src={logo} alt="logo"></img>
                <h4 className="title">Psg Tech Coding Club</h4>
                <div className={"label-style"}>Presenter's name</div>
                <input type="text" className={"inputField"} value={presentername} placeholder="Enter Presenter Name" name="presentername" onChange={(e)=>{setpresenter(e.target.value)}} required={true}/>
                <div className={"label-style"}>Event Title</div>
                <input type="text" className={"inputField"} value={eventtitle} placeholder="Enter Event Title" name="title" onChange={(e)=>{settitle(e.target.value)}} required={true}/>
                <div className={"label-style"}>Description</div>
                <input type="text" className={"inputField"} value={description} placeholder="Enter Description" name="description" onChange={(e)=>{setdescription(e.target.value)}} required={true}/>
                <div className={"label-style"}>Date</div>
                <input type="date" className={"inputField"} placeholder="Enter Date Of Event" name="date" value={new Date(date).toISOString().substr(0,10)} onChange={(e)=>{setdate(e.target.value)}} required={true}/>
                <div className={"label-style"}>Link</div>
                <input type="text" className={"inputField"} value={eventlink} placeholder="Enter Event Link" name="link" onChange={(e)=>{setlink(e.target.value)}} required={true}/>
                {/*<div className={"label-style"}>Image Url</div>*/}
                {/*<input type="text" placeholder="Enter Image URL" name="imageurl" onChange={(e)=>{setimage(e.target.value)}} required={true}/>*/}
                <div><button type="submit" className={"button-style"} onClick={submitfunction}> Submit </button></div>
                {/*<TextField id="standard-basic" label="Standard" variant="standard" />*/}
            </div>
            <div className="col-md-6">
                {selectedimage?
                    <img src={preview} alt="loaded event" className={'image-style'}/>
                    : <img src={imageurl} alt="loaded event" className={'image-style'}/>}
                <input type='file' className={"custom-file-input"} onChange={onselectimage} required={true}/>
            </div>
        </div>
    </div>
    )
}

export default EditEvents
