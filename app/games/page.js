import Image from "next/image";
import Link from "next/link";
import { games } from "./data/index";
import Filter from "../../components/Filter";

export default async function page({searchParams}) {

  let filterUrl
  if(searchParams?.filter){
    filterUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/games?filter=${searchParams.filter}`
  }else{
    filterUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/games`
  }

  const response = await fetch(`${filterUrl}`, {
    method: "GET"
  });

  const gameData = await response.json()

  const filterss = [{
    name: 'FPS', value: 'fps'
  }, {
    name: 'Battle Royale', value: 'battle royale'
  },{
    name: "None", value: 'none'
  }]

  return (
    <section className="px-[5%] xl:px-[12%] pt-10 pb-20 transition-all">
      <div className="text-4xl font-semibold mb-10  flex items-center justify-between">
        <h1>Games</h1>
        <Filter filters={filterss} containerClasses={`border rounded-2xl`} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 transition-all">
        {gameData.map((game, index) => (
          <div key={index} className="grid ">
            <Link
              href={`/games/${game._id}`}
              className="relative h-64 w-full rounded-xl hover:scale-105 transition-all"
            >
              <Image
                src={game.gameBannerPhoto}
                alt={game.name}
                fill
                className="rounded-xl object-cover"
                draggable="false"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
