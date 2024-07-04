import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, ClockIcon, PersonIcon, CrossCircledIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { Trophy, DollarSign, Users, Shield } from 'lucide-react';



export default function TournamentPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                <div className="relative h-64 sm:h-80 lg:h-96">
                    <Image
                        src={tournament.image}
                        alt={tournament.title}
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-white mb-2">{tournament.title}</h1>
                            <div className="flex items-center text-gray-300 space-x-4">
                                <span className="flex items-center">
                                    <CalendarIcon className="h-5 w-5 mr-1" />
                                    {tournament.date}
                                </span>
                                <span className="flex items-center">
                                    <ClockIcon className="h-5 w-5 mr-1" />
                                    {tournament.time}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Tournament Details</h2>
                            <div className="space-y-2">
                                <p className="flex items-center">
                                    <Trophy className="h-5 w-5 mr-2" />
                                    Prize Pool: {tournament.prizePool}
                                </p>
                                <p className="flex items-center">
                                    <Users className="h-5 w-5 mr-2" />
                                    Participants: {tournament.participants}
                                </p>
                                <p className="flex items-center">
                                    <Shield className="h-5 w-5 mr-2" />
                                    Mode: {tournament.mode}
                                </p>
                                <p className="flex items-center">
                                    <DollarSign className="h-5 w-5 mr-2" />
                                    Entry Fee: ₹{tournament.entryFee}
                                </p>
                                <p>Status: <span className={`px-2 py-1 rounded ${tournament.status.toLowerCase() === 'open' ? 'bg-green-600' :
                                    tournament.status.toLowerCase() === 'live' ? 'bg-yellow-600' :
                                        'bg-red-600'
                                    }`}>{tournament.status}</span></p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Host</h2>
                            <div className="flex items-center">
                                <Image
                                    src={tournament.host.image}
                                    alt={tournament.host.name}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                                <span className="ml-4 text-lg">{tournament.host.name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Description</h2>
                        <p>{tournament.description}</p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Rules</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {tournament.rules.map((rule, index) => (
                                <li key={index}>{rule}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Schedule</h2>
                        <div className="space-y-4">
                            {tournament.schedule.map((stage, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-700 p-4 rounded">
                                    <span>{stage.stage}</span>
                                    <span>{stage.date} at {stage.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <Link href="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Register for Tournament
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Static tournament data for UI demonstration
const tournament = {
    id: "1",
    image: "/tournament-banner.jpg",
    title: "KINGS ESPORTS PRO SCRIMS",
    date: "JUL 1, 2024",
    time: "11:00 PM",
    entryFee: 500,
    mode: "Squad",
    participants: "16/21",
    host: {
        image: "/host-avatar.jpg",
        name: "KINGS ESPORTS",
    },
    status: "Open",
    prizePool: "$10,000",
    description: "Join the ultimate BGMI showdown in our Pro Scrims tournament. Prove your skills, compete against the best, and claim your share of the prize pool!",
    rules: [
        "Players must be 18 years or older to participate.",
        "Teams must have 4 players.",
        "Use of cheats, exploits, or third-party software is strictly prohibited.",
        "All participants must join the official Discord server for communication.",
        "Tournament admins have the final say in all disputes."
    ],
    schedule: [
        { stage: "Registration Deadline", date: "JUN 30, 2024", time: "11:59 PM" },
        { stage: "Tournament Start", date: "JUL 1, 2024", time: "11:00 PM" },
        { stage: "Quarter Finals", date: "JUL 2, 2024", time: "7:00 PM" },
        { stage: "Semi Finals", date: "JUL 3, 2024", time: "7:00 PM" },
        { stage: "Finals", date: "JUL 4, 2024", time: "8:00 PM" }
    ]
};