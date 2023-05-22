import { useEffect } from 'react';
import logo from '../imgs/logo.png';
import '../styles/root.css';
import SiteNavbar from './navbar';

export default function Root(){

    useEffect(()=>{
        document.title = 'Job App Tracker';
    },[])

    return (
        <div>
            <SiteNavbar/>
            <canvas id="circuit"></canvas>
            <div className="header">
            <div className="content-container">
                <img src={logo} className="logo" alt="Logo: Briefcase under a magnifying glass"/>
                <h1>Welcome to the Job Apps Tracker!</h1>
                <p>A quick and easy way to keep track of your job applications in one place: simply create an account and start adding jobs to your list!</p>
                <p style={{fontSize:'0.8em'}}>Background Image Attribution: <a href="https://www.vecteezy.com/free-vector/black">Dynamic Circuit by Karthik Sankar</a></p>
            </div>
            </div>
        </div>
    )
}