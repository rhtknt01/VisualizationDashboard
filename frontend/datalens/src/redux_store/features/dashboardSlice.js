import { createSlice } from "@reduxjs/toolkit";
//create a initial state
const initialStateValue = {
  apiDataList:null,
  categoryFilter:'region',
  swotData:null,
  usageTime:0,
  apiCallsCount:0
};

export const DashboardReducer = createSlice({
  name: "dashboard", //to identify slice
  initialState: initialStateValue,
  reducers: {
    setApiDataList: (state, action) =>{
      state.apiDataList = action.payload;
    },
    setCategoryFilter: (state, action) =>{
      state.categoryFilter = action.payload;
    },
    setSwotData: (state, action) =>{
      state.swotData = action.payload;
    },
    setUsageTime: (state, action) =>{
      state.usageTime = action.payload;
    },
    setApiCallsCount: (state, action) =>{
      state.apiCallsCount = action.payload;
    }
  },
});
export const { setApiCallsCount, setUsageTime, setApiDataList,setCategoryFilter, setSwotData} = DashboardReducer.actions;
export default DashboardReducer.reducer;