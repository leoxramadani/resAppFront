import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { CHANGE_ORDER_STATUS } from "../../endpoints/OrderItems/OrderItemsEnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatDate from "../../components/constants/formatDate";
import Input from "@mui/joy/Input";

export default function ListItems({ item, setStatusSucceeded }) {
  const selectOptions = [
    { value: "New", label: "New" },
    { value: "In preparation", label: "In preparation" },
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
    setButtonClicked(1);
  };

  const changeStatus = async (orderId, tempStatus) => {
    try {
      const res = await axios.put(CHANGE_ORDER_STATUS, null, {
        params: { orderId: orderId, statusName: tempStatus },
        withCredentials: true,
      });
      setStatusSucceeded(res.data.data);
    } catch (error) {
      console.error("Error=", error);
    } finally {
      setButtonClicked(0); // Ensure the buttonClicked is reset
    }
  };

  React.useEffect(() => {
    if (itemId !== 0 && status !== "" && buttonClicked !== 0) {
      console.log(
        "itemid=",
        itemId,
        ",status=",
        status,
        ",buttonClicked=",
        buttonClicked
      );
      changeStatus(itemId, status);
    }
  }, [buttonClicked]);

  const [pagesaNumber, setPagesaNumber] = React.useState(0);
  const [kusuriNumber, setKusuriNumber] = React.useState(0);

  React.useEffect(() => {
    if (item?.totalPrice) {
      const temp = pagesaNumber - item?.totalPrice;
      setKusuriNumber(temp);
    }
    if (pagesaNumber === 0 || pagesaNumber === "") setKusuriNumber(0);
  }, [pagesaNumber]);
  return (
    <>
      <div
        className="w-[400px] h-auto border-2 border-slate-400 p-4 flex flex-col rounded-xl"
        key={item?.id}
      >
        <div className="w-full h-auto flex flex-col items-start">
          <p className="font-semibold"># {item?.id}</p>
          <p className="text-slate-500">Detajet e porosise</p>
        </div>
        <div className="w-full h-auto  flex flex-row items-start mt-4">
          <div className="w-full h-auto  flex flex-col items-start mt-4">
            <p>Numri i tavolines</p>
            <p className="border-t-0 border-2 border-slate-400 px-4">
              {" "}
              # {item?.tableNr}
            </p>
          </div>
          <div className="w-full h-auto  flex flex-col items-start mt-4">
            <p>Emri i kamarierit</p>
            <p className="border-t-0 border-2 border-slate-400 px-4">
              {" "}
              {item?.waiterUsername}
            </p>
          </div>
        </div>
        <div className="w-full h-auto  flex flex-row justify-between mt-1">
          <div className="w-auto h-auto flex flex-col">
            <p className="  text-slate-500">Koha e porosise</p>
            <p className="text-[17px]">{formatDate(item?.orderTime)}</p>
          </div>
          <div className="w-auto h-auto flex flex-col">
            <p className="text-slate-500">Statusi</p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Statusi"
              value={status}
              onChange={(event) => handleChange(event, item?.id)}
              sx={{
                height: 40,
                "& .MuiSelect-select": {
                  paddingTop: "8px",
                  paddingBottom: "8px",
                },
              }}
            >
              {selectOptions.map((opt) => (
                <MenuItem value={opt.value}>{opt.label} </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="w-[95%]  border-2 border-slate-300 mt-3"></div>
        <div className="w-full h-auto flex flex-col justify-between mt-4">
          <div className="flex flex-row justify-evenly w-full border-slate-300 border-solid border-2 border-t-0">
            <p className="w-[33%] flex justify-center items-center">Emri</p>
            <p className="w-[33%] flex justify-center items-center">Sasia</p>
            <p className="w-[33%] flex justify-center items-center">Cmimi</p>
          </div>
          <div className="flex flex-col justify-evenly w-full h-[160px] overflow-y-scroll">
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
        </div>
        <div className="w-full h-auto flex items-end justify-between mt-5">
          <div className="h-auto w-auto flex flex-col ">
            <p>Pagesa</p>
            <Input
              placeholder="0 den"
              type="number"
              sx={{
                "&::before": {
                  border: "1.5px solid var(--Input-focusedHighlight)",
                  transform: "scaleX(0)",
                  left: "2.5px",
                  right: "2.5px",
                  bottom: 0,
                  top: "unset",
                  transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                  borderRadius: 0,
                  borderBottomLeftRadius: "64px 20px",
                  borderBottomRightRadius: "64px 20px",
                },
                width: 100,
                "&:focus-within::before": {
                  transform: "scaleX(1)",
                },
              }}
              onChange={(e) => setPagesaNumber(e.target.value)}
            />
          </div>
          <div className="h-auto w-auto flex flex-col ">
            <p>Kusuri</p>
            <p className="border-t-0 border-2 border-slate-300 px-4">
              {pagesaNumber === 0 ? 0 : kusuriNumber} Den
            </p>
          </div>
          <div className="h-auto w-auto flex flex-col ">
            <p>Totali</p>
            <p className="border-t-0 border-2 border-slate-300 px-4">
              {item?.totalPrice} Den
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
