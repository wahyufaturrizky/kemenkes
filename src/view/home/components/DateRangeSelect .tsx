import React, { useState } from "react";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const DateRangeSelect = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectMode, setSelectMode] = useState<"start" | "end">("start");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date: Date | null) => {
    if (selectMode === "start") {
      setStartDate(date);
      setSelectMode("end");
    } else {
      setEndDate(date);
      setShowDatePicker(false); // Close DatePicker after selecting end date
    }
  };

  const handleSelectClick = () => {
    setShowDatePicker(true); // Show DatePicker when Select is clicked
    setSelectMode("start"); // Reset to start date selection when opened
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: "8px",
      padding: "8px",
      fontSize: "16px",
      cursor: "pointer",
    }),
    menu: (provided: any) => ({
      ...provided,
      display: "none", // Disable default dropdown menu
    }),
  };

  return (
    <div style={{ position: "relative" }}>
      <Select
        onMenuOpen={handleSelectClick}
        styles={customStyles}
        components={{
          DropdownIndicator: () => (
            <FaCalendarAlt style={{ marginRight: "8px" }} />
          ),
          Menu: () => null, // Disable default dropdown menu
        }}
        value={{
          value: "custom-date-range",
          label: `${
            startDate ? startDate.toLocaleDateString() : "Pilih Tanggal Mulai"
          } - ${
            endDate ? endDate.toLocaleDateString() : "Pilih Tanggal Selesai"
          }`,
        }}
        isSearchable={false}
        options={[]}
        placeholder="Select date range"
        isClearable={false}
        menuIsOpen={false}
      />
      {showDatePicker && (
        <div style={{ position: "absolute", zIndex: 2, marginTop: "8px" }}>
          <DatePicker
            selected={selectMode === "start" ? startDate : endDate}
            onChange={handleDateChange}
            selectsStart={selectMode === "start"}
            selectsEnd={selectMode === "end"}
            startDate={startDate}
            endDate={endDate}
            inline
          />
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            {selectMode === "start"
              ? "Pilih Tanggal Mulai"
              : "Pilih Tanggal Selesai"}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelect;
