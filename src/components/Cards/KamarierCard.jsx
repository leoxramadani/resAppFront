import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import BasicModal from '../Modals/BasicModal';
import { GET_FREE_TABLES, GET_MY_TABLES } from '../../endpoints/TableWaiters/TableWaitersEnd';
import axios from 'axios';
import useQuery from '../hooks/useQuery';


export default function KamarierCard({item,setAddTableStatus,setRemoveStatus,setEployeeResult,loadingKamarierat}) {

  const [selectedItem, setSelectedItem] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (item) => {
    console.log('Opening modal');
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    console.log('Closing modal');
    setOpen(false);
  };


  const [tavolinat,setTavolinat] = React.useState([]);
  
  const getTavolinat = async(id) => {
    try {
      const res = await axios.get(`${GET_MY_TABLES}/${id}`);
      setTavolinat(res.data || []);
      console.log("res=", res.data);
    } catch (error) {
      console.error("Error fetching tavolinat:", error);
      setTavolinat([]);
    }
  }


  const [myId,setMyId] = React.useState(0);


  const {refetch:refetchMyTables} = useQuery(GET_MY_TABLES+`/${myId}`)

  const getChipStyles = (roleName) => {
    switch (roleName) {
      case 'Kamarier':
        return {
          backgroundColor: 'green',
          color: 'white', 
        };
      case 'Menaxher':
        return {
          backgroundColor: 'black',
          color: 'white',
          borderRadius: 'none' 
        };
      case 'Kuzhinier':
        return {
          backgroundColor: 'crimson',
          color: 'white', 
        };
      default:
        return {
          backgroundColor: 'grey',
          color: 'white', 
        };
    }
  };
  


  return (
    <>
    <Card
      key={item.id}
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 320,
        height:140,
        marginBottom:5,
        backgroundColor:'#EFF6FF',
        color:'white',
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
      onClick={()=>{handleOpen(item);getTavolinat(item.id);setMyId(item.id)}}
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <img
          src="https://i.pinimg.com/736x/54/72/d1/5472d1b09d3d724228109d381d617326.jpg"
          srcSet={item.image}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description" sx={{color:'b'}}>
          {item.name} {" "} {item.surname}
        </Typography>
        <Typography level="title-lg" id="card-description" sx={{color:'b'}}>
          {item.contactInfo}
        </Typography>

        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: 'none' ,
          ...getChipStyles(item.roleName),
          }}

        >
          {item.roleName}
        </Chip>
        
        {/* <KamarieratModal key={item.key} open={open} handleClose={handleClose} item={selectedItem}/> */}
        
      </CardContent>
      
    </Card>
    <BasicModal open={open} handleClose={handleClose} refetchMyTables={refetchMyTables} item={item} tavolinat={tavolinat} setRemoveStatus={setRemoveStatus} setAddTableStatus={setAddTableStatus} setEployeeResult={setEployeeResult}/>
    </>
    
  );
}
