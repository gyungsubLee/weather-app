const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

/**
 * 현재 위치를 가져오고, 실패 시 fallback 좌표 반환
 * @param {Function} onSuccess - 위치를 성공적으로 가져왔을 때 호출할 함수
 * @param {Function} onError - 위치를 가져오지 못했을 때 호출할 함수
 */
const getCurrentLocation = (onSuccess, onError) => {
  if (!navigator.geolocation) {
    alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    onError({
      lat: 37.5665,
      lon: 126.978,
      reason: "Geolocation not supported",
    });
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log("✅ 위치:", lat, lon);
      onSuccess({ lat, lon });
    },
    (error) => {
      let message = "";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = "위치 권한이 거부되었습니다.";
          break;
        case error.POSITION_UNAVAILABLE:
          message = "위치 정보를 사용할 수 없습니다.";
          break;
        case error.TIMEOUT:
          message = "위치 요청 시간이 초과되었습니다.";
          break;
        default:
          message = "알 수 없는 오류가 발생했습니다.";
      }

      alert(`${message} 기본 위치로 정보를 표시합니다.`);
      console.error("❌ 위치 에러:", error);

      // fallback 위치: 서울
      onError({
        lat: 37.5665,
        lon: 126.978,
        reason: message,
      });
    },
    {
      enableHighAccuracy: false, // true로 하면 더 정확하지만 느려짐
      timeout: 5000, // 최대 5초 기다림
      maximumAge: 60_000, // 1분 이내 캐시된 위치가 있으면 사용
    }
  );
};

const getWeatherByCurrentLocation = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(apiKey);

    if (data.cod !== 200) {
      throw new Error(`날씨 데이터 가져오기 실패: ${data.message}`);
    }

    console.log("🌤 날씨 정보:", data);
    return data; // 필요한 경우 return
  } catch (error) {
    console.error("날씨 데이터 가져오기 실패:", error);
    throw error;
  }
};

export { getCurrentLocation, getWeatherByCurrentLocation };
