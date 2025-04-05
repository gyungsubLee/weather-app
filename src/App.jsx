import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getCurrentLocation,
  getWeatherByCurrentLocation,
} from "./utils/weatherApi";

import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import "./App.css";

const cities = [
  { name: "서울", lat: 37.5665, lon: 126.978 },
  { name: "부산", lat: 35.1796, lon: 129.0756 },
  { name: "대구", lat: 35.8714, lon: 128.6014 },
  { name: "인천", lat: 37.4563, lon: 126.7052 },
  { name: "광주", lat: 35.1595, lon: 126.8526 },
];

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetWeatherByCity = async (lat, lon) => {
    setLoading(true);
    try {
      const data = await getWeatherByCurrentLocation(lat, lon);
      setWeatherData(data);
    } catch (err) {
      console.error("날씨 가져오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetWeather = () => {
    setLoading(true);
    getCurrentLocation(
      async ({ lat, lon }) => {
        try {
          const data = await getWeatherByCurrentLocation(lat, lon);
          setWeatherData(data);
        } catch (err) {
          console.error("날씨 가져오기 실패:", err);
        } finally {
          setLoading(false);
        }
      },
      async ({ lat, lon, reason }) => {
        console.warn("기본 위치로 대체:", reason);
        try {
          const data = await getWeatherByCurrentLocation(lat, lon);
          setWeatherData(data);
        } catch (err) {
          console.error("fallback 날씨 실패:", err);
        } finally {
          setLoading(false);
        }
      }
    );
  };

  return (
    <>
      <Title>날씨 앱</Title>
      <BoxWrapper>
        <button onClick={handleGetWeather}>현재 위치 날씨 보기</button>
        <WeatherBoxWrapper>
          {!weatherData && !loading && <p>버튼을 눌러주세요</p>}
          {loading && <p>로딩 중...</p>}
          {!loading && weatherData && <WeatherBox weatherData={weatherData} />}
        </WeatherBoxWrapper>
        <ButtonWrapper>
          <WeatherButton
            cities={cities}
            handleGetWeatherByCity={handleGetWeatherByCity}
          />
        </ButtonWrapper>
      </BoxWrapper>
    </>
  );
};

const Title = styled.h1`
  text-align: center;
  margin: 20px 0;
  color: #333;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 500px;
`;

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
  margin: 10px 0;
`;

export default App;
