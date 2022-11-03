import type { NextPage } from "next";
import { IoPersonAddSharp } from "react-icons/io5";

import FlexAutoBox from "@/layouts/common/FlexAutoBox/FlexAutoBox";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Button from "@/components/common/Button/Button";
import Searchbar from "@/components/common/Searchbar/Searchbar";

const breadcrumbs = [
  { title: "dashboard", href: "/admin/dashboard" },
  { title: "admins", href: "/admin/accounts/admins" },
];

const AdminsAccountsDashboard: NextPage = () => {
  return (
    <FlexAutoBox>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="mt-6 border-b-[1px] border-background-200 pb-6 tablet:grid tablet:grid-cols-[0.7fr_0.3fr] tablet:gap-x-4 tablet:items-center">
        <div>
          <h1 className="font-bold text-2xl mb-2 desktop:text-3xl">
            Admins dashboard
          </h1>
          <p className="text-sm text-gray-900 desktop:text-base">
            Create and manage admin accounts
          </p>
        </div>

        <div className="mt-4 text-sm desktop:text-base tablet:justify-self-end">
          <Button buttonType="button">
            <IoPersonAddSharp className="text-[0.95em]" />
            <span className="mt-[3.5px] desktop:mt-[2px]">Create</span>
          </Button>
        </div>
      </div>

			<div className="mt-6 text-sm">
				<Searchbar />
			</div>
    </FlexAutoBox>
  );
};

export default AdminsAccountsDashboard;
