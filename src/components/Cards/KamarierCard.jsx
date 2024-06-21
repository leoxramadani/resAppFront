import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import BasicModal from '../Modals/BasicModal';

export default function KamarierCard({item}) {

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
      onClick={()=>{handleOpen(item)}}
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

        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: 'none' }}
        >
          {item.username}
        </Chip>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            {item.contactInfo}
          </Link>
        </Typography>
        {/* <KamarieratModal key={item.key} open={open} handleClose={handleClose} item={selectedItem}/> */}
      </CardContent>
      
    </Card><BasicModal open={open} handleClose={handleClose} item={selectedItem} /></>
    
  );
}
