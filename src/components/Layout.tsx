import { createContext, useMemo, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
} from "chart.js";

import WMO from "../WMO.module";
import HourlyForecast, { isSameDay } from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import forecastType from "../types/ForecastType";
import Footer from "./Footer";
import useWindowDimensions from "../hooks/useWindowDimensions";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip
);

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

const getTime = (time: Date) => {
  let _temp: string = "";
  (time.getHours() + 1).toString().length < 2 ? (_temp += "0") : (_temp += "");
  time.getHours() === 23 ? (_temp += "00") : (_temp += time.getHours() + 1);
  return _temp + ":00";
};

export const toFahrenheit = (celsius: number) => {
  return Math.round((celsius * 1.8 + 32) * 10) / 10;
};

export const celsiusContext = createContext(true);
export const twilightContext = createContext({
  sunriseTimes: [],
  sunsetTimes: [],
});

export default function Layout(weatherData: forecastType) {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  const [twilight, setTwilight] = useState<any>({
    sunriseTimes: [],
    sunsetTimes: [],
  });
  const { width } = useWindowDimensions();

  const isNight = (time: Date) => {
    for (const sunriseTime of twilight.sunriseTimes) {
      const idx = twilight.sunriseTimes.indexOf(sunriseTime);
      if (isSameDay(sunriseTime, time)) {
        if (twilight.sunsetTimes[idx] < time) {
          return true;
        } else if (twilight.sunriseTimes[idx] > time) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  const getTwilight = useMemo(() => {
    var _temp = {
      sunriseTimes: [] as Date[],
      sunsetTimes: [] as Date[],
    };
    weatherData.daily.sunrise.forEach((sunrise: string) => {
      _temp.sunriseTimes.push(new Date(sunrise));
    });
    weatherData.daily.sunset.forEach((sunset: string) => {
      _temp.sunsetTimes.push(new Date(sunset));
    });
    return _temp;
  }, [weatherData]);

  useEffect(() => {
    if (getTwilight) {
      setTwilight(getTwilight);
    }
  }, [getTwilight]);

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

  var timesUnix: any = [];

  weatherData.hourly.time.map((time: any) => {
    return timesUnix.push(Date.parse(time));
  });

  const now = timesUnix.indexOf(
    timesUnix.reduce((prev: any, curr: any) =>
      Math.abs(curr - Date.now()) < Math.abs(prev - Date.now()) ? curr : prev
    )
  );

  var obj: any, svg: any;
  var hourlyForecast: any = [];
  timesUnix.forEach((time: any, i: number) => {
    if (i >= now - 1 && i <= now + 7) {
      time = new Date(time);
      WMO.map((item: any) => {
        return item.weathercode ===
          weatherData.hourly.weathercode[
            i + weatherData.utc_offset_seconds / 60 / 60
          ]
          ? (item.hasNight && time.getHours() > 18) || time.getHours() < 5
            ? (svg = item.svgNight)
            : (svg = item.svg)
          : null;
      });
      obj = {
        weathercode:
          weatherData?.hourly.weathercode[
            i + weatherData.utc_offset_seconds / 60 / 60
          ],
        time: new Date(weatherData.hourly.time[i]),
        temperature_2m:
          weatherData.hourly.temperature_2m[
            i + weatherData.utc_offset_seconds / 60 / 60
          ],
        svg,
      };
      hourlyForecast.push(obj);
    }
  });
  hourlyForecast = hourlyForecast.slice(1);

  return weatherData ? (
    <div>
      <twilightContext.Provider value={twilight}>
        <celsiusContext.Provider value={isCelsius}>
          <div className="flex flex-col text-2xl text-white sm:text-3xl sm:mx-8 md:mx-14 lg:text-4xl lg:mx-24 xl:mx-64 2xl:text-5xl 2xl:mx-80">
            <div className=" flex justify-end mt-6">
              <div className="mr-10 mb-1">
                <button
                  onClick={() => setIsCelsius(true)}
                  className="px-6 border-r-2 hover:bg-white hover:bg-opacity-20 rounded-l-xl"
                >
                  C
                </button>
                <button
                  onClick={() => setIsCelsius(false)}
                  className="px-6 border-l-2 hover:bg-white hover:bg-opacity-20 rounded-r-xl"
                >
                  F
                </button>
              </div>
            </div>
            <main className="">
              <div className="flex flex-col justify-center items-center px-2">
                <div className="grid grid-cols-8 w-full bg-white bg-opacity-20 rounded-xl mb-8">
                  <div className="col-span-8 flex flex-col justify-between px-8 pb-6 items-start 2xl:px-12">
                    <div className="flex mt-6 pr-6 items-center justify-between w-full ">
                      <div className="rounded-xl px-4 py-2 md:px-6 md:py-4 text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl flex items-center">
                        {isCelsius ? (
                          <>{weatherData.current_weather.temperature}&nbsp;°C</>
                        ) : (
                          <>
                            {toFahrenheit(
                              weatherData.current_weather.temperature
                            )}
                            &nbsp;°F
                          </>
                        )}
                      </div>
                      {WMO.map((obj, i) => {
                        return (
                          obj.weathercode ===
                            weatherData.current_weather.weathercode && (
                            <img
                              src={
                                obj.hasNight && isNight(new Date(Date.now()))
                                  ? obj.svgNight
                                  : obj.svg
                              }
                              alt={obj.slug}
                              className="w-1/4 "
                              key={i}
                            />
                          )
                        );
                      })}
                    </div>
                    <div className="w-max ml-6 mb-4 flex pl-2 text-xl md:text-2xl lg:text-3xl 2xl:text-4xl 2xl:mb-14 ">
                      {weatherData.userCity}
                    </div>
                    <div className="w-full flex ml-2 sm:ml-4 md:ml-6 pl-2 lg:text-3xl 2xl:text-4xl 2xl:mb-14">
                      Zdi se kot
                      {isCelsius ? (
                        <>{weatherData.hourly.apparent_temperature[getNow]}°C</>
                      ) : (
                        <>
                          {toFahrenheit(
                            weatherData.hourly.apparent_temperature[getNow]
                          )}
                          °F
                        </>
                      )}
                    </div>
                  </div>
                  <HourlyForecast hourlyForecast={hourlyForecast} />
                  <Line
                    className="mb-4 mt-4 px-2 sm:px-2 md:px-4 lg:px-8 xl:px-8 2xl:px-10"
                    options={{
                      scales: {
                        x: {
                          grid: {
                            display: false,
                            drawTicks: false,
                            borderWidth: 0,
                          },
                          ticks: {
                            color: "white",
                            font: {
                              size:
                                width > 1024
                                  ? 20
                                  : width > 768 && width < 1024
                                  ? 18
                                  : 16,
                            },
                          },
                        },
                        y: {
                          grid: {
                            display: false,
                            drawTicks: false,
                            borderWidth: 0,
                          },
                          ticks: {
                            color: "rgba(0,0,0,0)",
                          },
                        },
                      },
                      responsive: true,
                      plugins: {
                        tooltip: {
                          enabled: false,
                          // backgroundColor: "rgba(0, 0, 0,0.4)",
                          // bodyColor: "white",

                          // titleSpacing: 4,
                          // titleFont: {
                          //   size: 16,
                          // },
                          // bodyFont: {
                          //   size: 22,
                          // },
                          // displayColors: false,
                          // padding: 16,
                          // titleAlign: "center",
                          // bodyAlign: "center",
                          // callbacks: {
                          //   label: function (context) {
                          //     return context.formattedValue + "°C";
                          //   },
                          // },
                        },
                      },
                    }}
                    data={{
                      labels: hourlyForecast.map((obj: any) => {
                        return getTime(obj.time);
                      }),
                      datasets: [
                        {
                          data: hourlyForecast.map((obj: any) => {
                            return obj.temperature_2m;
                          }),
                          borderColor: "white",
                          backgroundColor: "white",
                          cubicInterpolationMode: "monotone",
                          borderWidth: 3,
                          pointRadius: 2,
                          hoverBackgroundColor: "white",
                          pointHitRadius: 15,
                        },
                      ],
                    }}
                    height={
                      width < 640
                        ? 60
                        : width < 768 && width > 640
                        ? 52
                        : width > 768 && width < 1024
                        ? 45
                        : 40
                    }
                  />
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
          </div>
        </celsiusContext.Provider>
      </twilightContext.Provider>
      <Footer />
    </div>
  ) : (
    <div className="mt-16 flex justify-center">Something went wrong.</div>
  );
}
