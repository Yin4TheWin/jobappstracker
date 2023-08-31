import LinkIcon from '@mui/icons-material/Link';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { Card, Grid, IconButton, Typography } from '@mui/material';

import { ItemTypes } from "../../globals/types/DraggableItemTypes";
import { useDrag } from 'react-dnd'
import JobAppFieldsTypes from '../../globals/types/JobAppFieldsTypes';

export default function JobCard({isOwner, job, handleOpenJobApp, handleOpenJobLink, handleDeleteJobApp}: {isOwner: boolean | null | undefined, job: JobAppFieldsTypes, handleOpenJobApp: any, handleOpenJobLink: any, handleDeleteJobApp: any}){
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: {...job},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    }), [job])
    return (<Card 
        variant="outlined" 
        ref={isOwner?drag:null}
        sx={{
            opacity: isDragging ? 0.5 : 1,
            cursor: isOwner?(isDragging?'grabbing':'grab'):'auto',
            color: 'white',
            position: 'relative',
        }}>
            <Grid container>
                <Grid item xs={10}>
                <Typography onClick={handleOpenJobApp(job)} variant="h5" color={"#069"} align="left" margin={"1%"} marginLeft={"2%"} sx={{textDecoration: 'underline'}}>
                {job.company}
                {job.link && 
                    <IconButton onClick={(e)=>{
                        e.stopPropagation()
                        handleOpenJobLink(job)()
                    }}>
                    <LinkIcon/>
                    </IconButton>
                }
                </Typography>
                
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            
            <Typography align="left" color="gray" margin={"1%"} marginLeft={"2%"}>{job.position}</Typography>
            {isOwner && <IconButton style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
            }} onClick={handleDeleteJobApp(job)}>
                <DeleteRoundedIcon/>
            </IconButton>}
        </Card>)
}