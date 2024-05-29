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

interface FilterProps {
  filterState: any;
}
export const Filter1: React.FC<FilterProps> = ({ filterState }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getjenisStatusList } = useGetJenisStatusListQuery({});
  const { data: getWomenCategory } = useGetWomencategoryQuery({});

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div>
          <Select
            placeholder="Kewilayahan"
            options={regionOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, wilayah: e ? e.value : "All" });
            }}
            value={
              filter.wilayah
                ? regionOptions?.find((f) => f.value === filter.wilayah)
                : filter.wilayah
            }
          />
        </div>
        <div>
          <Select
            placeholder="Jenis Status T"
            options={standardOptions(
              getjenisStatusList?.data || [],
              "jenisStatusName",
              "jenisStatusId"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                status_type_daerah: e?.value ?? "t1",
              });
            }}
            value={
              filter.status_type_daerah
                ? standardOptions(
                    getjenisStatusList?.data || [],
                    "jenisStatusName",
                    "jenisStatusId"
                  )?.find((f) => f.value === filter.status_type_daerah)
                : filter.status_type_daerah
            }
            // isDisabled={!filter.bulan}
          />
        </div>
        <div>
          <Select
            placeholder="Status Kehamilan"
            options={standardOptions(
              getWomenCategory?.data || [],
              "womenCategoryName",
              "womenCategoryId"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                women_category_daerah: e?.value ?? "All",
              });
            }}
            value={
              filter.women_category_daerah
                ? standardOptions(
                    getWomenCategory?.data || [],
                    "womenCategoryName",
                    "womenCategoryId"
                  )?.find((f) => f.value === filter.women_category_daerah)
                : filter.women_category_daerah
            }
            // isDisabled={!filter.bulan}
          />
        </div>
      </div>
      {/* <div className="flex gap-4">
        <div>
          <Button text="Unduh" variant="outlined" />
        </div>
        <div>
          <Button text="Laporkan" variant="outlined" />
        </div>
      </div> */}
    </div>
  );
};
export const Filter2: React.FC<FilterProps> = ({ filterState }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getjenisStatusList } = useGetJenisStatusListQuery({});
  const { data: getWomenCategory } = useGetWomencategoryQuery({});

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div>
          <Select
            placeholder="Jenis Tren"
            options={trendTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tren_type: e?.value ?? "kumulatif" });
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
            placeholder="Jenis Status T"
            options={standardOptions(
              getjenisStatusList?.data || [],
              "jenisStatusName",
              "jenisStatusId"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                status_type_kumulatif: e?.value ?? "t1",
              });
            }}
            value={
              filter.status_type_kumulatif
                ? standardOptions(
                    getjenisStatusList?.data || [],
                    "jenisStatusName",
                    "jenisStatusId"
                  )?.find((f) => f.value === filter.status_type_kumulatif)
                : filter.status_type_kumulatif
            }
            // isDisabled={!filter.bulan}
          />
        </div>
        <div>
          <Select
            placeholder="Status Kehamilan"
            options={standardOptions(
              getWomenCategory?.data || [],
              "womenCategoryName",
              "womenCategoryId"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                women_category_kumulatif: e?.value ?? "All",
              });
            }}
            value={
              filter.women_category_kumulatif
                ? standardOptions(
                    getWomenCategory?.data || [],
                    "womenCategoryName",
                    "womenCategoryId"
                  )?.find((f) => f.value === filter.women_category_kumulatif)
                : filter.women_category_kumulatif
            }
            // isDisabled={!filter.bulan}
          />
        </div>
      </div>
      {/* <div className="flex gap-4">
        <div>
          <Button text="Unduh" variant="outlined" />
        </div>
        <div>
          <Button text="Laporkan" variant="outlined" />
        </div>
      </div> */}
    </div>
  );
};
export const Filter3: React.FC<FilterProps> = ({ filterState }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getWomenCategory } = useGetWomencategoryQuery({});

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}></div>
      <div className="flex gap-4">
        {/* <div>
          <Button text="Unduh" variant="outlined" />
        </div>
        <div>
          <Button text="Laporkan" variant="outlined" />
        </div> */}
        <div>
          <Select
            placeholder="Status Kehamilan"
            options={standardOptions(
              getWomenCategory?.data || [],
              "womenCategoryName",
              "womenCategoryId"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                women_category_status_T: e?.value ?? "All",
              });
            }}
            value={
              filter.women_category_status_T
                ? standardOptions(
                    getWomenCategory?.data || [],
                    "womenCategoryName",
                    "womenCategoryId"
                  )?.find((f) => f.value === filter.women_category_status_T)
                : filter.women_category_status_T
            }
            // isDisabled={!filter.bulan}
          />
        </div>
      </div>
    </div>
  );
};
export const Filter4: React.FC<FilterProps> = ({ filterState }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getWomenCategory } = useGetWomencategoryQuery({});

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}></div>
      <div className="flex gap-4">
        {/* <div>
          <Button text="Unduh" variant="outlined" />
        </div>
        <div>
          <Button text="Laporkan" variant="outlined" />
        </div> */}
        <div>
          <Select
            placeholder="Status Kehamilan"
            options={standardOptions(
              getWomenCategory?.data || [],
              "womenCategoryName",
              "womenCategoryId"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                women_category_status_T_Pregnant: e?.value ?? "All",
              });
            }}
            value={
              filter.women_category_status_T_Pregnant
                ? standardOptions(
                    getWomenCategory?.data || [],
                    "womenCategoryName",
                    "womenCategoryId"
                  )?.find(
                    (f) => f.value === filter.women_category_status_T_Pregnant
                  )
                : filter.women_category_status_T_Pregnant
            }
            // isDisabled={!filter.bulan}
          />
        </div>
      </div>
    </div>
  );
};
