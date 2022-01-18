import React from "react";
import "../../css/scriptSlider.css";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import MediaCard from "./ContributedScriptsCard";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ContributedScriptSlider() {
    const [scriptsList, setList] = useState([]);
    const sliderRef = useRef(null);

    let settings = {
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 780,
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
        Axios.get("/api/contribute-scripts")
            .then((result) => {
                if (result.data.contributes) {
                    // let temp;
                    // temp = [result.data.events[0],result.data.events[1],result.data.events[2],result.data.events[3]]
                    setList(result.data.contributes);

                    if(result.data.contributes.length > 4)
                        setList([result.data.contributes[0],result.data.contributes[1],result.data.contributes[2],result.data.contributes[3]]);
                    else
                        setList(result.data.contributes);
                }
            })
            .catch((err) => {
                console.log(err.toString());
            });

    });

    return (
        <div>
            <div className="d-flex justify-content-between p-3">
                <div><h4>Contributed Scripts</h4></div>
                <div style={{float:"right",marginRight:"20px",display:"flex"}}>
                    <div className="prev-event" onClick={() => sliderRef.current.slickPrev()}>
                        <span className="left"></span>
                    </div>
                    <div className="next-event" onClick={() => sliderRef.current.slickNext()}>
                        <span className="right"></span>
                    </div>
                </div>
            </div>
            <h4><hr className={"line"}/></h4>
            <div className="event-screen-scroller-body">
                <div>
                    <div className="album py-5">
                        <div className="container">
                            <div>
                                <Slider ref={sliderRef} {...settings}>
                                    {scriptsList && scriptsList.map((script) => (
                                            <div style={{margin:20}} className="col" key={script._id}>
                                                <MediaCard scriptData={script} />
                                            </div>
                                        )
                                    )}
                                    <div>
                                        <a href={"/view-contributed-scripts"} className={"more-events-style"}> All Contributed Scripts </a>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h4><hr className={"line"}/></h4>
        </div>
    );
}
export default ContributedScriptSlider;
