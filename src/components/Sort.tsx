import { useState } from "react";
import { timeDifference } from "../utils/timeDifference";

type SortProps = {
  setFlights: (value: any) => void;
  flights: Array<any>;
};

const Sort: React.FC<SortProps> = ({ setFlights, flights }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const sortByBestPrice = () => {
    const sortedFlights = flights.sort((a: any, b: any) => a.price - b.price);
    setFlights([...sortedFlights]);

    setSelectedOption("Best price");
  };

  const sortByFastest = () => {
    const sortedFlights = flights.sort((a: any, b: any) => {
      const aTimeDiff =
        timeDifference(a).hours * 60 + timeDifference(a).minutes;
      const bTimeDiff =
        timeDifference(b).hours * 60 + timeDifference(b).minutes;
      return aTimeDiff - bTimeDiff;
    });
    setFlights([...sortedFlights]);
    setSelectedOption("The fastest");
  };

  const sortByDepartureTime = () => {
    const sortedFlights = flights.sort((a: any, b: any) => {
      const aTime = a.departureTime.split(":");
      const bTime = b.departureTime.split(":");
      return Number(aTime[0]) - Number(bTime[0]);
    });
    setFlights([...sortedFlights]);
    setSelectedOption("Departure time");
  };

  // const sortByReturnTime = () => {
  //   const sortedFlights = flights.sort((a: any, b: any) => {
  //     const aTime = a.arrivalTime.split(":");
  //     const bTime = b.arrivalTime.split(":");
  //     return Number(aTime[0]) - Number(bTime[0]);
  //   });
  //   setFlights([...sortedFlights]);
  //   setSelectedOption("Return time");
  // };

  const sortingOptions = [
    { title: "Best price", func: sortByBestPrice },
    { title: "The fastest", func: sortByFastest },
    { title: "Departure time", func: sortByDepartureTime },
  ];

  return (
    <div className="flex w-full pt-4 gap-2">
      {sortingOptions.map((option, index) => (
        <div
          key={index}
          onClick={option.func}
          className={`cursor-pointer p-4 rounded-md shadow ${
            selectedOption === option.title
              ? "bg-blue-950 text-white"
              : "bg-white text-black"
          } `}
        >
          {option.title}
        </div>
      ))}
    </div>
  );
};

export default Sort;
