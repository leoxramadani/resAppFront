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
import { CircularProgress } from "@mui/material";
import { ORDER_FOOD } from "../../endpoints/OrderItems/OrderItemsEnd";

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

const NestedModal = React.forwardRef(
  ({ open, handleClose, item, setOrderFoodMsg }, ref) => {
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
          menuItemId: grouped[name].id,
          orderPrice: grouped[name].price,
          id: undefined,
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

    const {
      data: waiterInfo,
      refetch: refetchMyTables,
      isLoading: isLoadingWaiter,
    } = useQuery(GET_KAMARIERI_INFO + `/${item && item.id}`);

    const orderFunction = async (order, waiterId, tableId) => {
      try {
        if (order != null && waiterId != null && tableId) {
          const url = `${ORDER_FOOD}?${tableId ? `tableId=${tableId}&` : ""}${
            waiterId ? `waiterId=${waiterId}` : ""
          }`;

          const res = await axios.post(url, order, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          setOrderFoodMsg(res.data.succeeded);
          handleClose();
        }
      } catch (error) {
        console.error("Error=", error);
      }
    };
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
                <h1 className="flex flex-row">
                  Kamarieri:
                  {isLoadingWaiter ? (
                    <div>
                      <CircularProgress
                        sx={{ height: "10px", width: "10px" }}
                      />
                    </div>
                  ) : (
                    waiterInfo && waiterInfo.username
                  )}
                </h1>
                <h5>Total: {totalPrice.current}</h5>
              </div>
              <h1 id="parent-modal-title">
                {item ? item.title : "No item selected"}
              </h1>
              <h1>Porosia: </h1>
              <div
                className={`w-full ${
                  order && order.length > 0 ? "h-[80px]" : "h-auto"
                } overflow-y-scroll`}
              >
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
          </div>
          {isLoadingMenuItems ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 2,
                overflowY: "auto",
                maxHeight: "calc(100% - 100px)",
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
          )}
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
          <div className="w-[90%] h-[50px]absolute bottom-0">
            <div className="bg-red-700 absolute right-2 bottom-2">
              <Button
                onClick={() => orderFunction(order, waiterInfo?.id, item?.id)}
                variant="contained"
                color="success"
              >
                Order
              </Button>
            </div>
            <div className="bg-red-700 absolute left-2 bottom-2">
              <Button onClick={handleClose} variant="contained" color="error">
                X
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    );
  }
);
export default NestedModal;
