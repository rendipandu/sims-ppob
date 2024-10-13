import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Banner {
    banner_name: string;
    banner_image: string;
    description: string;
}

const initialState: Banner[] = [];

const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        setBanners: (state, action: PayloadAction<Banner[]>) => {
            return action.payload;
        },
    },
});

export const { setBanners } = bannerSlice.actions;
export default bannerSlice.reducer;