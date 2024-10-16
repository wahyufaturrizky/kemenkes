import { Select, DatePicker } from "@/components";
import React, { useState } from "react";
import {
  useGetProvinceQuery,
  useGetRegencyQuery,
  useGetSubDistrictQuery,
  useGetFacilityOfTypeQuery,
  useGetMedicalFacilityQuery,
} from "@/lib/services/region";
import { standardOptions } from "@/helpers";
import { useGetListFaskesQuery } from "@/lib/services/public-immunization";
import DateRangeSelect from "@/view/home/components/DateRangeSelect ";

interface FilterProps {
  filterState?: any;
}

const FilterExaminationMonitoring: React.FC<FilterProps> = ({
  filterState,
}) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getProvince } = useGetProvinceQuery({});
  const { data: getRegency } = useGetRegencyQuery(
    { provinsi: filter.provinsi },
    {
      skip: !filter.provinsi,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: getSubDistrict } = useGetSubDistrictQuery(
    { provinsi: filter.provinsi, kabkota: filter.kabkota },
    {
      skip: !filter.provinsi && !filter.kabkota,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: getFacilityOfType } = useGetFacilityOfTypeQuery({});
  const { data: getMedicalFacility } = useGetMedicalFacilityQuery(
    {
      provinsi: filter.provinsi,
      kabkota: filter.kabkota,
      kecamatan: filter.kecamatan,
      jenis_sarana: filter.jenis_sarana,
    },
    {
      skip: !filter.provinsi && !filter.kabkota,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: getListFaskes } = useGetListFaskesQuery(
    {
      kewilayahan_type: filter.kewilayahan_type,
      year: filter.tahun,
      month: filter.bulan,
      faskes_parent_id: filter.kecamatan,
    },

    {
      skip: !filter.provinsi && !filter.kabkota && !filter.kecamatan,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <div className="w-full">
      <h2 className="text-[18px] text-[#525252]">Filter</h2>
      <div className="mt-4 grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <DateRangeSelect />
        </div>
        <div className="col-span-3">
          <Select
            placeholder="Pilih Provinsi"
            options={standardOptions(
              getProvince?.data || [],
              "provinsi_name",
              "provinsi"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                wilayah: "province",
                provinsi: e?.value,
                kabkota: "",
                kecamatan: "",
                jenis_sarana: "",
                faskes: "",
              });
            }}
            value={
              filter.provinsi
                ? standardOptions(
                    getProvince?.data || [],
                    "provinsi_name",
                    "provinsi"
                  )?.find((f) => f.value === filter.provinsi)
                : filter.provinsi
            }
          />
        </div>
        <div className="col-span-3">
          <Select
            placeholder="Kab/Kota"
            options={standardOptions(
              getRegency?.data || [],
              "kabkota_name",
              "kabkota"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                wilayah: "city",
                kabkota: e?.value,
                kecamatan: "",
                jenis_sarana: "",
                faskes: "",
              });
            }}
            value={
              filter.kabkota
                ? standardOptions(
                    getRegency?.data || [],
                    "kabkota_name",
                    "kabkota"
                  )?.find((f) => f.value === filter.kabkota)
                : filter.kabkota
            }
            isDisabled={!filter.provinsi}
          />
        </div>
        <div className="col-span-2">
          <Select
            placeholder="Kecamatan"
            options={standardOptions(
              getSubDistrict?.data || [],
              "kecamatan_name",
              "kecamatan"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                wilayah: "district",
                kecamatan: e?.value,
                jenis_sarana: "",
                faskes: "",
              });
            }}
            value={
              filter.kecamatan
                ? standardOptions(
                    getSubDistrict?.data || [],
                    "kecamatan_name",
                    "kecamatan"
                  )?.find((f) => f.value === filter.kecamatan)
                : filter.kecamatan
            }
            isDisabled={!filter.kabkota}
          />
        </div>
        <div className="col-span-3">
          <Select
            placeholder="Pilih Jenis Faskes"
            options={standardOptions(
              getFacilityOfType?.data || [],
              "jenis_sarana_name",
              "jenis_sarana"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                jenis_sarana: e?.value,
                faskes: "",
              });
            }}
            value={
              filter.jenis_sarana
                ? standardOptions(
                    getFacilityOfType?.data || [],
                    "jenis_sarana_name",
                    "jenis_sarana"
                  )?.find((f) => f.value === filter.jenis_sarana)
                : filter.jenis_sarana
            }
            isDisabled={!filter.kecamatan}
          />
        </div>
        <div className="col-span-3">
          <Select
            placeholder="Pilih Faskes"
            options={standardOptions(
              getMedicalFacility?.data || [],
              "faskes_name",
              "faskes"
            )}
            onChange={(e: any) => {
              setFilter({ ...filter, wilayah: "faskes", faskes: e?.value });
            }}
            value={
              filter.faskes
                ? standardOptions(
                    getMedicalFacility?.data || [],
                    "faskes_name",
                    "faskes"
                  )?.find((f) => f.value === filter.faskes)
                : filter.faskes
            }
            isDisabled={!filter.jenis_sarana}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterExaminationMonitoring;
