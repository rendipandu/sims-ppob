import React, { useState } from 'react';
import { getBalance } from '../../../services/apiService';
import { useDispatch } from 'react-redux';
import { topUpAPI } from '../../../services/apiService'; // Import the topUpAPI function
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Hero } from '../../organisms/Hero';

const MIN_TOPUP = 10000;
const MAX_TOPUP = 1000000;

export const TopupPage: React.FC = () => {
    const dispatch = useDispatch();
    const [topUpAmount, setTopUpAmount] = useState<number | null>(null);

    const handleTopUp = async () => {
        if (topUpAmount && topUpAmount >= MIN_TOPUP && topUpAmount <= MAX_TOPUP) {
            try {
                const response = await topUpAPI(topUpAmount);

                if (response.status === 0) {
                    Swal.fire({
                        title: 'Top Up Successful',
                        text: `Top Up sebesar Rp ${topUpAmount.toLocaleString()}`,
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
                await getBalance(dispatch);
            } catch (error) {
                console.error('Error during top-up:', error);

                Swal.fire({
                    title: 'Top Up Failed',
                    text: 'An error occurred during the top-up process.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } else {
            Swal.fire({
                title: 'Invalid Amount',
                text: `Top-up amount must be between Rp ${MIN_TOPUP.toLocaleString()} and Rp ${MAX_TOPUP.toLocaleString()}.`,
                icon: 'warning',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="p-6 space-y-10">
                <Hero />
                <div>
                    <div>
                        <p className="text-gray-600">Silahkan masukan</p>
                        <h2 className="text-2xl font-bold mb-5">Nominal Top Up</h2>
                    </div>
                    <div className="w-100 flex gap-5">
                        <div className="w-10/12 flex flex-col">
                            <input
                                type="number"
                                placeholder="Masukkan nominal Top Up"
                                className="border border-gray-300 rounded-md p-2 w-full text-center mb-3"
                                value={topUpAmount || ''}
                                onChange={(e) => setTopUpAmount(Number(e.target.value))} // Update state with input value
                            />
                            <button
                                onClick={handleTopUp} // Call handleTopUp when button is clicked
                                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                disabled={!topUpAmount || topUpAmount < MIN_TOPUP || topUpAmount > MAX_TOPUP} // Disable button based on input validation
                            >
                                Top Up
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-4 mb-4">
                            {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => setTopUpAmount(amount)} // Set amount when button is clicked
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Rp{amount.toLocaleString()}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};