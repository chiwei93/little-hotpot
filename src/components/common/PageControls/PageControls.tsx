import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

interface Props {}

const buttonStyles = "transition";
const activeButtonStyles =
  "hover:bg-primary hover:text-white active:bg-primary active:text-white rounded font-medium p-2";
const nextAndPrevStyles = "flex items-center gap-x-[4px] justify-center";
const nextAndPrevIconStyles = "mb-[4px] text-[1.1em]";
const pageNumberStyles = "px-3";

export default function PageControls(props: Props) {
  const {} = props;

  return (
    <div className="font-inherit flex flex-wrap items-center justify-center gap-x-1 gap-y-2 largeMobile:gap-x-3">
      <button className={`${buttonStyles}`}>
        <FiChevronsLeft className={`${nextAndPrevIconStyles}`} />
      </button>

      <button className={`${nextAndPrevStyles} ${buttonStyles}`}>
        <FiChevronLeft className={`${nextAndPrevIconStyles}`} />
        <span>Prev</span>
      </button>

      <button
        className={`${buttonStyles} ${pageNumberStyles} ${activeButtonStyles}`}
      >
        1
      </button>

      <button
        className={`${buttonStyles} ${pageNumberStyles} ${activeButtonStyles}`}
      >
        2
      </button>

      <button
        className={`${buttonStyles} ${pageNumberStyles} ${activeButtonStyles}`}
      >
        3
      </button>

      <button className={`${nextAndPrevStyles} ${buttonStyles}`}>
        <span>Next</span>
        <FiChevronRight className={`${nextAndPrevIconStyles}`} />
      </button>

      <button className={`${buttonStyles}`}>
        <FiChevronsRight className={`${nextAndPrevIconStyles}`} />
      </button>
    </div>
  );
}
