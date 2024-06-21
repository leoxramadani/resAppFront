import React,{useEffect, useState} from 'react'
import KamarierCard from '../../components/Cards/KamarierCard'
import axios from 'axios';
import { GET_ALL_KAMARIERAT } from '../../endpoints/Kamarierat/KamarieratEnd';
    
const Kamarierat = () => {


  const [kam,setKam] = useState([]);


  useEffect(() => {
    const getKams = async () => {
        try {
            const res = await axios.get(GET_ALL_KAMARIERAT, { withCredentials: true });
            setKam(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    getKams();
  }, []);


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
            {kam.length >0 && kam.map((item,i)=>(
                <KamarierCard item={item}/>
            ))}
        </div>
    </div>
  )
}

export default Kamarierat