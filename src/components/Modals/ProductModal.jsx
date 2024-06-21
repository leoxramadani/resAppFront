import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import { Option, Select } from '@mui/joy';
import axios from 'axios';
import { GET_ALL_CATEGORIES } from '../../endpoints/MenuItems/MenuItemsEnd';


export default function ProductModal({setOpen,open,modalType,rowType,displayedRowClicked}) {


const [categories,setCategories] = React.useState();

React.useEffect(()=>{
  const getCategories = async () => {
    try{
      const res = await axios.get(GET_ALL_CATEGORIES,{withCredentials:true});
      setCategories(res.data);
    }catch(error){
      console.error("Error=",error);
    }
  };
  getCategories();
},[])

  return (
    <React.Fragment>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>
            {modalType !== 'null' && modalType == "Category" ? 
              <p>Shtoni nje kategori te re</p> : modalType == "Products" ? 
              <p>Shtoni nje produkt te ri</p> : <p>Ndryshoni te dhenat</p>
            }
          </DialogTitle>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Emri i {modalType !== 'null' && modalType == "Category" ? "kategorise" : 'produktit'}</FormLabel>
                {rowType == "Edit" 
                ? 
                <Input autoFocus required defaultValue={displayedRowClicked?.name}/>
                :
                <Input autoFocus required defaultValue=""/>
                
                } 
              </FormControl>
              {modalType !== 'null' && modalType == "Products" || rowType == "Edit"? (
                <>
                    <FormControl>
                    <FormLabel>Cmimi</FormLabel>
                    {rowType == "Edit" ? 
                      <Input required defaultValue={displayedRowClicked.price}/>
                      :
                      <Input required />
                    }
                    </FormControl>

                    <FormControl>
                    <FormLabel>Kategoria</FormLabel>
                    <Select
                      placeholder="Kategoria e produktit"
                      name="foo"
                      required
                      sx={{ minWidth: 200 }}
                      defaultValue="" // Ensure a default value is set
                    >
                        {rowType == "Edit" ? 
                          <Option value="" disabled>{displayedRowClicked.categoryName}</Option>
                          :
                          <Option value="" disabled>Shtoni nje produkt te ri</Option>
                        }
                      
                      {categories.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.categoryName}
                        </Option>
                      ))}
                    </Select>
                    </FormControl>
                </>

              
              ) : (
                ""
              )}
              
              
              <Button type="submit">Ruaj</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
