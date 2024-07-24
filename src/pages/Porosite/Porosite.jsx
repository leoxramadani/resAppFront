import React, { useState } from "react";
import BasicSelect from "../../components/Dropdowns/Basicselect";
import ListItems from "../../components/Lists/ListItems";
import { GET_ALL_ORDERS } from "../../endpoints/OrderItems/OrderItemsEnd";
import useQuery from "../../components/hooks/useQuery";
import { CircularProgress } from "@mui/material";
import * as signalR from "@microsoft/signalr";

function Porosite() {
  const [isClicked, setIsClicked] = useState(false);
  const [status, setStatus] = React.useState("");

  const {
    data: allOrders,
    refetch: refetchAllOrders,
    isLoading: isLoadingOrders,
    isSuccess,
    isError,
    error,
  } = useQuery(GET_ALL_ORDERS);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetchAllOrders();
  //   }, 500); // Adjust the interval time as needed (5000ms = 5 seconds)

  //   // Cleanup on component unmount
  //   return () => clearInterval(interval);
  // }, [refetchAllOrders]);

  //snippet code for signalR

  const connection = React.useRef(null);
  const [result, setResult] = useState([]);

  React.useEffect(() => {
    // Initialize the SignalR connection
    connection.current = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:8888/orderHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.current.on("NewOrder", (result) => {
      setResult((prevResults) => [...prevResults, result]);
    });

    connection.current
      .start()
      .then(() => console.log("SignalR Connected."))
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

  React.useEffect(() => {
    refetchAllOrders();
  }, [result]);

  return (
    <div className="w-[100vw]  h-auto flex flex-wrap p-5 justify-around flex-row">
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
  );
}

export default Porosite;
