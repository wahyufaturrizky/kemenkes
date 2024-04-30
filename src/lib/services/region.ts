import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ["region"] });

export const regionApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProvince: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/master-sarana/provinsi`,
        params: options,
      }),
      providesTags: ["region"],
    }),
    getRegency: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/master-sarana/kabupaten-kota`,
        params: options,
      }),
      providesTags: ["region"],
    }),
    getSubDistrict: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/master-sarana/kecamatan`,
        params: options,
      }),
      providesTags: ["region"],
    }),
    getFacilityOfType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/master-sarana/jenis-sarana`,
        params: options,
      }),
      providesTags: ["region"],
    }),
    getMedicalFacility: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/master-sarana/faskes`,
        params: options,
      }),
      providesTags: ["region"],
    }),
  }),
});

export const {
  useGetProvinceQuery,
  useGetRegencyQuery,
  useGetSubDistrictQuery,
  useGetFacilityOfTypeQuery,
  useGetMedicalFacilityQuery
} = regionApi;
