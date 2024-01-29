import React from "react";
import Test from "./Test";
import { useContext } from "react";
import { DataContext } from "../context/dataContext";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Filter = () => {
  const {
    clickedFilter,
    setclickedFilter,
    isFiltered,
    setisFiltered,
    setLocation,
    setDate,
    setPropertyType,
  } = useContext(DataContext);

  return (
    <div className="flex flex-col md:flex-row md:justify-between p-4 border rounded-md shadow-md font-serif text-black-600 font-bold bg-gray-100">
      <div className="flex flex-col mb-4 md:mb-0 md:w-1/4 text-black-600">
        <label htmlFor="location" className="font-medium mb-1">
          <b>Select Location</b>  <LocationOnIcon fontSize="medium" color="primary" />
        </label>
        <select
          id="location"
          className="border rounded-md p-2"
          onChange={(e) => setLocation(e.target.value)}
        >
           <option value="Andheri">Andheri</option>
            <option value="Bhandup">Bhandup</option>
            <option value="Virar">Virar</option>
            <option value="Kurla">Kurla</option>
            <option value="Kalyan">Kalyan</option>
            <option value="Thane">Thane</option>
        </select>
       
        
      </div>

      <div className="flex flex-col mb-4 md:mb-0 md:w-1/4">
        <label htmlFor="availableDate" className="font-medium mb-1">
         <b> Available From</b>
        </label>
        <input
          type="date"
          id="availableDate"
          className="border rounded-md p-2"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className=" mb-8 md:mb-0 md:w-1/4">
        
        <Test />
      </div>

      <div className="flex flex-col md:w-1/4 text-black-600">
        <label htmlFor="propertyType" className="font-medium mb-1">
         <b> Property Type</b>
        </label>
        <select
          id="propertyType"
          className="border rounded-md p-2"
          onChange={(e) => setPropertyType(e.target.value)}
        >
           <option value="Commercial">Commercial</option>
            <option value="Appartment">Appartment</option>
        </select>
        <button
  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded w-full md:w-auto h-10 md:h-auto mt-4 md:mt-8"
  onClick={() => {
    setisFiltered(true);
    setclickedFilter(!clickedFilter);
    console.log(isFiltered);
  }}
>
        Apply
      </button>
      </div>

      
    </div>
  );
};

export default Filter;
