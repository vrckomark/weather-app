import React, { useEffect } from "react";
import WMO from "../WMO.module";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default function Layout(weatherData: any) {
  const { screenWidth } = useWindowDimensions();
  const curWeather = weatherData.current_weather;

  const weekDays = [
    "Nedelja",
    "Ponedeljek",
    "Torek",
    "Sreda",
    "Četrtek",
    "Petek",
    "Sobota",
  ];

  const temp: any = weatherData.daily.time.slice(1);
  const dailyTimes: any = [];
  temp.map((time: any) => {
    dailyTimes.push(new Date(time));
  });
  const dailyWeatherCodes: any = weatherData.daily.weathercode.slice(1);
  const dailyTempMax: any = weatherData.daily.temperature_2m_max.slice(1);
  const dailyTempMin: any = weatherData.daily.temperature_2m_min.slice(1);

  let timesUnix: any = [];
  weatherData.hourly.time.map((time: any) => {
    return timesUnix.push(Date.parse(time));
  });

  const closestTime = timesUnix.reduce((prev: any, curr: any) =>
    Math.abs(curr - Date.now()) < Math.abs(prev - Date.now()) ? curr : prev
  );

  const feelsLike =
    weatherData.hourly.apparent_temperature[timesUnix.indexOf(closestTime) - 1];

  timesUnix = timesUnix.slice(
    timesUnix.indexOf(closestTime), //from now
    timesUnix.indexOf(closestTime) + 8 //to 10h in advance
  );

  var times: any = [];
  timesUnix.map((time: any) => {
    return times.push(new Date(time));
  });
  const weatherCodes: [number] = weatherData.hourly.weathercode.slice(
    timesUnix.indexOf(closestTime), //from now
    timesUnix.indexOf(closestTime) + 8 // to 10h in advance get weather
  );

  const temps: [number] = weatherData.hourly.temperature_2m.slice(
    timesUnix.indexOf(closestTime), //from now
    timesUnix.indexOf(closestTime) + 8 // to 10h in advance get weather
  );
  return (
    <>
      <main className="text-2xl text-white">
        <div className="flex flex-col justify-center items-center px-2">
          <div className="grid grid-cols-8 grid-rows-2 w-full bg-white bg-opacity-20 rounded-xl mb-8 mt-8">
            <div className="col-span-8 flex flex-col justify-between px-6 pb-6 items-center">
              <div className="flex items-center justify-between w-full px-4">
                <div className="text-6xl">{curWeather.temperature}°C</div>
                <>
                  {WMO.map((obj) => {
                    return (
                      <>
                        {obj.weathercode === curWeather.weathercode ? (
                          <img
                            src={obj.svg}
                            alt={obj.slug}
                            className="w-24 mr-10"
                          />
                        ) : null}
                      </>
                    );
                  })}
                </>
              </div>
              <div className="w-full flex pl-8">Čuti se kot {feelsLike}°C</div>
            </div>
            {weatherCodes.map((obj, index) => {
              return (
                <div>
                  <div className="text-base flex justify-center">
                    {(times[index].getHours() + 1).toString().length < 2 ? (
                      <>0</>
                    ) : null}
                    {times[index].getHours() + 1}:00
                  </div>
                  {WMO.map((item: any) => {
                    return item.weathercode === obj ? (
                      <img
                        src={item.svg}
                        alt={item.slug}
                        className=" flex justify-center"
                      />
                    ) : null;
                  })}
                  <div className="text-lg  flex justify-center">
                    {temps[index]}°C
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-full">
            {dailyTimes.map((time: Date, i: number) => {
              return (
                <div className="bg-white bg-opacity-20 my-2 grid grid-cols-4 rounded-xl items-center px-2 text-xl">
                  <div>{weekDays[time.getDay()]}</div>
                  <div>{dailyTempMin[i]}°C</div>
                  <div>{dailyTempMax[i]}°C</div>
                  {WMO.map((item) => {
                    return (
                      <>
                        {item.weathercode === dailyWeatherCodes[i] ? (
                          <img
                            className="w-16"
                            src={item.svg}
                            alt={item.slug}
                          />
                        ) : null}
                      </>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}
