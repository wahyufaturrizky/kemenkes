import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { regionApi } from "@/lib/services/region";

export interface RegionState {
  getProvince?: any;
  getRegency?: any;
  getSubDistrict?: any;
  getFacilityOfType?: any;
  getMedicalFacility?: any;
}

interface UpdateFieldPayload {
  fieldName: keyof RegionState;
  fieldValue: any;
}

const initialState: RegionState = {};

export const RegionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    handleChangeRegion: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName] = fieldValue;
    },
    resetStateRegion: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(regionApi.endpoints.getProvince.matchFulfilled, (state, { payload }) => {
        state.getProvince = payload
      })
      .addMatcher(regionApi.endpoints.getRegency.matchFulfilled, (state, { payload }) => {
        state.getRegency = payload
      })
      .addMatcher(regionApi.endpoints.getSubDistrict.matchFulfilled, (state, { payload }) => {
        state.getSubDistrict = payload
      })
      .addMatcher(regionApi.endpoints.getFacilityOfType.matchFulfilled, (state, { payload }) => {
        state.getFacilityOfType = payload
      })
      .addMatcher(regionApi.endpoints.getMedicalFacility.matchFulfilled, (state, { payload }) => {
        state.getMedicalFacility = payload
      })
  }
});

export const { handleChangeRegion, resetStateRegion } = RegionSlice.actions;

export default RegionSlice.reducer;
