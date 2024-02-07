import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
// import Datepicker from "tailwind-datepicker-react";
import { useNavigate, useParams } from "react-router-dom";
import DestinationInput from "./DestinationInput";
import "react-datepicker/dist/react-datepicker.css";
import FlightDatePicker from "./FlightDatePicker";

type FormInput = {
  from: { value: string; label: string };
  to: { value: string; label: string };
  departureDate: Date;
  returnDate: Date | null;
};

export type Airport = {
  code: string;
  city: string;
};

const SearchForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();
  const [airports, setAirports] = useState<Airport[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [isOneWayTrip, setIsOneWayTrip] = useState<boolean>(true);
  const navigate = useNavigate();
  const { departureDate, returnDate } = useParams();

  useEffect(() => {
    fetch("http://localhost:3000/airports")
      .then((response) => response.json())
      .then((data) => setAirports(data));

    if (departureDate?.length ?? 0 > 0) {
      setValue("departureDate", new Date(departureDate));
    }
    if (returnDate?.length ?? 0 > 0) {
      setValue("returnDate", new Date(returnDate));
      setIsOneWayTrip(false);
    }
  }, []);

  const onSubmit = (data: FormInput) => {
    const { from, to, departureDate, returnDate } = data;
    const depatureCode = from.value;
    const destinationCode = to.value;

    if (returnDate && !isOneWayTrip) {
      navigate(
        "/flights/" +
          `${depatureCode}/${destinationCode}/${departureDate.toISOString()}/${returnDate.toISOString()}`
      );
      return;
    }

    navigate(
      "/flights/" +
        `${depatureCode}/${destinationCode}/${departureDate.toISOString()}`
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <DevTool control={control} />
      <label className="text-green-500 flex items-center mb-2 gap-1">
        <input
          type="checkbox"
          checked={isOneWayTrip}
          onChange={() => setIsOneWayTrip(!isOneWayTrip)}
        />
        One way trip
      </label>
      <div className="flex justify-between gap-4">
        <div className="flex md:flex-row  flex-col gap-4">
          <DestinationInput
            control={control}
            name="from"
            label={errors.from ? "This field is requierd" : "From"}
            required
            setValue={setValue}
            show={show}
            setShow={setShow}
            airports={airports}
            error={errors.from}
          />

          <DestinationInput
            control={control}
            name="to"
            label={errors.to ? "This field is requierd" : "Where"}
            required
            setValue={setValue}
            show={show}
            setShow={setShow}
            airports={airports}
            error={errors.to}
          />

          <div className="flex gap-4">
            <FlightDatePicker
              control={control}
              name="departureDate"
              placeholder="Departure"
              error={errors.departureDate}
            />

            {!isOneWayTrip && (
              <FlightDatePicker
                control={control}
                name="returnDate"
                placeholder="Return"
                error={errors.returnDate}
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="text-white font-bold bg-blue-600 px-4 rounded-sm"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
