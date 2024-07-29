import React, { useEffect, useState } from "react";
import KamarierCard from "../../components/Cards/KamarierCard";
import axios from "axios";
import { GET_ALL_KAMARIERAT } from "../../endpoints/Kamarierat/KamarieratEnd";
import useQuery from "../../components/hooks/useQuery";
import { GET_FREE_TABLES } from "../../endpoints/TableWaiters/TableWaitersEnd";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Add } from "@mui/icons-material";
import KamarierModal from "../../components/Modals/KamarierModal";
import { CircularProgress } from "@mui/material";

const Kamarierat = () => {
  const {
    data: kam,
    isLoading: loadingKamarierat,
    refetch: refetchKam,
  } = useQuery(GET_ALL_KAMARIERAT);
  const { refetch: refetchFreeTables } = useQuery(GET_FREE_TABLES);

  const [removeStatus, setRemoveStatus] = React.useState(false);
  const [addTableStatus, setAddTableStatus] = React.useState(false);
  const [addEmployeeResult, setEmployee] = React.useState(false);
  const [removeEmployeeResult, setEployeeResult] = React.useState(false);

  React.useEffect(() => {
    if (removeStatus == true) {
      toast.success("Ndryshimi u krye me sukses!");
      refetchFreeTables();
      console.log("test1");
      setRemoveStatus(false);
    } else if (addTableStatus == true) {
      toast.success("Tavolina u ruajt me sukses");
      refetchFreeTables();
      setAddTableStatus(false);
    } else if (addEmployeeResult != "") {
      if (addEmployeeResult.includes("Verejtje")) {
        toast.error(addEmployeeResult);
      } else {
        toast.success(addEmployeeResult);
      }
      setEmployee("");
      refetchKam();
    } else if (removeEmployeeResult != "") {
      if (removeEmployeeResult.includes("sukses")) {
        toast.success(removeEmployeeResult);
      } else {
        toast.error(removeEmployeeResult);
      }
      setEployeeResult("");
      refetchKam();
    }
    refetchFreeTables();
  }, [removeStatus, addTableStatus, addEmployeeResult, removeEmployeeResult]);

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      {loadingKamarierat ? (
        <div className="flex h-[100vh]  w-full items-center justify-center ">
          <CircularProgress />
        </div>
      ) : (
        <>
          <p style={{ textAlign: "center" }}>
            Zgjedhni nje kamarier dhe caktoni tavolinat e tij/saj
          </p>

          <div
            style={{
              width: "100vw",
              height: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              paddingTop: "15px",
            }}
          >
            {Array.isArray(kam) &&
              kam.map((item, i) => (
                <KamarierCard
                  loadingKamarierat={loadingKamarierat}
                  item={item}
                  key={item.id}
                  setRemoveStatus={setRemoveStatus}
                  setAddTableStatus={setAddTableStatus}
                  setEployeeResult={setEployeeResult}
                />
              ))}
          </div>
        </>
      )}

      <button className="w-[50px] h-[50px] bg-slate-200 fixed right-2 bottom-2 z-50 rounded-full border-blue-400 border-2">
        <Add onClick={() => setOpen(true)} />
      </button>
      <KamarierModal setOpen={setOpen} open={open} setEmployee={setEmployee} />
      <ToastContainer />
    </div>
  );
};

export default Kamarierat;
