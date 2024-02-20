// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img1 from "../../assets/images/Eco jpg for motion-01.jpg";
import img2 from "../../assets/images/Eco jpg for motion-02.jpg";
import img3 from "../../assets/images/Eco jpg for motion-03.jpg";
import img4 from "../../assets/images/Eco jpg for motion-04.jpg";
import img5 from "../../assets/images/Eco jpg for motion-05.jpg";
import img6 from '../../assets/images/Eco jpg for motion-06.jpg';
import "../Home/Css/Home.css";

const Banner = () => {
    const images = [
        img1, img2, img3, img4, img5, img6
    ];
    return (

        < div className='max-h-screen overflow-hidden my-2 lg:block'>
            <Zoom scale={0.75} indicators={true} duration={3500} cssClass=' -z-40'>
                {images.map((each, index) => (
                    <div key={index} style={{ width: "100%" }} className='card card-compact bg-base-100 shadow-xl min-h-full'>
                        <div className='card-body' id='Slide'>
                            <img style={{ objectFit: "cover", width: "98%", height: "90%", borderRadius: "15px" }} alt="Slide Image" src={each} className='mx-auto' />
                        </div>
                    </div>
                ))}
            </Zoom>
        </div>
    );
};

export default Banner;


