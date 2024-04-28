import "./App.css";
import NavBar from "./components/NavBar";
import CarCard from "./components/CarCard";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-auto flex-row gap-5 items-center align-middle justify-center  h-full w-full">
        <WeatherCard/>
        <CarCard />
      </div>
    </div>

  );
};

export default App;
