import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MenuCard({ item, onOpenChildModal }) {

  return (
    <Card sx={{ 
            minWidth: 200, 
            maxWidth: 200, 
            display: 'flex', 
            flexDirection: 'col', 
            alignItems: 'center', 
            margin: 1,
            justifyContent:'space-between',
            cursor:'pointer',
            }}
            onClick={onOpenChildModal}    
        >
      <CardContent >
        <Typography variant="body2">
          <img src={item?.photo} alt={item?.categoryName}  className='w-[150px] h-[150px]'/>
        </Typography>
        <Typography sx={{ fontSize: 14,textAlign:'center' }} color="text.secondary" gutterBottom>
          {item?.categoryName}
        </Typography>

      </CardContent>
      {/* <CardActions>
        <Button >Learn More</Button>
      </CardActions> */}
    </Card>
  );
}