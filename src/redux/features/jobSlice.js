import { createSlice} from "@reduxjs/toolkit";

const initialState={
    
};

const jobSlice = createSlice({
    name:"job",
    initialState,
    reducers: {
        all_jobs : (state,action) => {
            state=action.payload;
            return state
        }
    }
})

export default jobSlice.reducer;
export const {all_jobs} = jobSlice.actions;