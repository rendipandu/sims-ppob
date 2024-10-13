import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

const initialState: UserProfile = {
    email: '',
    first_name: '',
    last_name: '',
    profile_image: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<UserProfile>) => {
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.profile_image = action.payload.profile_image;
        },
        updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
            const { email, first_name, last_name, profile_image } = action.payload;
            if (email) state.email = email;
            if (first_name) state.first_name = first_name;
            if (last_name) state.last_name = last_name;
            if (profile_image) state.profile_image = profile_image;
        },
    },
});

export const { setProfile, updateProfile } = userSlice.actions;
export default userSlice.reducer;