import React from 'react'
import './HeroSection.css'
import videoSrc from "/public/video.mp4";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <div className='hero container'>
            <div className="hero-contents">
                <h2>Order your food here</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid itaque laboriosam quis quos ea, tempore labore ab accusantium aliquam dolore cum id, iure sint. Mollitia aperiam deleniti quisquam soluta. Corrupti dolore error sapiente dicta et, mollitia voluptatem reprehenderit voluptates est doloremque! Ratione incidunt adipisci nemo.</p>
                <button
                    className="btn btn-primary"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("food-display")?.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    View Menu
                </button>
            </div>

            <video autoPlay loop muted playsInline className="video-bg">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default HeroSection
