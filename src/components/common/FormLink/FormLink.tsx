import Link from "next/link";

export interface Props {
  href: string;
  children?: React.ReactNode;
  fontSize?: string;
}

const FormLink = (props: Props) => {
  const { href, children, fontSize = "0.8em" } = props;

  return (
    <Link href={href} className={`text-primary text-[${fontSize}]`}>
      {children}
    </Link>
  );
};

export default FormLink;
