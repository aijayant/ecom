import React from 'react'
import './Announcement.css'
import { IoMdPricetag } from "react-icons/io";
import { IoSparkles } from "react-icons/io5";
import { MdHeadsetMic } from "react-icons/md";

const Announcement = () => {
  return (
    
        <div className="announcement-content">
           <div className="delivery">
            <p><IoMdPricetag /> Free delivery on order above <span>₹499</span></p>
           </div>

           <div className="trust">
            <p><IoSparkles style={{color:"gold"}}/> Trusted by 10,000+ customer</p>
           </div>

           <div className="support">
            <p><MdHeadsetMic /> support 24/7</p>
           </div>
        
    </div>
  )
}

export default Announcement