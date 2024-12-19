import axios from "axios";

export async function fetchTournamentData(id: string) {
  try {
    const response = await axios.get(`/api/tournaments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tournament:", error);
    throw error;
  }
}

export async function registerForTournament(
  tournamentId: string,
  userId: string,
) {
  try {
    const response = await axios.post(
      `/api/tournaments/${tournamentId}/register`,
      {
        userId,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error registering for tournament:", error);
    throw error;
  }
}
