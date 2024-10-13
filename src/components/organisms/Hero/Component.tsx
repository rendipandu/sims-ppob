import React, { useEffect, useState } from 'react';
import { getProfile, getBalance } from '../../../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import bgSaldo from '../../../assets/Background Saldo.png';

export const Hero: React.FC = () => {
    const dispatch = useDispatch();

    const profile = useSelector((state: RootState) => state.user);
    const balance = useSelector((state: RootState) => state.balance);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Only fetch profile and balance if they are not already loaded
                if (!profile || !profile.first_name) {
                    await getProfile(dispatch);
                }

                if (!balance || balance.balance === null) {
                    await getBalance(dispatch);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Adding profile and balance to dependency array

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-between items-center mb-10">
            <div className="flex flex-col">
                {profile?.profile_image && (
                    <img src={profile.profile_image} alt="Profile" className="ml-3 w-16 h-16 rounded-full" />
                )}
                <div className="ml-4">
                    <p className="text-gray-600">Selamat datang,</p>
                    <h1 className="text-2xl font-bold">{profile?.first_name + ' ' + profile?.last_name || 'Loading...'}</h1>
                </div>
            </div>
            <div
                className="flex flex-col gap-4 w-3/5 p-4 rounded-lg shadow-md text-white"
                style={{
                    backgroundImage: `url(${bgSaldo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <p className="text-gray-200">Saldo Anda</p>
                <div className="text-2xl font-bold">
                    Rp {balance?.balance !== null ? balance?.balance?.toLocaleString() : 'Loading...'}
                </div>
                <p className="text-gray-200 mt-">Lihat saldo</p>
            </div>
        </div>
    );
};