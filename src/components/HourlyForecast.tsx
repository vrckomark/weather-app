import WMO from "../WMO.module";
import forecastType from "../types/ForecastType";
import WMOType from "../types/WMOType";
import { timeStamp } from "console";

interface hourlyObj {
  time: Date;
  weathercode: number;
  temperature_2m: number;
  apparent_temperature: number;
}

const HourlyForecast = ({ hourlyForecast }: any) => {
  const isNight = (obj: hourlyObj) => {
    return obj.time.getHours() > 18 || obj.time.getHours() < 5;
  };

  return hourlyForecast.map((obj: hourlyObj, i: number) => {
    return obj.time.getHours() > 18 || obj.time.getHours() < 5 ? (
      <div className="bg-black bg-opacity-30  pt-6 pb-2 flex flex-col justify-center items-center last:rounded-r-xl first:rounded-l-xl">
        <div className="text-base flex justify-center sm:text-lg lg:text-2xl 2xl:text-2xl ">
          {(obj.time.getHours() + 1).toString().length < 2 ? <>0</> : null}
          {obj.time.getHours() === 23 ? (
            <>00</>
          ) : (
            <>{obj.time.getHours() + 1}</>
          )}
          :00
        </div>
        {WMO.map((item: any) => {
          return item.weathercode === obj.weathercode ? (
            <img
              src={item.hasNight && isNight(obj) ? item.svgNight : item.svg}
              alt={item.slug}
              className="w-3/4 flex justify-center"
              key={i}
            />
          ) : null;
        })}
        <div className="text-sm flex justify-center xl:text-2xl sm:text-lg lg:text-xl 2xl:text-2xl">
          {obj.temperature_2m}°C
        </div>
      </div>
    ) : (
      <div className="flex flex-col justify-center items-center">
        <div className="text-base flex justify-center sm:text-lg lg:text-2xl 2xl:text-2xl ">
          {(obj.time.getHours() + 1).toString().length < 2 ? <>0</> : null}
          {obj.time.getHours() === 23 ? (
            <>00</>
          ) : (
            <>{obj.time.getHours() + 1}</>
          )}
          :00
        </div>
        {WMO.map((item: any) => {
          return item.weathercode === obj.weathercode ? (
            <img
              src={item.hasNight && isNight(obj) ? item.svgNight : item.svg}
              alt={item.slug}
              className="w-3/4 flex justify-center"
              key={i}
            />
          ) : null;
        })}
        <div className="text-sm flex justify-center xl:text-2xl sm:text-lg lg:text-xl 2xl:text-2xl">
          {obj.temperature_2m}°C
        </div>
      </div>
    );
  });
};

export default HourlyForecast;
