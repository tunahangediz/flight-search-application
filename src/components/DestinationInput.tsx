import { Controller } from "react-hook-form";
import Select from "react-select";
import { Airport } from "../App";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { useEffect } from "react";

type InputProps = {
  control: any;
  name: string;
  label?: string;
  required: boolean;
  setValue: any;
  show: boolean;
  setShow: (value: boolean) => void;
  airports: Airport[];
  error: any;
};

const DestinationInput: React.FC<InputProps> = ({
  control,
  name,
  label,
  airports,
  setValue,
  error,
}) => {
  const { from, to } = useParams();

  useEffect(() => {
    if (from) setValue("from", { value: from, label: from });
    if (to) setValue("to", { value: to, label: to });
  }, []);

  return (
    <>
      <div
        className={classNames(
          "flex flex-col justify-center items-start ring-1 rounded-sm p-1 w-max",
          { "ring-red-500": error }
        )}
      >
        <label className="flex-col bg-white left-4 ">
          <p className={classNames("pl-3", { "text-red-500": error })}>
            {" "}
            {label}{" "}
          </p>
          <Controller
            name={name}
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    display: "flex",
                    alignItems: "start",
                    padding: "0",
                    width: "200px",
                    backgroundColor: "white",
                    margin: "0",
                  }),
                }}
                value={field.value}
                options={airports.map((airport: { code: any; city: any }) => ({
                  value: airport.code,
                  label: airport.city + " (" + airport.code + ")",
                }))}
                placeholder="City or airport"
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
        </label>
      </div>
    </>
  );
};

export default DestinationInput;
