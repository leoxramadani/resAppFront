import React, { useState, useEffect, useRef } from "react";
import BasicSelect from "../../components/Dropdowns/Basicselect";
import ListItems from "../../components/Lists/ListItems";
import { GET_ALL_ORDERS } from "../../endpoints/OrderItems/OrderItemsEnd";
import useQuery from "../../components/hooks/useQuery";
import { CircularProgress } from "@mui/material";
import * as signalR from "@microsoft/signalr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Porosite() {
  const [isClicked, setIsClicked] = useState(false);
  const [status, setStatus] = useState("");

  const {
    data: allOrders,
    refetch: refetchAllOrders,
    isLoading: isLoadingOrders,
    isSuccess,
    isError,
    error,
  } = useQuery(GET_ALL_ORDERS);

  const connection = useRef(null);
  const [result, setResult] = useState([]);

  useEffect(() => {
    connection.current = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:8888/orderHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.current.on("NewOrder", (result) => {
      setResult((prevResults) => [...prevResults, result]);
      toast.success("New order received!");
      refetchAllOrders();
    });

    connection.current
      .start()
      .then()
      .catch((err) =>
        console.error("SignalR Connection Error: ", err.toString())
      );

    return () => {
      if (connection.current) {
        connection.current
          .stop()
          .then(() => console.log("SignalR Disconnected."))
          .catch((err) =>
            console.error("SignalR Disconnection Error: ", err.toString())
          );
      }
    };
  }, []);

  const statusConnection = useRef(null);
  const [statusResult, setStatusResult] = useState([]);

  useEffect(() => {
    statusConnection.current = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:8888/orderHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    statusConnection.current.on("changeOrder", (result) => {
      setStatusResult((prevResults) => [...prevResults, result]);
      toast.success("Order status changed!");
      refetchAllOrders();
    });

    statusConnection.current
      .start()
      .then()
      .catch((err) =>
        console.error("SignalR Connection Error: ", err.toString())
      );

    return () => {
      if (statusConnection.current) {
        statusConnection.current
          .stop()
          .then(() => console.log("SignalR Disconnected."))
          .catch((err) =>
            console.error("SignalR Disconnection Error: ", err.toString())
          );
      }
    };
  }, []);
  return (
    <>
      <ToastContainer
        hideProgressBar={false}
        autoClose={2000}
        draggable
        containerId={"1"}
      />
      <div className="w-[100vw] h-auto flex flex-wrap p-5 justify-around flex-row gap-5">
        {isLoadingOrders ? (
          <div>
            <CircularProgress />
          </div>
        ) : allOrders && allOrders.length > 0 ? (
          allOrders.map((item) => <ListItems key={item.id} item={item} />)
        ) : (
          <p>No orders yet!</p>
        )}
      </div>
    </>
  );
}

export default Porosite;
