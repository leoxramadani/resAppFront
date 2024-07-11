import React, { useEffect, useState } from "react";
import TableColumnPinning from "../../components/Table/Table";
import ProductModal from "../../components/Modals/ProductModal";
import Add from "@mui/icons-material/Add";
import Button from "@mui/joy/Button";
import {
  GET_ALL_CATEGORIES,
  GET_ALL_PRODUCTS,
} from "../../endpoints/MenuItems/MenuItemsEnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import useQuery from "../../components/hooks/useQuery";
import { CircularProgress } from "@mui/material";

function Produktet() {
  const [categoryCreateResult, setCategoryCreateResult] = useState("");
  const [categoryUpdateResult, setCategoryUpdateResult] = useState("");
  const [categoryDeleteResult, setCategoryDeleteResult] = useState("");
  const [menuItemCreateResult, setMenuItemCreateResult] = useState("");
  const [menuItemUpdateResult, setMenuItemUpdateResult] = useState("");
  const [menuItemDeleteResult, setMenuItemDeleteResult] = useState("");

  const [dataType, setDataType] = useState("");

  useEffect(() => {
    if (categoryDeleteResult == 200) {
      toast.success("Kategoria u fshie me sukses!");
      setCategoryDeleteResult("");
    }

    if (menuItemDeleteResult == 200) {
      toast.success("Produkti u fshie me sukses!");
      setCategoryUpdateResult("");
    }

    if (categoryUpdateResult == 200) {
      toast.success("Kategoria u ndryshua me sukses!");
      setCategoryUpdateResult("");
    }
    if (menuItemUpdateResult == "Success") {
      toast.success("Produkti u ndryshua me sukses!");
      setMenuItemUpdateResult("");
    } else if (menuItemUpdateResult == "Exists") {
      toast.warning("Produkti ekziston!");
      setMenuItemUpdateResult("");
    } else if (menuItemUpdateResult == "Failure") {
      toast.error("Nuk mund ta ndryshoni produktin!");
      setMenuItemUpdateResult("");
    }
    if (categoryCreateResult == 200) {
      toast.success("Kategoria u krijua me sukses!");
      setCategoryCreateResult("");
    }
    if (menuItemCreateResult == "Success") {
      toast.success("Produkti u krijua me sukses!");
      setMenuItemCreateResult("");
    } else if (menuItemCreateResult == "Exists") {
      toast.warning("Produkti ekziston!");
      setMenuItemCreateResult("");
    } else if (menuItemCreateResult == "Failure") {
      toast.error("Nuk mund te shtoni produkt te ri!");
      setMenuItemCreateResult("");
    }
  }, [
    menuItemCreateResult,
    categoryCreateResult,
    menuItemUpdateResult,
    categoryUpdateResult,
    menuItemDeleteResult,
    categoryDeleteResult,
  ]);

  //get all products
  const {
    data: products,
    refetch: refetchProducts,
    isLoading: isLoadingProducts,
  } = useQuery(GET_ALL_PRODUCTS);

  //get all categories
  const {
    data: categories,
    refetch: refetchCategories,
    isLoading: isLoadingCategories,
  } = useQuery(GET_ALL_CATEGORIES);

  const [open, setOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState(null);
  const [rowType, setRowType] = React.useState(null);
  const [displayedRowClicked, setDisplayedRow] = React.useState();
  const [displayedCategoryClicked, setCategoryClicked] = React.useState();

  const modalClicked = (param) => {
    setOpen(true);
    setModalType(param);
  };

  useEffect(() => {
    if (!open) {
      setModalType(null);
      setRowType(null);
    }
  }, [open]);

  return (
    <div className="w-[100vw] h-[92vh] flex  items-center flex-col ">
      {isLoadingProducts && isLoadingCategories ? (
        <div className="flex h-[100vh]    w-full items-center justify-center ">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="w-full h-auto  mt-[100px] flex flex-row items-center justify-center ">
            <Button
              variant="outlined"
              color="neutral"
              startDecorator={<Add />}
              onClick={() => {
                modalClicked("Category");
                setDataType("Categories");
              }}
              sx={{
                marginRight: "10px",
              }}
            >
              Shto kategorite
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              startDecorator={<Add />}
              onClick={() => {
                modalClicked("Products");
                setDataType("Products");
              }}
              sx={{
                marginLeft: "10px",
              }}
            >
              Shto produktet
            </Button>
            <ProductModal
              setOpen={setOpen}
              open={open}
              setDataType={setDataType}
              modalType={modalType}
              rowType={rowType}
              displayedRowClicked={displayedRowClicked}
              setCategoryCreateResult={setCategoryCreateResult}
              setMenuItemCreateResult={setMenuItemCreateResult}
              setMenuItemUpdateResult={setMenuItemUpdateResult}
              setCategoryUpdateResult={setCategoryUpdateResult}
              dataType={dataType}
              refetchProducts={refetchProducts}
              refetchCategories={refetchCategories}
            />
          </div>
          <div className="w-[90vw] h-[50vh]  mt-10">
            <Tabs aria-label="Basic tabs" defaultValue={0}>
              <TabList>
                <Tab>Kategorite</Tab>
                <Tab>Produktet</Tab>
              </TabList>

              <TabPanel value={0}>
                <TableColumnPinning
                  rows={categories}
                  refetchCategories={refetchCategories}
                  datafor={"categories"}
                  setCategoryDeleteResult={setCategoryDeleteResult}
                  setDataType={setDataType}
                  open={open}
                  setOpen={setOpen}
                  setDisplayedRow={setDisplayedRow}
                  rowType={rowType}
                  setRowType={setRowType}
                />
              </TabPanel>

              <TabPanel value={1}>
                <TableColumnPinning
                  rows={products}
                  refetchProducts={refetchProducts}
                  datafor={"products"}
                  setMenuItemDeleteResult={setMenuItemDeleteResult}
                  setDataType={setDataType}
                  open={open}
                  setOpen={setOpen}
                  setDisplayedRow={setDisplayedRow}
                  rowType={rowType}
                  setRowType={setRowType}
                />
              </TabPanel>
            </Tabs>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default Produktet;
