import WMO from "../WMO.module";
import forecastType from "../types/ForecastType";

const HourlyForecast = (forecastData: forecastType) => {
  var timesUnix: any = [];

  forecastData.hourly.time.map((time: any) => {
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
          forecastData.hourly.weathercode[
            i + forecastData.utc_offset_seconds / 60 / 60
          ]
          ? (item.hasNight && time.getHours() > 18) || time.getHours() < 5
            ? (svg = item.svgNight)
            : (svg = item.svg)
          : null;
      });
      obj = {
        weathercode:
          forecastData?.hourly.weathercode[
            i + forecastData.utc_offset_seconds / 60 / 60
          ],
        time: new Date(forecastData.hourly.time[i]),
        temperature:
          forecastData.hourly.temperature_2m[
            i + forecastData.utc_offset_seconds / 60 / 60
          ],
        svg,
      };
      hourlyForecast.push(obj);
    }
  });

  hourlyForecast = hourlyForecast.slice(1);

  const isNight = (obj: any) => {
    return obj.time.getHours() > 18 || obj.time.getHours() < 5;
  };
  return (
    <>
      {hourlyForecast.map((obj: any, i: number) => {
        return (
          <>
            {obj.time.getHours() > 18 || obj.time.getHours() < 5 ? (
              <>
                {i === 0 ? (
                  <div className="bg-black bg-opacity-30 flex flex-col justify-center items-center rounded-l-xl">
                    <div className="text-base flex justify-center">
                      {(obj.time.getHours() + 1).toString().length < 2 ? (
                        <>0</>
                      ) : null}
                      {obj.time.getHours() === 23 ? (
                        <>00</>
                      ) : (
                        <>{obj.time.getHours() + 1}</>
                      )}
                      :00
                    </div>
                    {WMO.map((item: any) => {
                      return item.weathercode === obj.weathercode ? (
                        <>
                          <img
                            src={item.hasNight ? item.svgNight : item.svg}
                            alt={item.slug}
                            className="w-3/4 flex justify-center"
                          />
                        </>
                      ) : null;
                    })}
                    <div className="text-sm flex justify-center sm:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl">
                      {obj.temperature}°C
                    </div>
                  </div>
                ) : i === hourlyForecast.length - 1 ? (
                  <div className="bg-black bg-opacity-30 flex flex-col justify-center items-center rounded-r-xl">
                    <div className="text-base flex justify-center sm:text-lg lg:text-2xl 2xl:text-2xl ">
                      {(obj.time.getHours() + 1).toString().length < 2 ? (
                        <>0</>
                      ) : null}
                      {obj.time.getHours() === 23 ? (
                        <>00</>
                      ) : (
                        <>{obj.time.getHours() + 1}</>
                      )}
                      :00
                    </div>
                    {WMO.map((item: any) => {
                      return item.weathercode === obj.weathercode ? (
                        <>
                          <img
                            src={item.hasNight ? item.svgNight : item.svg}
                            alt={item.slug}
                            className="w-3/4 flex justify-center"
                          />
                        </>
                      ) : null;
                    })}
                    <div className="text-sm flex justify-center sm:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl">
                      {obj.temperature}°C
                    </div>
                  </div>
                ) : (
                  <div className="bg-black bg-opacity-30 flex flex-col justify-center items-center">
                    <div className="text-base flex justify-center sm:text-lg lg:text-2xl 2xl:text-2xl ">
                      {(obj.time.getHours() + 1).toString().length < 2 ? (
                        <>0</>
                      ) : null}
                      {obj.time.getHours() === 23 ? (
                        <>00</>
                      ) : (
                        <>{obj.time.getHours() + 1}</>
                      )}
                      :00
                    </div>
                    {WMO.map((item: any) => {
                      return item.weathercode === obj.weathercode ? (
                        <>
                          <img
                            src={item.hasNight ? item.svgNight : item.svg}
                            alt={item.slug}
                            className="w-3/4 flex justify-center"
                          />
                        </>
                      ) : null;
                    })}
                    <div className="text-sm flex justify-center sm:text-lg xl:text-2xl lg:text-xl 2xl:text-2xl">
                      {obj.temperature}°C
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <div className="text-base flex justify-center sm:text-lg lg:text-2xl 2xl:text-2xl ">
                  {(obj.time.getHours() + 1).toString().length < 2 ? (
                    <>0</>
                  ) : null}
                  {obj.time.getHours() === 23 ? (
                    <>00</>
                  ) : (
                    <>{obj.time.getHours() + 1}</>
                  )}
                  :00
                </div>
                {WMO.map((item: any) => {
                  return item.weathercode === obj.weathercode ? (
                    <>
                      <img
                        src={
                          item.hasNight && isNight(obj)
                            ? item.svgNight
                            : item.svg
                        }
                        alt={item.slug}
                        className="w-3/4 flex justify-center"
                      />
                    </>
                  ) : null;
                })}
                <div className="text-sm flex justify-center xl:text-2xl sm:text-lg lg:text-xl 2xl:text-2xl">
                  {obj.temperature}°C
                </div>
              </div>
            )}
          </>
        );
      })}
    </>
  );
};

export default HourlyForecast;
