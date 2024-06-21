import React,{useEffect, useState} from 'react'
import TableColumnPinning from '../../components/Table/Table'
import ProductModal from '../../components/Modals/ProductModal'
import Add from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import { GET_ALL_PRODUCTS } from '../../endpoints/MenuItems/MenuItemsEnd';
import axios from 'axios';


function Produktet() {

  const [products,setProducts] = useState([]);




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
        <ProductModal setOpen={setOpen} open={open} modalType={modalType} rowType={rowType} displayedRowClicked={displayedRowClicked}/>
      </div>
      <div className='w-[90vw] h-[50vh]  mt-10'>
        <TableColumnPinning rows={products} open={open} setOpen={setOpen} setDisplayedRow={setDisplayedRow} rowType={rowType} setRowType={setRowType}/>
      </div>
    </div>
  )
}

export default Produktet