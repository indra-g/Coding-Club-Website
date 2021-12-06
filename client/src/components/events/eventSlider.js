import React from "react";
//import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/eventScreen.css";
//import EventCard from "./EventCard";
//import ImgMediaCard from "./card";
//import MultiActionAreaCard from "./card";
import { useState, useEffect } from "react";
import Axios from "axios";
//import { ScrollMenu } from "react-horizontal-scrolling-menu";
//import { LeftArrow, RightArrow } from "./arrows";
import MediaCard from "./card";

function EventSlider() {
  const [eventsList, setList] = useState([]);
  //const [update, setupdate] = useState(1);
  // const deletefunction = (id) => {
  //   Axios.delete(`/api/events/${id}`)
  //     .then((result) => {
  //       if (result.data.success) {
  //         setupdate(update + 1);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.toString());
  //     });
  // };
  useEffect(() => {
    Axios.get("/api/events")
      .then((result) => {
        if (result.data.success) {
          let temp;
          temp = [result.data.events[0],result.data.events[1],result.data.events[2]]
          setList(temp);
        }
      })
      .catch((err) => {
        console.log(err.toString());
      });
  });

  // const settings = {
  //   dots: true,
  //   speed: 3000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  // const get_slider = () => {
  //   if (eventsList && eventsList.length > 0) {
  //     return eventsList.map((event) => {
  //       return (
  //         <EventCard event={event} key={event._id} deletefun={deletefunction} />
  //       );
  //     });
  //   }
  // };

  // if(eventsList && eventsList.length>0){
  //     return(
  //         <div className="events-main-scroller">
  //             <Slider {...settings}>
  //                 {get_slider()}
  //             </Slider>
  //         </div>
  //     );
  // }else{
  //     return(<div>
  //         No Events Added
  //     </div>);
  // }

  return (
    <div>
      <div className="album py-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {/*<div className="col">*/}
            {/*  <MultiActionAreaCard />*/}
            {/*</div>*/}
            {/*<div className="col">*/}
            {/*  <MultiActionAreaCard />*/}
            {/*</div>*/}
            {/*<div className="col">*/}
            {/*  <MultiActionAreaCard />*/}
            {/*</div>*/}
            {eventsList &&
            eventsList.map((event) => {
              return (
                  <div className="col" key={event._id}>
                    <MediaCard eventData={event} />
                  </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
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
