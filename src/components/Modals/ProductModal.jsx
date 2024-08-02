import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import { Option, Select } from "@mui/joy";
import axios from "axios";
import {
  CREATE_NEW_CATEGORY,
  CREATE_NEW_PRODUCT,
  GET_ALL_CATEGORIES,
  UPDATE_NEW_CATEGORY,
  UPDATE_PRODUCT,
} from "../../endpoints/MenuItems/MenuItemsEnd";

export default function ProductModal({
  setCategoryUpdateResult,
  setMenuItemUpdateResult,
  setDataType,
  setOpen,
  open,
  modalType,
  rowType,
  displayedRowClicked,
  setCategoryCreateResult,
  setMenuItemCreateResult,
  dataType,
  refetchProducts,
  refetchCategories,
}) {
  const [categories, setCategories] = React.useState();

  //get all products
  React.useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(GET_ALL_CATEGORIES, {
          withCredentials: true,
        });
        setCategories(res.data);
      } catch (error) {
        console.error("Error=", error);
      }
    };
    getCategories();
  }, []);

  const [newCategory, setNewCategory] = React.useState(
    displayedRowClicked?.name || ""
  );
  const [newPrice, setNewPrice] = React.useState("");
  const [newCategoryId, setNewCategoryId] = React.useState();

  //create new category
  const createNewCategory = async (categoryName) => {
    try {
      const res = await axios.post(
        CREATE_NEW_CATEGORY,
        { categoryName: categoryName },
        { withCredentials: true }
      );
      setCategoryCreateResult(res.status);
      refetchCategories();
    } catch (error) {
      console.error("Error=", error);
    }
  };
  // update category
  const updateCategory = async (catName, catId) => {
    try {
      const res = await axios.post(
        UPDATE_NEW_CATEGORY,
        { categoryName: catName, id: catId },
        { withCredentials: true }
      );
      setCategoryUpdateResult(res.status);
      refetchCategories();
    } catch (error) {
      console.error("Error=", error);
    }
  };

  //create product
  const createNewProduct = async (newCategory, newCategoryId, newPrice) => {
    console.log(newCategory, ",", newCategoryId, ",", newPrice);
    try {
      const res = await axios.post(
        CREATE_NEW_PRODUCT,
        { name: newCategory, price: newPrice, categoryId: newCategoryId },
        { withCredentials: true }
      );
      setMenuItemCreateResult(res.data.data);
      refetchProducts();
    } catch (error) {
      console.error("Error=", error);
    }
  };
  //update product
  const updateProduct = async (
    prodId,
    newCategory,
    newCategoryId,
    newPrice
  ) => {
    try {
      console.log(
        "proId=",
        prodId,
        ",newCategory=",
        newCategory,
        ",newCategoryId=",
        newCategoryId,
        ",newPrice=",
        newPrice
      );
      const res = await axios.post(
        UPDATE_PRODUCT,
        {
          id: prodId,
          name: newCategory,
          price: newPrice,
          categoryId: newCategoryId,
        },
        { withCredentials: true }
      );
      console.log("res=", res);
      setMenuItemUpdateResult(res.data.data);
      refetchProducts();
    } catch (error) {
      console.error("Error=", error);
    }
  };

  const handleChange = (event, newValue) => {
    setNewCategoryId(newValue);
  };

  console.log(
    "modalType=",
    modalType,
    ",rowType=",
    rowType,
    ",dataType=",
    dataType
  );

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setDataType("");
        }}
      >
        <ModalDialog>
          <DialogTitle>
            {modalType !== "null" && modalType == "Category" ? (
              <p>Shtoni nje kategori te re</p>
            ) : modalType == "Products" ? (
              <p>Shtoni nje produkt te ri</p>
            ) : (
              <p>Ndryshoni te dhenat</p>
            )}
          </DialogTitle>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (dataType === "Products" && rowType === "Edit") {
                console.log("here");
                updateProduct(
                  displayedRowClicked.id,
                  newCategory,
                  newCategoryId,
                  newPrice
                );
              } else if (dataType === "Categories" && rowType === "Edit") {
                updateCategory(newCategory, displayedRowClicked.id);
              } else if (modalType == "Category" && dataType == "Categories") {
                createNewCategory(newCategory);
              } else if ((modalType = "Products" && dataType == "Products")) {
                createNewProduct(newPrice, newCategoryId, newCategory);
              }

              // modalType=="Category" ? createNewCategory(newCategory) : createNewProduct(newPrice,newCategoryId, newCategory)
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>
                  Emri i{" "}
                  {(modalType !== "null" && modalType === "Category") ||
                  dataType === "Categories"
                    ? "kategorise"
                    : "produktit"}
                </FormLabel>
                {rowType == "Edit" ? (
                  <Input
                    autoFocus
                    required
                    defaultValue={
                      dataType == "Categories"
                        ? displayedRowClicked?.categoryName
                        : displayedRowClicked.name
                    }
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                ) : (
                  <Input
                    autoFocus
                    required
                    defaultValue=""
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                )}
              </FormControl>
              {(modalType !== "null" &&
                modalType == "Products" &&
                dataType == "Products") ||
              (dataType == "Products" && rowType == "Edit") ? (
                <>
                  <FormControl>
                    <FormLabel>Cmimi</FormLabel>
                    {rowType == "Edit" ? (
                      <Input
                        required
                        defaultValue={displayedRowClicked.price}
                        onChange={(e) => setNewPrice(e.target.value)}
                      />
                    ) : (
                      <Input
                        required
                        onChange={(e) => setNewPrice(e.target.value)}
                      />
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Kategoria</FormLabel>
                    <Select
                      required
                      sx={{ minWidth: 200 }}
                      defaultValue={
                        typeof displayedRowClicked != "undefined"
                          ? displayedRowClicked.categoryId
                          : 0
                      }
                      onChange={handleChange}
                    >
                      {rowType == "Edit" ? (
                        <Option
                          value={
                            displayedRowClicked != "undefined"
                              ? displayedRowClicked.categoryId
                              : 0
                          }
                          disabled
                        >
                          {displayedRowClicked.categoryName}
                        </Option>
                      ) : (
                        <Option value="" disabled>
                          Shtoni nje produkt te ri
                        </Option>
                      )}

                      {categories.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.categoryName}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                </>
              ) : (
                ""
              )}
              <Button type="submit">Ruaj</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
