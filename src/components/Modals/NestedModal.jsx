import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import MenuCard from "../Cards/MenuCard";
import ChildModal from "./ChildModal";
import axios from "axios";
import { GET_ALL_CATEGORIES } from "../../endpoints/MenuItems/MenuItemsEnd";
import { GET_KAMARIERI_INFO } from "../../endpoints/Kamarierat/KamarieratEnd";
import useQuery from "../hooks/useQuery";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  maxWidth: "800px",
  height: "80vh",
  maxHeight: "640px",
  bgcolor: "background.paper",
  borderRadius: "20px",
  flex: 1,
  justifyContent: "center",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflowY: "hidden",
  display: "relative",
};

// const menuItems = [
//     {"key":1,"title":"Kafe","image":"https://static.vecteezy.com/system/resources/previews/029/283/233/original/coffee-coffee-coffee-clipart-transparent-background-ai-generative-free-png.png"},
//     {"key":2,"title":"Hamburger","image":"https://png.pngtree.com/png-clipart/20230325/original/pngtree-juicy-burgers-with-a-transparent-background-png-image_9002761.png"},
//     {"key":3,"title":"Pizza","image":"https://www.freepnglogos.com/uploads/pizza-png/pizza-images-download-pizza-19.png"},
//     {"key":4,"title":"Pasta","image":"https://png.pngtree.com/png-clipart/20230523/ourmid/pngtree-spaghetti-bolognese-png-image_7106276.png"},
//     {"key":5,"title":"Salads","image":"https://static.vecteezy.com/system/resources/previews/018/128/193/non_2x/delicious-spinach-salad-with-fresh-png.png"},
//     {"key":6,"title":"Deserts","image":"https://t4.ftcdn.net/jpg/06/23/72/35/360_F_623723556_DrvnR2gKDKy4rPM5IN8kUw0VnwQoeCog.jpg"},
//     {"key":7,"title":"Drinks","image":"https://www.kindpng.com/picc/m/50-503199_cold-drinks-bottle-png-cold-drink-bottle-png.png"},
//     {"key":8,"title":"Extras","image":"https://static.vecteezy.com/system/resources/thumbnails/035/321/652/small_2x/french-fries-no-background-png.png"},

//   ]

const NestedModal = React.forwardRef(({ open, handleClose, item }, ref) => {
  const {
    data: menuItems,
    isLoading: isLoadingMenuItems,
    refetch: refetchMenuItems,
  } = useQuery(GET_ALL_CATEGORIES);

  const [categoryId, setCategoryId] = React.useState(0);

  const [openChild, setOpenChild] = React.useState(false);
  const [orderItems, setOrderItems] = React.useState();
  const [order, setOrder] = React.useState();
  const totalPrice = React.useRef(0);
  const [menuClickedItem, setMenuClickedItem] = React.useState([]);

  const handleOpenChild = (menuItem) => {
    setOpenChild(true);
    setMenuClickedItem(menuItem);
    setCategoryId(menuItem.id);
  };
  const handleCloseChild = () => {
    setCategoryId(0);
    setOpenChild(false);
  };

  React.useEffect(() => {
    if (orderItems && orderItems.length > 0) {
      const grouped = orderItems.reduce((acc, item) => {
        if (acc[item.name]) {
          acc[item.name].quantity++;
        } else {
          acc[item.name] = { ...item, quantity: 1 };
        }
        return acc;
      }, {});

      const result = Object.keys(grouped).map((name) => ({
        ...grouped[name],
      }));
      setOrder(result);

      const total = result.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      totalPrice.current = total;
    } else {
      totalPrice.current = 0;
      setOrder([]);
    }
  }, [orderItems]);

  React.useImperativeHandle(ref, () => ({
    setOrder,
    setOrderItems,
  }));

  const { data: waiterInfo, refetch: refetchMyTables } = useQuery(
    GET_KAMARIERI_INFO + `/${item && item.id}`
  );

  console.log("orderItems=", orderItems);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <div className="flex justify-between ">
          <div className="w-[50%] h-auto flex flex-col justify-center">
            <div className="w-full h-auto flex flex-col justify-between border-b-2 border-red-200">
              <h1>Kamarieri: {waiterInfo && waiterInfo.username}</h1>
              <h5>Total: {totalPrice.current}</h5>
            </div>
            <h1 id="parent-modal-title">
              {item ? item.title : "No item selected"}
            </h1>
            <h1>Porosia: </h1>
            <div className="w-full h-[100px]  overflow-y-scroll">
              {order && order.length > 0
                ? order.map((item) => (
                    <ol key={item.name}>
                      <li>
                        {item.name}: {item.quantity}
                      </li>
                    </ol>
                  ))
                : ""}
            </div>
          </div>
          <div className="w-[50%] flex justify-end  h-7">
            <Button onClick={handleClose} variant="contained" color="error">
              X
            </Button>
          </div>
        </div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 2,
            overflowY: "auto",
            maxHeight: "calc(100% - 50px)",
            OverflowX: "hidden",
            // height:'450px'
          }}
        >
          {menuItems &&
            menuItems.map((menuItem) => (
              <MenuCard
                key={menuItem.id}
                item={menuItem}
                onOpenChildModal={() => handleOpenChild(menuItem)}
              />
            ))}
        </Box>
        <ChildModal
          categoryId={categoryId}
          openChild={openChild}
          handleCloseChild={handleCloseChild}
          item={item}
          menuClickedItem={menuClickedItem}
          style={style}
          setOrderItems={setOrderItems}
          order={order}
          setOrder={setOrder}
        />
        <div className="w-[90%] h-[35px] ">
          <div className="bg-red-700 absolute right-2 bottom-2">
            <Button onClick={handleClose} variant="contained" color="success">
              Order
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
});
export default NestedModal;
