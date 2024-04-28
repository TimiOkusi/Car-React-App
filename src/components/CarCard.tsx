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
import bmwLogo from "/workspaces/Car-React-App/src/assets/bmwLogo.png";
import toyotaLogo from "/workspaces/Car-React-App/src/assets/toyotaLogo.png"; 
import lamborghiniLogo from "/workspaces/Car-React-App/src/assets/lamborghiniLogo.png";
import bugattiLogo from "/workspaces/Car-React-App/src/assets/bugattiLogo.png";
import { getCarData } from "../api/actions";
import carIcon from "/workspaces/Car-React-App/src/assets/carFront.png"

const CarCard: React.FC = () => {
  const [data, setData] = useState<CarsData>();
  const [loadingState, setLoadingState] = useState(false);
  const [manufacturer, setManufacturer] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Car Data...");
    console.log(manufacturer);
    setLoadingState(true);
    getCarData(manufacturer)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  const getLogo = (manufacturer: string) => {
    switch (manufacturer) {
      case "BMW":
        return bmwLogo;
      case "Toyota":
        return toyotaLogo;
      case "Lamborghini":
        return lamborghiniLogo;
      case "Bugatti":
        return bugattiLogo;
      default:
        return ""; // Default case if no logo is found
    }
  };

  return (
    <Card className="min-w-[300px] max-w-[700px] items-center px-6">
      <CardHeader className="flex flex-col items-center">
      <img
        src={carIcon}
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
              id="carname"
              type="text"
              label="Car Company"
              value={manufacturer}
              onChange={(e) => {
                setManufacturer(e.target.value);
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
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
          <img
              src={getLogo(data.manufacturer)} // Get logo based on manufacturer
              alt={`${data.manufacturer} logo`}
              className="w-40 h-40 mb-4"
            />
            <h1 className="text-3xl font-bold">{data.manufacturer} - {data.model}</h1>
            <p className="text-lg">Year: {data.year}</p>
            <p className="text-lg">Color: {data.color} </p>
            <p className="text-lg">Fuel Type: {data.fuelType}</p>
            <p className="text-lg">Mileage: {data.mileage} km/h</p>
            <p className="text-lg">Price: £{data.price}</p>
            <p className="text-lg">Date Added: {data.dateAdded}</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a car company</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
