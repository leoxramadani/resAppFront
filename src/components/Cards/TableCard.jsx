import {useRef, useState}  from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import NestedModal from './../Modals/NestedModal.jsx'

export default function TableCard() {

  const ref =  useRef();

  const array = [
    {"key":1,"title":"Tavolina 1","description":"lorem100lorem100lorem100lorem100"},
    {"key":2,"title":"Tavolina 2","description":"lorem100lorem100lorem100lorem100"},
    {"key":3,"title":"Tavolina 3","description":"lorem100lorem100lorem100lorem100"},
    {"key":4,"title":"Tavolina 4","description":"lorem100lorem100lorem100lorem100"},
    {"key":5,"title":"Tavolina 5","description":"lorem100lorem100lorem100lorem100"},
    {"key":6,"title":"Tavolina 6","description":"lorem100lorem100lorem100lorem100"},
    {"key":7,"title":"Tavolina 7","description":"lorem100lorem100lorem100lorem100"},
  
  ]
  
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    ref.current?.setOrder(undefined);
    ref.current?.setOrderItems(undefined);
    setOpen(false);
    setSelectedItem(null);
  };


  return (
    <div>
      <Grid container spacing={4} sx={{marginX:"10px"}}>
      {array && array.map((item) =>(

      <Grid 
        xs={6} 
        sm={4} 
        md={6} 
        lg={2} 
        xl={2} 
          key={item.key}
          onClick={() => handleOpen(item)}
          >
        <CardActionArea     sx={{ backgroundColor:'#EFF6FF',
              border: '2px solid #BFDBFE',
              justifyContent:'center',
              justifyItems:'center',
              alignItems:'center',
              marginTop:"50px",
              padding:"10px",
            }} >
          <img src="https://thumbs.dreamstime.com/b/restaurant-table-icon-isolated-white-restaurant-symbol-86017062.jpg" alt="test"
          style={{borderRadius:"100%"}}/>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div"style={{textAlign:'center'}}>
              {item.title}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography> */}
          </CardContent>
        </CardActionArea>
      </Grid>
    ))}
      </Grid>
      <NestedModal open={open} handleClose={handleClose} item={selectedItem} ref={ref}/>
      </div>
  );
}