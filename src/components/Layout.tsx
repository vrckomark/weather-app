import WMO from "../WMO.module";
import { BsGithub } from "react-icons/bs";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import forecastType from "../types/ForecastType";

export default function Layout(weatherData: forecastType) {
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

  const currentTime = new Date(Date.now());
  var timesUnix: any = [];
  weatherData?.hourly.time.map((time: any) => {
    return timesUnix.push(Date.parse(time));
  });
  const now = timesUnix.indexOf(
    timesUnix.reduce((prev: any, curr: any) =>
      Math.abs(curr - Date.now()) < Math.abs(prev - Date.now()) ? curr : prev
    )
  );

  const feelsLike = weatherData?.hourly.apparent_temperature[now];
  const weatherDataProp = { ...weatherData };

  const isNight = currentTime.getHours() > 19 && currentTime.getHours() < 5;

  return (
    <>
      {weatherData && (
        <>
          <main className="text-2xl text-white sm:text-3xl sm:mx-8 md:mx-14 lg:text-4xl lg:mx-24 xl:mx-64 2xl:text-5xl 2xl:mx-80">
            <div className="flex flex-col justify-center items-center px-2">
              <div className="grid grid-cols-8 grid-rows-2 w-full bg-white bg-opacity-20 rounded-xl mb-8 mt-8">
                <div className="col-span-8 flex flex-col justify-between px-6 pb-6 items-center 2xl:px-12">
                  <div className="flex items-center justify-between w-full ">
                    <div className="text-6xl lg:text-7xl 2xl:text-8xl">
                      {weatherData.current_weather.temperature}°C
                    </div>
                    <>
                      {WMO.map((obj) => {
                        return (
                          <>
                            {obj.weathercode ===
                            weatherData.current_weather.weathercode ? (
                              <img
                                src={
                                  obj.hasNight && isNight
                                    ? obj.svgNight
                                    : obj.svg
                                }
                                alt={obj.slug}
                                className="w-1/4 mr-8 mt-4"
                              />
                            ) : null}
                          </>
                        );
                      })}
                    </>
                  </div>
                  <div className="w-full flex pl-2 lg:text-3xl 2xl:text-4xl 2xl:mb-14 2xl:ml-8">
                    Čuti se kot {feelsLike}°C
                  </div>
                </div>
                <HourlyForecast {...weatherDataProp} />
              </div>
              <div className="flex flex-col w-full">
                <DailyForecast
                  weatherData={weatherData}
                  weekDaysShort={weekDaysShort}
                  weekDays={weekDays}
                />
              </div>
            </div>
          </main>
          <footer className="w-screen bg-gray-700 flex flex-col justify-center py-4 mt-12 items-center text-base sm:text-lg lg:text-xl lg:py-6 lg:mt-24">
            <div className="flex justify-center items-center">
              <a
                href="https://github.com/vrckomark/weather-app"
                target="_blank"
                rel="noreferrer"
              >
                <BsGithub className="text-2xl sm:text-3xl lg:text-4xl mr-4 hover:text-sky-400 cursor-pointer transition-colors" />
              </a>
              <div>Made by Mark Vrčko / Vrechko</div>
            </div>
            <div className="flex justify-center items-center text-sm text-gray-300 mt-2 sm:text-base lg:text-lg">
              Data provided by&nbsp;
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noreferrer"
                className="text-sky-400"
              >
                Open-Meteo
              </a>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
