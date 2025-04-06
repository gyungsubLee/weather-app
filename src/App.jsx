import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getCurrentLocation,
  getWeatherByCurrentLocation,
} from "./utils/weatherApi";

import { media } from "./styles/responsive";
import Button from "./components/Button";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import Loading from "./components/Loading";
import TimeBox from "./components/TimeBox";
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

  const handleCurrentWeather = () => {
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
    <BoxWrapper>
      <CurrentButtonWrapper>
        <Title>날씨 정보</Title>
        <Button onClick={handleCurrentWeather}>현재 위치 날씨 보기</Button>
      </CurrentButtonWrapper>
      <WeatherBoxWrapper>
        <TimeBox></TimeBox>
        {!weatherData && !loading && <p>버튼을 눌러주세요</p>}
        {loading && <Loading />}
        {!loading && weatherData && <WeatherBox weatherData={weatherData} />}
      </WeatherBoxWrapper>
      <ButtonWrapper>
        <WeatherButton
          cities={cities}
          handleGetWeatherByCity={handleGetWeatherByCity}
        />
      </ButtonWrapper>
    </BoxWrapper>
  );
};

const Title = styled.h1`
  text-align: center;
  margin: 0 0 20px 0;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  ${media.mobile`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  `}
`;

const CurrentButtonWrapper = styled.div`
  position: absolute;
  top: 27%;

  ${media.mobile`
  top: 21%;
  `}
`;

const WeatherBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 200px;
  background-image: var(--gradient-transparent),
    url("https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  padding: 20px;
  color: var(--font-color-light);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 20px 0;
  transition: transform 300ms ease;
  transform: translateZ(0) scale(1.02) perspective(1000px);
  float: left;

  &: hover {
    transform: scale(1.1) perspective(1000px) rotateX(-5deg);
  }

  ${media.mobile`
    width: 70%;
    height: 400px;
    margin: 40px auto;
  `}
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 500px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  ${media.mobile`
    flex-direction: column;
    width: 18%;
    height: 400px;
    margin: 0 auto;
  `}
`;

export default App;
