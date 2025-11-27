import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice
export const isloadingSlice = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading: (state, action) => {
            return action.payload
        }
    }
})

export const { setIsLoading } = isloadingSlice.actions;

export default isloadingSlice.reducer;