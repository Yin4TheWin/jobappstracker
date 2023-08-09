import { Button, Grid, Stack, Switch } from "@mui/material";
import { User } from "firebase/auth";
import togglePrivacy from "../../functions/togglePrivacy";
import CategoryCard from "./CategoryCard";
import ModalPopup from "../ModalPoup";
import JobAppForm from "./JobAppForm";
import { useState } from "react";
import JobAppFields from "../../types/JobAppFields";
import { jobCategories } from "../../globals";

export default function JobList({listId, username, user, isPrivate}: {listId: string, username: string, user: User|null|undefined, isPrivate: boolean}){
    const [showJobAppModal, toggleJobAppModal] = useState<JobAppFields>({value: false, data: {category: "Applied", date: null, color: "#688aad"}});
    const isOwner = (user && user.displayName === username)
    return (<>
        <ModalPopup
        showModal={showJobAppModal.value}
        toggleModal={()=>toggleJobAppModal({value: !showJobAppModal.value, data: showJobAppModal.data})}
        header={"Job Application Info"}
        body={<JobAppForm categories={jobCategories} data={showJobAppModal.data}/>}
        footer={<div>
            <Button color="primary" onClick={()=>{
            }}>Submit</Button>{' '}
            <Button color="secondary" onClick={()=>{toggleJobAppModal({value: !showJobAppModal.value, data: showJobAppModal.data})}}>Cancel</Button>
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
        checked={isPrivate}
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
                        <CategoryCard title={category.name} titleColor={category.color} isOwner={isOwner} toggleModal={toggleJobAppModal}/>
                    </Grid>
                })
            }
        </Grid>
    </>)
}