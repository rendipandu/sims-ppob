import { fetchData } from "./utils";
import { showToast } from "./toast.util";

type RegistrationParam = {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

export const register = async (data: RegistrationParam) => {
    try {
        const response = await fetchData({
            url: '/registration',
            method: 'POST',
            data,
        });

        if (response.status === 0) {
            showToast('success', response.message, { autoClose: 3000 });
            return response;
        } else {
            showToast('error', response.message, { autoClose: 3000 });
            throw new Error(response.message);
        }
    } catch (error: any) {
        console.error("Registration error:", error);
        throw error;
    }
};

export const login = async (email: string, password: string) => {
    try {
        const response = await fetchData({
            url: '/login',
            method: 'POST',
            data: { email, password },
        });

        if (response.status === 0) {
            showToast('success', response.message, { autoClose: 3000 });
            return response;
        } else {
            showToast('error', response.message, { autoClose: 3000 });
            throw new Error(response.message);
        }

    } catch (error: any) {
        console.error("Login error:", error);
        throw error;
    }
};
