import WMO from "../WMO.module";
import ClearDay from "../assets/weather-icons/clear-day.svg";
import ClearNight from "../assets/weather-icons/clear-night.svg";
import { useContext } from "react";
import { toFahrenheit } from "./Layout";
import { celsiusContext } from "../App";

const DailyForecast = (props: any) => {
  const { weatherData, weekDays, weekDaysShort } = props;
  const isCelsius = useContext(celsiusContext);

  var obj: any, svg: any;
  var dailyForecast: any = [];

  weatherData.daily.time.forEach((time: Date, i: number) => {
    WMO.map((item: any) => {
      return item.weathercode === weatherData.daily.weathercode[i]
        ? (svg = item.svg)
        : null;
    });
    const day = new Date(time);
    obj = {
      weekDay: weekDays[day.getDay()],
      weekDayShort: weekDaysShort[day.getDay()],
      tempMin: weatherData.daily.temperature_2m_min[i],
      tempMax: weatherData.daily.temperature_2m_max[i],
      weathercode: weatherData.daily.weathercode[i],
      svg,
      sunrise: new Date(weatherData.daily.sunrise[i]),
      sunset: new Date(weatherData.daily.sunset[i]),
    };
    dailyForecast.push(obj);
  });

  const now = new Date(Date.now());
  if (now >= dailyForecast[0].sunset || now <= dailyForecast[0].sunrise) {
    document.body.classList.add("bg-backgroundNight");
  } else {
    document.body.classList.add("bg-background");
  }
  document.body.classList.add("overflow-x-hidden");
  dailyForecast = dailyForecast.slice(1);
  return (
    <>
      {dailyForecast.map((obj: any, i: number) => {
        return (
          <div
            key={i}
            className="bg-white bg-opacity-20 my-2 grid grid-cols-5 sm:py-2 rounded-xl items-center px-2 text-base sm:text-xl lg:text-2xl lg:py-2 2xl:text-2xl"
          >
            <div className="pl-4 2xl:pl-8 sm:hidden">{obj.weekDayShort}</div>
            <div className="pl-4 2xl:pl-8 hidden sm:flex">{obj.weekDay}</div>
            {i === 0 ? (
              <>
                <div className="flex flex-col items-end justify-between pr-4 md:pr-12 lg:pr-14 xl:pr-10">
                  <div className="text-xs xl:text-sm">Min</div>
                  <div>
                    {isCelsius ? (
                      <>{obj.tempMin}°C</>
                    ) : (
                      <>{toFahrenheit(obj.tempMin)}°F</>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-start pl-4 md:pl-12 lg:pl-14 xl:pl-10">
                  <div className="text-xs xl:text-sm">Max</div>
                  <div>
                    {isCelsius ? (
                      <>{obj.tempMax}°C</>
                    ) : (
                      <>{toFahrenheit(obj.tempMax)}°F</>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-end justify-between pr-4 md:pr-12 lg:pr-14 xl:pr-10">
                  {isCelsius ? (
                    <>{obj.tempMin}°C</>
                  ) : (
                    <>{toFahrenheit(obj.tempMin)}°F</>
                  )}
                </div>
                <div className="flex flex-col items-start pl-4 md:pl-12 lg:pl-14 xl:pl-10">
                  {isCelsius ? (
                    <>{obj.tempMax}°C</>
                  ) : (
                    <>{toFahrenheit(obj.tempMax)}°F</>
                  )}
                </div>
              </>
            )}
            <div className="flex justify-start ">
              {WMO.map((item, i: number) => {
                return (
                  <div key={i}>
                    {item.weathercode === obj.weathercode ? (
                      <>
                        <img
                          key={i.toString()}
                          className="w-14 sm:w-16 lg:w-20 2xl:w-20"
                          src={item.svg}
                          alt={item.slug}
                        />
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col rounded-sm">
              <div className="flex">
                <img
                  src={ClearDay}
                  alt="clear-day"
                  className="w-6 bg-white bg-opacity-10 rounded-full ml-1 md:ml-4 sm:mr-2"
                />
                <div className="flex border-l-4 border-amber-300  pl-1 sm:pl-2 ">
                  <div className="w-14">
                    {obj.sunrise.getHours() + 1 < 10 ? (
                      <>0{obj.sunrise.getHours()}</>
                    ) : (
                      <>{obj.sunrise.getHours()}</>
                    )}
                    :
                    {obj.sunrise.getMinutes() < 10 ? (
                      <>0{obj.sunrise.getMinutes()}</>
                    ) : (
                      <>{obj.sunrise.getMinutes()}</>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex ">
                <img
                  src={ClearNight}
                  alt="clear-night"
                  className="w-6 bg-black bg-opacity-10 rounded-full ml-1 md:ml-4 sm:mr-2"
                />
                <div className="border-l-4 border-sky-600 pl-1 sm:pl-2 flex">
                  <div className="w-14">
                    {obj.sunset.getHours() + 1 < 10 ? (
                      <>0{obj.sunset.getHours()}</>
                    ) : (
                      <>{obj.sunset.getHours()}</>
                    )}
                    :
                    {obj.sunset.getMinutes() < 10 ? (
                      <>0{obj.sunset.getMinutes()}</>
                    ) : (
                      <>{obj.sunset.getMinutes()}</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DailyForecast;
