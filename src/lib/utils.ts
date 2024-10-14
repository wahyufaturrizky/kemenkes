import { RootState } from "@/lib/store";

// Define the selector function
export const memoizedSelector = (() => {
  let cachedResult: any; // Variable to store the cached result
  let cachedInputParams: any; // Variable to store the input parameters for comparison

  return (state: RootState) => {
    // Check if the input parameters are the same as the cached ones
    if (state === cachedInputParams) {
      return cachedResult; // If yes, return the cached result
    }

    // If input parameters are different, recalculate the result
    const {
      auth,
      baseApi,
      region,
      badutaImmunization,
      // babyImmunization,
      // wus
    } = state; // Destructure state to extract relevant parts
    const result = {
      auth,
      baseApi,
      region,
      badutaImmunization,
      // babyImmunization,
      // wus,
    };

    // Cache the input parameters and the result
    cachedInputParams = state;
    cachedResult = result;

    return result; // Return the result
  };
})();

export const formatNumber = (number: number) => {
  return number.toLocaleString();
};

export const formatPercentage = (number: number) => {
  return parseFloat(number.toFixed(2));
};

export const removeEmptyKeys = (filter: any) => {
  const obj = {
    year: filter.tahun,
    month: filter.bulan,
    province: filter.provinsi,
    city: filter.kabkota,
    sub_district: filter.kecamatan,
    faskes_type: filter.jenis_sarana,
    ward: filter.faskes,
  };

  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v !== ""));
};
