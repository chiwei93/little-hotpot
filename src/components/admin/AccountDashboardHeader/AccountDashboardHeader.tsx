import { IoPersonAddSharp } from "react-icons/io5";

import type { Breadcrumb } from "@/types/admin/breadcrumb";

import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Button from "@/components/common/Button/Button";
import Searchbar from "@/components/common/Searchbar/Searchbar";

interface Props {
  breadcrumbs: Breadcrumb[];
  onCreateAccountClick: () => void;
  heading: string;
  description: string;
}

const AccountDashboardHeader = (props: Props) => {
  const { breadcrumbs, onCreateAccountClick, heading, description } = props;

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="mt-6 border-b-[1px] border-background-200 pb-6 tablet:grid tablet:grid-cols-[0.7fr_0.3fr] tablet:items-center tablet:gap-x-4">
        <div>
          <h1 className="mb-2 text-2xl font-bold desktop:text-3xl">
            {heading}
          </h1>
          <p className="text-sm text-gray-900 desktop:text-base">
            {description}
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
    </>
  );
};

export default AccountDashboardHeader;
