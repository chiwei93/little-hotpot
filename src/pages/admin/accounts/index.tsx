import type { NextPage } from "next";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaSort } from "react-icons/fa";
import { FiInfo, FiTrash2 } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import _ from "lodash";

import type { DropdownMenuItem } from "@/types/admin/dropdownMenuItem";

import FlexAutoBox from "@/layouts/common/FlexAutoBox/FlexAutoBox";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Button from "@/components/common/Button/Button";
import Searchbar from "@/components/common/Searchbar/Searchbar";
import AccountDashboardContentTableItem from "@/components/admin/AccountDashboardContentTableItem/AccountDashboardContentTableItem";
import Table from "@/components/admin/Table/Table";

const breadcrumbs = [
  { title: "dashboard", href: "/admin/dashboard" },
  { title: "accounts", href: "/admin/accounts" },
];

const gridStyle =
  "mediumMobile:grid mediumMobile:grid-cols-[1fr_4fr_1fr] mediumMobile:items-center gap-x-2 tablet:gap-x-4 largeDesktop:grid-cols-[1fr_5fr_2fr]";
const infoGridStyle =
  "tablet:grid tablet:grid-cols-2 tablet:gap-x-4 largeDesktop:grid-cols-[1fr_2fr_1fr_1fr] items-center";
const dropdownBtnContainerStyle = "flex items-center gap-x-4";
const dropdownMenuTextStyle = "mt-[3px]";
const tableHeaderBtnStyles = "flex items-center gap-x-2 uppercase";
const sortIconStyles = "text-sm mb-[3px]";

const dropdownMenuContent: DropdownMenuItem[] = [
  {
    type: "link",
    href: "/admin/accounts",
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
    href: "/admin/accounts",
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

interface SortingButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const SortingButton = (props: SortingButtonProps) => {
  const { children, onClick } = props;

  return (
    <button className={tableHeaderBtnStyles} onClick={onClick}>
      <span>{children}</span>
      <span>
        <FaSort className={sortIconStyles} />
      </span>
    </button>
  );
};

const AccountsDashboard: NextPage = () => {
  const onCreateAccountClick = () => {
    _.noop();
  };

  const onToggleAccountStatusClick = () => {
    _.noop();
  };

  const onDeleteAccountClick = () => {
    _.noop();
  };

  const sortContent = () => {
    _.noop();
  };

  const renderTableHeader = () => {
    return (
      <div
        className={`${gridStyle} text-xs font-semibold uppercase text-gray-900 tablet:px-8 tablet:py-3`}
      >
        <div className="relative">
          <SortingButton onClick={sortContent}>status</SortingButton>
        </div>

        <div className={infoGridStyle}>
          <div className="relative">
            <SortingButton onClick={sortContent}>name</SortingButton>
          </div>

          <div className="relative">
            <SortingButton onClick={sortContent}>email</SortingButton>
          </div>

          <div className="relative hidden largeDesktop:block">
            <SortingButton onClick={sortContent}>role</SortingButton>
          </div>

          <div className="relative hidden largeDesktop:block">
            <SortingButton onClick={sortContent}>updated at</SortingButton>
          </div>
        </div>

        <div className="tablet:justify-self-end">actions</div>
      </div>
    );
  };

  const renderTableContent = () => {
    return (
      <li>
        <AccountDashboardContentTableItem
          dropdownMenuContent={dropdownMenuContent}
          onToggleAccountStatusClick={onToggleAccountStatusClick}
          onDeleteAccountClick={onDeleteAccountClick}
        />
      </li>
    );
  };

  return (
    <FlexAutoBox>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="mt-6 border-b-[1px] border-background-200 pb-6 tablet:grid tablet:grid-cols-[0.7fr_0.3fr] tablet:items-center tablet:gap-x-4">
        <div>
          <h1 className="mb-2 text-2xl font-bold desktop:text-3xl">
            Accounts dashboard
          </h1>
          <p className="text-sm text-gray-900 desktop:text-base">
            Create and manage admin and employee accounts
          </p>
        </div>

        <div className="mt-4 text-sm tablet:justify-self-end desktop:text-base">
          <Button buttonType="button" onClick={onCreateAccountClick}>
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

export default AccountsDashboard;
