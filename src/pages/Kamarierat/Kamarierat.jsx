import React,{useEffect, useState} from 'react'
import KamarierCard from '../../components/Cards/KamarierCard'
import axios from 'axios';
import { GET_ALL_KAMARIERAT } from '../../endpoints/Kamarierat/KamarieratEnd';
import useQuery from '../../components/hooks/useQuery';
import { GET_FREE_TABLES } from '../../endpoints/TableWaiters/TableWaitersEnd';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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

    // const kamarierat = [
    //     {"key":1,"name":"Leotrim Ramadani","numri":"071799241","image":"https://i.pinimg.com/736x/54/72/d1/5472d1b09d3d724228109d381d617326.jpg"},
    //     {"key":2,"name":"Ardit Ameti","numri":"070123444","image":"https://i.pinimg.com/550x/f5/6b/ae/f56baef86aed6c261c422402aab59065.jpg"},
    //     {"key":3,"name":"Besir Kurtishi","numri":"071241255","image":"https://i.pinimg.com/736x/b2/ea/a0/b2eaa0d4918d54021f9c7aa3fc3d3cf3.jpg"},
    //     {"key":4,"name":"Amar Alimi","numri":"070984111","image":"https://i.pinimg.com/236x/48/a4/26/48a426f0f90ac90de24543be191fe857.jpg"},
    //     {"key":5,"name":"Valon Ahmeti","numri":"071244231","image":"https://i.pinimg.com/1200x/e3/62/4c/e3624c19d0daffe81c0b1276ea2890e6.jpg"},
    //     {"key":6,"name":"Ardrin Rexhepi","numri":"070924111","image":"https://i.pinimg.com/280x280_RS/b5/0c/8b/b50c8beacced5c1b8c85afaf20d7e9b9.jpg"},
    //     {"key":7,"name":"Taulant Avdili","numri":"070924111","image":"https://i.pinimg.com/280x280_RS/b5/0c/8b/b50c8beacced5c1b8c85afaf20d7e9b9.jpg"},


    // ];
  return (
    <div>
         <p style={{textAlign:'center'}}>Zgjedhni nje kamarier dhe caktoni tavolinat e tij/saj</p>
        <div style={{width:"100vw",height:"auto",padding:"20px", display:"flex", flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly",paddingTop:"15px"}}>
            {Array.isArray(kam) && kam.map((item,i)=>(
                <KamarierCard item={item} key={item.id} setRemoveStatus={setRemoveStatus} setAddTableStatus={setAddTableStatus} freeTables={freeTables}/>
            ))}
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Kamarierat