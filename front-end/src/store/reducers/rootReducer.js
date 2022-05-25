import { combineReducers } from '@reduxjs/toolkit';
import PopularWordsReducer from "./PopularWordsReducer";
import ActivityReducer from "./ActivityReducer";
import ActivityByCategoriesReducer from "./ActivityByCategoriesReducer";
import Archive from "./ArchiveReducer";

export default combineReducers({
  PopularWords: PopularWordsReducer,
  Activity: ActivityReducer,
  ActivityByCategories: ActivityByCategoriesReducer,
  Archive: Archive
})

