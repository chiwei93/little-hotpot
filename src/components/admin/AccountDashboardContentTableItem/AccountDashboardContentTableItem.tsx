import { useState, useEffect } from "react";
import Link from "next/link";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { FiInfo, FiTrash2 } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";

import type { DeviceType } from "@/types/common/deviceType";
import type { DropdownMenuItem } from "@/types/admin/dropdownMenuItem";

import ToggleSwitch from "@/components/common/ToggleSwitch/ToggleSwitch";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";

import { TypesOfDevice } from "@/types/common/deviceType";
import {
  DESKTOP_BREAKPOINT,
  LARGE_DESKTOP_BREAKPOINT,
  LARGE_MOBILE_BREAKPOINT,
  MEDIUM_MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/constants/common/breakpoints";

const defaultGridStyle =
  "mediumMobile:grid mediumMobile:grid-cols-[1fr_4fr_1fr] mediumMobile:items-center gap-x-2 tablet:gap-x-4 largeDesktop:grid-cols-[1fr_5fr_2fr]";
const defaultInfoGridStyle =
  "tablet:grid tablet:grid-cols-2 tablet:gap-x-4 largeDesktop:grid-cols-[1fr_2fr_1fr_1fr] items-center";
const dropdownBtnIconStyle =
  "text-[1.5em] text-gray-900 mt-1 mediumMobile:mt-0 tablet:text-2xl";

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

interface TableItemProps {
  onToggleAccountStatusClick: () => void;
  dropdownMenuContent: DropdownMenuItem[];
  onDeleteAccountClick: () => void;
  gridStyle?: string;
  infoGridStyle?: string;
}

export default function AccountDashboardContentTableItem(
  props: TableItemProps
) {
  const {
    onToggleAccountStatusClick,
    dropdownMenuContent,
    onDeleteAccountClick,
    gridStyle = defaultGridStyle,
    infoGridStyle = defaultInfoGridStyle,
  } = props;

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
    onToggleAccountStatusClick();
  };

  const onDeleteBtnClick = () => {
    onDeleteAccountClick();
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
}
