import { Button, Card, Grid, IconButton, Typography } from "@mui/material";
import CategoryCardTypes from "../../globals/types/CategoryCardTypes";
import { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import ModalPopup from "../ModalPoup";

export default function CategoryCard({title, titleColor, isOwner, toggleModal, setFormState, jobs} : CategoryCardTypes){
    const [showLinkModal, toggleLinkModal] = useState(false);
    const [link, setLink] = useState("")
    const jobsOfMyCategory = jobs && jobs[title.toLowerCase()]

    return (
        <Card variant="outlined" sx={{width: '100%', height: '100%',  backgroundColor: '#f7f7f7', position: 'relative'}}>
            <ModalPopup
            showModal={showLinkModal}
            toggleModal={()=>toggleLinkModal(val=>!val)}
            header="Hold Up!"
            body={<Typography color="black">
                This link goes to {link}. Are you sure you want to go there?
            </Typography>}
            footer={<div>
                <Button color="success" onClick={()=>{window.open(link, "_blank")}}>Yes, take me there!</Button>
                <Button color="error" onClick={()=>{toggleLinkModal(val=>!val)}}>No, take me back!</Button>
            </div>}
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
                                }}>
                                    <Typography variant="h5" color={"black"} align="left" margin={"1%"} marginLeft={"2%"}><button className="link" onClick={() =>{ 
                                        toggleModal()
                                        setFormState({type: 'CHANGE_ALL', payload: jobsOfMyCategory[job]})
                                    }}>{jobsOfMyCategory[job].company}</button>  
                                    {jobsOfMyCategory[job].link && <IconButton onClick={()=>{
                                        setLink(jobsOfMyCategory[job].link)
                                        toggleLinkModal(val=>!val)
                                    }}>
                                        <LinkIcon/>
                                    </IconButton>}
                                    </Typography>
                                    <Typography align="left" color="gray" margin={"1%"} marginLeft={"2%"}>{jobsOfMyCategory[job].position}</Typography>
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