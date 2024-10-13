import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface FetchDataParams extends AxiosRequestConfig {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
}

const pathUrl = 'https://take-home-test-api.nutech-integrasi.com';

const fetchData = async ({ url, method, data }: FetchDataParams): Promise<any> => {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(data instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        };

        const response: AxiosResponse<any> = await axios({
            url: `${pathUrl}${url}`,
            method,
            data,
            headers,
        });

        return response.data;
    } catch (error: any) {
        console.error('API Error:', error);

        if (error.response) {
            return error.response.data;
        }

        throw new Error('Error fetching data');
    }
};

const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

export { fetchData, validateEmail };
