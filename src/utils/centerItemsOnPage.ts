import _ from "lodash";

const centerItemsPages = ["/admin", "/admin/forgot-password"];

export const doesPageCenterItems = (pathname: string) => {
  return (
    _.includes(centerItemsPages, pathname) ||
    pathname.includes("/admin/reset-password")
  );
};
