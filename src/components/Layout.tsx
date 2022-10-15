import React from "react";
import WMO from "../WMO.module";

export default function Layout(weatherData: any) {
  const curWeather = weatherData.current_weather;
  console.log(weatherData);
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

  const temp: any = weatherData.daily.time.slice(1);
  const dailyTimes: any = [];
  temp.map((time: any) => {
    return dailyTimes.push(new Date(time));
  });

  const dailyWeatherCodes: any = weatherData.daily.weathercode.slice(1);
  const dailyTempMax: any = weatherData.daily.temperature_2m_max.slice(1);
  const dailyTempMin: any = weatherData.daily.temperature_2m_min.slice(1);

  var timesUnix: any = [];
  weatherData.hourly.time.map((time: any) => {
    return timesUnix.push(Date.parse(time));
  });

  var closestTime = timesUnix.reduce((prev: any, curr: any) =>
    Math.abs(curr - Date.now()) < Math.abs(prev - Date.now()) ? curr : prev
  );

  const feelsLike =
    weatherData.hourly.apparent_temperature[timesUnix.indexOf(closestTime)];

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
      <main className="text-2xl text-white sm:text-3xl lg:text-4xl 2xl:text-5xl lg:mx-12">
        <div className="flex flex-col justify-center items-center px-2">
          <div className="grid grid-cols-8 grid-rows-2 w-full bg-white bg-opacity-20 rounded-xl mb-8 mt-8">
            <div className="col-span-8 flex flex-col justify-between px-6 pb-6 items-center">
              <div className="flex items-center justify-between w-full">
                <div className="text-6xl lg:text-8xl 2xl:text-9xl">
                  {curWeather.temperature}°C
                </div>
                <>
                  {WMO.map((obj) => {
                    return (
                      <>
                        {obj.weathercode === curWeather.weathercode ? (
                          <img
                            src={obj.svg}
                            alt={obj.slug}
                            className="w-1/4 mr-8"
                          />
                        ) : null}
                      </>
                    );
                  })}
                </>
              </div>
              <div className="w-full flex pl-2 2xl:mb-14 2xl:ml-8">
                Čuti se kot {feelsLike}°C
              </div>
            </div>
            {weatherCodes.map((obj, index) => {
              return (
                <div>
                  <div className="text-base flex justify-center sm:text-lg lg:text-2xl 2xl:text-4xl">
                    {(times[index].getHours() + 1).toString().length < 2 ? (
                      <>0</>
                    ) : null}
                    {times[index].getHours() + 1}:00
                  </div>
                  {WMO.map((item: any) => {
                    return item.weathercode === obj ? (
                      <>
                        <img
                          src={item.svg}
                          alt={item.slug}
                          className=" flex justify-center"
                        />
                      </>
                    ) : null;
                  })}
                  <div className="text-lg  flex justify-center sm:text-xl lg:text-3xl 2xl:text-5xl">
                    {temps[index]}°C
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-full">
            {dailyTimes.map((time: Date, i: number) => {
              return (
                <div className="bg-white bg-opacity-20 my-2 grid grid-cols-4 rounded-xl items-center px-2 text-base py-2 sm:text-xl lg:text-2xl 2xl:text-4xl 2xl:py-0">
                  <div className="pl-4 2xl:pl-8 sm:hidden">
                    {weekDaysShort[time.getDay()]}
                  </div>
                  <div className="pl-4 2xl:pl-8 hidden sm:flex">
                    {weekDays[time.getDay()]}
                  </div>
                  {i === 0 ? (
                    <>
                      <div className="after:content-['Min'] after:text-xs after:text-gray-200 after:absolute after:-translate-x-6 after:-translate-y-6 lg:after:text-base lg:after:-translate-x-8 2xl:after:text-lg 2xl:after:-translate-x-10">
                        {dailyTempMin[i]}°C
                      </div>
                      <div className="after:content-['Max'] after:text-xs after:text-gray-200 after:absolute after:-translate-x-10 after:-translate-y-6 lg:after:text-base lg:after:-translate-x-12 2xl:after:text-lg 2xl:after:-translate-x-16">
                        {dailyTempMax[i]}°C
                      </div>
                    </>
                  ) : (
                    <>
                      <div>{dailyTempMin[i]}°C</div>
                      <div>{dailyTempMax[i]}°C</div>
                    </>
                  )}

                  {WMO.map((item) => {
                    return (
                      <>
                        {item.weathercode === dailyWeatherCodes[i] ? (
                          <>
                            <img
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
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}
