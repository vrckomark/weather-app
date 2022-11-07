import { useMemo } from "react";
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
import HourlyForecast from "./HourlyForecast";
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

const currentTime: Date = new Date(Date.now());
const isNight: boolean =
  currentTime.getHours() >= 19 || currentTime.getHours() < 5;

const getTime = (time: Date) => {
  let _temp: string = "";
  (time.getHours() + 1).toString().length < 2 ? (_temp += "0") : (_temp += "");
  time.getHours() === 23 ? (_temp += "00") : (_temp += time.getHours() + 1);
  return _temp + ":00";
};

export default function Layout(weatherData: forecastType) {
  const { width } = useWindowDimensions();

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

  return (
    weatherData && (
      <>
        <main className="mt-8 text-2xl text-white sm:text-3xl sm:mx-8 md:mx-14 lg:text-4xl lg:mx-24 xl:mx-64 2xl:text-5xl 2xl:mx-80">
          <div className="flex flex-col justify-center items-center px-2">
            <div className="grid grid-cols-8 w-full bg-white bg-opacity-20 rounded-xl mb-8">
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
              <HourlyForecast hourlyForecast={hourlyForecast} />
              <Line
                className="mb-4 sm:px-2 md:px-4 lg:px-8 xl:px-8 2xl:px-10"
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
                      backgroundColor: "rgba(0, 0, 0,0.4)",
                      bodyColor: "white",

                      titleSpacing: 4,
                      titleFont: {
                        size: 16,
                      },
                      bodyFont: {
                        size: 22,
                      },
                      displayColors: false,
                      padding: 16,
                      titleAlign: "center",
                      bodyAlign: "center",
                      callbacks: {
                        label: function (context) {
                          return context.formattedValue + "°C";
                        },
                      },
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
        <Footer />
      </>
    )
  );
}
