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
interface FilterProps {
  filterState?: any;
}

const FilterSummaryImmunizationBayi: React.FC<FilterProps> = ({
  filterState,
}) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getProvince } = useGetProvinceQuery(
    {}
  );
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
              setFilter({
                ...filter,
                provinsi: e?.value,
                kabkota: "",
                kecamatan: "",
                jenis_sarana: "",
                faskes: "",
                wilayah1: e?.value ? "city" : "province",
                faskes_parent: e?.label ? e?.label?.toUpperCase() : "",
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
              setFilter({
                ...filter,
                kabkota: e?.value,
                kecamatan: "",
                jenis_sarana: "",
                faskes: "",
                wilayah1: e?.value ? "district" : "city",
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
        <div>
          <Select
            placeholder="Pilih Kecamatan"
            options={standardOptions(
              getSubDistrict?.data || [],
              "kecamatan_name",
              "kecamatan"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                kecamatan: e?.value,
                jenis_sarana: "",
                faskes: "",
                wilayah1: e?.value ? "faskes" : "district",
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
                  setFilter({ ...filter, faskes: e?.value });
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
            {/* <Select
              placeholder="Desa/Kelurahan"
              options={standardOptions(
                getVillage?.data || [],
                "faskesName",
                "faskesId"
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
                    getVillage?.data || [],
                    "faskesName",
                    "faskesId"
                  )?.find((f) => f.value === filter.faskes)
                  : filter.faskes
              }
              isDisabled={!filter.kecamatan}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSummaryImmunizationBayi;
