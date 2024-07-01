import Image from "next/image";
import Link from "next/link";

export default function TournamentSection() {
  return (
    <div className="mt-20 pb-20">
      <div className="grid grid-cols-4 gap-2">
        {tournamentsData.map((tournament, index) => (
          <Link
            key={index}
            href="/tournaments/id"
            className="hover:scale-105 transition-all"
          >
            <TournamentCard {...tournament} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function TournamentCard({
  image,
  title,
  date,
  time,
  description,
  entryFee,
  mode,
  participants,
  host,
}) {
  return (
    <div className="bg-gray-800 text-white rounded-xl overflow-hidden shadow-lg w-72 m-4 p-2">
      {/* Image */}
      <div className="relative">
        <span className="bg-blue-600 text-xs px-2 py-0.5 absolute bottom-0">
          BGMI
        </span>
        <span className="bg-green-600 text-xs px-2 py-1 rounded-full absolute top-1 right-1">
          Open
        </span>
        <Image
          src={image}
          alt={title}
          width={500}
          height={200}
          className="object-cover rounded-xl"
        />
      </div>

      {/* Details */}
      <div className="p-2 mt-2 grid grid-cols-1">
        <p className="text-xs text-gray-400 mt-1">
          {date}, {time}
        </p>
        <h2 className="mt-2 text-sm font-semibold">{title}</h2>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
          <span>💰 {entryFee}</span>
          <span>🛡️ {mode}</span>
          <span>👥 {participants}</span>
        </div>
        <div className="mt-4 p-2 flex items-center justify-between text-sm bg-gray-700 rounded">
          <div className="flex items-center">
            <Image
              src={host.image}
              alt={host.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="ml-2 text-sm text-gray-300">{host.name}</span>
          </div>
          <div className="text-xs text-gray-300">Host</div>
        </div>
      </div>
    </div>
  );
}

// Example data for tournaments
const tournamentsData = [
  {
    image:
      "https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp",
    title: "KINGS ESPORTS PRO SCRIMS (12PM)",
    date: "JUL 1, 2024",
    time: "11:00 PM",
    entryFee: 500,
    mode: "Squad",
    participants: "16/21",
    host: {
      image:
        "https://media.battlexo.com/space/262/icon/43ed1dc5-1493-4932-ab9c-c7bedbdfe584.webp",
      name: "KINGS ESPORTS",
    },
  },
  {
    image:
      "https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp",
    title: "KINGS ESPORTS PRO SCRIMS (12PM)",
    date: "JUL 1, 2024",
    time: "11:00 PM",
    entryFee: 500,
    mode: "Squad",
    participants: "16/21",
    host: {
      image:
        "https://media.battlexo.com/space/262/icon/43ed1dc5-1493-4932-ab9c-c7bedbdfe584.webp",
      name: "KINGS ESPORTS",
    },
  },
  {
    image:
      "https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp",
    title: "KINGS ESPORTS PRO SCRIMS (12PM)",
    date: "JUL 1, 2024",
    time: "11:00 PM",
    entryFee: 500,
    mode: "Squad",
    participants: "16/21",
    host: {
      image:
        "https://media.battlexo.com/space/262/icon/43ed1dc5-1493-4932-ab9c-c7bedbdfe584.webp",
      name: "KINGS ESPORTS",
    },
  },
  {
    image:
      "https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp",
    title: "KINGS ESPORTS PRO SCRIMS (12PM)",
    date: "JUL 1, 2024",
    time: "11:00 PM",
    entryFee: 500,
    mode: "Squad",
    participants: "16/21",
    host: {
      image:
        "https://media.battlexo.com/space/262/icon/43ed1dc5-1493-4932-ab9c-c7bedbdfe584.webp",
      name: "KINGS ESPORTS",
    },
  },
];
