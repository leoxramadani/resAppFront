import React,{useState} from 'react'
import BasicSelect from '../../components/Dropdowns/Basicselect';
import ListItems from '../../components/Lists/ListItems';

function Porosite() {
  const [isClicked,setIsClicked] = useState(false);
  const [status, setStatus] = React.useState('');

  const orders = [
    {"key":1,
     "produkti":[{"emri":"Machiato","quantity":2,"den":100},
                 {"emri":"Espresso","quantity":4,"den":300},
                 {"emri":"Latte machiato","quantity":4,"den":400}],
      "statusi":"Pending",
      "porosiaNr":1
    },

    {"key":2,"produkti":[{"emri":"Hamburger classic","quantity":1,"den":200},
                           {"emri":"Hamburger me stek","quantity":2,"den":300},
                           {"emri":"Hamburger me veze","quantity":3,"den":350}],
                           "statusi":"Pending",
                           "porosiaNr":2},


    {"key":3,"produkti":[{"emri":"Pizza margarita","quantity":1,"den":300},
                           {"emri":"Pizza Tuna","quantity":2,"den":450},
                           {"emri":"Pizza 4 stinet","quantity":3,"den":500}],
                           "statusi":"Ready",
                           "porosiaNr":3},

    {"key":4,"produkti":[{"emri":"Makarona","quantity":1,"den":260},
    {"emri":"Shpageta","quantity":2,"den":300},
    {"emri":"Makarona","quantity":3,"den":260}],
        "statusi":"Ready",
        "porosiaNr":4},


    {"key":5,"produkti":[{"emri":"Coca Cola","quantity":1,"den":70},
    {"emri":"Fanta","quantity":4,"den":10},
    {"emri":"Sprite","quantity":3,"den":80}],
    "statusi":"Ready",
    "porosiaNr":5},


    {"key":6,"produkti":[{"emri":"Coca Cola","quantity":2,"den":75},
    {"emri":"Fanta","quantity":4,"den":20},
    {"emri":"Sprite","quantity":2,"den":90}],
    "statusi":"Ready",
    "porosiaNr":6},

    {"key":7,"produkti":[{"emri":"Coca Cola","quantity":3,"den":76},
    {"emri":"Fanta","quantity":4,"den":30},
    {"emri":"Sprite","quantity":1,"den":100}],
    "statusi":"Closed",
    "porosiaNr":7},

    {"key":8,"produkti":[{"emri":"Coca Cola","quantity":4,"den":77},
    {"emri":"Fanta","quantity":4,"den":40},
    {"emri":"Sprite","quantity":4,"den":120}],
    "statusi":"Closed",
    "porosiaNr":8},

    {"key":9,"produkti":[{"emri":"Coca Cola","quantity":5,"den":78},
    {"emri":"Fanta","quantity":4,"den":50},
    {"emri":"Sprite","quantity":5,"den":130}],
    "statusi":"Closed",
    "porosiaNr":9},

    {"key":10,"produkti":[{"emri":"Coca Cola","quantity":6,"den":80},
    {"emri":"Fanta","quantity":4,"den":60},
    {"emri":"Sprite","quantity":6,"den":140}],
    "statusi":"Closed",
    "porosiaNr":10},


  ];

  
  return (
    <div className='w-[100vw]  h-auto flex flex-wrap p-5 justify-around flex-row'>

        {orders ?? orders.length>0 ? orders.map(item =>{
          return (
          <ListItems item={item}/>
          )
        }) : <p>No orders yet!</p>}
          





        

    </div>
  )
}

export default Porosite