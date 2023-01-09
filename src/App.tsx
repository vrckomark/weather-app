/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import axios from "axios";
import Layout from "./components/Layout";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "./components/CardSkeleton";

function App() {
  const currentTime = new Date(Date.now());
  const isNight = currentTime.getHours() >= 19 || currentTime.getHours() < 5;

  const [userCity, setUserCity] = useState<string | null>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  const geoLocationReady =
    isGeolocationAvailable && isGeolocationEnabled && coords;

  async function getData() {
    await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords?.latitude}&longitude=${coords?.longitude}&current_weather=true&hourly=weathercode,apparent_temperature,temperature_2m&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&timezone=auto`
      )
      .then((res) => {
        setWeatherData(res.data);

        setIsLoading(false);
      });
    // Get city name
    // await axios // DEVELOPMENT
    //   .get(
    //     `http://localhost:5000/fetch-geocode?lat=${coords?.latitude}&lon=${coords?.longitude}`
    //   )
    //   .then((res) => {
    //     setUserCity(res.data.user_city);
    //     setIsLoading(false);
    //   });

    await axios // PRODUCTION
      .get(
        `https://vrechko-weather-proxy.deta.dev/fetch-geocode?lat=${coords?.latitude}&lon=${coords?.longitude}`
      )
      .then((res) => {
        setUserCity(res.data.user_city);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (geoLocationReady) {
      getData();
    }
  }, [geoLocationReady]);

  const weatherDataProp = { ...weatherData, userCity };

  return (
    <div className="text-2xl text-white">
      <SkeletonTheme
        baseColor={isNight ? "#2f4d6a" : "#1fb6e0"}
        highlightColor={isNight ? "#4a79a5" : "#6acfeb"}
        duration={0.75}
      >
        {!isGeolocationEnabled && (
          <div className="flex flex-col w-screen items-center mt-24">
            <div className="mb-8 text-7xl">:/</div>
            <div>Lokacija je izklopljena</div>
            <div>Vklopite lokacijo za delovanje strani</div>
          </div>
        )}
        {!isGeolocationAvailable && (
          <div className="w-full justify-center mt-16">
            Vaš brskalnik ne podpira lokacije
          </div>
        )}
        {isLoading && isGeolocationEnabled ? <CardSkeleton /> : null}

        {coords && <div>{weatherData && <Layout {...weatherDataProp} />}</div>}
      </SkeletonTheme>
    </div>
  );
}

export default App;
