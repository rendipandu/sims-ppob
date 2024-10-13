import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TransactionRecord = {
    invoice_number: string;
    transaction_type: string;
    description: string;
    total_amount: number;
    created_on: string;
};

type TransactionState = {
    history: TransactionRecord[];
};

const initialState: TransactionState = {
    history: [],
};

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setTransactionHistory(state, action: PayloadAction<TransactionRecord[]>) {
            state.history = action.payload;
        },
        // You can add more reducers for additional functionality if needed
    },
});

export const { setTransactionHistory } = transactionSlice.actions;

export default transactionSlice.reducer;
