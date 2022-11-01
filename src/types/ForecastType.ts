export default interface forecastType {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
  hourly: {
    time: Date[];
    weathercode: number[];
    temperature_2m: number[];
    apparent_temperature: number[];
  };
  utc_offset_seconds: number;
  daily: {
    time: Date[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}
