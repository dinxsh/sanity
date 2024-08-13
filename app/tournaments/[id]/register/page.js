import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function RegisterPage() {
    const [teamName, setTeamName] = useState('');
    const [members, setMembers] = useState('');
    const [email, setEmail] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [participantType, setParticipantType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { id: tournamentId } = router.query;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = {
            teamName,
            members,
            email,
            selectedPlatform,
            participantType,
        };

        try {
            const response = await axios.post(`/api/register/${tournamentId}`, formData);

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
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-lg w-full bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">Register for Tournament</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="teamName" className="block text-gray-300 text-sm font-semibold mb-2">
                            Team Name
                        </label>
                        <input
                            type="text"
                            id="teamName"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your team name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="members" className="block text-gray-300 text-sm font-semibold mb-2">
                            Team Members (Comma-separated)
                        </label>
                        <input
                            type="text"
                            id="members"
                            value={members}
                            onChange={(e) => setMembers(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter team members"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-300 text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="selectedPlatform" className="block text-gray-300 text-sm font-semibold mb-2">
                            Selected Platform
                        </label>
                        <input
                            type="text"
                            id="selectedPlatform"
                            value={selectedPlatform}
                            onChange={(e) => setSelectedPlatform(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the platform (e.g., PC, Console)"
                        />
                    </div>
                    <div>
                        <label htmlFor="participantType" className="block text-gray-300 text-sm font-semibold mb-2">
                            Participant Type
                        </label>
                        <input
                            type="text"
                            id="participantType"
                            value={participantType}
                            onChange={(e) => setParticipantType(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the participant type (e.g., Player, Coach)"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-500"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}
