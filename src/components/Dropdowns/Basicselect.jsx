import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({status, setStatus}) {
  
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"
                    sx={{fontSize:"12px"}}
        >
          Statusi
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Statusi"
          onChange={(event)=>setStatus(event.target.value)}
          sx={{
            height: 40, 
            '& .MuiSelect-select': {
              paddingTop: '8px', 
              paddingBottom: '8px',
            },
          }}
        >
          <MenuItem value={10}>Pending</MenuItem>
          <MenuItem value={20}>Ready</MenuItem>
          <MenuItem value={30}>Closed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
