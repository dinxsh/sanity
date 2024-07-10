import Image from "next/image";
import Link from "next/link";
import { games } from './data/index'

export default function page() {
  return (
    <section className="px-[5%] xl:px-[12%] pt-20 pb-20 transition-all">
      <div className="text-4xl font-semibold mb-10 ">Games</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 transition-all">
        {games.map((game, index) => (
          <div key={index} className="grid ">
            <Link
              href={`/games/${game.id}`}
              className="relative h-64 w-full rounded-xl hover:scale-105 transition-all"
            >
              <Image
                src={game.image}
                alt={game.name}
                fill
                className="rounded-xl object-cover"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}