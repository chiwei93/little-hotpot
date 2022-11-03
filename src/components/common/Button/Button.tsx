export interface Props {
  buttonType?: "submit" | "button" | "reset" | undefined;
  designType?: "filled" | "outline";
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = (props: Props) => {
  const {
    buttonType = "submit",
    designType = "filled",
    children,
    onClick = () => {},
  } = props;

  const onClickBtn = () => {
    onClick();
  };

  return (
    <button
      type={buttonType}
      className={`font-inherit width-full flex flex-row items-center justify-center gap-2 rounded-lg border border-primary px-5 py-2 ${
        designType === "filled" ? "bg-primary text-white" : "text-primary"
      }`}
      onClick={onClickBtn}
    >
      {children}
    </button>
  );
};

export default Button;
