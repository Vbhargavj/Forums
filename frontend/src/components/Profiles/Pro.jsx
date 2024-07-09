import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProfileInputField } from './ProfileInputField';
import { AuthContext } from '../../Context/AuthContext';

export function Pro() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const { setAuth } = useContext(AuthContext); // Assuming you have a logout function in your AuthContext

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/user/me');
            setUserDetails(response.data.data.doc);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('photo', file);

            setLoading(true);
            setError(null);

            try {
                const response = await axios.post('http://localhost:3000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function (response) {
                    fetchUserDetails()
                });
                // Handle successful upload response here if needed
            } catch (error) {
                console.error('Error uploading image:', error);
                setError('Error uploading image. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/v1/user/logout').then(response => { setAuth(false) });
            // Call the logout function from AuthContext
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="flex m-10 p-10">
            <div className="w-2/5 p-1 text-sm border-black flex flex-col justify-center items-center">
                <label htmlFor="fileInput" className="cursor-pointer">
                    <input
                        id="fileInput"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        disabled={loading}
                    />
                    {loading ? (
                        <p>Uploading...</p>
                    ) : (
                        <img
                            src={userDetails.photo || '/1krishna.jpeg'} // Default image if imageUrl is not set
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-red-500 border-4 object-cover cursor-pointer"
                        />
                    )}
                </label>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mt-3 font-bold">{userDetails.name}</div>
                <div className="font-light">{userDetails.email}</div>
                <div className="font-light">{userDetails.country}</div>
            </div>
            <div className="w-3/5 border-black">
                <ProfileInputField label={'Name'} labelValue={userDetails.name} color={0} />
                <ProfileInputField label={'Role'} labelValue={userDetails.role} color={1} />
                <ProfileInputField label={'Email'} labelValue={userDetails.email} color={0} />
                <ProfileInputField label={'Number'} labelValue={userDetails.number} color={1} />
                <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
