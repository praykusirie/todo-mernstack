import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'



const URL = 'http://localhost:3000/gettask'
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
     tasks: [],
     isLoading: false,
     isError: false
}

export const getAllTasks = createAsyncThunk('tasks/getAllTasks', 
    async () => {
        try {
            const response = await axios.get(URL, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const tasks = response.data
            // console.log(user)
            return tasks
        } catch (error) {
            console.log(error)
        }
    }
)

const tasksSlice = createSlice({
    name: 'task',
    initialState,
    extraReducers: {
        [getAllTasks.pending]: (state) => {
            state.isLoading = true
        },
        [getAllTasks.fulfilled]: (state, action) => {
            state.isLoading = false
            state.tasks = action.payload
        },
        [getAllTasks.rejected]: (state) => {
            state.isError = true
            state.isLoading = false
        }
    }
    
})

//  export const { filterTask } = tasksSlice.actions

export default tasksSlice.reducer