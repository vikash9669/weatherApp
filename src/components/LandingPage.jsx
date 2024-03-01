import React, { useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import Search from "./Search";
import Forcast from "./Forcast";
import { Weather_Api_Key, Weather_Api_Url, Forcast_Api_Key } from "../api";

const LandingPage = () => {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcast, setForcast] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const searchData = { value: `${latitude} ${longitude}`, label: " " };
          setLocation(searchData);
          handleOnSearch(searchData);
          if (searchData.length > 0) {
            handleOnSearch(searchData);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleOnSearch = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    setCity(searchData.label);
    const currentWeatherData = fetch(
      `${Weather_Api_Url}/weather?lat=${lat}&lon=${lon}&appid=${Weather_Api_Key}`
    );
    const forcastData = fetch(
      `${Weather_Api_Url}/forecast?lat=${lat}&lon=${lon}&appid=${Forcast_Api_Key}`
    );

    Promise.all([currentWeatherData, forcastData])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        setCurrentWeather(weatherResponse);
        setForcast(forcastResponse);
        if (weatherResponse && forcastResponse) setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "error while getting weather Data");
        alert("Error while getting weather Data" + err.message);
      });
  };
  return (
    <>
      <div className="w-3/4 ">
        <div className="p-2 mb-2 w-full h-25 rounded border shadow">
          <div className="d-flex">
            <img className="h-8 w-8 " src="/cloud.png" />
            <h2>Mousam.com</h2>
          </div>
          <p className="text-white">Search Cities</p>
          <Search className="bg-transparent" OnSearch={handleOnSearch} />
        </div>
        {location?(
          <div className="flex w-full">
            <div className="w-1/2">
              {currentWeather ? <CurrentWeather data={currentWeather} /> : null}
            </div>
            <div className="w-3/5 pl-2 pb-2">
              {forcast ? <Forcast data={forcast} /> : null}
            </div>
          </div>):(<div className="w-full justify-center items-center bg-transparent"><p className="text-white text-8xl my-10">Loading...</p></div>)
        }
      </div>
    </>
  );
};

export default LandingPage;
