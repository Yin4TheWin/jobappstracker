import { useEffect } from 'react';
// import logo from '../imgs/logo.png';
import '../styles/root.css';
import SiteNavbar from './navbar';
import { Typography } from '@mui/material';

export default function Root(){

    useEffect(()=>{
        document.title = 'Job App Tracker';
    },[])

    return (
        <div>
            <SiteNavbar/>
            <div className="header">
            <div className="content-container">
                {/* <img src={logo} className="logo" alt="Logo: Briefcase under a magnifying glass"/> */}
                <h1>  
                    <Typography
                    variant="h2"
                    sx={{
                        backgroundcolor: "primary",
                        backgroundImage: `linear-gradient(to left top,#17acff ,#ff68f0)`,
                        backgroundSize: "100%",
                        backgroundRepeat: "repeat",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline",
                        fontWeight: "400",
                        fontSize: "3.2rem",
                    }}
                    >
                    Finally,
                    </Typography> 
                    {" "} an organized job search.</h1>
                <p>Never lose track of a job application's status or details ever again: simply create an account and start adding jobs to your list!</p>
            </div>
            </div>
        </div>
    )
}