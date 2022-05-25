import { createReducer } from "@reduxjs/toolkit";
import {
  fetchAnalyzeSettingsAnCStart,
  fetchAnalyzeSettingsAnCSuccess,
  fetchAnalyzeSettingsAnCError,
  fetchCategoriesListSuccess,
  fetchCategoriesListStart,
  insertHistorySettingsAnC
}
  from "../actions/actions";

const initialState = {
  loading: false,
  multipleLoading: true,
  chartSettings: {},
  options: []
}

export default createReducer(initialState, {
  [fetchCategoriesListStart]: state => {
    state.multipleLoading = true
  },
  [fetchCategoriesListSuccess]: (state, action) => {
    state.options = action.payload
    state.multipleLoading = false
  },
  [fetchAnalyzeSettingsAnCStart]: state => {
    state.loading = true
  },
  [fetchAnalyzeSettingsAnCSuccess]: (state, action) => {
    state.chartSettings = action.payload
    state.loading = false
  },
  [fetchAnalyzeSettingsAnCError]: state => {
    state.loading = false
  },
  [insertHistorySettingsAnC]: (state,action) => {
    state.chartSettings = action.payload.Response
  }
})