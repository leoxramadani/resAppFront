import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import MenuCard from '../Cards/MenuCard';
import CheckboxList from '../Lists/CheckboxList';


export default function ChildModal({ openChild, handleCloseChild, item ,menuClickedItem, style, setOrderItems, order, setOrder}) {

    let obj = [];
    if(menuClickedItem){
      if(menuClickedItem.title=='Kafe'){
        obj = [
                {'key':1,'Name':'Espresso'},
                {'key':2,'Name':'Dopio Espresso'},
                {'key':3,'Name':'Machiato'},
                {'key':4,'Name':'Latte Machiato'},
                {'key':5,'Name':'Americano'},
              ];
      }
      else if (menuClickedItem.title=='Hamburger'){
        obj = [
                {'key':1,'Name':'Hamburger classic'},
                {'key':2,'Name':'Hamburger shpije'},
                {'key':3,'Name':'Hamburger me stek'},
                {'key':4,'Name':'Hamburger sharri'},
                {'key':5,'Name':'Tost'},
              ]
      }
    }
  
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