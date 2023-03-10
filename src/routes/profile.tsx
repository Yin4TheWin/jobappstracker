import {useState, useEffect} from 'react'

import {firebase} from '../firebase'
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getDatabase } from "firebase/database";

import SiteNavbar from './navbar';
import Login from '../components/login'
import MyLists from '../components/myLists';

import '../styles/profile.css'

export default function Profile(){
    const [auth] = useState(getAuth(firebase));
    const [user, setUser] = useState(auth.currentUser);
    const [db] = useState(getDatabase(firebase))

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
        <div className="background">
            <SiteNavbar/>
            {user?<MyLists auth={auth} user={user} db={db}/>:<Login/>}
        </div>
    )
}