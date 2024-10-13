import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Service = {
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: number;
}

const initialState: Service[] = [];

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setService: (state, action: PayloadAction<Service[]>) => {
            return action.payload;
        },
    },
});

export const { setService } = serviceSlice.actions;
export default serviceSlice.reducer;