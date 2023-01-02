import '../styles/root.css';
import SiteNavbar from './navbar';
import Login from '../components/login'
import '../styles/profile.css'

export default function Profile(){
    return (
        <div>
            <SiteNavbar/>
            <Login/>
        </div>
    )
}