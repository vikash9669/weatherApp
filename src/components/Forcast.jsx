import React, { useEffect, useState } from "react";
const Forcast = (data) => {
  const [forcastData, setForcastData] = useState(null);
  // Function to filter weather data to keep only one entry per date
  useEffect(() => {
    // Function to filter weather data to keep only one entry per date
    const filterWeatherData = (data) => {
      const filteredData = {};
      data.data.list.forEach((item) => {
        const date = new Date(item.dt_txt.split(" ")[0]); // Extracting date from dt_txt
        const dateString = date.toISOString().split("T")[0]; // Converting date to string format

        if (!(dateString in filteredData)) {
          filteredData[dateString] = item;
        }
      });

      return Object.values(filteredData);
    };

    const filteredData = filterWeatherData(data);
    setForcastData(filteredData);
  }, [data]); // Run this effect only when the 'data' prop changes

  const getDayName = (dt_txt) => {
    const date = new Date(dt_txt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return dayName;
  };
  const dayName = getDayName(data.data.dt_txt);
  return (
    <>
      <div className="py-2 px-2 text-white rounded border-4 shadow">
        <h2 className=" px-2 border-bottom">WEATHER FORECAST</h2>
        <div className="py-2 bg-transparent">
          {forcastData &&
            forcastData.map((item, index) => (
              <div className="d-flex  pt-2 px-2 justify-between border-bottom" key={index}>
                <div>
                  <p className="m-0">{getDayName(item.dt_txt)}</p>
                  <p className="m-0">
                    {new Date(item.dt_txt).toLocaleDateString()}
                  </p>
                </div>
                <div className="">
                <img className="h-6 w-6" src="/temprature.png"/>
                <p>
                  {Number(item.main.temp - 273.15).toFixed(2)}C
                </p>
                </div>
                <div className="">
                <img className="h-6 w-6" src="/clear-sky.png"/>
                <p>
                  {item.weather[0].description}
                </p>
                </div>
                <div className="">
                <img className="h-6 w-6" src="/humidity.png"/>
                <p>
                  {item.main.humidity}
                </p>
                </div>
                <div className=" place-content-center">
                <img className="h-6 w-6" src="/pressure.png"/>
                <p>
                  {item.main.pressure}hpa
                </p>
                </div>
                <div className="">
                <img className="h-6 w-6" src="/wind-power.png"/>
                <p>
                  {item.wind.speed}
                </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Forcast;
