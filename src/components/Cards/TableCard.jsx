import { useEffect, useRef, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import NestedModal from "./../Modals/NestedModal.jsx";
import useQuery from "../hooks/useQuery.js";
import { GET_ALL_TABLES } from "../../endpoints/Tables/Tables.js";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Add } from "@mui/icons-material";
import TavolinaModal from "../../components/Modals/TavolinaModal.jsx";

export default function TableCard() {
  const ref = useRef();

  const {
    data: tables,
    isLoading: loadingTables,
    refetch: refetchTables,
  } = useQuery(GET_ALL_TABLES);

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    ref.current?.setOrder(undefined);
    ref.current?.setOrderItems(undefined);
    setOpen(false);
    setSelectedItem(null);
  };

  const [orderFoodMsg, setOrderFoodMsg] = useState(false);

  useEffect(() => {
    if (orderFoodMsg == true) {
      console.log("true");
      toast.success("Porosia u krye me sukses!");
      setOrderFoodMsg(false);
      refetchTables();
      setOpen(false);
    }
  }, [orderFoodMsg]);

  const [modalOpen, setModalOpen] = useState(false);

  const [tableOutput, setTableOutput] = useState("");

  useEffect(() => {
    if (tableOutput == "Success") {
      toast.success("Tavolina u krijua me sukses!");
      setTableOutput("");
      refetchTables();
    }
  }, [tableOutput]);

  return (
    <div>
      <ToastContainer />
      {loadingTables ? (
        <div className="flex h-[100vh]    w-full items-center justify-center ">
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={4} sx={{ marginX: "10px" }}>
          {tables &&
            tables.map((item) => (
              <Grid
                xs={6}
                sm={4}
                md={6}
                lg={2}
                xl={2}
                key={item.id}
                onClick={() => handleOpen(item)}
              >
                <CardActionArea
                  sx={{
                    backgroundColor: "#EFF6FF",
                    border: "2px solid #BFDBFE",
                    justifyContent: "center",
                    justifyItems: "center",
                    alignItems: "center",
                    marginTop: "50px",
                    padding: "10px",
                  }}
                >
                  <img
                    src="https://ozzio.com/wp-content/uploads/2021/07/Tavolo-Allungabile-Big-Round-Ozzio-Italia-11-scaled.jpg"
                    alt="test"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{ textAlign: "center", fontSize: "15px" }}
                    >
                      Tavolina {item.tableNumber}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography> */}
                  </CardContent>
                </CardActionArea>
              </Grid>
            ))}
        </Grid>
      )}

      <button className="w-[50px] h-[50px] bg-slate-200 fixed right-2 bottom-2 z-50 rounded-full border-blue-400 border-2">
        <Add onClick={() => setModalOpen(true)} />
      </button>
      <TavolinaModal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        setTableOutput={setTableOutput}
      />

      <NestedModal
        open={open}
        handleClose={handleClose}
        item={selectedItem}
        ref={ref}
        setOrderFoodMsg={setOrderFoodMsg}
      />
    </div>
  );
}
