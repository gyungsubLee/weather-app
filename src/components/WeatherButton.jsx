import Button from "react-bootstrap/Button";

const WeatherButton = ({ onClick, children }) => {
  return <Button variant="info">{children}</Button>;
};

export default WeatherButton;
