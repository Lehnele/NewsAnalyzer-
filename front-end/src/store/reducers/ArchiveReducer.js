import { createReducer } from "@reduxjs/toolkit";
import {getSearchHistorySuccess} from "../actions/actions";

const initialState = {
  searchHistory: []
}

export default createReducer(initialState, {
  [getSearchHistorySuccess]: (state, action) => {
    state.searchHistory = action.payload
  }
})