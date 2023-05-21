/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, createContext } from "react";
import { useGeolocated } from "react-geolocated";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";
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
export const celsiusContext = createContext(true);

function App() {
  const currentTime = new Date(Date.now());
  const isNight = currentTime.getHours() >= 19 || currentTime.getHours() < 5;

  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [userCity, setUserCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputCity, setInputCity] = useState<string>("");

  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
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

  // useEffect(() => {
  //   if (!isGeolocationEnabled) {
  //     setIsLoading(false);
  //   }
  // }, [isGeolocationEnabled]);

  // const geoLocationReady =
  //   isGeolocationAvailable && isGeolocationEnabled && !!coords;

  async function getData() {
    setIsLoading(true);

    await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates?.latitude}&longitude=${coordinates?.longitude}&current_weather=true&hourly=weathercode,apparent_temperature,temperature_2m&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&timezone=auto`
      )
      .then((res) => {
        setWeatherData(res.data);
        setIsLoading(false);
      });

    if (
      coords?.latitude === coordinates.latitude &&
      coords?.longitude === coordinates.longitude
    ) {
      await axios // PRODUCTION https://proxy-1-w1428275.deta.app
        .get(
          `https://weather-data-proxy.vercel.app/fetch-reverse-geocode?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}`
        )
        .then((res) => {
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
    const city = inputCity.trim();
    if (city !== "") {
      setIsLoading(true);
      await axios
        .get(
          `https://weather-data-proxy.vercel.app/fetch-geocode?input_city=${inputCity}`
        )
        .then((result) => {
          // console.log(result.data);
          setCoordinates({
            longitude: result.data.coords.longitude,
            latitude: result.data.coords.latitude,
          });
          setUserCity(result.data.name);
        });
    }
  };

  return (
    <celsiusContext.Provider value={isCelsius}>
      <userCityContext.Provider value={userCity}>
        <div className="text-2xl text-white">
          <SkeletonTheme
            baseColor={isNight ? "#2f4d6a" : "#1fb6e0"}
            highlightColor={"#64c7e3"}
            duration={1}
          >
            <div className="flex flex-col w-screen items-center mt-6">
              <div className="absolute right-2 top-2 xl:text-3xl xl:right-6 xl:top-6 ">
                <button
                  onClick={() => setIsCelsius(true)}
                  className="px-6 border-r-2 hover:bg-white hover:bg-opacity-20 rounded-l-xl transition-all duration-150"
                >
                  C
                </button>
                <button
                  onClick={() => setIsCelsius(false)}
                  className="px-6 border-l-2 hover:bg-white hover:bg-opacity-20 rounded-r-xl transition-all duration-150"
                >
                  F
                </button>
              </div>
              <div className="mt-8 flex w-full justify-center items-center mb-4 xl:mb-8">
                <button
                  className="scale-125 ml-6 mr-4 md:scale-150"
                  onClick={getPosition}
                >
                  <BiCurrentLocation />
                </button>
                <form
                  className="flex w-full sm:w-2/3  justify-center items-center xl:w-1/2"
                  onSubmit={_handleSubmit}
                >
                  <input
                    type="text"
                    name="inputCity"
                    className="bg-transparent border-4 border-white rounded-full w-full focus:outline-offset-2 focus:outline-white pl-6 pr-10 md:pr-12 py-2 placeholder:text-sky-200 xl:pl-10 lg:py-3 lg:text-3xl lg:pl-8 xl:py-4"
                    onChange={(e) => setInputCity(e.target.value)}
                    value={inputCity}
                    placeholder="Enter city name"
                  />
                  <button
                    type="submit"
                    className="lg:scale-125 md:-translate-x-12 -translate-x-10"
                  >
                    <BiSearch />
                  </button>
                </form>
              </div>

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

              {isLoading ? (
                <CardSkeleton />
              ) : (
                weatherData && <Layout {...weatherDataProp} />
              )}
            </div>
          </SkeletonTheme>
        </div>
      </userCityContext.Provider>
    </celsiusContext.Provider>
  );
}

export default App;
