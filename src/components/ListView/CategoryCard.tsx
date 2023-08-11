import { Button, Card, Grid, IconButton, Typography } from "@mui/material";
import CategoryCardTypes from "../../globals/types/CategoryCardTypes";
import { Fragment, useState } from "react";
import ModalPopup from "../ModalPoup";

import { v4 as uuidv4 } from 'uuid';

import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { ref, remove } from "firebase/database";
import { db } from "../../globals/firebase";

export default function CategoryCard({title, titleColor, isOwner, toggleModal, setFormState, jobs, username, listId} : CategoryCardTypes){
    const [showConfirmModal, toggleConfirmModal] = useState(false);
    const [modalBody, setModalBody] = useState("")
    const [modalFooter, setModalFooter] = useState(<></>)
    const jobsOfMyCategory = jobs && jobs[title.toLowerCase()]

    return (
        <Card variant="outlined" sx={{width: '100%', height: '100%',  backgroundColor: '#f7f7f7', position: 'relative'}}>
            <ModalPopup
            showModal={showConfirmModal}
            toggleModal={()=>toggleConfirmModal(val=>!val)}
            header="Hold Up!"
            body={<Typography color="black" sx={{wordWrap: 'break-word'}}>
                {modalBody}
            </Typography>}
            footer={modalFooter}
            />
            <p className="mini center" style={{color: titleColor, marginTop: '2%'}}>{title}</p>    
            {isOwner && <IconButton style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
            }}
            onClick={()=>{ 
                toggleModal()
                setFormState({type: 'CHANGE_ALL', payload: {category: title, date: "", color: titleColor, company: "", position: "", link: "", notes: "", recruiterContact: "", recruiterName: "", deadlines: [], uuid: uuidv4()}})
            }}
            >
                <AddIcon/> 
            </IconButton>  }
            <Grid container spacing={1} sx={{marginTop: '1%'}}>
                {
                    jobsOfMyCategory && Object.keys(jobsOfMyCategory).map((job, index)=>{
                        return (
                        <Fragment key={index}>
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={11}>
                                <Card variant="outlined" sx={{
                                    color: 'white',
                                    position: 'relative',
                                }}>
                                    <Typography variant="h5" color={"black"} align="left" margin={"1%"} marginLeft={"2%"}><button className="link" onClick={() =>{ 
                                        toggleModal()
                                        setFormState({type: 'CHANGE_ALL', payload: jobsOfMyCategory[job]})
                                    }}>{jobsOfMyCategory[job].company}</button>  
                                    {jobsOfMyCategory[job].link && <IconButton onClick={()=>{
                                        setModalBody(`This link goes to ${jobsOfMyCategory[job].link}. Are you sure you want to go there?`)
                                        setModalFooter(<div>
                                            <Button color="success" onClick={()=>{window.open(jobsOfMyCategory[job].link, "_blank")}}>Yes, take me there!</Button>
                                            <Button color="error" onClick={()=>{toggleConfirmModal(val=>!val)}}>No, take me back!</Button>
                                        </div>)
                                        toggleConfirmModal(val=>!val)
                                    }}>
                                        <LinkIcon/>
                                    </IconButton>}
                                    </Typography>
                                    <Typography align="left" color="gray" margin={"1%"} marginLeft={"2%"}>{jobsOfMyCategory[job].position}</Typography>
                                    {isOwner && <IconButton style={{
                                        position: 'absolute',
                                        top: '0px',
                                        right: '0px',
                                    }} onClick={()=>{
                                        setModalBody(`Are you sure you want to delete this application (${jobsOfMyCategory[job].position} at ${jobsOfMyCategory[job].company})?`)
                                        setModalFooter(<div>
                                            <Button color="error" onClick={()=>{
                                                remove(ref(db, '/users/'+username+'/listVals/'+listId+'/jobs/'+jobsOfMyCategory[job].category.toLowerCase()+'/'+jobsOfMyCategory[job].uuid)).then(()=>{
                                                    toggleConfirmModal(val=>!val)
                                                }).catch((error)=>{
                                                    console.log(error)
                                                    alert("Something went wrong: please try again later.")
                                                })
                                            }}>Yes, delete it!</Button>
                                            <Button color="info" onClick={()=>{toggleConfirmModal(val=>!val)}}>No, take me back!</Button>
                                        </div>)
                                        toggleConfirmModal(val=>!val)
                                    }}>
                                        <DeleteRoundedIcon/>
                                    </IconButton>}
                                </Card>
                            </Grid>
                            <Grid item xs={0.5}></Grid>
                        </Fragment>
                        )
                    })
                }
            </Grid>
        </Card>
    )
}