import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";
import { getWeatherData } from "../api/actions";
import { format, addDays } from 'date-fns';
import weatherIcon from "/workspaces/Car-React-App/src/assets/weatherIcon.png"

const WeatherCard: React.FC = () => {
  const [currentData, setCurrentData] = useState<WeatherData>();
  const [dailyData, setDailyData] = useState<WeatherDailyData>();
  const [loadingState, setLoadingState] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const today = new Date();
  const nextDay2 = format(addDays(today, 2), 'EEEE');
  const nextDay3 = format(addDays(today, 3), 'EEEE');

  const handleSearch = () => {
    console.log("Fetching Weather Data...");
    console.log(city);
    setLoadingState(true);
    getWeatherData(city)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setCurrentData(res.currentWeather);
          setDailyData(res.dailyWeather)
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setCurrentData(undefined);
        setDailyData(undefined);
        setError(error);
      });
  };

  return (
    <Card className="min-w-[300px] max-w-[700px] items-center px-6">
      <CardHeader className="flex flex-col items-center">
      <img
        src={weatherIcon}
        className="w-12 my-2 text-primary transform scale-x-[-1]"
        style={{ transformOrigin: 'center' }}
      />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="cityname"
              type="text"
              label="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {currentData ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{currentData.city}</h1>
            {currentData.temperature > 20 ? (
              <div>
                <TiWeatherSunny className="w-36 h-36" />
              </div>
            ) : (
              <div>
                <TiWeatherDownpour className="w-36 h-36" />
              </div>
            )}
            <p className="text-3xl font-bold">{currentData.temperature}°C</p>
            <p className="text-lg">Humidity: {currentData.humidity}%</p>
            <p className="text-lg">Wind: {currentData.wind} km/h</p>
            <p className="text-lg">Rain: {currentData.rain} %</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a city</p>
          </div>
        </CardBody>
      )}

{dailyData && (
        <CardBody>
          <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">Daily Forecast</h2>
            <p className="text-lg">Tomorrow: {dailyData.dayOne}°C</p>
            <p className="text-lg">{nextDay2}: {dailyData.dayTwo}°C</p>
            <p className="text-lg">{nextDay3}: {dailyData.dayThree}°C</p>
          </div>
        </CardBody>
      )}

      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {(currentData || dailyData) && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!(currentData || dailyData) && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;
