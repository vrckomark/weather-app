/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, createContext } from "react";
import { useGeolocated } from "react-geolocated";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import Layout from "./components/Layout";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "./components/CardSkeleton";

type Coords = {
  latitude: number | undefined;
  longitude: number | undefined;
};

export const userCityContext = createContext("");

function App() {
  const currentTime = new Date(Date.now());
  const isNight = currentTime.getHours() >= 19 || currentTime.getHours() < 5;

  const [userCity, setUserCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inputCity, setInputCity] = useState<string>("");

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  const [coordinates, setCoordinates] = useState<Coords>({
    latitude: coords?.latitude,
    longitude: coords?.longitude,
  });

  useEffect(() => {
    if (coords)
      setCoordinates({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
  }, [coords]);

  // const geoLocationReady =
  //   isGeolocationAvailable && isGeolocationEnabled && !!coords;

  async function getData() {
    await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates?.latitude}&longitude=${coordinates?.longitude}&current_weather=true&hourly=weathercode,apparent_temperature,temperature_2m&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&timezone=auto`
      )
      .then((res) => {
        setWeatherData(res.data);
        setIsLoading(false);
      });

    // await axios // PRODUCTION
    //   .get(
    //     `https://vrechko-weather-proxy.deta.dev/fetch-reverse-geocode?lat=${coords?.latitude}&lon=${coords?.longitude}`
    //   )
    //   .then((res) => {
    //     setUserCity(res.data.user_city);
    //     setIsLoading(false);
    //   });
    if (
      coords?.latitude === coordinates.latitude &&
      coords?.longitude === coordinates.longitude
    ) {
      await axios // PRODUCTION
        .get(
          `http://localhost:5000/fetch-reverse-geocode?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.user_city) setUserCity(res.data.user_city);
          setIsLoading(false);
        });
    }

    // DEV
    // setUserCity("Maribor");
    // setIsLoading(false);
  }

  useEffect(() => {
    if (coordinates.latitude !== undefined) getData();
  }, [coordinates]);

  const weatherDataProp = { ...weatherData };

  const _handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Fetch coords of city");
    await axios
      .get(`http://localhost:5000/fetch-geocode?input_city=${inputCity}`)
      .then((result) => {
        console.log(result.data);
        setCoordinates({
          longitude: result.data.coords.longitude,
          latitude: result.data.coords.latitude,
        });
        setUserCity(result.data.name);
      });
  };

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  return (
    <userCityContext.Provider value={userCity}>
      <div className="text-2xl text-white">
        <SkeletonTheme
          baseColor={isNight ? "#2f4d6a" : "#1fb6e0"}
          highlightColor={isNight ? "#4a79a5" : "#6acfeb"}
          duration={0.75}
        >
          <div className="flex flex-col w-screen items-center mt-6">
            <form className="flex w-2/3" onSubmit={_handleSubmit}>
              <input
                type="text"
                name="inputCity"
                className="bg-transparent border-4 border-sky-200 rounded-full w-full focus:outline-offset-2 focus:outline-sky-200 pl-6 pr-10 md:pr-12 py-2 placeholder:text-sky-200"
                onChange={(e) => setInputCity(e.target.value)}
                value={inputCity}
                placeholder="Enter city name"
              />
              <button type="submit">
                <BiSearch className="lg:scale-125 md:-translate-x-12 -translate-x-10" />
              </button>
            </form>

            {!isGeolocationEnabled && (
              <div className="mt-4 text-base text-sky-200">
                Vklopite lokacijo za lokalno vreme*
              </div>
            )}
            {!isGeolocationAvailable && (
              <div className="w-full justify-center mt-4">
                Vaš brskalnik ne podpira lokacije
              </div>
            )}
            {isLoading && isGeolocationEnabled ? <CardSkeleton /> : null}

            {coordinates && (
              <div>{weatherData && <Layout {...weatherDataProp} />}</div>
            )}
          </div>
        </SkeletonTheme>
      </div>
    </userCityContext.Provider>
  );
}

export default App;
