import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { HiChevronRight } from "react-icons/hi";
import cls from "classnames";
import _ from "lodash";

import {
  DESKTOP_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "../../../constants/common/breakpoints";
import { doesPageCenterItems } from "utils/centerItemsOnPage";

import styles from "./Sidebar.module.css";

type pageLink = {
  href: string;
  name: string;
};

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  links: pageLink[];
  changeSidebarState: (state: boolean) => void;
  mouseOutOfSidebar: boolean;
}

const SidebarItem = (props: SidebarItemProps) => {
  const { icon, title, links, changeSidebarState, mouseOutOfSidebar } = props;
  const closeFn = useRef(() => _.noop());

  const onLinkClick = () => {
    if (window.innerWidth < TABLET_BREAKPOINT) {
      changeSidebarState(false);
    }

    if (
      window.innerWidth >= TABLET_BREAKPOINT &&
      window.innerWidth < DESKTOP_BREAKPOINT
    ) {
      closeFn.current();
    }
  };

  useEffect(() => {
    closeFn.current();
  }, [mouseOutOfSidebar]);

  return (
    <Disclosure>
      {({ open, close }) => {
        closeFn.current = () => {
          if (
            window.innerWidth >= TABLET_BREAKPOINT &&
            window.innerWidth < DESKTOP_BREAKPOINT &&
            open
          ) {
            close();
          }
        };

        return (
          <>
            <Disclosure.Button
              className={`flex w-full flex-row items-center gap-x-2 transition hover:text-primary ${
                open ? "text-primary" : "text-gray-900"
              }`}
            >
              <span className="mr-4 text-2xl tablet:mr-6 tablet:text-3xl desktop:mr-4">
                {icon}
              </span>
              <span className="whitespace-nowrap text-sm font-semibold capitalize tablet:text-base">
                {title}
              </span>
              <span className="ml-auto">
                <HiChevronRight
                  className={`text-lg tablet:text-xl ${
                    open ? styles.chevronActive : styles.chevron
                  }`}
                />
              </span>
            </Disclosure.Button>

            <Transition
              show={open}
              enter="transition duration-120 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition duration-120 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Disclosure.Panel className="text-gray-900" static>
                <ul
                  className="mt-3 pl-[3.3rem] font-medium tablet:pl-16 desktop:pl-14"
                  id={`sidebar-disclosure-${title}`}
                >
                  {links.map((link, index) => (
                    <li
                      key={`${link.name}-${index}`}
                      className="mb-2 last:mb-0"
                    >
                      <Link
                        href={link.href}
                        className="text-sm capitalize transition hover:text-primary active:text-primary tablet:text-base"
                        onClick={onLinkClick}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Disclosure.Panel>
            </Transition>
          </>
        );
      }}
    </Disclosure>
  );
};

type SidebarItem = {
  icon: React.ReactNode;
  title: string;
  links: pageLink[];
  isAdmin: boolean;
};

export interface SidebarProps {
  changeSidebarState: (state: boolean) => void;
  isOpen: boolean;
  pathname: string;
  sidebarItems: SidebarItem[];
}

const Sidebar = (props: SidebarProps) => {
  const { changeSidebarState, isOpen, pathname, sidebarItems } = props;
  const isAdminPage = pathname.includes("admin");
  const doesPageOnlyShowLogo = doesPageCenterItems(pathname);
  const [canOverlayOpen, setCanOverlayOpen] = useState(false);
  const [mouseOutOfSidebar, setMouseOutofSidebar] = useState(false);

  useEffect(() => {
    const handleWindowSizeChanges = () => {
      if (window.innerWidth >= TABLET_BREAKPOINT) {
        setCanOverlayOpen(false);
      } else {
        setCanOverlayOpen(true);
      }
    };

    handleWindowSizeChanges();
    window.addEventListener("resize", handleWindowSizeChanges);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChanges);
    };
  }, []);

  useEffect(() => {
    if (mouseOutOfSidebar) {
      setMouseOutofSidebar(false);
    }
  }, [mouseOutOfSidebar]);

  const filteredSidebarLinksList = () => {
    return sidebarItems.filter(
      (sidebarItem) => sidebarItem.isAdmin === isAdminPage
    );
  };

  const createUniqueKeyId = (title: string, index: number) => {
    return `${isAdminPage ? "admin" : "user"}-${title}-${index}`;
  };

  return (
    <>
      <Transition
        show={isOpen && canOverlayOpen && !doesPageOnlyShowLogo}
        enter="transition duration-200 ease-out"
        enterFrom="z-30 relative opacity-0"
        enterTo="z-30 relative opacity-100"
        leave="transition duration-200 ease-in"
        leaveFrom="z-30 relative opacity-100"
        leaveTo="z-30 relative opacity-0"
      >
        <div
          className="fixed inset-0 z-20 min-h-screen w-full bg-black-900 opacity-60"
          onClick={() => changeSidebarState(false)}
          id="sidebar-overlay"
        >
          overlay
        </div>
      </Transition>

      <Transition
        show={isOpen && !doesPageOnlyShowLogo}
        enter="transition duration-200 ease-out"
        enterFrom="translate-x-[-100%] z-30 relative"
        enterTo="translate-x-0 z-30 relative"
        leave="transition duration-200 ease-in"
        leaveFrom="translate-x-0 z-30 relative"
        leaveTo="translate-x-[-100%] z-30 relative"
      >
        <nav
          className={`border-transparent fixed top-0 left-0 z-30 max-h-screen min-h-screen overflow-y-scroll border-r border-r-background-100 bg-white px-6 py-10 tablet:px-8 desktop:px-10 desktop:pt-6 ${cls(
            styles.sidebar,
            styles.noScrollbar
          )}`}
          aria-label="secondary navigation"
          onMouseLeave={() => {
            setMouseOutofSidebar(true);
          }}
          id="side-navbar"
        >
          <div className="mb-16 ml-1 tablet:hidden">
            <button
              className="flex flex-row items-center"
              onClick={() => changeSidebarState(false)}
            >
              <BsFillArrowLeftCircleFill className="text-primary" />
              <span className="ml-4 text-primary">Back</span>
            </button>
          </div>

          <div className="hidden desktop:block">
            <Link href="/" className="text-2xl font-semibold text-primary">
              little hotpot
            </Link>
          </div>

          <ul className="tablet:mt-24">
            {filteredSidebarLinksList().map((sidebarItem, index) => {
              return (
                <li
                  key={createUniqueKeyId(sidebarItem.title, index)}
                  className="mb-10 last:mb-0 last:mt-40 tablet:mb-14"
                >
                  <SidebarItem
                    icon={sidebarItem.icon}
                    title={sidebarItem.title}
                    links={sidebarItem.links}
                    changeSidebarState={changeSidebarState}
                    mouseOutOfSidebar={mouseOutOfSidebar}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      </Transition>
    </>
  );
};

export default Sidebar;
