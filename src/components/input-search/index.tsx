import React from "react";
import { FiSearch } from "react-icons/fi";

const InputSearch = () => {
  return (
    <div className="bg-white border w-[200px] h-[30px] border-[#D6D6D6] relative rounded-lg overflow-hidden">
      <input type="text" className="w-full h-full focus:outline-none px-2" />
      <span className="absolute right-3 top-1/2 -translate-y-1/2">
        <FiSearch />
      </span>
    </div>
  );
};

export default InputSearch;
