import { Typography } from "@mui/material";
//import React from "react"
import { Link } from "react-router-dom";

const Logo = () => {
    
    return <div style={{
        display: 'flex',
        marginRight: "auto",
        alignItems: 'center',
        gap: "8px"}}>
            <Link to={"/"}>
                <img src="cube-icon.png"
                alt="cube-icon"
                width={'30px'}
                height={'30px'}
                className=""/>
            </Link>{" "}
            <Typography sx={{display: {md: "block", sm: "none", xs: "none"}, mr: "auto", fontWeight: "800", textShadow: "2px 2px 20px #000"}}>
                <span style={{fontSize: "18px"}}>CUBING</span>-RAG
            </Typography>
        </div>;

};

export default Logo;