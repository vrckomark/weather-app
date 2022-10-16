import WMO from "../WMO.module";

export default function Layout(weatherData: any) {
  const curWeather = weatherData.current_weather;
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
  var timesUnix: any = [];
  weatherData.hourly.time.map((time: any) => {
    return timesUnix.push(Date.parse(time));
  });
  const now = timesUnix.indexOf(
    timesUnix.reduce((prev: any, curr: any) =>
      Math.abs(curr - Date.now()) < Math.abs(prev - Date.now()) ? curr : prev
    )
  );

  var obj: any, svg: any;
  const currentTime = new Date(Date.now());
  var hourlyForecast: any = [];
  timesUnix.forEach((time: any, i: number) => {
    if (i >= now && i <= now + 8) {
      WMO.map((item: any) => {
        return item.weathercode ===
          weatherData.hourly.weathercode[
            i + weatherData.utc_offset_seconds / 60 / 60
          ]
          ? item.hasNight && currentTime.getHours() > 19
            ? (svg = item.svgNight)
            : (svg = item.svg)
          : null;
      });
      obj = {
        weathercode:
          weatherData.hourly.weathercode[
            i + weatherData.utc_offset_seconds / 60 / 60
          ],
        time: new Date(weatherData.hourly.time[i]),
        temperature:
          weatherData.hourly.temperature_2m[
            i + weatherData.utc_offset_seconds / 60 / 60
          ],
        svg,
      };
      hourlyForecast.push(obj);
    }
  });
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
  hourlyForecast = hourlyForecast.slice(1);

  const feelsLike = weatherData.hourly.apparent_temperature[now];

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
            {hourlyForecast.map((obj: any) => {
              return (
                <div>
                  <div className="text-base flex justify-center sm:text-lg lg:text-2xl 2xl:text-4xl">
                    {(obj.time.getHours() + 1).toString().length < 2 ? (
                      <>0</>
                    ) : null}
                    {obj.time.getHours() + 1}:00
                  </div>
                  {WMO.map((item: any) => {
                    return item.weathercode === obj.weathercode ? (
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
                    {obj.temperature}°C
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-full">
            {dailyForecast.map((obj: any, i: number) => {
              return (
                <div className="bg-white bg-opacity-20 my-2 grid grid-cols-4 rounded-xl items-center px-2 text-base py-2 sm:text-xl lg:text-2xl 2xl:text-4xl 2xl:py-0">
                  <div className="pl-4 2xl:pl-8 sm:hidden">
                    {obj.weekDayShort}
                  </div>
                  <div className="pl-4 2xl:pl-8 hidden sm:flex">
                    {obj.weekDay}
                  </div>
                  {i === 0 ? (
                    <>
                      <div className="after:content-['Min'] after:text-xs after:text-gray-200 after:absolute after:-translate-x-6 after:-translate-y-6 lg:after:text-base lg:after:-translate-x-8 2xl:after:text-lg 2xl:after:-translate-x-10">
                        {obj.tempMin}°C
                      </div>
                      <div className="after:content-['Max'] after:text-xs after:text-gray-200 after:absolute after:-translate-x-10 after:-translate-y-6 lg:after:text-base lg:after:-translate-x-12 2xl:after:text-lg 2xl:after:-translate-x-16">
                        {obj.tempMax}°C
                      </div>
                    </>
                  ) : (
                    <>
                      <div>{obj.tempMin}°C</div>
                      <div>{obj.tempMax}°C</div>
                    </>
                  )}

                  {WMO.map((item) => {
                    return (
                      <>
                        {item.weathercode === obj.weathercode ? (
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
