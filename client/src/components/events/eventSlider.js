import React from "react";
import "../../css/eventSlider.css";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import MediaCard from "./card";

import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

function EventSlider() {
    const [eventsList, setList] = useState([]);
    const sliderRef = useRef(null);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
    Axios.get("/api/events")
      .then((result) => {
        if (result.data.success) {
          // let temp;
          // temp = [result.data.events[0],result.data.events[1],result.data.events[2],result.data.events[3]]
          setList(result.data.events);
        }
      })
      .catch((err) => {
        console.log(err.toString());
      });

    });

    return (
      <div>
        <div className="event-screen-scroller-heading justify-content-between">
            <h4 className="event-screen-scroller-heading-title">Events</h4>
            <div style={{float:"right",marginRight:"20px",display:"flex"}}>
                <div className="prev-event" onClick={() => sliderRef.current.slickPrev()}><ArrowBackIos/></div>
                <div className="next-event" onClick={() => sliderRef.current.slickNext()}><ArrowForwardIos/></div>
                {/*<button className="prev-event"><i className="fa fa-angle-left"/></button>*/}
                {/*<button className="next-event"><i className="fa fa-angle-right"/></button>*/}
            </div>
        </div>
        <hr/>
        <div className="event-screen-scroller-body">
          <div>
            <div className="album py-5">
              <div className="container">
                <div>
                    <Slider ref={sliderRef} {...settings}>
                        {eventsList && eventsList.map((event) => (
                            <div style={{margin:20}} className="col" key={event._id}>
                              <MediaCard eventData={event} />
                            </div>
                            )
                        )}
                    </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr/>
      </div>
    );
}
export default EventSlider;
