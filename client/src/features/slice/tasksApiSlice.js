import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// const user = JSON.parse(localStorage.getItem('user'))

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: "/", 
        credentials: 'include'
    }),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getAvailableTasks: builder.query({
            query: () => "gettask",
            providesTags: ['Todo']
        }),
        getUsername: builder.query({
            query: () => "getuser",
            providesTags: ['Todo']

        }),
        
        addNewTask: builder.mutation({
            query: (todo) => ({
                url: "newtask",
                method: "POST",
                body: todo
            }),
            invalidatesTags: ['Todo']
           
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: "updatetask",
                method: "PUT",
                body: todo
            }),
            invalidatesTags: ['Todo']

        }),
        deleteTodo: builder.mutation({
            query: (_id) => ({
                url: "deletetask",
                method: "POST",
                body: { _id }
            }),
            invalidatesTags: ['Todo']

        }),
        completedTodo: builder.mutation({
            query: (status) => ({
                url: "updatestatus",
                method: "PUT",
                body: status
            }),
            invalidatesTags: ['Todo']

        }),
        shareTodo: builder.mutation({
            query: (shared) => ({
                url: "shareemail",
                method: "POST",
                body: shared
            }),
            invalidatesTags: ['Todo']
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST"
            }),
            invalidatesTags: ['Todo']
        })

    })
})

export const { 
    useGetAvailableTasksQuery,
    useAddNewTaskMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useCompletedTodoMutation,
    useShareTodoMutation,
    useLogoutUserMutation,
    useGetUsernameQuery
} = tasksApi