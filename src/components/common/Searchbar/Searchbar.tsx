import { useState } from "react";
import { Combobox } from "@headlessui/react";

export interface Props {
  placeholder?: string;
}

const options = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];

const Searchbar = (props: Props) => {
  const { placeholder = "Search" } = props;

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

        <Combobox.Options className="">
          {filteredOptions.map((option) => (
            <Combobox.Option key={option} value={option}>
              {option}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default Searchbar;
