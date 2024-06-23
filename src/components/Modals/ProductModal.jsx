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
import { CREATE_NEW_CATEGORY, CREATE_NEW_PRODUCT, GET_ALL_CATEGORIES } from '../../endpoints/MenuItems/MenuItemsEnd';


export default function ProductModal({setOpen,open,modalType,rowType,displayedRowClicked,setCategoryCreateResult,setMenuItemCreateResult}) {


const [categories,setCategories] = React.useState();

//get all products
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

//create new category

const [newCategory,setNewCategory] = React.useState(displayedRowClicked?.name || "");
const [newPrice,setNewPrice] = React.useState("");
const [newCategoryId,setNewCategoryId] = React.useState();



const createNewCategory = async (categoryName) => {
  try {
    const res = await axios.post(CREATE_NEW_CATEGORY, { categoryName: categoryName }, { withCredentials: true });
    setCategoryCreateResult(res.data.data);
  } catch (error) {
    console.error("Error=", error);
  }
};


const createNewProduct = async (newCategory,newCategoryId,newPrice) => {
  try{
    const res = await axios.post(CREATE_NEW_PRODUCT, {name: newCategory,price: newPrice, categoryId: newCategoryId}, {withCredentials:true});
    setMenuItemCreateResult(res.data.data)
  }catch(error){
    console.error("Error=",error)
  }
};


const handleChange = (event, newValue) => {
  setNewCategoryId(newValue);
};


  console.log("displayedRowClicked=",displayedRowClicked)

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
              modalType=="Category" ? createNewCategory(newCategory) : createNewProduct(newPrice,newCategoryId, newCategory)
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Emri i {modalType !== 'null' && modalType == "Category" ? "kategorise" : 'produktit'}</FormLabel>
                {rowType == "Edit" 
                ? 
                <Input 
                  autoFocus 
                  required 
                  defaultValue={displayedRowClicked?.name}
                  onChange={(e) => setNewCategory(e.target.value)}  
                />
                :
                <Input 
                  autoFocus 
                  required 
                  defaultValue=""
                  onChange={(e) => setNewCategory(e.target.value)}  
                />
                
                } 
              </FormControl>
              {modalType !== 'null' && modalType == "Products" || rowType == "Edit"? (
                <>
                    <FormControl>
                    <FormLabel>Cmimi</FormLabel>
                    {rowType == "Edit" ? 
                      <Input required 
                             defaultValue={displayedRowClicked.price}
                             
                      />
                      :
                      <Input required 
                             onChange={(e)=> setNewPrice(e.target.value)}
                      />
                    }
                    </FormControl>

                    <FormControl>
                    <FormLabel>Kategoria</FormLabel>
                    <Select
                      required
                      sx={{ minWidth: 200 }}
                      defaultValue={displayedRowClicked.categoryId} // Ensure a default value is set
                      onChange={handleChange}
                    >
                        {rowType == "Edit" ? 
                          <Option value={displayedRowClicked.categoryId} disabled>
                            {displayedRowClicked.categoryName}
                          </Option>
                          :
                          <Option value="" disabled >Shtoni nje produkt te ri</Option>
                        }
                      
                      {categories.map((category) => (
                        <Option key={category.id} value={category.id} >
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
