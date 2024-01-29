import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import Filter from "./Filter";
import PropertyCard from "./PropertyCard";
import { DataContext } from "../context/dataContext";
import Info from "./Info";
import Footer from "./Footer";
const Home = () => {
  const {
    clickedFilter,
    setclickedFilter,
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
  } = useContext(DataContext);

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/property/list-properties`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        
        if (isFiltered) {
          const filteredData = data.filter((property) => {
            const exactLocation = property.location.split(",");
            return (
              exactLocation.includes(location) &&
              property.rentPerMonth <= inputMaxG &&
              property.rentPerMonth >= inputMinG
            );
          });
          setProperties(filteredData);
        } else {
          setProperties(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchingData();
  }, [clickedFilter]);

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <Navbar />
      <div className="flex-1 flex flex-col ml-0 p-4 bg-white">
  <h1 className="text-gray-800 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl font-serif mb-8">
    Search Properties For Rent
  </h1>
  <Filter />
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-0 bg-gray-100 p-4">
  {properties.map((property, index) => (
    <PropertyCard key={index} property={property}></PropertyCard>
  ))}
</div>

      <Info></Info>
      <Footer></Footer>
    </div>
  );
};

export default Home;
