import PageControls from "@/components/common/PageControls/PageControls";

interface Props {
  header: React.ReactNode;
  content: React.ReactNode;
}

const Table = (props: Props) => {
  const { header, content } = props;

  return (
    <>
      <div className="hidden tablet:mb-3 tablet:block tablet:rounded-md tablet:bg-background-100">
        {header}
      </div>

      <ul className="list-none">{content}</ul>

      <div className="mt-6 flex justify-end text-xs largeMobile:text-sm">
        <PageControls />
      </div>
    </>
  );
};

export default Table;
