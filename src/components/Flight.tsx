import { timeDifference } from "../utils/timeDifference";

export type Flight = {
  id: number;
  airline: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  price: number;
};

const Flight: React.FC<Flight> = (flight) => {
  return (
    <div
      key={flight.id}
      className="bg-white px-4 py-6 my-6 rounded-md shadow-xl flex justify-between items-center"
    >
      <img
        src={`/${flight.airline?.split(" ")[0]}.png`}
        alt="thy-logo"
        className=" w-24 bg-cover"
      />
      <div className="flex items-center gap-3">
        <div>
          <p className="text-2xl">{flight.departureTime}</p>
          <p className=" text-right">{flight.departureAirportCode} </p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">
            {timeDifference(flight).timeDiffText}{" "}
          </p>
          <div className=" w-16 h-[2px] bg-gray-400"></div>
        </div>
        <div>
          <p className="text-2xl">{flight.arrivalTime}</p>
          <p>{flight.arrivalAirportCode}</p>
        </div>
      </div>
      <p className="w-24 text-right text-lg">{flight.price} $</p>
    </div>
  );
};

export default Flight;
