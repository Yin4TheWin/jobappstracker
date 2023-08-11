import { Button, Grid, Stack, Switch } from "@mui/material";
import { User } from "firebase/auth";
import { useReducer, useState } from "react";

import togglePrivacy from "../../globals/toggleListPrivacy";
import CategoryCard from "./CategoryCard";
import ModalPopup from "../ModalPoup";
import JobAppForm from "./JobAppForm";

import { jobCategories } from "../../globals/globalVariables";
import jobAppFormReducer from "../../reducers/JobAppFormReducer";
import { ref, update } from "firebase/database";
import { db } from "../../globals/firebase";
import ListItemsTypes from "../../globals/types/ListItemsTypes";
import DeadlineTypes from "../../globals/types/DeadlineTypes";

interface DatabaseUpdates{
    [index: string]: any
}

export default function JobList({listId, username, user, isPrivate, listItems}: {listId: string, username: string, user: User|null|undefined, isPrivate: boolean, listItems: ListItemsTypes | null}){
    const [showJobAppModal, toggleJobAppModal] = useState(false);
    const [formState, setFormState] = useReducer(jobAppFormReducer, {category: "Applied", date: "", color: "#688aad", company: "", position: "", link: "", notes: "", recruiterContact: "", recruiterName: "", deadlines: [], uuid: ""});

    const isOwner = (user && user.displayName === username)
    return (<>
        <ModalPopup
        showModal={showJobAppModal}
        toggleModal={()=>toggleJobAppModal(val=>!val)}
        header={"Job Application Info"}
        body={<JobAppForm categories={jobCategories} formState={formState} setFormState={setFormState} isOwner={isOwner}/>}
        footer={isOwner && <div>
            <Button color="primary" onClick={()=>{
                if(formState.company.length===0 || formState.position.length===0){
                    alert("Please fill out all required fields.")
                    return;
                } else{
                    const updates: DatabaseUpdates = {};
                    let nonEmptyDeadlines:DeadlineTypes[] = []
                    formState.deadlines.forEach((deadline, index)=>{
                        if(deadline.name.length!==0){
                            nonEmptyDeadlines.push(deadline)
                        }
                    })
                    updates['/users/'+username+'/listVals/'+listId+'/jobs/'+formState.category.toLowerCase()+'/'+formState.uuid] = {...formState, deadlines: nonEmptyDeadlines};
                    jobCategories.forEach(category=>{
                        if(category.name.toLowerCase()!==formState.category.toLowerCase())
                            updates['/users/'+username+'/listVals/'+listId+'/jobs/'+category.name.toLowerCase()+'/'+formState.uuid] = {};
                    })
                    update(ref(db), updates).then(()=>{
                        toggleJobAppModal(val=>!val)
                    })
                }
            }}>Save</Button>{' '}
            <Button color="secondary" onClick={()=>{toggleJobAppModal(val=>!val)}}>Cancel</Button>
        </div>
        }
        />
        <h1>
            {listId}
        </h1>
        <p className="mini">
            By {username}
        </p>
        {isOwner && 
        <Stack direction="row" spacing={1} alignItems="center">
        <Switch
        checked={!isPrivate}
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#000',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            },
        }}
        onChange={()=>{
            togglePrivacy(username, listId, !isPrivate)
        }}
        />
        <p className="mini bold">This list is {isPrivate?"private: only you can view it.":"public: anyone with the link can view it."}</p>
        </Stack>
        }
        <p className="mini">{isOwner ? "Click the \"plus\" icon under any category to add a job to that category, click a job title to view/edit details for that job, or drag and drop job cards between panels to organize them.":"Click a job title to view more information about that job."}</p>
        <Grid container spacing={2} sx={{marginTop: '1%', minHeight: '70vh'}}>
            {
                jobCategories.map((category, index)=>{
                    return <Grid item xs={6} md={3} key={index}>
                        <CategoryCard title={category.name} titleColor={category.color} isOwner={isOwner} toggleModal={()=>{
                            toggleJobAppModal(true)
                        }} setFormState={setFormState} jobs={listItems?.jobs} username={username} listId={listId}/>
                    </Grid>
                })
            }
        </Grid>
    </>)
}