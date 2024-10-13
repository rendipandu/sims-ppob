import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfileImage, updateProfile } from '../../../services/apiService';
import { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state: RootState) => state.user);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ email: '', first_name: '', last_name: '' });
    const [profilePicture, setProfilePicture] = useState('/default-profile.png'); // Default image path
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                await getProfile(dispatch);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setFormData({
                email: profile.email || '',
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
            });
            setProfilePicture(profile.profile_image || '/default-profile.png'); // Use user image or default
        }
    }, [profile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditProfile = () => {
        setEditMode(true);
    };

    const handleSaveProfile = async () => {
        try {
            await updateProfile(formData, dispatch);
            setSuccessMessage('Profile updated successfully!');
            setEditMode(false);
            await getProfile(dispatch);
        } catch (error) {
            setError('Failed to update profile.');
            console.error('Error updating profile:', error);
        }
    };

    const handleLogout = async () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Profile picture input changed');
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file.');
                return;
            }

            if (file.size > 100 * 1024) {
                setError('File size must be less than 100 KB.');
                return;
            }

            try {
                const updatedProfile = await updateProfileImage(file, dispatch);
                setProfilePicture(updatedProfile.data.profile_image);
                setSuccessMessage('Profile picture updated successfully!');
                await getProfile(dispatch);
            } catch (error) {
                setError('Failed to update profile picture.');
                console.error('Error updating profile picture:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex flex-col items-center py-8">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                    id="profile-picture-input"
                />
                <label htmlFor="profile-picture-input">
                    <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mb-4 cursor-pointer"
                    />
                </label>
                <h1 className="text-2xl font-bold mb-4">{`${formData.first_name} ${formData.last_name}`}</h1>

                <div className="w-full max-w-sm space-y-4">
                    {/* Email Field */}
                    <div className="flex flex-col">
                        <label className="text-gray-500 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md p-2"
                            disabled={!editMode}
                        />
                    </div>

                    {/* First Name Field */}
                    <div className="flex flex-col">
                        <label className="text-gray-500 mb-1">Nama Depan</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md p-2"
                            disabled={!editMode}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-500 mb-1">Nama Belakang</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md p-2"
                            disabled={!editMode}
                        />
                    </div>
                </div>

                <div className="mt-6 flex flex-col items-center">
                    {editMode ? (
                        <>
                            <button
                                onClick={handleSaveProfile}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full max-w-sm mb-3"
                            >
                                Simpan
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-200 w-full max-w-sm"
                            >
                                Batalkan
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEditProfile}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full max-w-sm mb-3"
                        >
                            Edit Profil
                        </button>
                    )}
                    {!editMode && (
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 w-full max-w-sm"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};