import React,{useEffect, useState} from 'react'
import TableColumnPinning from '../../components/Table/Table'
import ProductModal from '../../components/Modals/ProductModal'
import Add from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS } from '../../endpoints/MenuItems/MenuItemsEnd';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

function Produktet() {

  const [products,setProducts] = useState([]);

  const [categoryCreateResult,setCategoryCreateResult] = useState("");
  const [menuItemCreateResult,setMenuItemCreateResult] = useState("");

  useEffect(()=>{
    if(categoryCreateResult == "Success"){
      toast.success("Kategoria u krijua me sukses!")
      setCategoryCreateResult("");
    }
    else if(categoryCreateResult == "Exists"){
      toast.warning("Kategoria ekziston!")
      setCategoryCreateResult("");
    }
    else if(categoryCreateResult == "Failure"){
      toast.error("Nuk mund te shtoni kategori te re!");
      setCategoryCreateResult("");
    }
  },[categoryCreateResult])

  useEffect(()=>{
    if(menuItemCreateResult == "Success"){
      toast.success("Produkti u krijua me sukses!")
      setCategoryCreateResult("");
    }
    else if(menuItemCreateResult == "Exists"){
      toast.warning("Produkti ekziston!")
      setCategoryCreateResult("");
    }
    else if(menuItemCreateResult == "Failure"){
      toast.error("Nuk mund te shtoni produkt te ri!");
      setCategoryCreateResult("");
    }
  },[menuItemCreateResult])


  useEffect(() => {
    const getProducts = async () => {
        try {
            const res = await axios.get(GET_ALL_PRODUCTS, { withCredentials: true });
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    getProducts();
  }, []);
  console.log("products=",products);


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


  // const rows = [
  //   { "id":1,"Kategoria":"Kafe","Produkti":"Espresso","Cmimi":50},
  //   { "id":2,"Kategoria":"Hamburger","Produkti":"Hamburger klasik","Cmimi":220},
  //   { "id":3,"Kategoria":"Pizza","Produkti":"Margarita","Cmimi":190},
  //   { "id":4,"Kategoria":"Pasta","Produkti":"Shpageta","Cmimi":210},
  //   { "id":5,"Kategoria":"Pije","Produkti":"Coca Cola","Cmimi":70},
  //   { "id":6,"Kategoria":"Desert","Produkti":"Bakllava","Cmimi":80},
  //   { "id":7,"Kategoria":"Shtese","Produkti":"Pomfrita","Cmimi":50},
  // ]



  const [open, setOpen] = React.useState(false);
  const [modalType,setModalType] = React.useState(null);
  const [rowType,setRowType] = React.useState(null);
  const [displayedRowClicked,setDisplayedRow] = React.useState();

  const modalClicked = (param) =>{
      setOpen(true)
      setModalType(param);
  }

  useEffect(()=>{
    if(!open){
      setModalType(null);
      setRowType(null);
    }
  },[open])


  return (
    <div className='w-[100vw] h-[92vh] flex  items-center flex-col '>
      <div className='w-full h-auto  mt-[100px] flex flex-row items-center justify-center '>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => modalClicked("Category")}
          sx={{
            marginRight:"10px"
          }}
        >
          Shto kategorite
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => modalClicked("Products")}
          sx={{
            marginLeft:"10px"
          }}
        >
          Shto produktet
        </Button>
        <ProductModal setOpen={setOpen} open={open} modalType={modalType} rowType={rowType} displayedRowClicked={displayedRowClicked} setCategoryCreateResult={setCategoryCreateResult} setMenuItemCreateResult={setMenuItemCreateResult}/>
      </div>
      <div className='w-[90vw] h-[50vh]  mt-10'>
      <Tabs aria-label="Basic tabs" defaultValue={0}>
        <TabList>
          <Tab>Kategorite</Tab>
          <Tab>Produktet</Tab>
        </TabList>

        <TabPanel value={0}>
          <TableColumnPinning rows={categories} datafor={"categories"} open={open} setOpen={setOpen} setDisplayedRow={setDisplayedRow} rowType={rowType} setRowType={setRowType}/>
        </TabPanel>

        <TabPanel value={1}>
          <TableColumnPinning rows={products} datafor={"products"} open={open} setOpen={setOpen} setDisplayedRow={setDisplayedRow} rowType={rowType} setRowType={setRowType}/>
        </TabPanel>

      </Tabs>
      </div>
      <ToastContainer/>
    </div>
    
  )
}

export default Produktet