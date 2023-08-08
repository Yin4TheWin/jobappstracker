import { DatePicker } from '@mui/x-date-pickers';
import { Box, MenuItem, TextField } from "@mui/material";
import dayjs from 'dayjs';
import JobAppFormProps from '../../types/JobAppFormProps';


export default function JobAppForm({categories, data} : JobAppFormProps){
    return (
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
        <TextField
          id="filled-select-currency"
          select
          label="Status"
          defaultValue={data.category}
          helperText="Please select the status of your application"
          sx={{color: 'red'}}
        >
          {categories.map((option) => (
            <MenuItem key={option.name} value={option.name} sx={{color: 'red'}}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        </div>
        <DatePicker label="Date of status update" defaultValue={data.date?data.date:dayjs()}/>
        </Box>
    )
}