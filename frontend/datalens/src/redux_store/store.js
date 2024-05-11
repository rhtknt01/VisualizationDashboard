import { configureStore } from "@reduxjs/toolkit";
import DashboardReducer from "./features/dashboardSlice";

export const store = configureStore({
    reducer:{
        dashboardStore:DashboardReducer,//here dashboard is the name of our DashboardReducer
    }
});