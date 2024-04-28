import axios, { AxiosError } from "axios";

const API_URL = "https://ideal-telegram-r44gwv97pjjq2wxqv-3000.app.github.dev/api";

export const getWeatherData = async (city: string): Promise<{currentWeather: WeatherData; dailyWeather: WeatherDailyData}> => {
  return new Promise<{currentWeather: WeatherData, dailyWeather: WeatherDailyData}>((resolve, reject) => {
    axios
      .get(`${API_URL}/weather/${city}`)
      .then((currentRes) => {
        axios.get(`${API_URL}/weather/${city}/forecast`)
        .then((dailyRes) => {
          resolve({
            currentWeather: {
              city: currentRes.data.city,
              temperature: currentRes.data.temperature,
              humidity: currentRes.data.humidity,
              wind: currentRes.data.wind,
              rain: currentRes.data.rain,
            },
            dailyWeather: {
              dayOne: dailyRes.data.dayOne,
              dayTwo: dailyRes.data.dayTwo,
              dayThree: dailyRes.data.dayThree,
            }
          });
        })

        .catch((error) => handleAxiosError(error, reject));
      })
      .catch((error) => handleAxiosError(error, reject));
  });
};

function handleAxiosError(error: any, reject: (reason?: any) => void) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      reject("City not found");
    } else {
      reject(new Error(axiosError.message));
    }
  } else {
    reject(new Error("An unknown error occurred"));
  }
}

export const getCarData = async (manufacturer: string): Promise<CarsData> => {
  return new Promise<CarsData>((resolve, reject) => {
    axios
      .get(`${API_URL}/car/${manufacturer}`)
      .then((res) => {
        resolve({
          manufacturer: res.data.manufacturer,
          model: res.data.model,
          year: res.data.year,
          color: res.data.color,
          fuelType: res.data.fuelType,
          mileage: res.data.mileage,
          price: res.data.price,
          dateAdded: res.data.dateAdded
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("Car not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          reject("An unknown error occurred");
        }
      });
  });
};
