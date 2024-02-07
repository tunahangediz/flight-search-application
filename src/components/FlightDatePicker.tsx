import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";

type InputProps = {
  control: any;
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  error: any;
};
const FlightDatePicker: React.FC<InputProps> = ({
  control,
  name,
  placeholder,
  error,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "select a date" }}
      render={({ field }) => (
        <div
          className={classNames(
            "justify-center items-center ring-1 w-max p-1 rounded",
            { "ring-red-500": error }
          )}
        >
          <DatePicker
            selected={field.value}
            onChange={(date: any) => field.onChange(date)}
            dateFormat="yyyy-MM-dd"
            className={classNames(
              "bg-white text-center w-32 placeholder-gray-500 outline-none h-[62px]",
              { "placeholder-red-500 ": error }
            )}
            placeholderText={error ? error.message : placeholder}
          />
        </div>
      )}
    />
  );
};

export default FlightDatePicker;
