import Button from "react-bootstrap/Button";

const WeatherButton = ({ cities, handleGetWeatherByCity }) => {
  return (
    <>
      {cities.map((city) => (
        <Button
          key={city.name}
          variant="primary"
          onClick={() => handleGetWeatherByCity(city.lat, city.lon)}
        >
          {city.name}
        </Button>
      ))}
    </>
  );
};

export default WeatherButton;
