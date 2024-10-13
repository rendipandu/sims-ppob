import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../../services/authService';
import ppobLogo from '../../../assets/Logo.png';
import illustrationLogin from '../../../assets/illustrasiLogin.png';
import { validateEmail } from '../../../services/utils';

export const RegistrationPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        if (!validateEmail(email)) {
            setEmailError('Format email tidak valid');
            return
        }

        if (password.length < 8) {
            setPasswordError('Password minimal 8 karakter');
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords tidak sama');
            return;
        }

        try {
            const response = await register({
                email,
                first_name: firstName,
                last_name: lastName,
                password,
            });
            if (response) {
                navigate('/');
            }
        } catch (error) {
            console.error('Registration error:', error);
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
                        Lengkapi data untuk membuat akun
                    </h2>
                    <form onSubmit={handleRegister} className="space-y-4">
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
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="nama depan"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="nama belakang"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="buat password"
                                className={`w-full p-3 border rounded-lg focus:outline-none 
                                    ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:border-red-500`}
                                required
                            />
                            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="konfirmasi password"
                                className={`w-full p-3 border rounded-lg focus:outline-none 
                                    ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'} focus:border-red-500`}
                                required
                            />
                            {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                        >
                            Registrasi
                        </button>
                    </form>
                    <p className="text-center mt-4">
                        sudah punya akun? login{' '}
                        <Link to="/login" className="text-red-500 underline">
                            di sini
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