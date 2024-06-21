import { createContext, useState } from "react";

// type OrderType = {
//     name: String;
//     quantity: Number;
// }

// type TableType = {
//     tableName: String;
//     orders: OrderType[];
// }

// type OrdersType = {
//     tables: TableType[],
// }

export const OrderContext = createContext({
  order: [],
  addTable: (t) => {},
  removeTable: (t) => {},
  addProductToTable: (t) => {},
  removeProductFromTable: (t) => {},
});

function OrderContextProvider({ children }) {
  const [tables, setTables] = useState([]);
  const [productsInTable, setProductsInTable] = useState([]);

  function addTable(table) {
    setTables((tables) => [...tables, table]);
  }

  function removeTable(table) {
    setTables((tables) => tables.filter(t => t.tableName != table.tableName))
 }

  function addProductToTable(item) {
    // check if tables has record === item
    // if so - check for inner properties
    if (tables.some((t) => t.tableName == item.tableName)) {
      var existingTable = tables.find((t) => t.tableName == item.tableName);
      if (existingTable.products[item.productName]) {
        existingTable.products[item.productName]++;
      }
    }

  }
  function removeProductFromTable(item) {
    // check if tables has record === item
    // if so - check for inner properties
    if (tables.some((t) => t.tableName == item.tableName)) {
      var existingTable = tables.find((t) => t.tableName == item.tableName);
      if (existingTable.products[item.productNam]) {
        existingTable.products[item.productName]--;
      }
    }

    // setOrder((prev) =>
    //     prev.length > 0 ? prev.map((el)=> el.tableName === item.tableName ? "yes" : "no") : item
    // );
  }

  const value = {
    order: [],
    addTable,
    removeTable,
    addProductToTable,
    removeProductFromTable,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export default OrderContextProvider;
