import type { FormEvent } from "react";

import styles from "./Form.module.css";

export interface Props {
  bgColor?: string;
  children?: React.ReactNode;
  onSubmit?: () => void;
}

const Form = (props: Props) => {
  const { children, bgColor = "white", onSubmit = () => {} } = props;

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className={`bg-${bgColor} relative rounded-lg p-6 shadow-lg largeMobile:p-10 ${styles.form}`}
    >
      {children}
    </form>
  );
};

export default Form;
