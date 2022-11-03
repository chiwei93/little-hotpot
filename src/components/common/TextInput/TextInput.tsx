import { useState } from "react";

import styles from "./TextInput.module.css";

export interface Props {
  id: string;
  initialValue?: string;
  onChange?: (name: string, value: string) => void;
  name?: string;
  labelText?: string;
  inputType?: string;
  errorText?: string;
  hasError?: boolean;
  required?: boolean;
}

const TextInput = (props: Props) => {
  const {
    id,
    initialValue = "",
    onChange = (name: string, value: string) => {},
    name = undefined,
    labelText = "Label Text",
    inputType = "text",
    errorText = "There is something wrong with the input",
    hasError = false,
    required = true,
  } = props;

  const inputName = name ? name : id;
  const [value, setValue] = useState(initialValue);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.name, e.target.value);
  };

  return (
    <div
      className={`font-inherit width-full cursor-pointer`}
      id={`${id}-textInput`}
    >
      <div
        className={`group flex flex-col-reverse rounded-lg border border-gray-100 px-4 py-2 transition hover:border-primary ${styles.inputContainer}`}
      >
        <input
          type={inputType}
          id={id}
          className={`font-inherit peer cursor-pointer outline-0 ${
            inputType === "password" ? "tracking-widest" : "tracking-normal"
          } ${styles.autoComplete}`}
          name={inputName}
          value={value}
          onChange={onInputChange}
          required={required}
        />

        <label
          htmlFor={id}
          className={`mb-1 cursor-pointer text-[0.9em] font-medium capitalize text-gray-900 transition group-hover:text-primary peer-focus:text-primary`}
        >
          {labelText}
        </label>
      </div>

      {hasError && (
        <span className="mt-2 block text-[0.9em] text-red">{errorText}</span>
      )}
    </div>
  );
};

export default TextInput;
