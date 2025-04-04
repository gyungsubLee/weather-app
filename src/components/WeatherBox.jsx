import styled from "styled-components";

const WeatherBox = ({ weatherData }) => {
  return (
    <WeatherBoxWrapper>
      {weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>온도: {weatherData.main.temp}°C</p>
          <p>날씨: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </WeatherBoxWrapper>
  );
};

const WeatherBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 200px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  margin-bottom: 10px;
`;

export default WeatherBox;
