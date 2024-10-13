import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/authService';
import { loginSuccess } from '../../../redux/slices/authSlice';
import illustrationLogin from '../../../assets/illustrasiLogin.png';
import ppobLogo from '../../../assets/Logo.png';
import { validateEmail } from '../../../services/utils';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        let isValid = true;

        if (!validateEmail(email)) {
            setEmailError('Format email tidak valid');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (password.length < 8) {
            setPasswordError('Password minimal 8 karakter');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!isValid) {
            return;
        }

        try {
            const response = await login(email, password);
            if (response && response.status === 0) {
                // Store token in localStorage for 24 hours
                const token = response.data.token;
                localStorage.setItem('token', token);

                // Optionally, you can set an expiration time
                const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
                localStorage.setItem('tokenExpiration', expirationTime.toString());

                // Dispatch login action to Redux store
                dispatch(loginSuccess(token));
                navigate('/');
            } else {
                // Handle error response
                console.error("Login failed:", response.message || "Unknown error");
            }
        } catch (error: any) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex flex-col justify-center items-center px-8">
                <div className="w-full max-w-md">
                    <div className="flex justify-center items-center mb-6">
                        <img
                            src={ppobLogo}
                            alt="Logo"
                            className="mr-2"
                        />
                        <h2 className="text-xl font-bold">
                            SIMS PPOB
                        </h2>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Masuk atau buat akun untuk memulai
                    </h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="masukan email anda"
                                className={`w-full p-3 border rounded-lg focus:outline-none 
                        ${emailError ? 'border-red-500' : 'border-gray-300'} focus:border-red-500`}
                            />
                            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="masukan password anda"
                                className={`w-full p-3 border rounded-lg focus:outline-none 
                        ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:border-red-500`}
                            />
                            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                        >
                            Masuk
                        </button>
                    </form>
                    <p className="text-center mt-4">
                        Belum punya akun? registrasi{' '}
                        <Link to="/registration" className="text-red-500 underline">
                            disini
                        </Link>
                    </p>
                </div>
            </div>

            <div className="hidden md:flex md:w-1/2 bg-pink-50 justify-center items-center">
                <img
                    src={illustrationLogin}
                    alt="Illustration"
                    className="w-3/4"
                />
            </div>
        </div>
    );
};