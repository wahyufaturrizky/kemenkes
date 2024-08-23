import React from "react";

interface DataItemProps {
  label: string;
  value: string;
}

const DataItem: React.FC<DataItemProps> = ({ label, value }) => {
  return (
    <div className="mb-3">
      <p className="text-xs font-medium">{label}</p>
      <div className="bg-white px-[10px] py-[12px] border border-[#D6D6D6] rounded-lg mt-1">
        <p className="text-base font-light">{value}</p>
      </div>
    </div>
  );
};

export default DataItem;
