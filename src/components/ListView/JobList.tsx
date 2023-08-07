import { Button, Grid, Stack, Switch } from "@mui/material";
import { User } from "firebase/auth";
import togglePrivacy from "../../functions/togglePrivacy";
import CategoryCard from "./CategoryCard";
import ModalPopup from "../ModalPoup";
import JobAppForm from "./JobAppForm";
import { useState } from "react";

export default function JobList({listId, username, user, isPrivate}: {listId: string, username: string, user: User|null|undefined, isPrivate: boolean}){
    const [showJobAppModal, toggleJobAppModal] = useState({value: false, data: {}});
    const isOwner = (user && user.displayName === username)
    const jobCategories = [{name: "Applied", color: "#688aad"}, {name: "Interviewing", color: "#b5b36e"}, {name: "Rejected", color: "#b06b76"}, {name: "Offered", color: "#6bb081"}]
    return (<>
        <ModalPopup
        showModal={showJobAppModal.value}
        toggleModal={()=>toggleJobAppModal({value: !showJobAppModal.value, data: showJobAppModal.data})}
        header={""}
        body={<JobAppForm/>}
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
                jobCategories.map((category)=>{
                    return <Grid item xs={6} md={3}>
                        <CategoryCard title={category.name} titleColor={category.color} isOwner={isOwner} toggleModal={toggleJobAppModal}/>
                    </Grid>
                })
            }
        </Grid>
    </>)
}