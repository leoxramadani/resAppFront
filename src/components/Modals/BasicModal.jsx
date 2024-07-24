import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import {
  ASSING_TABLE_WAITER,
  GET_FREE_TABLES,
  GET_MY_TABLES,
  REMOVE_WAITER_TABLE,
} from "../../endpoints/TableWaiters/TableWaitersEnd";
import {
  Add,
  AddBox,
  CloseFullscreenOutlined,
  CloseSharp,
  DeleteForever,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import useQuery from "../../components/hooks/useQuery";
import { REMOVE_EMPLOYEE } from "../../endpoints/Kamarierat/KamarieratEnd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 1300,
};

export default function BasicModal({
  refetchMyTables,
  open,
  handleClose,
  item,
  tavolinat,
  setRemoveStatus,
  setAddTableStatus,
  setEployeeResult,
  isLoadingMyTables,
}) {
  const { data: freeTables, refetch: refetchFreeTables } =
    useQuery(GET_FREE_TABLES);

  const removeEmp = async (waiterId, tableId) => {
    try {
      const res = await axios.post(
        `${REMOVE_WAITER_TABLE}/${tableId}/${waiterId}`,
        null,
        { withCredentials: true }
      );
      setRemoveStatus(res.data.succeeded);
      refetchMyTables();
      refetchFreeTables();
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addEmpTable = async (waiterId, tableId) => {
    try {
      const res = await axios.post(
        `${ASSING_TABLE_WAITER}/${tableId}/${waiterId}`,
        null,
        { withCredentials: true }
      );
      setAddTableStatus(res.data.succeeded);
      refetchMyTables();
      handleClose();
      refetchFreeTables();
    } catch (error) {
      console.error("Error=", error);
    }
  };

  const deleteEmployee = async (empId) => {
    try {
      if (empId.id) {
        const res = await axios.put(`${REMOVE_EMPLOYEE}/${empId.id}`, null, {
          withCredentials: true,
        });
        console.log("res=", res.data);
        handleClose();
        setEployeeResult(res.data.data);
      }
    } catch (error) {
      console.error("Error=", error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 1000 }}
      >
        <Box sx={style}>
          <div className="flex w-full h-auto border-b-2 border-b-black flex-col mb-[10px]">
            <div className="flex w-full h-auto justify-between  items-center flex-row">
              <p>Emri</p>
              <p style={{ fontWeight: "600" }}>
                {item.name} {item.surname}
              </p>
            </div>
            <div className="flex w-full h-auto justify-between items-center flex-row">
              <p>Numri</p>
              <p>{item.contactInfo}</p>
            </div>
            <div className="flex w-full h-auto justify-between items-center flex-row">
              <p>Role</p>
              <p>{item.roleName}</p>
            </div>
          </div>
          <div>
            <p>Pergjegjes per tavolinat: </p>
            <div className="w-full h-auto flex flex-wrap justify-between ">
              {isLoadingMyTables ? (
                <div>
                  <CircularProgress />
                </div>
              ) : tavolinat.length > 0 ? (
                tavolinat.map((tav, index) => (
                  <div className="p-1  bg-blue-100 flex flex-row items-center justify-around w-[120px]">
                    <p key={index}>Tav. {tav.tableNumber}</p>
                    <DeleteForever
                      key={tav.number}
                      className="cursor-pointer text-red-600"
                      onClick={() => removeEmp(item.id, tav.tableNumber)}
                    />
                  </div>
                ))
              ) : (
                <p>Per momentin nuk ka ndonje tavoline te caktuar.</p>
              )}
            </div>
            <div className="pt-[10px]">
              <p>Tavolinat e lira:</p>
              <div className="w-full h-auto flex flex-wrap justify-between ">
                {Array.isArray(freeTables) &&
                  freeTables.map((tav, index) => (
                    <div
                      key={tav.id}
                      className="p-1 bg-blue-100 flex flex-row items-center justify-around w-[120px]"
                    >
                      <p key={index}>Tav. {tav.tableNumber}</p>
                      <AddBox
                        className="cursor-pointer text-green-500"
                        onClick={() => addEmpTable(item.id, tav.tableNumber)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {item.roleName !== "Menaxher" && (
            <DeleteOutlineOutlined
              className="text-red-500 absolute bottom-1 right-2 cursor-pointer hover:bg-slate-200 w-[30px] h-[30px] rounded-full"
              onClick={() => deleteEmployee(item.id)}
            />
          )}

          <CloseSharp
            type="button"
            onClick={() => handleClose()}
            className="text-red-500 cursor-pointer absolute bottom-1 left-2 hover:bg-slate-200 rounded-full"
          />
        </Box>
      </Modal>
    </div>
  );
}
