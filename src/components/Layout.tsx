import { useEffect, useMemo } from "react";
import WMO from "../WMO.module";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import forecastType from "../types/ForecastType";
import Footer from "./Footer";

export default function Layout(weatherData: forecastType) {
  const weekDaysShort = ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"];
  const weekDays = [
    "Nedelja",
    "Ponedeljek",
    "Torek",
    "Sreda",
    "Četrtek",
    "Petek",
    "Sobota",
  ];

  const weatherDataProp = { ...weatherData };

  const getNow = useMemo(() => {
    var timesUnix: any = [];
    weatherData?.hourly.time.map((time: any) => {
      return timesUnix.push(Date.parse(time));
    });

    const now: number = timesUnix.indexOf(
      timesUnix.reduce((prev: any, curr: any) =>
        Math.abs(curr - Date.now()) < Math.abs(prev - Date.now()) ? curr : prev
      )
    );

    return now;
  }, [weatherData]);

  const currentTime = new Date(Date.now());
  const isNight: boolean =
    currentTime.getHours() >= 19 || currentTime.getHours() < 5;

  return (
    weatherData && (
      <>
        <main className="mt-8 text-2xl text-white sm:text-3xl sm:mx-8 md:mx-14 lg:text-4xl lg:mx-24 xl:mx-64 2xl:text-5xl 2xl:mx-80">
          <div className="flex flex-col justify-center items-center px-2">
            <div className="grid grid-cols-8 grid-rows-2 w-full bg-white bg-opacity-20 rounded-xl mb-8">
              <div className="col-span-8 flex flex-col justify-between px-6 pb-6 items-center 2xl:px-12">
                <div className="flex items-center justify-between w-full ">
                  <div className="text-6xl lg:text-7xl 2xl:text-8xl">
                    {weatherData.current_weather.temperature}°C
                  </div>
                  {WMO.map((obj, i) => {
                    return (
                      obj.weathercode ===
                        weatherData.current_weather.weathercode && (
                        <img
                          src={obj.hasNight && isNight ? obj.svgNight : obj.svg}
                          alt={obj.slug}
                          className="w-1/4 mr-8 mt-4"
                          key={i}
                        />
                      )
                    );
                  })}
                </div>
                <div className="w-full flex pl-2 lg:text-3xl 2xl:text-4xl 2xl:mb-14 2xl:ml-8">
                  Čuti se kot {weatherData.hourly.apparent_temperature[getNow]}
                  °C
                </div>
              </div>
              <HourlyForecast {...weatherDataProp} />
            </div>
            <div className="flex flex-col w-full">
              <DailyForecast
                weatherData={weatherData}
                weekDaysShort={weekDaysShort}
                weekDays={weekDays}
              />
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  );
}
