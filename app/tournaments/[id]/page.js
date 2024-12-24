"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { useToast } from "../../../@/hooks/use-toast";
import TournamentBracket from "../../../components/TournamentBracket";
import { Button } from "../../../@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchTournamentData,
  registerForTournament,
} from "../../../lib/api/tournament";
import { Loader2 } from "lucide-react";

export default function TournamentPage({ params }) {
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [registering, setRegistering] = useState(false);
  // const router = useRouter();
  const { toast } = useToast();
  const { id } = React.use(params);

  useEffect(() => {
    if (id) {
      loadTournamentData(); // Trigger fetching only if `id` is available
    }
  }, [id]);

  const loadTournamentData = async () => {
    try {
      setLoading(true);
      const data = await fetchTournamentData(id);
      setTournament(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load tournament");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tournament data",
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleRegister = async () => {
  //   try {
  //     setRegistering(true);
  //     await registerForTournament(params.id);
  //     toast({
  //       title: "Success",
  //       description: "Successfully registered for tournament"
  //     });
  //     router.refresh();
  //   } catch (err) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: err.message || "Failed to register for tournament"
  //     });
  //   } finally {
  //     setRegistering(false);
  //   }
  // };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading tournament details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-destructive text-lg">{error}</p>
        <Button onClick={loadTournamentData}>Retry</Button>
      </div>
    );
  }

  const totalPrize = tournament.prize.reduce(
    (sum, prize) => sum + prize.amount,
    0,
  );

  return (
    <AnimatePresence>
      <div className="container mx-auto px-4 py-10">
        {/* Tournament Banner */}
        <div className="mb-6">
          <img
            src={tournament.gameId.gameBannerPhoto}
            alt={tournament.gameId.name}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* Tournament Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {tournament.tournamentName}
          </h1>
          <p className="text-muted-foreground mb-6 text-lg text-bold">
            {tournament.gameType}
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href={`/tournaments/${tournament._id}/register`}>
                Register Now
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              View Details
            </Button>
          </div>
        </div>

        {/* Tournament Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Prize Pool</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{totalPrize}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {tournament.registeredNumber}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Slots</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {tournament.slots}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Game */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Game</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-around gap-4">
              <div className="flex flex-col items-center gap-2">
                <p className="text-4xl font-bold text-primary text-justify px-6">
                  {tournament.gameId.name}
                </p>
                <p className="text-muted-foreground text-center">Game</p>
              </div>
              <img
                src={tournament.gameId.gameBannerPhoto}
                alt={tournament.gameId.name}
                className="h-auto w-auto rounded-xl  shadow-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tournament Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Tournament Dates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary text-center">
                {new Date(tournament.tournamentDates.started).toDateString()} -{" "}
                {new Date(tournament.tournamentDates.ended).toDateString()}
              </p>
            </CardContent>
          </Card>

          {/* Tournament Organizer */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 justify-center">
                <img
                  src={tournament.organizerId.bannerPhoto}
                  alt={tournament.organizerId.orgName}
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <p className="text-lg font-bold text-primary">
                    {tournament.organizerId.orgName}
                  </p>
                  <p className="text-muted-foreground">Organizer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Prize Pool */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Prize Pool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-400 ">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-inherit divide-y divide-gray-500">
                  {tournament.prize.map((prize) => (
                    <tr key={prize.rank}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                        {prize.rank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                        {prize.amount} INR
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Tournament Bracket */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Tournament Bracket</CardTitle>
          </CardHeader>
          <CardContent>
            <TournamentBracket />
          </CardContent>
        </Card>
      </div>
    </AnimatePresence>
  );
}
