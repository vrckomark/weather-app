import WMO from "../WMO.module";

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
      <div
        className="bg-black bg-opacity-30  py-6 flex flex-col justify-center items-center "
        key={i}
      >
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
