import type { NextPage } from "next";
import { FiInfo, FiTrash2 } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import _ from "lodash";

import type { DropdownMenuItem } from "@/types/admin/dropdownMenuItem";
import AccountDashboardHeader from "@/components/admin/AccountDashboardHeader/AccountDashboardHeader";

import FlexAutoBox from "@/layouts/common/FlexAutoBox/FlexAutoBox";
import Table from "@/components/admin/Table/Table";
import AccountDashboardContentTableItem from "@/components/admin/AccountDashboardContentTableItem/AccountDashboardContentTableItem";

const breadcrumbs = [
  { title: "dashboard", href: "/admin/dashboard" },
  { title: "admins", href: "/admin/accounts/admins" },
];

const gridStyle =
  "mediumMobile:grid mediumMobile:grid-cols-[1fr_4fr_1fr] mediumMobile:items-center gap-x-2 tablet:gap-x-4 largeDesktop:grid-cols-[1fr_5fr_2fr]";
const infoGridStyle =
  "tablet:grid tablet:grid-cols-2 tablet:gap-x-4 largeDesktop:grid-cols-[1fr_2fr_1fr_1fr] items-center";
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

const AdminsAccountsDashboard: NextPage = () => {
  const onCreateAdminClick = () => {
    console.log("create admin");
  };

  const onToggleAccountStatusClick = () => {
    _.noop();
  };

  const onDeleteAccountClick = () => {
    _.noop();
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
        <AccountDashboardContentTableItem
          dropdownMenuContent={dropdownMenuContent}
          onToggleAccountStatusClick={onToggleAccountStatusClick}
          onDeleteAccountClick={onDeleteAccountClick}
          gridStyle={gridStyle}
          infoGridStyle={infoGridStyle}
        />
      </li>
    );
  };

  return (
    <FlexAutoBox>
      <AccountDashboardHeader
        breadcrumbs={breadcrumbs}
        onCreateAccountClick={onCreateAdminClick}
        heading="Admins dashboard"
        description="Create and manage admin accounts"
      />

      <div className="mt-6 text-sm">
        <Table header={renderTableHeader()} content={renderTableContent()} />
      </div>
    </FlexAutoBox>
  );
};

export default AdminsAccountsDashboard;
