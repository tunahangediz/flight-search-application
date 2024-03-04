import { useParams } from "react-router-dom";
import { dateFormatter } from "../utils/dateFormatter";
import { FaPlaneSlash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import { LuSearch } from "react-icons/lu";
import useFlightSearch from "../hooks/useFlightSearch";
import Sort from "../components/Sort";
import Flight from "../components/Flight";
import LoadingSkeleton from "../components/LoadingSkeleton";
import findRoundTrips from "../utils/findRoundTrips";
import RoundFlight from "../components/RoundFlight";

const Flights = () => {
  const [showSearchForm, setShowSearchForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { from, to, departureDate, returnDate } = useParams();
  const [flights, setFlights] = useState([]);
  const { isLoading, error } = useFlightSearch(
    from,
    to,
    departureDate,
    returnDate,
    setFlights
  );

  useEffect(() => {
    // delay added to show the loading skeleton
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  console.log(flights, "flights");

  return (
    <div className="w-full h-[100vh]">
      <div className="max-w-4xl flex flex-col w-full mx-auto p-2 lg:p-0">
        <div className="bg-blue-950 w-full rounded-md mt-24 px-4 py-4">
          <div
            onClick={() => setShowSearchForm(!showSearchForm)}
            className="flex justify-between items-center w-full  hover:cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <div className="bg-blue-600 p-2 rounded-md">
                <LuSearch className="text-white text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Flights from {from} - {to}
              </h1>
            </div>

            <p className="text-white">
              {returnDate
                ? dateFormatter(departureDate ?? "") +
                  " - " +
                  dateFormatter(returnDate ?? "")
                : dateFormatter(departureDate ?? "")}
            </p>
          </div>
          {showSearchForm && (
            <div className="mt-12">
              <SearchForm />
            </div>
          )}
        </div>
        <div className="w-full">
          <Sort flights={flights} setFlights={setFlights} />
          {loading && [0, 1, 3].map((el) => <LoadingSkeleton index={el} />)}
          {error && <p>There was an error</p>}
          {flights.length === 0 && !isLoading && !error && !loading && (
            <div className="w-full flex justify-center items-center gap-12 mt-8">
              <FaPlaneSlash className="text-9xl text-blue-950" />
              <p className="text-4xl text-blue-950">No flights found </p>
            </div>
          )}
          {!loading && !error && !isLoading && (
            <div>
              {findRoundTrips(flights).map((flight: any) => (
                <RoundFlight {...flight} />
              ))}
            </div>
          )}
          {!loading &&
            !isLoading &&
            !error &&
            flights.length > 0 &&
            !returnDate &&
            flights.map((flight: any, index: number) => <Flight {...flight} />)}
        </div>
      </div>
    </div>
  );
};

export default Flights;
