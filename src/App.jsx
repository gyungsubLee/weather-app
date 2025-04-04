import { useState, useEffect } from "react";
import {
  getCurrentLocation,
  getWeatherByCurrentLocation,
} from "./utils/weatherApi";
import "./App.css";

// 1. 앱 마운트 시 현재 위치 기반 날씨 보여주기  -> useEffect
// 2. 날씨 정보 = [ 도시, 섭씨,  화씨, 날씨 상태정보 ]
// 3. 5개의 버튼 = 1: 현재 위치, 4: 다른 도시들
// 4. 해당 도시 버튼 클릭 시, 해당 도시의 날씨 정보 보여주기
// 5. 현재 위치 버튼 클릭시, 다시 현재 위치 기반의 날씨 보여주기
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다.
function App() {
  useEffect(() => {
    getCurrentLocation(
      ({ lat, lon }) => {
        console.log("받은 위치 좌표:", lat, lon);
        getWeatherByCurrentLocation(lat, lon)
          .then((data) => {
            console.log("날씨 데이터:", data);
          })
          .catch((error) => {
            console.error("날씨 데이터 가져오기 실패:", error);
          });
      },
      ({ lat, lon, reason }) => {
        console.warn("기본 위치 사용 사유:", reason);
        console.log("기본 위치 좌표:", lat, lon);
      }
    );
  }, []);

  return <>hello</>;
}

export default App;
