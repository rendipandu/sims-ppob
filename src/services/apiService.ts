import { fetchData } from "./utils";
import { setProfile } from "../redux/slices/userSlice";
import { setBanners } from "../redux/slices/bannerSlice";
import { setService } from "../redux/slices/serviceSlice";
import { setBalance } from "../redux/slices/balanceSlice";
import { setTransaction, startTransaction, transactionError } from "../redux/slices/transactionSlice";
import { setTransactionHistory } from "../redux/slices/transactionHistorySlice";
import { AppDispatch } from "../redux/store";
import { showToast } from "./toast.util";
import axios from "axios";

export const getProfile = async (dispatch: any) => {
    try {
        const response = await fetchData({
            url: '/profile',
            method: 'GET',
        });
        dispatch(setProfile(response.data))
        return response;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export const updateProfileImage = async (file: File, dispatch: AppDispatch) => {
    const formData = new FormData();
    formData.append('file', file);

    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        showToast('error', 'Only JPEG and PNG files are allowed.', { autoClose: 3000 });
        throw new Error('Invalid file type');
    }

    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        };

        const response = await axios.put('https://take-home-test-api.nutech-integrasi.com/profile/image', formData, {
            headers: {
                ...headers,
            },
        });

        if (response.data.status === 0) {
            showToast('success', response.data.message, { autoClose: 3000 });
            dispatch(setProfile(response.data.data));
            return response.data;
        } else {
            showToast('error', response.data.message, { autoClose: 3000 });
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error('Failed to update profile image:', error);
        throw error;
    }
};
export const updateProfile = async (data: any, dispatch: AppDispatch) => {
    try {
        const response = await fetchData({
            url: '/profile/update',
            method: 'PUT',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 0) {
            showToast('success', response.message, { autoClose: 3000 });
            dispatch(setProfile(response.data));
            return response;
        } else {
            showToast('error', response.message, { autoClose: 3000 });
            throw new Error(response.message);
        }
    } catch (error) {
        console.error('Failed to update profile:', error);
        throw error;
    }
};

export const getBalance = async (dispatch: any) => {
    try {
        const response = await fetchData({
            url: '/balance',
            method: 'GET',
        });
        dispatch(setBalance(response.data));
        return response.data;
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
};

export const topUpAPI = async (top_up_amount: number) => {
    try {
        const response = await fetchData({
            url: '/topup',
            method: 'POST',
            data: JSON.stringify({ top_up_amount }),
        });

        return response;
    } catch (error: any) {
        console.error("Top Up error:", error);
        throw error;
    }
};


export const getServices = async (dispatch: any) => {
    try {
        const response = await fetchData({
            url: '/services',
            method: 'GET',
        });
        dispatch(setService(response.data));
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};

export const getBanner = async (dispatch: any) => {
    try {
        const response = await fetchData({
            url: '/banner',
            method: 'GET',
        });
        dispatch(setBanners(response.data));
        return response.data;
    } catch (error) {
        console.error('Error fetching banners:', error);
        throw error;
    }
};

export const makePayment = async (service_code: string, dispatch: any) => {
    dispatch(startTransaction());
    try {
        const response = await fetchData({
            url: '/transaction',
            method: 'POST',
            data: JSON.stringify({ service_code }),
        });

        if (response.status === 0) {
            dispatch(setTransaction(response.data));
        } else {
            dispatch(transactionError(response.message));
        }

        return response;
    } catch (error: any) {
        console.error("Payment error:", error);
        dispatch(transactionError('An error occurred during payment.'));
        throw error;
    }
};

export const getTransactionHistory = async (dispatch: AppDispatch, offset?: number, limit?: number) => {
    try {
        const response = await fetchData({
            url: `/transaction/history?offset=${offset}&limit=${limit}`,
            method: 'GET',
        });

        if (response.status === 0) {
            dispatch(setTransactionHistory(response.data.records));
        } else {
            console.error('Error fetching transaction history:', response.message);
            throw new Error(response.message);
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        throw error;
    }
};
