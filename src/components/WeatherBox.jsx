import { useEffect, useState } from "react";
import styled from "styled-components";

const WeatherBox = ({ weatherData }) => {
  const { name, main, weather } = weatherData;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <Box>
      <Left>
        <WeatherIcon src={iconUrl} alt="날씨 아이콘" />
      </Left>
      <Right>
        <CityName>{name}</CityName>
        <Temperature>{main.temp}°C</Temperature>
        <Description>{weather[0].description}</Description>
      </Right>
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px 25px;
  gap: 20px;
  color: white;
`;

const Left = styled.div`
  flex-shrink: 0;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
`;

const CityName = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
`;

const Temperature = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  margin: 5px 0;
`;

const Description = styled.p`
  font-size: 1rem;
  font-weight: 700;
  opacity: 0.8;
  margin: 0;
  text-transform: capitalize;
`;

export default WeatherBox;
