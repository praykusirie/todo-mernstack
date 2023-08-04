import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "../features/slice/tasksApiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";


export const store = configureStore({
    reducer: {
        [tasksApi.reducerPath]: tasksApi.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
    
})

setupListeners(store.dispatch)