import {useState, useEffect} from 'react'

import {firebase, db} from '../globals/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import SiteNavbar from './Navbar';
import Login from '../components/Login'
import MyLists from '../components/MyLists';

import '../styles/Profile.css'

export default function Profile(){
    const [auth] = useState(getAuth(firebase));
    const [user, setUser] = useState(auth.currentUser);

    useEffect(()=>{
        onAuthStateChanged(auth, (newUser) => {
          localStorage.setItem('auth', newUser?newUser.uid:"");
          if (newUser) {
            setUser(newUser)
          } else {
            setUser(null)
          }
        });
    }, [user, auth]);

    return (
        <div>
            <SiteNavbar/>
            {
            localStorage.getItem('auth')!==null && localStorage.getItem('auth')!.length>0 ?
            <MyLists auth={auth} user={user} db={db}/>:
            <Login/>
            }
        </div>
    )
}