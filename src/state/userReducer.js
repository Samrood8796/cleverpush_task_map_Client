import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    blogs: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            const searchTerm = action.payload.searchKey.toLowerCase();
            if (searchTerm.trim() === '') {
                // Display all blogs if input is empty
                state.blogs = action.payload.data
            } else {
                // Filter blogs based on search term
                state.blogs = action.payload.data.filter(blog =>
                    blog.title.toLowerCase().includes(searchTerm) ||
                    blog.category.toLowerCase().includes(searchTerm) ||
                    blog.description.toLowerCase().includes(searchTerm) ||
                    blog.authorName.toLowerCase().includes(searchTerm)
                );
            }
        },
        setSingleBlog: (state, action) => {
            state.blogs.push(action.payload)
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLogout: (state, action) => {
            state.user = null
            state.blogs = []
        }

    }
})

export const {
    setBlogs,
    setSingleBlog,
    setUser,
    setLogout
} = userSlice.actions

export default userSlice.reducer;