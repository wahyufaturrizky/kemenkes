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
    const { auth, baseApi, region,
      badutaImmunization,
      babyImmunization
    } = state; // Destructure state to extract relevant parts
    const result = {
      auth,
      baseApi,
      region,
      badutaImmunization,
      babyImmunization
    };

    // Cache the input parameters and the result
    cachedInputParams = state;
    cachedResult = result;

    return result; // Return the result
  };
})();