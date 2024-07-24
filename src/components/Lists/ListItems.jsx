import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import axios from "axios";
import { CHANGE_ORDER_STATUS } from "../../endpoints/OrderItems/OrderItemsEnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListItems({ item }) {
  const selectOptions = [
    { value: "New", label: "New" },
    { value: "Recieved", label: "Recieved" },
    { value: "Ready for Pickup", label: "Ready for Pickup" },
    { value: "In preparation", label: "In preparation" },
    { value: "Served", label: "Served" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  const [status, setStatus] = React.useState(item?.status);
  const [itemId, setItemId] = React.useState(0);
  const [tempStatus, setTempStatus] = React.useState(0);
  const [buttonClicked, setButtonClicked] = React.useState(0);

  const handleChange = (event, itemId) => {
    setStatus(event.target.value);
    setItemId(itemId);
    setTempStatus(1);
  };

  const changeStatus = async (orderId, tempStatus) => {
    try {
      const res = await axios.put(CHANGE_ORDER_STATUS, null, {
        params: { orderId: orderId, statusName: tempStatus },
        withCredentials: true,
      });
      toast.success(res.data.data || "Status updated successfully");
      setItemId(0);
      setTempStatus(0);
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Error=", error);
    } finally {
      setButtonClicked(0); // Ensure the buttonClicked is reset
    }
  };

  React.useEffect(() => {
    if (itemId !== 0 && status !== "" && buttonClicked !== 0) {
      changeStatus(itemId, status);
      setButtonClicked(0);
      setTempStatus(0);
    }
  }, [buttonClicked]);

  return (
    <>
      <ToastContainer hideProgressBar={false} autoClose={2000} draggable />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setButtonClicked(1);
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            backgroundColor: "#EFF6FF",
            margin: "15px",
            boxShadow:
              item?.status == "New"
                ? "0px 0px 10px crimson"
                : item?.status == "Recieved"
                ? "0px 0px 10px blue"
                : item?.status == "In preparation"
                ? "0px 0px 10px green"
                : item?.status == "Served"
                ? "0px 0px 10px yellow"
                : item?.status == "Ready for Pickup"
                ? "0px 0px 10px orange"
                : item?.status == "Completed"
                ? "0px 0px 10px purple"
                : item?.status == "Cancelled"
                ? "0px 0px 10px red"
                : "0px 0px 10px beige",
          }}
        >
          <ListItem alignItems="flex-start" key={item?.id}>
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://www.freeiconspng.com/thumbs/restaurant-icon-png/restaurant-icon-png-plate-1.png"
              />
            </ListItemAvatar>
            <ListItemText
              primary={`Porosia numer: ${item?.id}`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    <div className="w-full flex flex-col  ">
                      <div className="flex flex-row justify-evenly w-full border-slate-300 border-solid border-2 border-t-0">
                        <p className="w-[33%] flex justify-center items-center">
                          Emri
                        </p>
                        <p className="w-[33%] flex justify-center items-center">
                          Sasia
                        </p>
                        <p className="w-[33%] flex justify-center items-center">
                          Cmimi
                        </p>
                      </div>
                      <div className="flex flex-col justify-evenly w-full">
                        {item?.menuItems &&
                          item?.menuItems.map((prod, index) => (
                            <div key={index} className="flex w-full flex-row">
                              <span className="w-[33%] flex justify-center items-center text-center">
                                {prod.name}
                              </span>
                              <span className="w-[33%] flex justify-center items-center text-center">
                                {prod.quantity}
                              </span>
                              <span className="w-[33%] flex justify-center items-center text-center">
                                {prod.orderPrice}
                              </span>
                            </div>
                          ))}
                      </div>
                      <div className="mt-5 flex flex-row">
                        <p>Total:</p>
                        <b>{item?.totalPrice}</b>
                      </div>
                      <div className="mt-5">
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel
                              id="demo-simple-select-label"
                              sx={{ fontSize: "12px" }}
                            >
                              Statusi
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Statusi"
                              value={status}
                              onChange={(event) =>
                                handleChange(event, item?.id)
                              }
                              sx={{
                                height: 40,
                                "& .MuiSelect-select": {
                                  paddingTop: "8px",
                                  paddingBottom: "8px",
                                },
                              }}
                            >
                              {selectOptions.map((opt) => (
                                <MenuItem value={opt.value}>
                                  {opt.label}{" "}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                      {tempStatus !== 0 ? (
                        <div className="mt-5">
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <Button type="submit">Ruaj ndryshimin</Button>
                            </FormControl>
                          </Box>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {/* <Divider variant="inset" component="li" /> */}

          {/* <Divider variant="inset" component="li" /> */}
        </List>
      </form>
    </>
  );
}
