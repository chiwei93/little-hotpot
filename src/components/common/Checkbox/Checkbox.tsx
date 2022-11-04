import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { Transition } from "@headlessui/react";

import styles from "./Checkbox.module.css";

export interface Props {
  id: string;
  initialValue?: boolean;
  name?: string;
  labelText?: string;
  onChange: (inputName: string, value: boolean) => void;
}

const Checkbox = (props: Props) => {
  const {
    id,
    initialValue = false,
    name = undefined,
    labelText = "Label Text",
    onChange,
  } = props;

  const [showChecked, setShowChecked] = useState(initialValue);
  const checkboxName = name ? name : id;

  useEffect(() => {
    setShowChecked(initialValue);
  }, [initialValue]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowChecked((prevValue) => {
      onChange(e.target.name, !prevValue);
      return !prevValue;
    });
  };

  return (
    <label
      className={`group flex cursor-pointer flex-row items-center gap-x-2 text-[0.8em] text-gray-900 transition hover:text-primary ${styles.label}`}
      htmlFor={id}
      id={`${id}-label`}
    >
      <input
        type="checkbox"
        name={checkboxName}
        id={id}
        className="peer absolute z-[-100] h-[0.1px] w-[0.1px] border opacity-0"
        onChange={onChangeInput}
        checked={showChecked}
      />

      <div
        className={`flex h-4 w-4 cursor-pointer flex-row items-center justify-center rounded border border-gray-100 transition group-hover:border-primary peer-focus:border-primary`}
      >
        <Transition
          show={showChecked}
          enter="transition-opacity duration-100 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-100 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <BiCheck
            className="text-[1.5em] text-primary"
            id={`${id}-checkIcon`}
          />
        </Transition>
      </div>

      {labelText}
    </label>
  );
};

export default Checkbox;
