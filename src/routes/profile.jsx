import {useState, useEffect} from 'react'

import {firebase} from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import SiteNavbar from './navbar';
import Login from '../components/login'
import myLists from '../components/myLists';

import '../styles/profile.css'

export default function Profile(){
    const [auth] = useState(getAuth(firebase));
    const [user, setUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth, (newUser) => {
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
            {user?<myLists/>:<Login/>}
        </div>
    )
}