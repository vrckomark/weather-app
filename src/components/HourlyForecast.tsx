import { useContext } from "react";
import WMO from "../WMO.module";
import { celsiusContext, twilightContext } from "./Layout";
import { toFahrenheit } from "./Layout";

type hourlyObj = {
  time: Date;
  weathercode: number;
  temperature_2m: number;
  apparent_temperature: number;
};

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const HourlyForecast = ({ hourlyForecast }: any) => {
  const isCelsius = useContext(celsiusContext);
  const twilight = useContext(twilightContext);
  // console.log(twilight);
  const isNight = (time: Date) => {
    if (twilight) {
      for (const sunsetTime of twilight.sunsetTimes) {
        const i = twilight.sunsetTimes.indexOf(sunsetTime);
        if (isSameDay(time, sunsetTime)) {
          if (time.getHours() >= sunsetTime.getHours()) {
            return true;
          }
          if (time.getHours() <= twilight.sunriseTimes[i].getHours()) {
            return true;
          }
        }
      }
    }
    return false;
  };

  return (
    <>
      {hourlyForecast.map((obj: hourlyObj, i: number) => {
        return isNight(obj.time) ? (
          <div
            className="bg-black bg-opacity-30  py-6 flex flex-col justify-center items-center "
            key={i}
          >
            {WMO.map((item: any) => {
              return item.weathercode === obj.weathercode ? (
                <img
                  src={
                    item.hasNight && isNight(obj.time)
                      ? item.svgNight
                      : item.svg
                  }
                  alt={item.slug}
                  className="w-3/4 flex justify-center"
                  key={i}
                />
              ) : null;
            })}
            <div
              className="text-sm flex justify-center xl:text-2xl sm:text-lg lg:text-xl 2xl:text-2xl"
              key={i}
            >
              {isCelsius ? (
                <>{obj.temperature_2m}°C</>
              ) : (
                <>{toFahrenheit(obj.temperature_2m)}°F</>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center" key={i}>
            {WMO.map((item: any) => {
              return item.weathercode === obj.weathercode ? (
                <img
                  src={
                    item.hasNight && isNight(obj.time)
                      ? item.svgNight
                      : item.svg
                  }
                  alt={item.slug}
                  className="w-3/4 flex justify-center"
                  key={i}
                />
              ) : null;
            })}
            <div
              className="text-sm flex justify-center xl:text-2xl sm:text-lg lg:text-xl 2xl:text-2xl"
              key={i}
            >
              {isCelsius ? (
                <>{obj.temperature_2m}°C</>
              ) : (
                <>{toFahrenheit(obj.temperature_2m)}°F</>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default HourlyForecast;
