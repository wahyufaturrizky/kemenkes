"use client";

import { useState } from "react";
import { DatePicker, Select } from "@/components";
import {
  useGetFacilityOfTypeQuery,
  useGetMedicalFacilityQuery,
  useGetProvinceQuery,
  useGetRegencyQuery,
  useGetSubDistrictQuery,
} from "@/lib/services/region";
import {
  dataMonth,
  dataMonths,
  filterLocationOptions,
} from "@/utils/constants";
import {
  generateYearsArray,
  standardOptionSameLabel,
  standardOptions,
} from "@/helpers";
import { useGetListFaskesQuery } from "@/lib/services/public-immunization";
interface FilterProps {
  filterState?: any;
}

const FilterSummaryImmunization: React.FC<FilterProps> = ({ filterState }) => {
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
    <div className="flex flex-col gap-2">
      <div>Filter</div>
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <Select
            placeholder="Pilih Tahun"
            options={standardOptionSameLabel(
              generateYearsArray(1979, new Date().getFullYear())
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                tahun: e?.value,
              });
            }}
            value={
              filter.tahun
                ? standardOptionSameLabel(
                    generateYearsArray(1979, new Date().getFullYear())
                  )?.find((f) => f.value === filter.tahun)
                : filter.tahun
            }
          />
        </div>
        <div>
          <Select
            placeholder="Pilih Bulan"
            options={dataMonths}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                bulan: e?.value,
              });
            }}
            value={
              filter.bulan
                ? dataMonths?.find((f) => f.value === filter.bulan)
                : filter.bulan
            }
            isDisabled={!filter.tahun}
          />
        </div>
        <div>
          <Select
            placeholder="Pilih Provinsi"
            options={standardOptions(
              getProvince?.data || [],
              "provinsi_name",
              "provinsi"
            )}
            onChange={(e: any) => {
              if (e?.value) {
                setFilter({
                  ...filter,
                  wilayah: "province",
                  provinsi: e?.value,
                  kabkota: "",
                  kecamatan: "",
                  jenis_sarana: "",
                  faskes: "",
                });
              } else {
                setFilter({
                  ...filter,
                  wilayah: "All",
                  provinsi: "",
                  kabkota: "",
                  kecamatan: "",
                  jenis_sarana: "",
                  faskes: "",
                });
              }
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
            isDisabled={!filter.bulan}
          />
        </div>
        <div>
          <Select
            placeholder="Pilih Kabupaten/Kota"
            options={standardOptions(
              getRegency?.data || [],
              "kabkota_name",
              "kabkota"
            )}
            onChange={(e: any) => {
              if (e?.value) {
                setFilter({
                  ...filter,
                  wilayah: "city",
                  kabkota: e?.value,
                  kecamatan: "",
                  jenis_sarana: "",
                  faskes: "",
                });
              } else {
                setFilter({
                  ...filter,
                  wilayah: "province",
                  kabkota: "",
                  kecamatan: "",
                  jenis_sarana: "",
                  faskes: "",
                });
              }
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
        <div>
          <Select
            placeholder="Pilih Kecamatan"
            options={standardOptions(
              getSubDistrict?.data || [],
              "kecamatan_name",
              "kecamatan"
            )}
            onChange={(e: any) => {
              if (e?.value) {
                setFilter({
                  ...filter,
                  wilayah: "district",
                  kecamatan: e?.value,
                  jenis_sarana: "",
                  faskes: "",
                });
              } else {
                setFilter({
                  ...filter,
                  wilayah: "city",
                  kecamatan: "",
                  jenis_sarana: "",
                  faskes: "",
                });
              }
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
        {!filter.kewilayahan_type ? (
          <>
            <div>
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
            <div>
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
          </>
        ) : (
          <div>
            <Select
              placeholder="Desa/Kelurahan"
              options={standardOptions(
                getListFaskes?.data || [],
                "faskes_name",
                "faskes_id"
              )}
              onChange={(e: any) => {
                setFilter({
                  ...filter,
                  faskes: e?.value,
                });
              }}
              value={
                filter.faskes
                  ? standardOptions(
                      getListFaskes?.data || [],
                      "faskes_name",
                      "faskes_id"
                    )?.find((f) => f.value === filter.faskes)
                  : filter.faskes
              }
              isDisabled={!filter.kecamatan}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSummaryImmunization;
