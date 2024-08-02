import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CheckboxList from "../Lists/CheckboxList";
import axios from "axios";
import { GET_ALL_MENUITEMS_BY_CATEGORY } from "../../endpoints/MenuItems/MenuItemsEnd";
import { CircularProgress } from "@mui/material";

export default function ChildModal({
  categoryId,
  openChild,
  handleCloseChild,
  item,
  menuClickedItem,
  style,
  setOrderItems,
  order,
  setOrder,
}) {
  //test
  const [obj, setObj] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async function getMenu() {
      try {
        setLoading(true);

        const res = await axios.get(GET_ALL_MENUITEMS_BY_CATEGORY, {
          params: { CategoryId: categoryId },
          withCredentials: true,
        });
        setObj(res.data);
      } catch (error) {
        console.error("Error=", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [categoryId]);
  return (
    <React.Fragment>
      <Modal
        open={openChild}
        onClose={handleCloseChild}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            height: obj && obj.length >= 4 ? 350 : 200,
            maxWidth: 400,
            paddingX: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {loading ? (
            <div className="flex h-[100%] w-full items-center justify-center">
              <CircularProgress />
            </div>
          ) : (
            <>
              <p id="child-modal-description">{menuClickedItem?.title}</p>
              <CheckboxList
                obj={obj}
                item={item}
                setOrderItems={setOrderItems}
                order={order}
                setOrder={setOrder}
              />
              <Button
                variant="contained"
                color="error"
                onClick={handleCloseChild}
              >
                Mbylle
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
}
