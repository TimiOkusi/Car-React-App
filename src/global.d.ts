interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
}


interface WeatherDailyData {
  dayOne: number;
  dayTwo: number;
  dayThree: number;
}

interface CarsData{
  manufacturer: string;  // The manufacturer of the car
  model: string;         // The model of the car
  year: number;          // The year the car was manufactured
  color: string;         // The color of the car
  fuelType: string;      // The type of fuel the car uses (e.g., gasoline, diesel, electric)
  mileage: number;       // The mileage of the car
  price: number;         // The price of the car
  dateAdded: number;       // The date when the car was added to the inventory
}
