import { timeDifference } from "../utils/timeDifference";
import { Flight } from "./Flight";

const RoundFlight: React.FC<Flight[]> = (flight) => {
  return (
    <div className="w-full bg-white px-4 py-6 my-6 rounded-md shadow-xl grid grid-cols-3 items-center">
      <div className="w-full flex flex-col gap-8 justify-between  col-span-2 ">
        {[0, 1].map((index) => (
          <div key={index} className="w-full flex justify-between items-center">
            <img
              src={`/${flight[index]?.airline?.split(" ")[0]}.png`}
              alt="thy-logo"
              className=" w-24 bg-cover"
            />
            <div className="flex items-center gap-3">
              <div>
                <p className="text-2xl">{flight[index].departureTime}</p>
                <p className=" text-right">
                  {flight[index].departureAirportCode}{" "}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">
                  {timeDifference(flight[index]).timeDiffText}
                </p>
                <div className=" w-16 h-[2px] bg-gray-400"></div>
              </div>
              <div>
                <p className="text-2xl">{flight[index].arrivalTime}</p>
                <p>{flight[index].arrivalAirportCode}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-right text-lg">
        {flight[0].price + flight[1].price} $
      </p>
    </div>
  );
};

export default RoundFlight;
