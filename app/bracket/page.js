import TournamentBracket from "../../components/TournamentBracket";
import BracketList from "../../components/BracketList";

const BracketPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-8">Tournament Manager</h1>
            <TournamentBracket />
            <BracketList />
        </div>
    );
};

export default BracketPage;