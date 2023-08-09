import { DatePicker } from '@mui/x-date-pickers';
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import dayjs from 'dayjs';
import JobAppFormTypes from '../../globals/types/JobAppFormTypes';
import { jobCategories } from '../../globals/globalVariables';
import { useState } from 'react';


export default function JobAppForm({categories, data} : JobAppFormTypes){
    const [selectedCategory, setSelectedCategory] = useState(data.category);

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
            id="app-status"
            select
            fullWidth
            label="Status *"
            value={selectedCategory}
            onChange={(e)=>{
              setSelectedCategory(e.target.value)
            }}
            helperText="Please select the status of your application"
            sx={{
              '& .MuiInputBase-input': {
                color: jobCategories.filter(job=>job.name===selectedCategory)[0].color,
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
          <DatePicker slotProps={{ textField: { fullWidth: true } }} label="Date of status update *" defaultValue={data.date?data.date:dayjs()}/>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth id="company" label="Company *"/>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth id="job-title" label="Job Title *"/>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth id="link" label="Application Link"/>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth id="recruit-name" label="Recruiter Name"/>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth id="recruit-info" label="Recruiter Contact"/>
          </Grid>
          <Grid item xs={12}>
          <Typography variant="body1" sx={{color: 'black', fontWeight: 'bold'}}>Deadlines</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Type of Deadline"/>
          </Grid>
          <Grid item xs={6}>
          <DatePicker slotProps={{ textField: { fullWidth: true } }} label="Due on" defaultValue={dayjs()}/>
          </Grid>
          <Button variant="contained" color="primary" sx={{margin: 'auto', marginTop: '2%'}}>Add Deadline</Button>
          <Grid item xs={12}>
          <Typography variant="body1" sx={{color: 'black', fontWeight: 'bold'}}>Notes</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth id="notes" label="Notes" multiline rows={4}/>
          </Grid>
        </Grid>
        </Box>
    )
}