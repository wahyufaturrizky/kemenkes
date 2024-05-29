import { useState } from "react";
import { Button, Select } from "@/components";
import {
  ageTypeOptions,
  genderOptions,
  regionOptions,
  trendTypeOptions,
  vaccineTypeOptions,
} from "@/utils/constants";
import { openSans } from "@/assets/fonts";
import { standardOptions } from "@/helpers";

import {
  useGetJenisStatusListQuery,
  useGetWomencategoryQuery,
} from "@/lib/services/filter-wus";
import { useGetListVaccineQuery } from "@/lib/services/bias";

interface FilterProps {
  filterState: any;
}
export const Filter1: React.FC<FilterProps> = ({ filterState }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getjenisStatusList } = useGetJenisStatusListQuery({});
  const { data: getjenisVaksin } = useGetListVaccineQuery({});
  const { data: getWomenCategory } = useGetWomencategoryQuery({});

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div>
          <Select
            placeholder="Jenis Vaksin"
            options={standardOptions(
              getjenisVaksin?.data || [],
              "vaccine_name",
              "vaccine_id"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                tipe_vaksin: e?.value ?? "bias",
              });
            }}
            value={
              filter.tipe_vaksin
                ? standardOptions(
                    getjenisVaksin?.data || [],
                    "vaccine_name",
                    "vaccine_id"
                  )?.find((f) => f.value === filter.tipe_vaksin)
                : filter.tipe_vaksin
            }
            // isDisabled={!filter.bulan}
          />
        </div>
        <div>
          <Select
            placeholder="Kewilayahan"
            options={regionOptions}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                wilayah: e ? e.value.toUpperCase() : "PROVINSI",
              });
            }}
            value={
              filter.wilayah
                ? regionOptions?.find((f) => f.value === filter.wilayah)
                : filter.wilayah
            }
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          <Button text="Unduh" variant="outlined" />
        </div>
        {/* <div>
          <Button text="Laporkan" variant="outlined" />
        </div> */}
      </div>
    </div>
  );
};
export const Filter2: React.FC<FilterProps> = ({ filterState }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getjenisVaksin } = useGetListVaccineQuery({});

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
        <div>
          <Select
            options={trendTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tren_type: e ? e.value : "kumulatif" });
            }}
            value={
              filter.tren_type
                ? trendTypeOptions?.find((f) => f.value === filter.tren_type)
                : filter.tren_type
            }
          />
        </div>
        <div>
          <Select
            placeholder="Jenis Vaksin"
            options={standardOptions(
              getjenisVaksin?.data || [],
              "vaccine_name",
              "vaccine_id"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                tipe_vaksin2: e?.value ?? "bias",
              });
            }}
            value={
              filter.tipe_vaksin2
                ? standardOptions(
                    getjenisVaksin?.data || [],
                    "vaccine_name",
                    "vaccine_id"
                  )?.find((f) => f.value === filter.tipe_vaksin2)
                : filter.tipe_vaksin2
            }
            // isDisabled={!filter.bulan}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          <Button text="Unduh" variant="outlined" />
        </div>
        {/* <div>
          <Button text="Laporkan" variant="outlined" />
        </div> */}
      </div>
    </div>
  );
};
