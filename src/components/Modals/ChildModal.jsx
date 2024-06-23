import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import MenuCard from '../Cards/MenuCard';
import CheckboxList from '../Lists/CheckboxList';
import axios from 'axios';
import { GET_ALL_CATEGORIES_BY_ID } from '../../endpoints/MenuItems/MenuItemsEnd';


export default function ChildModal({ openChild, handleCloseChild, item ,menuClickedItem, style, setOrderItems, order, setOrder}) {

  const [obj,setObj] = React.useState([]);
  
  React.useEffect(()=>{
    try{
      const getMenuItems = async (id) =>{
        const res = await axios.get(GET_ALL_CATEGORIES_BY_ID, 
          {params: { CategoryId: id },
          withCredentials: true});
          setObj(res.data);
      }
      getMenuItems(3);
    }catch(error){
      console.error("Error=",error)
    }
  },[])

  console.log("obj=",obj)

  

    return (
      <React.Fragment>
        <Modal
          open={openChild}
          onClose={handleCloseChild}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 400, height:360 }}>
            <p id="child-modal-description">
              {menuClickedItem?.title}
            </p>
            <CheckboxList obj={obj} item={item} setOrderItems={setOrderItems} order={order} setOrder={setOrder}/>
            <Button variant="contained" color="error" onClick={handleCloseChild}>Close</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }