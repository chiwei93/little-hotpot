import Link from "next/link";
import { BiChevronRightCircle } from "react-icons/bi";

type Breadcrumb = {
  title: string;
  href: string;
};

export interface Props {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs = (props: Props) => {
  const { breadcrumbs } = props;

  return (
    <ul className="flex flex-row flex-wrap items-center gap-2">
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <li key={breadcrumb.title} className="flex flex-row">
            <Link href={breadcrumb.href} className="text-sm capitalize">
              {breadcrumb.title}
            </Link>
            {index !== breadcrumbs.length - 1 && (
              <BiChevronRightCircle className="ml-2" />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
