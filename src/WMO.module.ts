import clearDay from "./assets/weather-icons/clear-day.svg";
import clearNight from "./assets/weather-icons/clear-night.svg";
import partlyCloudy from "./assets/weather-icons/partly-cloudy-day.svg";
import partlyCloudyNight from "./assets/weather-icons/partly-cloudy-night.svg";
import Overcast from "./assets/weather-icons/overcast.svg";
import Fog from "./assets/weather-icons/fog-day.svg";
import FogNight from "./assets/weather-icons/fog-night.svg";
import Drizzle from "./assets/weather-icons/drizzle.svg";
import Rain from "./assets/weather-icons/rain.svg";
import Sleet from "./assets/weather-icons/sleet.svg";
import Snow from "./assets/weather-icons/snow.svg";
import Thunderstorm from "./assets/weather-icons/thunderstorms-day-rain.svg";
import ThunderstormNight from "./assets/weather-icons/thunderstorms-night-rain.svg";
import ThunderstormHail from "./assets/weather-icons/thunderstorms-night-snow.svg";
import ThunderstormHailNight from "./assets/weather-icons/thunderstorms-night-snow.svg";

const WMO = [
  {
    weathercode: 0,
    name: "Jasno nebo",
    slug: "clear-sky",
    svg: clearDay,
    svgNight: clearNight,
    hasNight: true,
  },
  {
    weathercode: 1,
    name: "Delno jasno",
    slug: "partly-clear",
    svg: partlyCloudy,
    svgNight: partlyCloudyNight,
    hasNight: true,
  },
  {
    weathercode: 2,
    name: "Delno oblačno",
    slug: "partly-cloudy",
    svg: partlyCloudy,
    svgNight: partlyCloudyNight,
    hasNight: true,
  },
  {
    weathercode: 3,
    name: "Oblačno",
    slug: "overcast",
    svg: Overcast,
    hasNight: false,
  },
  {
    weathercode: 45,
    name: "Megla",
    slug: "fog",
    svg: Fog,
    svgNight: FogNight,
    hasNight: true,
  },
  {
    weathercode: 48,
    name: "Megla",
    slug: "fog",
    svg: Fog,
    svgNight: FogNight,
    hasNight: true,
  }, //
  {
    weathercode: 51,
    name: "Rosa",
    slug: "light-drizzle",
    svg: Drizzle,
    hasNight: false,
  }, //
  {
    weathercode: 53,
    name: "Rosa",
    slug: "moderate-drizzle",
    svg: Drizzle,
    hasNight: false,
  },
  {
    weathercode: 55,
    name: "Rosa",
    slug: "intensive-drizzle",
    svg: Drizzle,
    hasNight: false,
  },
  {
    weathercode: 56,
    name: "Ledena rosa",
    slug: "freezing-drizzle",
    svg: Drizzle,
    hasNight: false,
  },
  {
    weathercode: 57,
    name: "Ledena rosa",
    slug: "freezing-drizzle",
    svg: Drizzle,
    hasNight: false,
  },
  {
    weathercode: 61,
    name: "Rahel dež",
    slug: "slight-rain",
    svg: Rain,
    hasNight: false,
  },
  {
    weathercode: 63,
    name: "Zmeren dež",
    slug: "moderate-rain",
    svg: Rain,
    hasNight: false,
  },
  {
    weathercode: 65,
    name: "Močan dež",
    slug: "intensive-rain",
    svg: Rain,
    hasNight: false,
  },
  {
    weathercode: 66,
    name: "Žled",
    slug: "freezing-rain",
    svg: Sleet,
    hasNight: false,
  },
  {
    weathercode: 67,
    name: "Žled",
    slug: "freezing-rain-intensive",
    svg: Sleet,
    hasNight: false,
  },
  {
    weathercode: 71,
    name: "Rahel Sneg",
    slug: "slight-snowfall",
    svg: Snow,
    hasNight: false,
  },
  {
    weathercode: 73,
    name: "Zmeren Sneg",
    slug: "moderate-snowfall",
    svg: Snow,
    hasNight: false,
  },
  {
    weathercode: 75,
    name: "Močan Sneg",
    slug: "heavy-snowfall",
    svg: Snow,
    hasNight: false,
  },
  {
    weathercode: 77,
    name: "Snežna zrna",
    slug: "snow-grains",
    svg: Snow,
    hasNight: false,
  },
  {
    weathercode: 80,
    name: "Rahle plohe",
    slug: "slight-rain-showers",
    svg: Rain,
    hasNight: false,
  },
  {
    weathercode: 81,
    name: "Zmerne plohe",
    slug: "moderate-rain-showers",
    svg: Rain,
    hasNight: false,
  },
  {
    weathercode: 82,
    name: "Močne plohe",
    slug: "violent-rain-showers",
    svg: Rain,
    hasNight: false,
  },
  {
    weathercode: 85,
    name: "Snežne plohe",
    slug: "snow-showers",
    svg: Snow,
    hasNight: false,
  },
  {
    weathercode: 86,
    name: "Snežne plohe",
    slug: "heavy-snow-showers",
    svg: Snow,
    hasNight: false,
  },
  {
    weathercode: 95,
    name: "Nevihte",
    slug: "thunderstorms",
    svg: Thunderstorm,
    svgNight: ThunderstormNight,
    hasNight: true,
  },
  {
    weathercode: 96,
    name: "Nevihta z točo",
    slug: "thunderstorms-hail",
    svg: ThunderstormHail,
    svgNight: ThunderstormHailNight,
    hasNight: true,
  },
  {
    weathercode: 99,
    name: "Nevihta z točo",
    slug: "thunderstorms-heavy-hail",
    svg: ThunderstormHail,
    svgNight: ThunderstormHailNight,
    hasNight: true,
  },
];

export default WMO;
