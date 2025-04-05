import styled from "styled-components";
import { useEffect, useState } from "react";

const TimeBox = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000); // 1분
    return () => clearInterval(timer); // 언마운트 시 정리
  }, []);

  const dateStr = now.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeStr = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <TopRight>
      <DayText>{dateStr}</DayText>
      <TimeText>{timeStr}</TimeText>
    </TopRight>
  );
};

const TopRight = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  text-align: right;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  font-weight: 700;
`;

const DayText = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: #dddddd;
  margin: 0;
  text-transform: capitalize;
`;

const TimeText = styled.p`
  font-size: 0.85rem;
  color: #dddddd;
  margin: 0;
`;

export default TimeBox;
