import { onValue, ref, getDatabase, off } from "firebase/database"
import { useEffect, useState } from "react"
import { useLoaderData, useParams } from "react-router-dom"
import { firebase } from "../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';

import '../styles/ListView.css'
import SiteNavbar from "./Navbar"
import { getAuth } from "firebase/auth"
import InvalidList from "../components/ListView/InvalidList"
import ListSkeleton from "../components/ListView/ListSkeleton"
import JobList from "../components/ListView/JobList"

interface ListItems{
    private: boolean
}

export default function ListView(){
    const {username, listId} = useParams()
    const userListRef='users/'+username+'/listVals/'+listId
    const [listItems, setListItems] = useState<ListItems|null>(useLoaderData() as ListItems)
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
            if(user || localStorage.getItem('auth')===null || localStorage.getItem('auth')!.length===0)
                setLoading(false)
        }, error=>{
            setListItems(null)
            if(user || localStorage.getItem('auth')===null || localStorage.getItem('auth')!.length===0)
                setLoading(false)
        })
        return ()=>{
            off(ref(db, userListRef))
        }
    }, [db, userListRef, user])
    
    return (
    <>
    <SiteNavbar/>
    {
        (!loading && listItems===null) 
        ? <InvalidList/> :
        <div className="header">
            {
                (loading) ?
                <ListSkeleton/> :
                <JobList listId={listId?listId:""} username={username?username:""} user={user} isPrivate={listItems!.private}/>
            }
        </div>
    }
    </>)
}