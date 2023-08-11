import { DatePicker } from '@mui/x-date-pickers';
import { Box, Button, Grid, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import dayjs from 'dayjs';
import JobAppFormTypes from '../../globals/types/JobAppFormTypes';
import { jobCategories } from '../../globals/globalVariables';
import { Fragment } from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function JobAppForm({categories, formState, setFormState, isOwner} : JobAppFormTypes){
    return (
        <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <Grid spacing={2} container width={'100%'}>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{color: 'black', fontWeight: 'bold'}}>Overview</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
          <TextField
            disabled={!isOwner}
            id="app-status"
            select
            fullWidth
            label="Status *"
            value={formState.category}
            onChange={(e)=>{
              setFormState({type: 'CHANGE_CATEGORY', payload: e.target.value})
            }}
            helperText="Please select the status of your application"
            sx={{
              '& .MuiInputBase-input': {
                color: jobCategories.filter(job=>job.name===formState.category)[0].color,
              },
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option.name} value={option.name} sx={{color: jobCategories.filter(job=>job.name===option.name)[0].color}}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          </Grid>
          <Grid item md={6} xs={12}>
          <DatePicker disabled={!isOwner} slotProps={{ textField: { fullWidth: true } }} label="Date of status update *" value={formState.date?dayjs(formState.date):dayjs()} onChange={
            (date)=>{
              setFormState({type: 'CHANGE_DATE', payload: date?date.format('YYYY-MM-DD'):dayjs().format('YYYY-MM-DD')})
            }
          }/>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField disabled={!isOwner} fullWidth id="company" label="Company *" error={formState.company==null||formState.company.length===0} value={formState.company} onChange={
              (e)=>{
                setFormState({type: 'CHANGE_COMPANY', payload: e.target.value})
              }
            }/>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField disabled={!isOwner} fullWidth id="job-title" label="Job Title *" error={formState.position==null||formState.position.length===0} value={formState.position} onChange={
              (e)=>{
                setFormState({type: 'CHANGE_POSITION', payload: e.target.value})
              }
            }/>
          </Grid>
          <Grid item xs={12}>
            <TextField disabled={!isOwner} fullWidth id="link" label="Application Link" value={formState.link} onChange={
              (e)=>{
                setFormState({type: 'CHANGE_LINK', payload: e.target.value})
              }
            }/>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField disabled={!isOwner} fullWidth id="recruit-name" label="Recruiter Name" value={formState.recruiterName} onChange={
              (e)=>{
                setFormState({type: 'CHANGE_RECRUITER_NAME', payload: e.target.value})
              }
            }/>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField disabled={!isOwner} fullWidth id="recruit-info" label="Recruiter Contact" value={formState.recruiterContact} onChange={
              (e)=>{
                setFormState({type: 'CHANGE_RECRUITER_CONTACT', payload: e.target.value})
              }
            }/>
          </Grid>
          <Grid item xs={12}>
          <Typography variant="body1" sx={{color: 'black', fontWeight: 'bold', fontSize: '1.1rem'}}>Deadlines</Typography>
          </Grid>
          {
            formState.deadlines.length===0? 
            <Grid item xs={12}>
            <Typography variant="body1" sx={{fontSize: '0.9rem'}}>{isOwner? "None yet! Click below to add an upcoming deadline.":"The owner of this list has not added any deadlines for this job."}</Typography>
            </Grid>: 
            formState.deadlines.map((deadline, index)=>{
              let newDeadlines = [...formState.deadlines];
              return (<Fragment key={index}>
              <Grid item xs={isOwner?5:6}>
                <TextField disabled={!isOwner} fullWidth label="Type of Deadline" value={deadline.name} onChange={
                  (e)=>{
                    newDeadlines[index].name = e.target.value;
                    setFormState({type: 'CHANGE_DEADLINES', payload: newDeadlines})
                  }
                }/>
              </Grid>
              <Grid item xs={isOwner?5:6}>
                <DatePicker disabled={!isOwner} slotProps={{ textField: { fullWidth: true } }} label="Due on" value={dayjs(deadline.date)} onChange={
                  (date)=>{
                    newDeadlines[index].date = date?date.format('YYYY-MM-DD'):dayjs().format('YYYY-MM-DD');
                    setFormState({type: 'CHANGE_DEADLINES', payload: newDeadlines})
                  }
                }/>
              </Grid>
              {isOwner && <Grid item xs={1}>
                <IconButton onClick={
                  ()=>{
                    setFormState({type: 'REMOVE_DEADLINE', payload: index})
                  }}>
                  <DeleteRoundedIcon/>
                </IconButton>
                </Grid>}
          </Fragment>)
            })
          }
          {isOwner && <Button variant="contained" onClick={
            ()=>{
              setFormState({type: 'ADD_DEADLINE', payload: [{name: '', date: dayjs().format('YYYY-MM-DD')}]})
            }
          } color="primary" sx={{margin: 'auto', marginTop: '2%'}}>Add Deadline</Button>}
          <Grid item xs={12}>
          <Typography variant="body1" sx={{color: 'black', fontWeight: 'bold'}}>Notes</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField disabled={!isOwner} fullWidth id="notes" label="Notes" multiline rows={4} value={formState.notes} onChange={
              (e)=>{
                setFormState({type: 'CHANGE_NOTES', payload: e.target.value})
              }
            }/>
          </Grid>
        </Grid>
        </Box>
    )
}