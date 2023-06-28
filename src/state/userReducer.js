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
            console.log(action.payload);
            const searchTerm = action.payload.searchKey.toLowerCase();
            if (searchTerm.trim() === '') {
                console.log("ddddddd");
                // Display all blogs if input is empty
                state.blogs = action.payload.data
            } else {
                console.log("aaaa");
                // Filter blogs based on search term
                state.blogs = action.payload.data.filter(blog =>
                    blog.title?.toLowerCase().includes(searchTerm) ||
                    blog.category?.toLowerCase().includes(searchTerm) ||
                    blog.description?.toLowerCase().includes(searchTerm) ||
                    blog.authorName?.toLowerCase().includes(searchTerm)
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
        },
        setDeleteBlog: (state, action) => {
            state.blogs = state.blogs.filter(blog => blog._id !== action.payload)
        },
        setUpdateBlog: (state, action) => {
            const updatedBlogs = state.blogs.map((blog) => {
                if (blog?._id === action.payload.blog._id) return action.payload.blogs;
                return blog;
            })
            state.blogs = updatedBlogs
        },

    }
})

export const {
    setBlogs,
    setSingleBlog,
    setUser,
    setLogout,
    setDeleteBlog,
    setUpdateBlog
} = userSlice.actions

export default userSlice.reducer;