import React, {useEffect} from 'react'
import {useState} from 'react';
import Axios from 'axios';
import '../../css/AddEvents.css';
import logo from "../../assets/img/logo.png";
import {useHistory} from "react-router-dom";

function AddEvents() {
    const history = useHistory()
    const [presentername,setpresenter]=useState('');
    const [eventtitle,settitle]=useState('');
    const [description,setdescription]=useState('');
    const [date,setdate]=useState(null);
    const [eventlink,setlink]=useState('');
    //const [imageurl,setimage]=useState('');
    const [selectedimage, setselectedimage] = useState(null);
    const [preview, setpreview] = useState();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!selectedimage) {
            setpreview(undefined)
            return
        }
        const objecturl = URL.createObjectURL(selectedimage)
        setpreview(objecturl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objecturl)
    }, [selectedimage]);

    const onselectimage = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setselectedimage(undefined)
            return
        }
        setselectedimage(e.target.files[0])
    }

    const submitfunction=()=>{
        // Axios.post('/api/events',{
        //     presenter_name:presentername,
        //     event_title:eventtitle,
        //     description:description,
        //     link:eventlink,
        //     imageUrl:imageurl,
        //     date:(new Date(date)).toISOString().substr(0,10)
        // }).then((result)=>{
        //     if(result.data.success){
        //         alert('Event Added Successfully!!');
        //     }
        // }).catch((err)=>{
        //     console.log(err.toString());
        // });

        if(presentername===''){alert("Presenter Name Could not be Empty.");return;}
        if(eventtitle===''){alert("Event Title Name Could not be Empty.");return;}
        if(description===''){alert("Event Description Name Could not be Empty.");return;}
        if(eventlink===''){alert("Event Link Name Could not be Empty.");return;}
        if(selectedimage===null){alert("No Image Uploaded");return;}
        if(date===null){alert("Event Date Could not be Empty.");return;}

        const record = new FormData();
        record.append("presenter_name",presentername);
        record.append("event_title",eventtitle);
        record.append("description",description);
        record.append("link",eventlink);
        record.append('image',selectedimage,presentername);
        record.append('date',(new Date(date)).toISOString().substr(0,10));



        Axios.post('/api/events',record).then((result)=>{
            if(result.data.success){
                alert('Event Added Successfully!!');
                setRedirect(true);
            }
        }).catch((err)=>{
            console.log(err.toString());
            alert(err.toString());
        });
    }

    if(redirect){
        history.push('/allEvents');
    }

    return (
        <div className="content-background">
                <div className="modal-body row">
                    <div className="col-md-6">
                        <div><a href={'/events-home'} className={'back-to-home'}> &lt; Back to Home</a></div>
                        <img className="logo" src={logo} alt="logo"></img>
                        <h4 className="title">Psg Tech Coding Club</h4>
                        <div className={"label-style"}>Presenter's name</div>
                        <input type="text" className={"inputField"} placeholder="Enter Presenter Name" name="presentername" onChange={(e)=>{setpresenter(e.target.value)}} required={true}/>
                        <div className={"label-style"}>Event Title</div>
                        <input type="text" className={"inputField"} placeholder="Enter Event Title" name="title" onChange={(e)=>{settitle(e.target.value)}} required={true}/>
                        <div className={"label-style"}>Description</div>
                        <input type="text" className={"inputField"} placeholder="Enter Description" name="description" onChange={(e)=>{setdescription(e.target.value)}} required={true}/>
                        <div className={"label-style"}>Date</div>
                        <input type="date" className={"inputField"} placeholder="Enter Date Of Event" name="date" onChange={(e)=>{setdate(e.target.value)}} required={true}/>
                        <div className={"label-style"}>Link</div>
                        <input type="text" className={"inputField"} placeholder="Enter Event Link" name="link" onChange={(e)=>{setlink(e.target.value)}} required={true}/>
                        {/*<div className={"label-style"}>Image Url</div>*/}
                        {/*<input type="text" placeholder="Enter Image URL" name="imageurl" onChange={(e)=>{setimage(e.target.value)}} required={true}/>*/}
                        <div><button type="submit" className={"button-style"} onClick={submitfunction}> Submit </button></div>
                        {/*<TextField id="standard-basic" label="Standard" variant="standard" />*/}
                    </div>
                    <div className="col-md-6">
                        {selectedimage?
                            <img src={preview} alt="loaded event" className={'image-style'}/>
                            : <img src={logo} alt="loaded event" className={'image-style'}/>}
                        <input type='file' className={"custom-file-input"} onChange={onselectimage} required={true}/>
                    </div>
                </div>
        </div>
    )
}

export default AddEvents
