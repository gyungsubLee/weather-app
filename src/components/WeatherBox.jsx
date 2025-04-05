import styled from "styled-components";

const WeatherBox = ({ weatherData }) => {
  return (
    <>
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>온도: {weatherData.main.temp}°C</p>
          <p>날씨: {weatherData.weather[0].description}</p>
        </div>
      )}
    </>
  );
};

export default WeatherBox;
