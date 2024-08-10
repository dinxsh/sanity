import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function RegisterPage() {
    const [userData, setUserData] = useState({
        teamName: '',
        members: '',
        email: '',
        selectedPlatform: '',
        participantType: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { id: tournamentId } = router.query;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const membersArray = userData.members.split(',').map(member => member.trim());
            const response = await axios.post(`/api/register/${tournamentId}`, {
                ...userData,
                members: membersArray
            });
            if (response.status === 201) {
                alert('Registration successful!');
                router.push(`/tournament/${tournamentId}`);
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Register for Tournament</h1>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
                <div>
                    <label htmlFor="teamName" className="block text-white mb-2">Team Name</label>
                    <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={userData.teamName}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="members" className="block text-white mb-2">Team Members (Comma-separated)</label>
                    <input
                        type="text"
                        id="members"
                        name="members"
                        value={userData.members}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="selectedPlatform" className="block text-white mb-2">Selected Platform</label>
                    <input
                        type="text"
                        id="selectedPlatform"
                        name="selectedPlatform"
                        value={userData.selectedPlatform}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label htmlFor="participantType" className="block text-white mb-2">Participant Type</label>
                    <input
                        type="text"
                        id="participantType"
                        name="participantType"
                        value={userData.participantType}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}