import React, { useEffect } from "react";
import WMO from "../WMO.module";

export default function Layout(weatherData: any) {
  const weekDays = [
    "Nedelja",
    "Ponedeljek",
    "Torek",
    "Sreda",
    "Četrtek",
    "Petek",
    "Sobota",
  ];

  let timesUnix: any = [];
  weatherData.hourly.time.map((time: any) => {
    return timesUnix.push(Date.parse(time));
  });

  const closestTime = timesUnix.reduce((prev: any, curr: any) =>
    Math.abs(curr - Date.now()) < Math.abs(prev - Date.now()) ? curr : prev
  );

  timesUnix = timesUnix.slice(
    timesUnix.indexOf(closestTime), //from now
    timesUnix.indexOf(closestTime) + 8 //to 10h in advance
  );

  var times: any = [];
  timesUnix.map((time: any) => {
    return times.push(new Date(time));
  });
  console.log(times[1]);
  const weatherCodes: [number] = weatherData.hourly.weathercode.slice(
    timesUnix.indexOf(closestTime), //from now
    timesUnix.indexOf(closestTime) + 8 // to 10h in advance get weather
  );
  const curWeather = weatherData.current_weather;

  // const curWeatherCode =
  //   WMO[weatherData.current_weather.weathercode as keyof typeof WMO]
  return (
    <>
      <main className="text-2xl text-white">
        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-cols-8 grid-rows-2 w-screen border-2 border-black">
            <div className="col-span-8 border-2 border-black flex justify-between p-6 items-center">
              <div className="text-6xl">{curWeather.temperature}°C</div>
              <>
                {WMO.map((obj) => {
                  return (
                    <>
                      {obj.weathercode === curWeather.weathercode ? (
                        <img src={obj.svg} alt={obj.slug} className="w-24" />
                      ) : null}
                    </>
                  );
                })}
              </>
            </div>
            {weatherCodes.map((obj, index) => {
              return (
                <div>
                  {WMO.map((item: any) => {
                    return item.weathercode == obj ? (
                      <img src={item.svg} alt={item.slug} />
                    ) : null;
                  })}
                  <div className="text-xl">
                    {times[index].getHours() + 1}:00
                  </div>
                </div>
              );
            })}
          </div>
          <div></div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}
