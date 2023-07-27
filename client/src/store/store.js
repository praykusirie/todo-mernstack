import { configureStore } from "@reduxjs/toolkit";
import taskApiReducer from "../slices/taskApiSlice";


export const store = configureStore({
    reducer: {
        task: taskApiReducer
    }
})