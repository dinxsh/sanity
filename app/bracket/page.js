import TournamentBracket from "../../components/TournamentBracket";

const BracketPage = () => {
  return (
    <div className="min-h-[70vh] px-7">
      <h1 className="mt-20 mb-10 text-3xl font-semibold tracking-tight text-center">
        Tournament Manager
      </h1>

      <TournamentBracket />
    </div>
  );
};

export default BracketPage;
