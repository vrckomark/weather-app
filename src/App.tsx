/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import axios from "axios";
import Layout from "./components/Layout";

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  async function getData() {
    await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords?.latitude}&longitude=${coords?.longitude}&current_weather=true&hourly=weathercode,apparent_temperature,temperature_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      )
      .then((res) => {
        setWeatherData(res.data);
      });
  }
  const geoLocationReady =
    isGeolocationAvailable && isGeolocationEnabled && coords;

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      getData();
    }
  }, [geoLocationReady]);
  const weatherDataProp = { ...weatherData };
  const now = new Date(Date.now());
  if (now.getHours() >= 19) {
    document.body.classList.add("bg-backgroundNight");
  } else {
    document.body.classList.add("bg-background");
  }
  document.body.classList.add("overflow-x-hidden");
  return (
    <div className="text-2xl text-white">
      {!isGeolocationAvailable ? (
        <div className="w-full justify-center mt-16">
          Vaš brskalnik ne podpira lokacije
        </div>
      ) : !isGeolocationEnabled ? (
        <div className="flex flex-col w-screen items-center mt-24">
          <div className="mb-8 text-7xl">:/</div>
          <div>Lokacija je izklopljena</div>
          <div>Vklopite lokacijo za delovanje strani</div>
        </div>
      ) : coords ? (
        <div>{weatherData && <Layout {...weatherDataProp} />}</div>
      ) : (
        <div className="w-full flex justify-center mt-16">
          Getting geolocation data.
        </div>
      )}
    </div>
  );
}

export default App;
