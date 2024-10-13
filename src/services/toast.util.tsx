import React from 'react';
import { toast } from 'react-toastify';

export const showToast = (
    type: 'success' | 'error' | 'info' | 'warning',  // Simplified toast type
    message: string,
    options?: { autoClose?: number | false; }  // Adjusted type for autoClose
) => {
    // Use the type directly in the toast function
    toast[type](<div>{message}</div>, {
        position: "bottom-right",
        autoClose: options?.autoClose !== undefined ? options.autoClose : false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            backgroundColor: 'var(--background)',
            border: '1px solid var(--backdrop)',
        },
    });
};