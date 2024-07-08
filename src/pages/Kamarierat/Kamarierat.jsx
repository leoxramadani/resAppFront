import React,{useEffect, useState} from 'react'
import KamarierCard from '../../components/Cards/KamarierCard'
import axios from 'axios';
import { GET_ALL_KAMARIERAT } from '../../endpoints/Kamarierat/KamarieratEnd';
import useQuery from '../../components/hooks/useQuery';
import { GET_FREE_TABLES } from '../../endpoints/TableWaiters/TableWaitersEnd';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Add } from '@mui/icons-material';
import KamarierModal from '../../components/Modals/KamarierModal';

const Kamarierat = () => {



  const { data: kam,refetch:refetchKam } = useQuery(GET_ALL_KAMARIERAT);

  const { data: freeTables,refetch:refetchFreeTables } = useQuery(GET_FREE_TABLES);

  useEffect(() => {
    refetchKam();
  }, []);


  const [removeStatus,setRemoveStatus] = React.useState(false);
  const [addTableStatus,setAddTableStatus] = React.useState(false);


  React.useEffect(()=>{
    if(removeStatus==true){
      toast.success("Ndryshimi u krye me sukses!");
      refetchFreeTables();
      setRemoveStatus(false);
    }
    if(addTableStatus==true){
      toast.success("Tavolina u ruajt me sukses");
      refetchFreeTables();
      setAddTableStatus(false);
    }
  },[removeStatus,addTableStatus])

 
  
  const [open, setOpen] = React.useState(false);




  return (
    <div>
         <p style={{textAlign:'center'}}>Zgjedhni nje kamarier dhe caktoni tavolinat e tij/saj</p>
        <div style={{width:"100vw",height:"auto",padding:"20px", display:"flex", flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly",paddingTop:"15px"}}>
            {Array.isArray(kam) && kam.map((item,i)=>(
                <KamarierCard item={item} key={item.id} setRemoveStatus={setRemoveStatus} setAddTableStatus={setAddTableStatus} freeTables={freeTables}/>
            ))}
        </div>
        <ToastContainer/>
        <button className='w-[50px] h-[50px] bg-slate-200 fixed right-2 bottom-2 z-50 rounded-full border-blue-400 border-2'>
          <Add onClick={() => setOpen(true)}/>
        </button>
        <KamarierModal setOpen={setOpen} open={open} />
    </div>
  )
}

export default Kamarierat