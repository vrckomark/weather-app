import WMO from "../WMO.module";

interface forecastType {
  hourly: {
    time: string[];
    weathercode: number[];
    temperature_2m: number[];
    apparent_temperature: number[];
  };
  utc_offset_seconds: number;
}

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
  const currentTime = new Date(Date.now());

  timesUnix.forEach((time: any, i: number) => {
    if (i >= now && i <= now + 8) {
      WMO.map((item: any) => {
        return item.weathercode ===
          forecastData.hourly.weathercode[
            i + forecastData.utc_offset_seconds / 60 / 60
          ]
          ? item.hasNight && currentTime.getHours() > 19
            ? (svg = item.svgNight)
            : (svg = item.svg)
          : null;
      });
      obj = {
        weathercode:
          forecastData.hourly.weathercode[
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

  return (
    <>
      {hourlyForecast.map((obj: any, i: number) => {
        return (
          <>
            {obj.time.getHours() > 21 || obj.time.getHours() < 5 ? (
              <>
                {i === 0 ? (
                  <div className="bg-black bg-opacity-30 flex flex-col justify-center items-center rounded-l-xl">
                    <div className="text-base flex justify-center sm:text-lg lg:text-2xl 2xl:text-4xl ">
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
                            className=" flex justify-center"
                          />
                        </>
                      ) : null;
                    })}
                    <div className="text-sm flex justify-center sm:text-xl lg:text-3xl 2xl:text-5xl">
                      {obj.temperature}°C
                    </div>
                  </div>
                ) : i === hourlyForecast.length - 1 ? (
                  <div className="bg-black bg-opacity-30 flex flex-col justify-center items-center rounded-r-xl">
                    <div className="text-base flex justify-center sm:text-lg lg:text-2xl 2xl:text-4xl ">
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
                            className=" flex justify-center"
                          />
                        </>
                      ) : null;
                    })}
                    <div className="text-sm flex justify-center sm:text-xl lg:text-3xl 2xl:text-5xl">
                      {obj.temperature}°C
                    </div>
                  </div>
                ) : (
                  <div className="bg-black bg-opacity-30 flex flex-col justify-center items-center">
                    <div className="text-base flex justify-center sm:text-lg lg:text-2xl 2xl:text-4xl ">
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
                            className=" flex justify-center"
                          />
                        </>
                      ) : null;
                    })}
                    <div className="text-sm flex justify-center sm:text-xl lg:text-3xl 2xl:text-5xl">
                      {obj.temperature}°C
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <div className="text-base flex justify-center sm:text-lg lg:text-2xl 2xl:text-4xl ">
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
                        className=" flex justify-center"
                      />
                    </>
                  ) : null;
                })}
                <div className="text-sm flex justify-center sm:text-xl lg:text-3xl 2xl:text-5xl">
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
