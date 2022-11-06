import Link from "next/link";
import { MdSort } from "react-icons/md";
import { FaUserCircle, FaRegUser } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import _ from "lodash";

import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";

import { doesPageCenterItems } from "utils/centerItemsOnPage";

import type { DropdownMenuItem } from "@/types/admin/dropdownMenuItem";

const profileDropdownBtnContainerStyle =
  "flex items-center gap-x-4 text-sm largeMobile:text-base";
const profileDropdownTextStyle = "whitespace-nowrap";

const profileDowndownMenuContent: DropdownMenuItem[] = [
  {
    type: "link",
    href: "/admin/accounts/admin",
    content: (
      <span className={`${profileDropdownBtnContainerStyle}`}>
        <FaRegUser />
        <span className={`${profileDropdownTextStyle}`}>My account</span>
      </span>
    ),
    onClick: () => {
      _.noop();
    },
  },
  {
    type: "button",
    href: "",
    content: (
      <span className={`${profileDropdownBtnContainerStyle}`}>
        <FiLogOut />
        <span className={`${profileDropdownTextStyle}`}>Log out</span>
      </span>
    ),
    onClick: () => {
      _.noop();
    },
  },
];

const ProfileButton = () => {
  return (
    <DropdownMenu
      menuBtnChildren={
        <FaUserCircle className="text-3xl text-primary tablet:text-4xl" />
      }
      content={profileDowndownMenuContent}
    />
  );
};

const CartButton = () => {
  return (
    <Link href="/cart" className="relative" id="nav-shopping-cart">
      <span>
        <BsHandbag className="text-xl text-primary" />
      </span>

      <span className="absolute right-[-40%] top-[-30%] flex h-[1.2rem] w-[1.2rem] flex-row items-center justify-center rounded-full bg-primary text-xxs font-medium text-white">
        50
      </span>
    </Link>
  );
};

export interface NavbarProps {
  changeSidebarState: (state: boolean) => void;
  pathname: string;
}

const Navbar = (props: NavbarProps) => {
  const { changeSidebarState, pathname } = props;
  const isAdminPage = pathname.includes("admin");
  const doesPageOnlyShowLogo = doesPageCenterItems(pathname);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-10 flex flex-row items-center justify-between gap-x-2 border-b border-b-background-100 bg-white px-6 py-4 tablet:pr-10 ${
        doesPageOnlyShowLogo
          ? "tablet:pl-10"
          : "tablet:pl-36 desktop:pl-[22rem] desktop:pr-14"
      }`}
      aria-label="primary navigation"
      id="top-navbar"
    >
      {!doesPageOnlyShowLogo && (
        <button
          className="tablet:hidden"
          onClick={() => changeSidebarState(true)}
          id="nav-hamburger-btn"
        >
          <MdSort className="text-2xl text-primary" />
        </button>
      )}

      <div>
        <Link
          href="/admin"
          className={`text-lg font-semibold text-primary tablet:text-2xl ${
            doesPageOnlyShowLogo ? "" : "desktop:hidden"
          }`}
        >
          little hotpot
        </Link>
        {!doesPageOnlyShowLogo && isAdminPage && (
          <span className="hidden text-base text-gray-900 tablet:block desktop:text-black-900">
            Welcome back, admin name
          </span>
        )}
      </div>

      {isAdminPage && !doesPageOnlyShowLogo && <ProfileButton />}

      {!isAdminPage && <CartButton />}
    </nav>
  );
};

export default Navbar;
