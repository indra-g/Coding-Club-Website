import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../css/eventScreen.css';
import EventCard from "./EventCard";
import {useState,useEffect} from 'react';
import Axios from 'axios';

function EventSlider(){
    const [eventsList,setList]=useState([]);
    const [update,setupdate]=useState(1);
    const deletefunction=(id)=>{
        Axios.delete(`/api/events/${id}`)
        .then((result)=>{
            if(result.data.success){
                setupdate(update+1);
            }
        })
        .catch((err)=>{
            console.log(err.toString());
        })
    }
    useEffect(()=>{
        Axios.get('/api/events').then((result)=>{
            if(result.data.success){
                setList(result.data.events);
            }
        })
        .catch((err)=>{
            console.log(err.toString());
        });
    },[update])

    const settings = {
        dots: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    
    const get_slider = ()=>{
        if(eventsList && eventsList.length>0){
            return eventsList
            .map((event)=>{
                return (<EventCard event={event} key={event._id} deletefun={deletefunction}/>);
            });
        }
    }
    if(eventsList && eventsList.length>0){
        return(
            <div className="events-main-scroller">
                <Slider {...settings}>
                    {get_slider()}
                </Slider>
            </div>
        );
    }else{
        return(<div>
            No Events Added
        </div>);
    }
}
export default EventSlider;
// export default class EventSlider extends Component {
//     render() {
//         const settings = {
//             dots: true,
//             speed: 3000,
//             slidesToShow: 2.5,
//             slidesToScroll: 2.5
//         };
        
//         const get_slider = ()=>{
//             return [1,2,3,4,5,6,7]
//             .map((url)=>{
//                 return (<EventCard/>);
//             });
//         }
//         return (
//             <div className="events-main-scroller">
//             <Slider {...settings}>
//                 {get_slider()}
//             </Slider>
//             </div>
//             );
//         }
//     }
    