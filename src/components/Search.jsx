import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GeoDb_Url, geoApiOptions } from "../api";

const Search = ({ OnSearch }) => {
  const [search, setSearch] = useState("");
  
  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GeoDb_Url}/cities?minPopulation=10000&namePrefix=${inputValue}`,
        geoApiOptions
      )
     
      const result = await response.json();
      if (result.data.length === 0) {
        throw new Error("City not found");
      }
      const data = result.data?.map((item) => {
        `${item.latitude} ${item.longitude}`
        return {
          value: item.latitude+" "+item.longitude,
          label: item.name,
        };
      });
      return {
        options: data,
        hasMore: true,
      };
    } catch (error) {
      console.error(error);
      // alert("Not Connected  " + error)
    }
  };
  const handleSearch = (searchData) => {
    setSearch(searchData);
    OnSearch(searchData);
    setTimeout(() => {
        setSearch("");
    },1000);

  };
  return (
    <AsyncPaginate
      className="bg-transparent"
      placeholder="search for places"
      debounceTimeout={1000}
      value={search}
      loadOptions={loadOptions}
      onChange={handleSearch}
    />
  );
};

export default Search;
