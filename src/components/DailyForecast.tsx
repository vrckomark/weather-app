import WMO from "../WMO.module";
import forecastType from "../types/ForecastType";

const DailyForecast = (props: any) => {
  const { weatherData, weekDays, weekDaysShort } = props;
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
    };
    dailyForecast.push(obj);
  });
  dailyForecast = dailyForecast.slice(1);

  return (
    <>
      {dailyForecast.map((obj: any, i: number) => {
        return (
          <div
            key={i.toString()}
            className="bg-white bg-opacity-20 my-2 grid grid-cols-4 rounded-xl items-center px-2 text-base py-2 sm:text-xl lg:text-2xl 2xl:text-4xl 2xl:py-0"
          >
            <div className="pl-4 2xl:pl-8 sm:hidden">{obj.weekDayShort}</div>
            <div className="pl-4 2xl:pl-8 hidden sm:flex">{obj.weekDay}</div>
            {i === 0 ? (
              <>
                <div className="flex flex-col items-end justify-between pr-8 md:pr-12 lg:pr-14">
                  <div className="text-xs">Min</div>
                  <div>{obj.tempMin}°C</div>
                </div>
                <div className="flex flex-col items-start pl-8 md:pl-12 lg:pl-14">
                  <div className="text-xs">Max</div>
                  <div>{obj.tempMax}°C</div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-end justify-between pr-8 md:pr-12 lg:pr-14">
                  {obj.tempMin}°C
                </div>
                <div className="flex flex-col items-start pl-8 md:pl-12 lg:pl-14">
                  {obj.tempMax}°C
                </div>
              </>
            )}

            {WMO.map((item, i: number) => {
              return (
                <>
                  {item.weathercode === obj.weathercode ? (
                    <>
                      <img
                        key={i.toString()}
                        className="w-14 sm:w-16 lg:w-20 2xl:w-28"
                        src={item.svg}
                        alt={item.slug}
                      />
                    </>
                  ) : null}
                </>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default DailyForecast;
