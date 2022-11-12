import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

import type { DropdownMenuItem } from "@/types/admin/dropdownMenuItem";

interface Props {
  menuBtnChildren: React.ReactNode;
  overlayMenuPositionStyle?: string;
  content: DropdownMenuItem[];
}

const menuItemStyles = "inline-block w-full p-2 rounded-md transition";
const activeMenuItemStyles = "bg-background-100 text-gray-900";

export default function DropdownMenu(props: Props) {
  const {
    menuBtnChildren,
    overlayMenuPositionStyle = "right-0",
    content,
  } = props;

  const renderMenuItems = () => {
    return content.map((menuItem, index) => {
      const itemId = `dropdownMenuItem-${index}`;

      if (menuItem.type === "link") {
        return (
          <Menu.Item key={itemId}>
            {({ active }) => (
              <Link
                href={menuItem.href}
                onClick={menuItem.onClick}
                className={`${menuItemStyles} ${
                  active ? activeMenuItemStyles : ""
                }`}
              >
                {menuItem.content}
              </Link>
            )}
          </Menu.Item>
        );
      }

      return (
        <Menu.Item key={itemId}>
          {({ active }) => (
            <button
              onClick={menuItem.onClick}
              className={`${menuItemStyles} ${
                active ? activeMenuItemStyles : ""
              }`}
            >
              {menuItem.content}
            </button>
          )}
        </Menu.Item>
      );
    });
  };

  return (
    <Menu as="div">
      <Menu.Button>{menuBtnChildren}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items>
          <div
            className={`absolute top-full right-0 z-30 mt-2 rounded-md bg-white shadow-md ${overlayMenuPositionStyle} font-inherit min-w-[8rem] p-1 tablet:min-w-[9rem] tablet:p-2`}
          >
            {renderMenuItems()}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
