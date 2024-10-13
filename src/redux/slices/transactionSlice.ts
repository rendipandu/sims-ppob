import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Tipe untuk data transaksi
interface TransactionData {
    invoice_number: string;
    service_code: string;
    service_name: string;
    transaction_type: string;
    total_amount: number;
    created_on: string;
}

interface TransactionState {
    transaction: TransactionData | null;
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    transaction: null,
    loading: false,
    error: null,
};

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        startTransaction(state) {
            state.loading = true;
            state.error = null;
        },
        setTransaction(state, action: PayloadAction<TransactionData>) {
            state.transaction = action.payload;
            state.loading = false;
        },
        transactionError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        resetTransaction(state) {
            state.transaction = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { startTransaction, setTransaction, transactionError, resetTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
