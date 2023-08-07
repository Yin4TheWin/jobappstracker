import { useEffect } from 'react';
// import logo from '../imgs/logo.png';
import '../styles/Root.css';
import SiteNavbar from './Navbar';
import { Grid, Typography } from '@mui/material';
import MediaCard from '../components/general/MediaCard';

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
                <p>Never lose track of a job application's status or its details ever again.</p>
            </div>
            <Grid container rowSpacing={1} columnSpacing={4} sx={{margin: 'auto', width: 'auto'}}>
                <Grid item xs={12} md={4}>
                    <MediaCard title="Drag n' Drop" alt="Drag n' Drop" description="Create cards for your job applications, then drag and drop them between four categories: applied, interviewing, rejected, and offer." imageLink="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <MediaCard title="Made for Job Apps" alt="Made for Job Apps" description="Each job card contains info fields built with your job search in mind: deadlines, recruiter contact, application link, level of priority, and more!" imageLink="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg"/>
                </Grid>
                <Grid item xs={12} md={4}>
                <MediaCard title="Share (or don't!)" alt="Share (or don't!)" description="Easily toggle your list between private and public: while on public, simply copy paste your job list's link to your friends, and they can view it!" imageLink="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg"/>
                </Grid>
            </Grid>
            </div>
        </div>
    )
}