import { doesPageCenterItems } from "utils/centerItemsOnPage";

export interface Props {
  pathname: string;
  centerItems?: boolean;
  children?: React.ReactNode;
}

const PageContainer = (props: Props) => {
  const { children, centerItems = false, pathname } = props;

  const getCenterItemsState = () => {
    if (doesPageCenterItems(pathname)) {
      return true;
    }
    return centerItems;
  };

  return (
    <div
      className={`min-h-screen w-screen overflow-x-hidden px-6 pt-28 pb-10 tablet:pt-32 tablet:pr-10 ${
        getCenterItemsState()
          ? "tablet:pl-10"
          : "tablet:pl-36 desktop:pl-[22rem] desktop:pr-14"
      } ${
        getCenterItemsState()
          ? "flex flex-col items-center pt-[8rem] largeMobile:pt-[10rem] tablet:pt-[13rem] desktop:pt-[15rem]"
          : "flex flex-col"
      }`}
      id="generic-page-container"
    >
      {children}
    </div>
  );
};

export default PageContainer;
