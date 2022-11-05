export type DropdownMenuItem = {
  type: "button" | "link";
  href: string;
  content: string | React.ReactNode;
  onClick: () => void;
};