import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";
import { BsCheck } from "react-icons/bs";

interface Props {
  options: string[];
  optionPaddingHorizontalStyles?: string;
}

export default function SelectListbox(props: Props) {
  const { options, optionPaddingHorizontalStyles = "pl-10 pr-4" } = props;
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const onOptionChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="font-inherit relative w-full">
      <Listbox value={selectedValue} onChange={onOptionChange}>
        <Listbox.Button className="flex w-full items-center justify-between gap-x-2 rounded border-[1px] border-background-200 bg-white py-1 px-2">
          <span>{selectedValue}</span>
          <span>
            <HiChevronUpDown
              className="text-lg text-gray-900"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={`absolute top-[120%] left-0 z-10 w-full rounded bg-white p-1 shadow-md`}
          >
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                value={option}
                className={({ active }) =>
                  `relative cursor-pointer rounded py-2 ${optionPaddingHorizontalStyles} transition ${
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
                          className={`absolute inset-y-0 left-[6px] z-[15] flex items-center transition ${
                            active ? "text-gray-900" : "text-primary"
                          }`}
                        >
                          <BsCheck className="text-xl" aria-hidden={true} />
                        </span>
                      ) : null}
                    </>
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
