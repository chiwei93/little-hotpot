import { Fragment } from "react";
import Link from "next/link";
import { Transition, Menu } from "@headlessui/react";
import { MdSort } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";

import { doesPageCenterItems } from "utils/centerItemsOnPage";

const ProfileButton = () => {
  return (
    <>
      <Menu as="div">
        <Menu.Button>
          <FaUserCircle className="text-3xl text-primary tablet:text-4xl" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Menu.Items>
            <div className="absolute top-full right-0 z-30 mt-3">
              <span>placeholder</span>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
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
        doesPageOnlyShowLogo ? "tablet:pl-10" : "tablet:pl-36 desktop:pl-80"
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
