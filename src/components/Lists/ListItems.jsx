import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ListItems({item}) {
  return (
    <List sx={{ width: '100%', 
                maxWidth: 360, 
                backgroundColor:'#EFF6FF', 
                margin:'15px' , 
                boxShadow: item?.statusi == "Ready" ? "0px 0px 5px green" : item?.statusi == "Pending" ? "0px 0px 5px blue" : "0px 0px 5px crimson"
             }}
            >
      <ListItem alignItems="flex-start" key={item?.key}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://www.freeiconspng.com/thumbs/restaurant-icon-png/restaurant-icon-png-plate-1.png" />
        </ListItemAvatar>
        <ListItemText
          primary={`Porosia numer: ${item?.porosiaNr}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                <div className='w-full flex flex-col  '>
                    <div className='flex flex-row justify-evenly w-full border-slate-300 border-solid border-2 border-t-0'>
                        <p className='w-[33%] flex justify-center items-center'>Emri</p>
                        <p className='w-[33%] flex justify-center items-center'>Sasia</p>
                        <p className='w-[33%] flex justify-center items-center'>Cmimi</p>
                    </div>
                    <div className='flex flex-col justify-evenly w-full'>
                            {item?.produkti && item?.produkti.map((prod, index) => (
                            <div key={index} className='flex w-full flex-row'>
                            <span className='w-[33%] flex justify-center items-center text-center'>{prod.emri}</span>
                            <span className='w-[33%] flex justify-center items-center text-center'>{prod.quantity}</span>
                            <span className='w-[33%] flex justify-center items-center text-center'>{prod.den}</span>
                            </div>
                        ))}
                    </div>
                    <div className='mt-10'>
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
                            label="Statusi"
                            value={item?.statusi}
                            sx={{
                                height: 40, 
                                '& .MuiSelect-select': {
                                paddingTop: '8px', 
                                paddingBottom: '8px',
                                },
                            }}
                            >
                                <MenuItem value={"Pending"}>Pending</MenuItem>
                                <MenuItem value={"Ready"}>Ready</MenuItem>
                                <MenuItem value={"Closed"}>Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    </div>
                </div>

              </Typography>
         
            </React.Fragment>
          }
        />
      </ListItem>
      {/* <Divider variant="inset" component="li" /> */}
      
      {/* <Divider variant="inset" component="li" /> */}
      
    </List>
  );
}
