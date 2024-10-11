import SelectedItem from "./SelectedItem";

interface BoxDropDownSelectedProps {}

const BoxDropDownSelected = ({}: BoxDropDownSelectedProps) => {
  return (
    <div className="rounded-[12px] flex flex-col gap-4 px-2 py-3 shadow-[0px_8px_8px_-4px_#10182808] shadow-[0px_20px_24px_-4px_#10182814]">
      {[1, 2, 3].map((data) => (
        <SelectedItem />
      ))}
    </div>
  );
};

export default BoxDropDownSelected;
