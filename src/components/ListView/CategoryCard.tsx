import { Button, Card, Grid, IconButton, Typography } from "@mui/material";
import CategoryCardTypes from "../../globals/types/CategoryCardTypes";
import { Fragment, useEffect, useState } from "react";
import ModalPopup from "../ModalPoup";

import { v4 as uuidv4 } from 'uuid';

import AddIcon from '@mui/icons-material/Add';
import JobAppFieldsTypes from "../../globals/types/JobAppFieldsTypes";

import { ref, remove, update } from "firebase/database";
import { db } from "../../globals/firebase";
import JobCard from "./JobCard";

import { useDrop } from 'react-dnd'
import { ItemTypes } from "../../globals/types/DraggableItemTypes";
import { jobCategories } from "../../globals/globalVariables";
import dayjs from "dayjs";

export default function CategoryCard({title, titleColor, isOwner, toggleModal, setFormState, jobs, username, listId} : CategoryCardTypes){
    const [jobsOfMyCategory, setJobsOfMyCategory] = useState <
        {
            [job: string]: JobAppFieldsTypes
        }
     | undefined> ()
    useEffect(()=>{
        if(jobs){
            setJobsOfMyCategory(jobs[title.toLowerCase()])
        }
    }, [jobs, title])

    const [showConfirmModal, toggleConfirmModal] = useState(false);
    const [modalBody, setModalBody] = useState("")
    const [modalFooter, setModalFooter] = useState(<></>)

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item: JobAppFieldsTypes) => {
            const updates: any = {};
            item.category = title;
            updates['/users/'+username+'/listVals/'+listId+'/jobs/'+title.toLowerCase()+'/'+item.uuid] = item;
            jobCategories.forEach(category=>{
                if(category.name.toLowerCase()!==title.toLowerCase())
                    updates['/users/'+username+'/listVals/'+listId+'/jobs/'+category.name.toLowerCase()+'/'+item.uuid] = {};
            })
            update(ref(db), updates)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }, [jobsOfMyCategory])

    function handleOpenJobApp(job: JobAppFieldsTypes){
        return () =>{ 
            toggleModal()
            setFormState({type: 'CHANGE_ALL', payload: job})
        }
    }

    function handleOpenJobLink(job: JobAppFieldsTypes){
        return ()=>{
            setModalBody(`This link goes to ${job.link}. Are you sure you want to go there?`)
            setModalFooter(<div>
                <Button color="success" onClick={()=>{
                    toggleConfirmModal(val=>!val)
                    window.open(job.link, "_blank")
                }}>Yes, take me there!</Button>
                <Button color="error" onClick={()=>{toggleConfirmModal(val=>!val)}}>No, take me back!</Button>
            </div>)
            toggleConfirmModal(val=>!val)
        }
    }

    function handleDeleteJobApp(job: JobAppFieldsTypes){
        return ()=>{
            setModalBody(`Are you sure you want to delete this application (${job.position} at ${job.company})?`)
            setModalFooter(<div>
                <Button color="error" onClick={()=>{
                    remove(ref(db, '/users/'+username+'/listVals/'+listId+'/jobs/'+job.category.toLowerCase()+'/'+job.uuid)).then(()=>{
                        toggleConfirmModal(val=>!val)
                    }).catch((error)=>{
                        console.log(error)
                        alert("Something went wrong: please try again later.")
                    })
                }}>Yes, delete it!</Button>
                <Button color="info" onClick={()=>{toggleConfirmModal(val=>!val)}}>No, keep it!</Button>
            </div>)
            toggleConfirmModal(val=>!val)
        }
    }
    return (
        <Card variant="outlined" sx={{width: '100%', height: '100%', backgroundColor: isOver?'#e0e0e0':'#f7f7f7', position: 'relative', overflowY: 'hidden'}} ref={drop}>
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
                setFormState({type: 'CHANGE_ALL', payload: {category: title, date: dayjs().format('YYYY-MM-DD'), color: titleColor, company: "", position: "", link: "", notes: "", recruiterContact: "", recruiterName: "", deadlines: [], uuid: uuidv4()}})
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
                                <JobCard isOwner={isOwner} job={jobsOfMyCategory[job]} handleOpenJobApp={handleOpenJobApp} handleOpenJobLink={handleOpenJobLink} handleDeleteJobApp={handleDeleteJobApp} />
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