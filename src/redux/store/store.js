import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import jobSlice from "../features/jobSlice";

const store = configureStore({
    reducer:{
        job: jobSlice,
        auth: authSlice,

    }
});

export default store;
