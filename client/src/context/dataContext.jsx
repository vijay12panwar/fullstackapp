import React, { createContext, useState } from "react";

const DataContext = createContext();

const ContextProvider = (props) => {
  const [clickedFilter, setclickedFilter] = useState(false)
  const [isFiltered, setisFiltered] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [inputMinG, setInputMinG] = useState(0);
  const [inputMaxG, setInputMaxG] = useState(3000);
  const [propertyType, setPropertyType] = useState("");

  return (
    <DataContext.Provider
      value={{
        clickedFilter, setclickedFilter,
        isFiltered,
        setisFiltered,
        location,
        setLocation,
        date,
        setDate,
        inputMinG,
        setInputMinG,
        inputMaxG,
        setInputMaxG,
        propertyType,
        setPropertyType,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext, ContextProvider };
