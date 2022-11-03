export interface Props {
  children?: React.ReactNode;
}

const FlexAutoBox = (props: Props) => {
  const { children } = props;

  return <div className="w-full flex-auto">{children}</div>;
};

export default FlexAutoBox;
