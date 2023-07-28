import { onValue, ref, getDatabase } from "firebase/database"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { useLoaderData, useParams } from "react-router-dom"
import { firebase } from "../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';

import '../styles/listview.css'
import SiteNavbar from "./navbar"
import { getAuth } from "firebase/auth"
import InvalidList from "../components/ListView/InvalidList"
import { Grid, Skeleton } from "@mui/material"
import ListSkeleton from "../components/ListView/ListSkeleton"
import JobList from "../components/ListView/JobList"

export default function ListView(){
    const {username, listId} = useParams()
    const userListRef='users/'+username+'/listVals/'+listId
    const [listItems, setListItems] = useState(useLoaderData())
    const [loading, setLoading] = useState(true)
    const [db] = useState(getDatabase(firebase))

    const [user] = useAuthState(getAuth(firebase));

    useEffect(()=>{
        onValue(ref(db, userListRef), (snapshot)=>{
            if(snapshot.exists()){
                setListItems(snapshot.val())
            } else{
                setListItems(null)
            }
            if(user)
                setLoading(false)
        })
    }, [db, userListRef, user])
    
    return (
    <>
    <SiteNavbar/>
    {
        ((localStorage.getItem('auth')===null || localStorage.getItem('auth')!.length===0 || !loading) && listItems===null) 
        && <InvalidList/>
    }
    {
        listItems!==null &&
        <div className="header">
            {
                (localStorage.getItem('auth')!==null && localStorage.getItem('auth')!.length>0 && listItems===null && loading) ?
                <ListSkeleton/> :
                <JobList listId={listId?listId:""} username={username?username:""}/>
            }
    </div>
    }
    </>)
}