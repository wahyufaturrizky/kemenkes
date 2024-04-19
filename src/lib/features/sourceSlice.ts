import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sourceApi } from "@/lib/services/source";

export interface SourceState {
  create?: any;
  update?: any;
  delete?: any;
  get?: any;
  getById?: any;
  getPaged?: any;
}

interface UpdateFieldPayload {
  fieldName: keyof SourceState;
  fieldValue: any;
}

const initialState: SourceState = {};

export const SourceSlice = createSlice({
  name: "source",
  initialState,
  reducers: {
    handleChangeSource: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName] = fieldValue;
    },
    resetStateSource: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(sourceApi.endpoints.createSource.matchRejected, (state, { payload }) => {
        state.create = payload
      })
      .addMatcher(sourceApi.endpoints.updateSource.matchRejected, (state, { payload }) => {
        state.update = payload
      })
      .addMatcher(sourceApi.endpoints.deleteSource.matchRejected, (state, { payload }) => {
        state.delete = payload
      })
      .addMatcher(sourceApi.endpoints.getSources.matchFulfilled, (state, { payload }) => {
        state.get = payload
      })
      .addMatcher(sourceApi.endpoints.getSourcesById.matchFulfilled, (state, { payload }) => {
        state.getById = payload
      })
      .addMatcher(sourceApi.endpoints.getSourcesPaged.matchFulfilled, (state, { payload }) => {
        state.getPaged = payload
      })
  }
});

export const { handleChangeSource, resetStateSource } = SourceSlice.actions;

export default SourceSlice.reducer;
