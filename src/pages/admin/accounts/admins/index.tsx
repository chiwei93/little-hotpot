import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsThreeDotsVertical, BsThreeDots } from "react-icons/bs";
import { FiInfo, FiTrash2 } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import _ from "lodash";

import FlexAutoBox from "@/layouts/common/FlexAutoBox/FlexAutoBox";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Button from "@/components/common/Button/Button";
import Searchbar from "@/components/common/Searchbar/Searchbar";
import Table from "@/components/admin/Table/Table";
import ToggleSwitch from "@/components/common/ToggleSwitch/ToggleSwitch";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";

import {
  DESKTOP_BREAKPOINT,
  LARGE_DESKTOP_BREAKPOINT,
  LARGE_MOBILE_BREAKPOINT,
  MEDIUM_MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/constants/common/breakpoints";
import { TypesOfDevice } from "@/types/common/deviceType";

import type { DeviceType } from "@/types/common/deviceType";
import type { DropdownMenuItem } from "@/types/admin/dropdownMenuItem";

const breadcrumbs = [
  { title: "dashboard", href: "/admin/dashboard" },
  { title: "admins", href: "/admin/accounts/admins" },
];

const gridStyle =
  "mediumMobile:grid mediumMobile:grid-cols-[1fr_4fr_1fr] mediumMobile:items-center gap-x-2 tablet:gap-x-4 largeDesktop:grid-cols-[1fr_5fr_2fr]";
const infoGridStyle =
  "tablet:grid tablet:grid-cols-2 tablet:gap-x-4 largeDesktop:grid-cols-[1fr_2fr_1fr_1fr] items-center";
const dropdownBtnIconStyle =
  "text-[1.5em] text-gray-900 mt-1 mediumMobile:mt-0 tablet:text-2xl";
const dropdownBtnContainerStyle = "flex items-center gap-x-4";
const dropdownMenuTextStyle = "mt-[3px]";

const dropdownMenuContent: DropdownMenuItem[] = [
  {
    type: "link",
    href: "/admin/accounts/admin",
    content: (
      <span className={`${dropdownBtnContainerStyle}`}>
        <FiInfo />
        <span className={`${dropdownMenuTextStyle}`}>Information</span>
      </span>
    ),
    onClick: () => {
      _.noop();
    },
  },
  {
    type: "link",
    href: "/admin/accounts/admin",
    content: (
      <span className={`${dropdownBtnContainerStyle}`}>
        <MdOutlineEdit />
        <span className={`${dropdownMenuTextStyle}`}>Edit</span>
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
      <span className={`${dropdownBtnContainerStyle}`}>
        <FiTrash2 />
        <span className={`${dropdownMenuTextStyle}`}>Delete</span>
      </span>
    ),
    onClick: () => {
      _.noop();
    },
  },
];

interface InfoItemProps {
  topLabelText: string;
  infoText: string;
}

const InfoItem = (props: InfoItemProps) => {
  const { topLabelText, infoText } = props;

  return (
    <div className="font-inherit flex flex-col">
      <span
        className={`mb-[0.1rem] text-[0.6em] text-gray-900 tablet:mb-2 largeDesktop:hidden`}
      >
        {topLabelText}
      </span>

      <span>{infoText}</span>
    </div>
  );
};

const AdminAccountTableItem = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>(
    TypesOfDevice.desktop
  );

  useEffect(() => {
    const handleWindowResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < MEDIUM_MOBILE_BREAKPOINT) {
        setDeviceType(TypesOfDevice.smallMobile);
      } else if (
        windowWidth >= MEDIUM_MOBILE_BREAKPOINT &&
        windowWidth < LARGE_MOBILE_BREAKPOINT
      ) {
        setDeviceType(TypesOfDevice.mediumMobile);
      } else if (
        windowWidth >= LARGE_MOBILE_BREAKPOINT &&
        windowWidth < TABLET_BREAKPOINT
      ) {
        setDeviceType(TypesOfDevice.largeMobile);
      } else if (
        windowWidth >= TABLET_BREAKPOINT &&
        windowWidth < DESKTOP_BREAKPOINT
      ) {
        setDeviceType(TypesOfDevice.tablet);
      } else if (
        windowWidth >= DESKTOP_BREAKPOINT &&
        windowWidth < LARGE_DESKTOP_BREAKPOINT
      ) {
        setDeviceType(TypesOfDevice.desktop);
      } else {
        setDeviceType(TypesOfDevice.largeDesktop);
      }
    };

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const renderDropdownMenuIcon = () => {
    if (
      deviceType === TypesOfDevice.smallMobile ||
      deviceType === TypesOfDevice.tablet
    ) {
      return <BsThreeDots className={`${dropdownBtnIconStyle}`} />;
    }

    if (
      deviceType === TypesOfDevice.mediumMobile ||
      deviceType === TypesOfDevice.largeMobile
    ) {
      return <BsThreeDotsVertical className={`${dropdownBtnIconStyle}`} />;
    }

    return <BsThreeDots className={`${dropdownBtnIconStyle}`} />;
  };

  const onToggleSwitchClick = () => {
    _.noop();
  };

  const onDeleteBtnClick = () => {
    _.noop();
  };

  return (
    <div
      className={`rounded-md bg-white p-6 shadow-sm ${gridStyle} mediumMobile:p-4 largeMobile:p-6 tablet:rounded-none tablet:border-b tablet:border-b-background-200 tablet:bg-transparent tablet:p-8 tablet:shadow-none`}
    >
      <div className="hidden mediumMobile:block mediumMobile:justify-self-start">
        <ToggleSwitch onClick={onToggleSwitchClick} />
      </div>

      <div
        className={`text-base mediumMobile:justify-self-center mediumMobile:text-sm largeMobile:text-base ${infoGridStyle} tablet:justify-self-stretch`}
      >
        <div className="mb-2 largeMobile:mb-4 tablet:mb-0">
          <InfoItem topLabelText="Super admin" infoText="little hotpot" />
        </div>

        <div>
          <InfoItem
            topLabelText="20 March 2022"
            infoText="littlehotpot@email.com"
          />
        </div>

        <div className="hidden largeDesktop:block">Super admin</div>

        <div className="hidden largeDesktop:block">20 March 2022</div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-x-2 mediumMobile:mt-1 mediumMobile:justify-self-end">
        <div className="largeDesktop:hidden">
          <DropdownMenu
            menuBtnChildren={renderDropdownMenuIcon()}
            overlayMenuPositionStyle="left-0 mediumMobile:right-0 mediumMobile:left-auto"
            content={dropdownMenuContent}
          />
        </div>

        <div className="mediumMobile:hidden">
          <ToggleSwitch onClick={onToggleSwitchClick} />
        </div>

        <div className="largeDesktop:mb- hidden largeDesktop:block largeDesktop:flex largeDesktop:items-center largeDesktop:gap-x-10">
          <div>
            <Link href="/admin/accounts/admins">
              <FiInfo className="text-xl text-black-200" />
            </Link>
          </div>

          <div>
            <Link href="/admin/accounts/admins">
              <MdOutlineEdit className="text-xl text-green" />
            </Link>
          </div>

          <div>
            <button className="mt-2" onClick={onDeleteBtnClick}>
              <FiTrash2 className="text-xl text-red" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminsAccountsDashboard: NextPage = () => {
  const onCreateAdminClick = () => {
    console.log("create admin");
  };

  const renderTableHeader = () => {
    return (
      <>
        <div
          className={`${gridStyle} text-xs font-semibold uppercase text-gray-900 tablet:px-8 tablet:py-3`}
        >
          <div>status</div>
          <div className={`${infoGridStyle}`}>
            <div>name</div>
            <div>email</div>
            <div className="hidden largeDesktop:block">role</div>
            <div className="hidden largeDesktop:block">created</div>
          </div>
          <div className="tablet:justify-self-end">actions</div>
        </div>
      </>
    );
  };

  const renderTableContent = () => {
    return (
      <li>
        <AdminAccountTableItem />
      </li>
    );
  };

  return (
    <FlexAutoBox>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="mt-6 border-b-[1px] border-background-200 pb-6 tablet:grid tablet:grid-cols-[0.7fr_0.3fr] tablet:items-center tablet:gap-x-4">
        <div>
          <h1 className="mb-2 text-2xl font-bold desktop:text-3xl">
            Admins dashboard
          </h1>
          <p className="text-sm text-gray-900 desktop:text-base">
            Create and manage admin accounts
          </p>
        </div>

        <div className="mt-4 text-sm tablet:justify-self-end desktop:text-base">
          <Button buttonType="button" onClick={onCreateAdminClick}>
            <IoPersonAddSharp className="text-[0.95em]" />
            <span className="mt-[3.5px] desktop:mt-[2px]">Create</span>
          </Button>
        </div>
      </div>

      <div className="mt-6 text-sm min-[500px]:flex min-[500px]:justify-end">
        <div className="min-[500px]:w-[60%] tablet:w-[50%] desktop:w-[23rem]">
          <Searchbar />
        </div>
      </div>

      <div className="mt-6 text-sm">
        <Table header={renderTableHeader()} content={renderTableContent()} />
      </div>
    </FlexAutoBox>
  );
};

export default AdminsAccountsDashboard;
