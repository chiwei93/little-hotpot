import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { BsCheck } from "react-icons/bs";

export interface Props {
  placeholder?: string;
  optionPaddingHorizontalStyles?: string;
}

const options = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];

const Searchbar = (props: Props) => {
  const {
    placeholder = "Search",
    optionPaddingHorizontalStyles = "pl-12 pr-4",
  } = props;

  const [selectedOption, setSelectedOption] = useState(null);
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? []
      : options.filter((option) => {
          return option.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedOption} onChange={setSelectedOption}>
      <div className="relative">
        <Combobox.Input
          onChange={(event) => setQuery(event.target.value)}
          className="font-inherit w-full rounded border-[1px] border-background-200 bg-[transparent] px-3 py-2"
          placeholder={placeholder}
        />

        <Combobox.Options className="absolute top-[120%] left-0 z-10 w-full rounded bg-white p-1 shadow-md">
          {filteredOptions.map((option) => (
            <Combobox.Option
              key={option}
              value={option}
              className={({ active }) =>
                `relative cursor-pointer rounded py-3 ${optionPaddingHorizontalStyles} ${
                  active ? "bg-background-100 text-gray-900" : ""
                }`
              }
            >
              {({ selected, active }) => {
                return (
                  <>
                    <span
                      className={`block truncate text-[0.9em] capitalize ${
                        selected ? "font-semibold" : ""
                      } ${active ? "text-gray-900" : "text-primary"}`}
                    >
                      {option}
                    </span>

                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-3 z-[15] flex items-center transition ${
                          active ? "text-gray-900" : "text-primary"
                        }`}
                      >
                        <BsCheck className="text-xl" />
                      </span>
                    ) : null}
                  </>
                );
              }}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default Searchbar;
