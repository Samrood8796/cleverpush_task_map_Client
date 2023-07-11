import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    location: { lng: 0, lat: 0 }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setUser: (state, action) => {
            state.user = action.payload
        },
        setLogout: (state, action) => {
            state.user = null
            state.location.lng = 0
            state.location.lat = 0
        },
        setLocation: (state, action) => {
            const { lng, lat } = action.payload
            state.location.lng = lng
            state.location.lat = lat
        }

    }
})

export const {
    setUser,
    setLogout,
    setLocation
} = userSlice.actions

export default userSlice.reducer;