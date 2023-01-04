import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import ModalPopup from "../components/modal";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 

import { signOut } from "firebase/auth"
import { ref, onValue, set, remove, child, update } from "firebase/database";

import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

export default function MyLists({auth, user, db}){
    const [newListName, setNewListName] = useState("")
    const [newNameOfList, setNewNameOfList] = useState("")

    const [userLists, setUserLists] = useState(null)
    const [userListsRef]= useState(ref(db, 'users/'+user.uid+'/listNames'))
    const [selectedListItem, setSelectedListItem] = useState({state: null, val: ""})

    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState("")
    const [modalHeader, setModalHeader] = useState("")

    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(()=>{
        document.title = 'My Job Lists';
    },[])
    
    useEffect(()=>{
        onValue(userListsRef, (snapshot)=>{
            if(snapshot.exists()){
                const listNames=snapshot.val()
                setUserLists(listNames)
             } else{
                setUserLists(null)
             }
        })
    }, [userListsRef])

    useEffect(()=>{
        if(selectedListItem.state==="delete"){
            setShowDeleteModal(true)
        }
        else if(selectedListItem.state==="edit"){
            setShowEditModal(true)
        }
    }, [selectedListItem])

    function generateModal(header, body){
        setModalHeader(header)
        setModalText(body)
        setShowModal(true)
    }

    return (<div className='mylists-header'>
        <ModalPopup showModal={showModal} 
        toggleModal={()=>{setShowModal(!showModal)}}
        header={modalHeader}
        body={modalText}
        footer={
            <Button variant="primary" onClick={()=>{setShowModal(!showModal)}}>OK</Button>
        }
        />
        <ModalPopup showModal={showDeleteModal} 
        toggleModal={()=>{setShowDeleteModal(!showDeleteModal)}}
        header={"Confirm Deletion"}
        body={"Are you sure you want to delete \""+selectedListItem.val+"\"? This action cannot be undone!"}
        footer={
            <>
                <Button onClick={()=>{
                    remove(child(userListsRef, selectedListItem.val)).then(()=>{
                        setShowDeleteModal(!showDeleteModal)
                    })
                }}>YES I AM SURE</Button>
                <Button variant="danger" onClick={()=>{setShowDeleteModal(!showDeleteModal)}}>NO</Button>
            </>
        }
        />
        <ModalPopup showModal={showEditModal} 
        toggleModal={()=>{setShowEditModal(!showEditModal)}}
        header={"Change List Name"}
        body={
            <>
            <p>Please choose a new name for your list:</p>
            <Form onSubmit={(e)=>{
            e.preventDefault()
            if(newNameOfList.length>0){
                if(userLists==null || !(newNameOfList in userLists)){
                    const updates={}
                    updates['users/'+user.uid+'/listNames/'+selectedListItem.val]={}
                    updates['users/'+user.uid+'/listNames/'+newNameOfList]=Date.now()
                    update(ref(db),updates).then(()=>{
                        setShowEditModal(!showEditModal)
                    }).catch(err=>{
                        generateModal("Something Went Wrong", err.message)
                    })
                } else{
                    generateModal("List Already Exists", "You already own a list with that name!")
                }
            } else
                generateModal("No List Name","List name cannot be blank!")
        }}>
        <Row>
            <Col xs={10}>
                <Form.Control type="text" placeholder="New list name" size='lg' value={newNameOfList} onChange={(e)=>{
                    setNewNameOfList(e.target.value)
                }}/>
            </Col>
            <Col>
            <Button variant="primary" type="submit">OK</Button>
            </Col>
        </Row>
        </Form>
            </>
        }
        />
    <h1>My Job Lists</h1>
    <p className="mini">Currently signed in as {user.email}, <button className="link" type="button" onClick={()=>{
        signOut(auth)
    }}>click here to sign out.</button>  </p>
    <p>To create a new jobs list, enter a list name (eg: Summer Internships 2023) in the text input field, then hit "Create". To edit a list, click on its name in the table below.</p>
    <Form onSubmit={(e)=>{
        e.preventDefault()
        if(newListName.length>0){
            if(userLists==null || !(newListName in userLists)){
                set(ref(db, 'users/'+user.uid+'/listNames/'+newListName), Date.now()).then(()=>{
                    setNewListName("")
                    generateModal("List Was Created", newListName+" was successfully created! You may now access it under the \"My Lists\" table.")
                }).catch(err=>{
                    generateModal("Something Went Wrong", err.message)
                })
            } else{
                generateModal("List Already Exists", "You already own a list with that name!")
            }
        } else
            generateModal("No List Name","Please enter a new list name to create it!")
    }}>
        <Row>
            <Col xs={8} md={10}>
                <Form.Control type="text" placeholder="New list name" size='lg' value={newListName} onChange={(e)=>{
                    setNewListName(e.target.value)
                }}/>
            </Col>
            <Col xs={4} md={2}>
                <Button type='submit' size='lg' style={{width: '100%'}}>Create</Button>
            </Col>
        </Row>
    </Form>
    <Table style={{marginTop: '1%'}} striped hover responsive="sm" size="sm">
      <thead>
        <tr>
          <th style={{width: '95%'}}>My Lists</th>
          <th/>
          <th/>
        </tr>
      </thead>
      <tbody>
        {
            userLists?Object.entries(userLists).map(list=>{
                let key=list[0]
                return (<tr>
                    <td>
                        <Link to={"/"+user.displayName+"/"+key}>{key}</Link>
                    </td>
                    <td>
                        <Button variant='secondary' className='edit' onClick={()=>{
                            setNewNameOfList(key)
                            setSelectedListItem({state: "edit", val: key})
                        }}>
                        <FontAwesomeIcon icon={solid('pen')} />
                        </Button>
                    </td>
                    <td>
                        <Button variant='secondary' className='edit' onClick={()=>{
                            setSelectedListItem({state: "delete", val: key})
                        }}>
                        <FontAwesomeIcon icon={solid('trash')} />
                        </Button>
                    </td>
                    </tr>)
            }):
            <tr>
                <td>None yet!</td>
            </tr>
        }
      </tbody>
    </Table>
    </div>)
}