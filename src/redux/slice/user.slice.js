import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        logIn: false,
    },
    movieDetail: [],
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.user.logIn = action.payload;
        },
        isMovieDetail: (state, action) => {
            state.movieDetail = [action.payload];
        }

    }
});

export const { logIn, isMovieDetail } = userSlice.actions;

export default userSlice.reducer;