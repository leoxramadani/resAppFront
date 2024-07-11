import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function CheckboxList({
  obj,
  item,
  setOrderItems,
  order,
  setOrder,
}) {
  const [productQuantities, setProductQuantities] = React.useState(
    obj.reduce((acc, product) => {
      acc[product.key] = 0;
      return acc;
    }, {})
  );

  const handleIncrement = (value) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [value.id]: prevQuantities[value.id] + 1,
    }));

    setOrderItems((prev) =>
      prev && prev.length > 0 ? [...prev, value] : [value]
    );
  };

  const handleDecrement = (value) => {
    setProductQuantities((prevQuantities) => {
      const newQuantity = Math.max(prevQuantities[value.id] - 1, 0);
      return {
        ...prevQuantities,
        [value.id]: newQuantity,
      };
    });

    setOrderItems((prev) => {
      const itemIndex = prev.findIndex((i) => i.name === value.name);
      if (itemIndex !== -1) {
        if (prev[itemIndex].quantity > 1) {
          // Decrement the quantity
          return prev.map((item, index) =>
            index === itemIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          // Remove the item from the order
          const res = prev.filter((item, index) => index !== itemIndex);
          return res;
        }
      }
      return prev;
    });
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {obj.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem
            key={value.id}
            secondaryAction={
              <div
                style={{
                  width: "80px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RemoveCircleIcon
                  onClick={() => handleDecrement(value)}
                  style={{ cursor: "pointer" }}
                />
                {/* <p style={{ margin: '0 10px' }}>{order ? order.map((i) => { if(i.Name === value.Name) {return i.Quantity} else return 0}) : productQuantities[value.key]}</p> */}
                <p style={{ margin: "0 10px" }}>
                  {order &&
                  order.filter((i) => i.name === value.name).length > 0
                    ? order.filter((i) => i.name === value.name)[0].quantity
                    : productQuantities[value.id]
                    ? 0
                    : 0}
                </p>

                <AddBoxIcon
                  edge="end"
                  aria-label="increment"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleIncrement(value)}
                />
              </div>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
