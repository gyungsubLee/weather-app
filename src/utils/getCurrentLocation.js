/**
 * 현재 위치를 가져오고, 실패 시 fallback 좌표 반환
 * @param {Function} onSuccess - 위치를 성공적으로 가져왔을 때 호출할 함수
 * @param {Function} onError - 위치를 가져오지 못했을 때 호출할 함수
 */
export function getCurrentLocation(onSuccess, onError) {
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
    }
  );
}
