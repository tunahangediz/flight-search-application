import { useState, useEffect } from "react";
import { dateFormatter } from "../utils/dateFormatter";

const useFlightSearch = (
  from: string | undefined,
  to: string | undefined,
  departureDate: string | undefined,
  returnDate: string | undefined,
  setFlights: (flights: any) => void
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const getFlights = () => {
    console.log(departureDate);
    if (!from || !to) {
      console.error("Please select valid departure and arrival locations.");
      return;
    }

    if (!departureDate) {
      console.error("Please select a valid departure date.");
      return;
    }

    fetch(
      `http://localhost:3000/flights?departureAirportCode=${from}&arrivalAirportCode=${to}&departureDate=${dateFormatter(
        departureDate
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("One-way flights:", data);
        if (returnDate) {
          fetch(
            `http://localhost:3000/flights?departureAirportCode=${to}&arrivalAirportCode=${from}&departureDate=${dateFormatter(
              returnDate
            )}`
          )
            .then((response) => response.json())
            .then((returnData) => {
              console.log("Return flights:", returnData);

              const roundTripFlights: any = [...data, ...returnData];
              // const roundTrips = findRoundTrips(roundTripFlights);
              // setFlights(roundTrips);
              if (returnData.length === 0) {
                console.error("No round trip flights found.");
                setIsLoading(false);
                setFlights([]);
                return;
              }
              setFlights(roundTripFlights);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching return flights:", error);
              setIsLoading(false);
              setError(error);
            });
        } else {
          setFlights(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching one-way flights:", error);
        setIsLoading(false);
        setError(error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      getFlights();
    };

    fetchData();
  }, [from, to, departureDate, returnDate]);

  return { isLoading, error };
};

export default useFlightSearch;
