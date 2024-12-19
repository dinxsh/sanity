import TournamentBracket from "../../components/TournamentBracket";
import BracketList from "../../components/BracketList";

const BracketPage = () => {
  return (
    <div className="min-h-[70vh] px-7">
      <TournamentBracket />
      <BracketList />
    </div>
  );
};

export default BracketPage;
