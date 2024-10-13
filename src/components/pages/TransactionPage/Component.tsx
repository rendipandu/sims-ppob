import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Hero } from '../../organisms/Hero';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { makePayment } from '../../../services/apiService';

export const TransactionPage: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { service_name, service_icon, service_code, service_tariff } = location.state || {};

    const handlePayment = async () => {
        if (service_code && service_tariff) {
            try {
                const response = await makePayment(service_code, dispatch);
                if (response.status === 0) {
                    Swal.fire({
                        title: `Beli ${service_code?.toLowerCase()} prabayar senilai`,
                        text: `Rp ${service_tariff?.toLocaleString()}`,
                        icon: 'success',
                        footer: '<a href="/">Kembali ke Beranda</a>',
                    });
                } else {
                    Swal.fire({
                        title: 'Top Up Failed',
                        text: 'An error occurred during the top-up process.',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                }
            } catch (error) {
                console.error('Error during payment:', error);
                Swal.fire({
                    title: 'Payment Failed',
                    text: 'Terjadi kesalahan saat melakukan pembayaran.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } else {
            Swal.fire({
                title: 'Payment Failed',
                text: 'Terjadi kesalahan saat melakukan pembayaran.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="p-6 space-y-10">
                <Hero />
                <div>
                    <div className='mb-5'>
                        <p className="text-gray-600">Pembayaran</p>
                        <div className='flex'>
                            <img src={service_icon} alt={service_name} className="w-8" />
                            <h2 className="text-2xl font-bold">{service_name}</h2>
                        </div>
                    </div>
                    <div className="w-100 flex flex-col">
                        <input
                            type="number"
                            placeholder="Masukkan nominal Top Up"
                            className="border border-gray-300 rounded-md p-2 w-full mb-3"
                            value={service_tariff || ''}
                            required
                            disabled
                        />
                        <button
                            onClick={handlePayment}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Bayar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
