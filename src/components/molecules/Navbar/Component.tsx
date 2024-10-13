import React from 'react';
import { Link } from 'react-router-dom';
import ppobLogo from '../../../assets/Logo.png';

export const Navbar: React.FC = () => {

    return (
        <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
            <Link to="/" className="flex justify-center items-center">
                <img
                    src={ppobLogo}
                    alt="Logo"
                    className="mr-2"
                />
                <h2 className="text-xl font-bold">
                    SIMS PPOB
                </h2>
            </Link>
            <div className='flex gap-10'>
                <Link to="/topup" className="text-red-500 font-bold">
                    Top Up
                </Link>
                <Link to="/transaction/history" className="text-red-500 font-bold">
                    Transaction
                </Link>
                <Link to="/profile" className="text-red-500 font-bold">
                    Akun
                </Link>
            </div>
        </header>
    );
};