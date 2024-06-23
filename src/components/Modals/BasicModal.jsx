import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import axios from 'axios';
import { GET_FREE_TABLES, GET_MY_TABLES } from '../../endpoints/TableWaiters/TableWaitersEnd';
import { Option, Select } from '@mui/joy';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 1300, 

};

export default function BasicModal({ open, handleClose, item,tavolinat }) {
  const [selectedTables, setSelectedTables] = React.useState([]);

  const [freeTables,setFreeTables] = React.useState([]);
  
  React.useEffect(()=>{
    if(tavolinat){
      const tableNumbers = tavolinat.map(item=>item.tableNumber);
      setSelectedTables(tableNumbers);
    }
  },[])


  React.useEffect(()=>{
    const getFreeTables = async () => {
      try{
        const res = await axios.get(GET_FREE_TABLES,{withCredentials:true});
        setFreeTables(res.data)
      }
      catch(error){
        console.error("error=",error)
      }
    }
    getFreeTables();
  },[])

  return (
    <div>
      <Modal
      open={open}
      onClose={() => {handleClose()}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{zIndex:1000}}
      >
        <Box sx={style}>
          <div className='flex w-full h-auto border-b-2 border-b-black flex-col mb-[10px]'>
            <div className='flex w-full h-auto justify-between  items-center flex-row'>
              <p>Emri</p>
              <p style={{fontWeight:"600"}}>{item.name} {" "} {item.surname}</p>
            </div>
            <div className='flex w-full h-auto justify-between items-center flex-row' >
              <p>Numri</p>
              <p>{item.contactInfo}</p>
            </div>
          </div>
          <div>
            <p>Pergjegjes per tavolinat: </p>
            <div className='w-full h-auto flex flex-wrap justify-between '>
              {tavolinat && tavolinat.map((tav, index) => (
                <p key={index} className='p-1 rounded-xl bg-blue-100'>Tav. {tav.tableNumber}</p>
              ))}
            </div>
            <div className='pt-[10px]'>
            <p>Ndrysho</p>
            <Select
              required
              multiple
              value={selectedTables}
              sx={{ minWidth: 200 }}
              menuprops={{
                style: { zIndex: 1400 }, // Ensure dropdown has a higher z-index
              }}
            >
              {freeTables && freeTables.map((tav,index) => (
              <Option key={index} value={tav.tableNumber}>Tav: {tav.tableNumber}</Option>
              ))}
            </Select>
            </div>
           
          </div>
          <Button type='button' onClick={() => handleClose()}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
