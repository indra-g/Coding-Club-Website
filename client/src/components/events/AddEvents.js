import React, {useEffect} from 'react'
import {useState} from 'react';
import Axios from 'axios';
import '../../css/eventScreen.css';
import logo from "../../assets/img/logo.png";

function AddEvents() {
    const [presentername,setpresenter]=useState('');
    const [eventtitle,settitle]=useState('');
    const [description,setdescription]=useState('');
    const [date,setdate]=useState(new Date());
    const [eventlink,setlink]=useState('');
    const [imageurl,setimage]=useState('');
    const [selectedimage, setselectedimage] = useState();
    const [preview, setpreview] = useState();

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
            }
        }).catch((err)=>{
            console.log(err.toString());
        });
    }

    return (
        <div className="add-events-screen">
            <div className="modal-body row">
                <div className="col-md-6">
                    <div className={"label-style"}>Presenter's name</div>
                    <input type="text" placeholder="Enter Presenter Name" name="presentername" onChange={(e)=>{setpresenter(e.target.value)}}/>
                    <div className={"label-style"}>Event Title</div>
                    <input type="text" placeholder="Enter Event Title" name="title" onChange={(e)=>{settitle(e.target.value)}}/>
                    <div className={"label-style"}>Description</div>
                    <input type="text" placeholder="Enter Description" name="description" onChange={(e)=>{setdescription(e.target.value)}}/>
                    <div className={"label-style"}>Date</div>
                    <input type="date" placeholder="Enter Date Of Event" name="date" onChange={(e)=>{setdate(e.target.value)}}/>
                    <div className={"label-style"}>Link</div>
                    <input type="text" placeholder="Enter Event Link" name="link" onChange={(e)=>{setlink(e.target.value)}}/>
                    {/*<div className={"label-style"}>Image Url</div>*/}
                    {/*<input type="text" placeholder="Enter Image URL" name="imageurl" onChange={(e)=>{setimage(e.target.value)}}/>*/}
                    <button type="submit" onClick={submitfunction}> Submit </button>
                    {/*<TextField id="standard-basic" label="Standard" variant="standard" />*/}
                </div>
                <div className="col-md-6">
                    {selectedimage?
                        <img src={preview} alt="loaded image" className={'image-style'}/>
                        : <img src={logo} alt="loaded image" className={'image-style'}/>}
                        <input type='file' className={"custom-file-input"} onChange={onselectimage} />
                </div>
            </div>
        </div>
    )
}

export default AddEvents
