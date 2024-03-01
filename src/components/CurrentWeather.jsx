import React from "react";
import moment from 'moment';
import "../CSS/CurrentWeather.css";
const CurrentWeather = (data) => {
  const tempCelsius = Number(data.data.main.temp - 273.15).toFixed(2);
  const fulldate = new Date(data.data.dt * 1000);
  const converted_date = moment(fulldate).format('MMMM Do YYYY, h:mm:ss a');
  return (
    <div className="d-flex flex-col text-white justify-content-between rounded border-4 shadow">
      <div className="flex rounded  justify-around border-bottom ">
        <div className="d-flex "><h2>{data.data.name}</h2><p className="pl-2">{data.data.sys.country}</p></div>
        <span className="content-center pt-2">{converted_date}</span>
      </div>
      <div className="d-flex flex-row  rounded  w-100">
        <div className="d-flex flex-column w-1/2  rounded  align-items-spacebetween">
          <div className="py-4 px-2 h-40  justify-content-center">
            <img src="http://placehold.it/" alt="" />
            <p className="text-6xl">{tempCelsius}°C</p>
          </div>
          <div className="py-4 px-2  justify-content-center">
          <div className="d-flex "><h2>{data.data.name}</h2><p className="pl-2">{data.data.sys.country}</p></div>
            
            <p className="px-6">{data.data.weather[0].description}</p>
          </div>
        </div>

        <div className="rounded  w-1/2 ">
          <div className="flex w-full py-4 px-2 border-bottom justify-between">
            <div className="d-flex"><label>Feels like</label><img className="h-6 w-6" src="/temprature.png"/></div>
            <span className="float-end">{tempCelsius}°C</span>
          </div>
          <div className="flex py-4 px-2  border-bottom justify-between">
            <div className="d-flex"><label>Wind</label><img className="h-6 w-6" src="/wind-power.png"/></div>
            <span>{data.data.wind.speed} M/s</span>
          </div>
          <div className="flex py-4 px-2 border-bottom justify-between">
            <div className="d-flex"><label>Humidity</label><img className="h-6 w-6" src="/humidity.png"/></div>
            <span>{data.data.main.humidity} %</span>
          </div>
          <div className="flex py-4 px-2  justify-between">
            <div className="d-flex"><label>Pressure</label><img className="h-6 w-6" src="/pressure.png"/></div>
            <span>{data.data.main.pressure} Hpa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
