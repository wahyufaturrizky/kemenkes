import { Select } from "@/components";
import React from "react";

const FilterSection = () => {
  return (
    <div className="w-full">
      <h2 className="text-[18px] text-[#525252]">Filter</h2>
      <div className="mt-4 grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <Select placeholder="1 Januari 2023 - 31 Desember 2023" />
        </div>
        <div className="col-span-2">
          <Select placeholder="Provinsi" />
        </div>
        <div className="col-span-2">
          <Select placeholder="Kab/Kota" />
        </div>
        <div className="col-span-2">
          <Select placeholder="Kecamatan" />
        </div>
        <div className="col-span-2">
          <Select placeholder="Kelurahan" />
        </div>
        <div className="col-span-3">
          <Select placeholder="Puskesmas" />
        </div>
        <div className="col-span-3">
          <Select placeholder="Posyadu" />
        </div>
        <div className="col-span-3">
          <Select placeholder="Indikator Program" />
        </div>
        <div className="col-span-3">
          <Select placeholder="Persentase Ibu Hamil K1" />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
