import { onValue, ref, getDatabase } from "firebase/database"
import { useEffect, useState } from "react"
import { useLoaderData, useParams } from "react-router-dom"
import { firebase } from "../firebase"

import '../styles/listview.css'
import SiteNavbar from "./navbar"

export default function ListView(){
    const {username, listId} = useParams()
    const userListRef='users/'+username+'/listItems/'+listId
    const initialVal = useLoaderData()
    const [listItems, setListItems] = useState(initialVal)
    const [db] = useState(getDatabase(firebase))

    useEffect(()=>{
        onValue(ref(db, userListRef), (snapshot)=>{
            if(snapshot.exists()){
                setListItems(snapshot.val())
             } else{
                setListItems(null)
             }
        })
    }, [db, userListRef])
    
    return (
    <>
    <SiteNavbar/>
    <div className="header">
        <h1>
            {listId}
        </h1>
        <p className="mini">
            By {username}
        </p>
    </div>
    </>)
}