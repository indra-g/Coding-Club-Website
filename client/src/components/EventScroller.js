import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../css/eventScreen.css';
import articles from '../assets/img/articles2.jpg';
import contribute from '../assets/img/contribute.jpg';
import events from '../assets/img/events.jpg';
import '../js/eventScreen';
export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            fade:true,
            autoplay:true,
            autoplaySpeed:3000,
            speed: 3000,
            slidesToShow: 1.5,
            slidesToScroll: 1.5
        };
        
        const get_slider = ()=>{
            return [events,articles,contribute]
            .map((url)=>{
                return (<div className="slider-image">
                   <img src={url}/>
                </div>);
            });
        }
        return (
            <div className="scroller-home">
            <Slider {...settings}>
                {get_slider()}
            </Slider>
            </div>
            );
        }
    }
    