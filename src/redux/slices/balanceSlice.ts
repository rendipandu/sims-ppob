import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Balance {
    balance: number | null;
}

const initialState: Balance = {
    balance: null,
};

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<Balance>) => {
            return action.payload;
        },
    },
});

export const { setBalance } = balanceSlice.actions;
export default balanceSlice.reducer;