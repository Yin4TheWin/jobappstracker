import logo from '../imgs/logo.png';
import '../styles/root.css';
import SiteNavbar from './navbar';
export default function Profile(){
    return (
        <div>
            <SiteNavbar/>
            <div className="header">
            <div className="content-container">
                <img src={logo} className="logo" alt="Logo: Briefcase under a magnifying glass"/>
                <h1>Welcome to the Job Apps Tracker!</h1>
                <p>A quick and easy way to keep track of your job applications in one place: simply create an account and start adding jobs to your list!</p>
            </div>
            </div>
        </div>
    )
}