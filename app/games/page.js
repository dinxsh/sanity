import Image from "next/image";
import Link from "next/link";
import Filter from "../../components/Filter";

export default async function Page({ searchParams }) {
  const params = await searchParams; // Await searchParams before using it
  const filter = params?.filter; // Access filter safely

  const filterUrl = filter
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/games?filter=${filter}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/games`;

  let gameData = [];
  let errorMessage = "";

  try {
    const response = await fetch(filterUrl, { cache: "no-store" }); // Fetch API
    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }
    gameData = await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    errorMessage = "Failed to load games. Please try again later.";
  }

  const filters = [
    { name: "FPS", value: "fps" },
    { name: "Battle Royale", value: "battle royale" },
    { name: "None", value: "none" },
  ];

  return (
    <section className="px-[5%] xl:px-[12%] pt-10 pb-20 transition-all">
      <div className="text-4xl font-semibold mb-10 flex items-center justify-between">
        <h1>Games</h1>
        <Filter filters={filters} containerClasses={`border rounded-2xl`} />
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 transition-all">
        {Array.isArray(gameData) && gameData.length > 0 ? (
          gameData.map((game) => (
            <div key={game._id} className="grid">
              <Link
                href={`/games/${game._id}`}
                className="relative h-64 w-full rounded-xl hover:scale-105 transition-all"
                aria-label="game-id-page"
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
          ))
        ) : (
          <p>No games found.</p>
        )}
      </div>
    </section>
  );
}
