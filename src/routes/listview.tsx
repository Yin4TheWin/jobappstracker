import { onValue, ref, getDatabase } from "firebase/database"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { useLoaderData, useParams } from "react-router-dom"
import { firebase } from "../firebase"

import '../styles/listview.css'
import SiteNavbar from "./navbar"

export default function ListView(){
    const {username, listId} = useParams()
    const userListRef='users/'+username+'/listVals/'+listId
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
    {
        listItems==null?
        <div className="error-header">
            <h1>Sorry 😢</h1>
            <p>Either the page you are looking for does not exist, or you are not allowed to view it.</p>
            <p className="mini">(If you believe this is a mistake, please ensure you are signed in to the right account, then come back to this page.)</p>
        </div>:
        <div className="header">
        <h1>
            {listId}
        </h1>
        <p className="mini">
            By {username}
        </p>
        <Table style={{marginTop: '1%'}} striped hover responsive="sm" size="sm">
            <th>

            </th>
        </Table>
    </div>
    }
    </>)
}