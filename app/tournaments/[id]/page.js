"use client";
import Link from "next/link";
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

  useEffect(() => {
    loadTournamentData();
  });

  const loadTournamentData = async () => {
    try {
      setLoading(true);
      const data = await fetchTournamentData(params.id);
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
        <Button onClick={loadTournamentData} arial-label="retry-btn">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <div className="container mx-auto px-4 py-10">
        {tournament && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Tournament Header */}
            <div className="mb-10 text-center">
              <motion.h1
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {tournament.title}
              </motion.h1>
              <motion.p
                className="text-muted-foreground mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {tournament.description}
              </motion.p>
              <motion.div
                className="flex justify-center gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button size="lg" asChild arial-label="register-now-btn">
                  <Link
                    href={`/tournaments/${tournament._id}/register`}
                    aria-label="register-now"
                  >
                    Register Now
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  arial-label="view-details-btn"
                >
                  View Details
                </Button>
              </motion.div>
            </div>

            {/* Tournament Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prize Pool</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    {tournament.prizePool}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Participants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    {tournament.participants}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {tournament.status}
                  </span>
                </CardContent>
              </Card>
            </div>

            {/* Tournament Bracket */}
            <Card className="mb-10">
              <CardHeader>
                <CardTitle>Tournament Bracket</CardTitle>
              </CardHeader>
              <CardContent>
                <TournamentBracket
                  matches={tournament.matches}
                  roundNames={tournament.roundNames}
                />
              </CardContent>
            </Card>

            {/* Rules and Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tournament Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {tournament?.rules?.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tournament &&
                      tournament?.schedule?.map((event, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-muted-foreground">
                            {event.stage}
                          </span>
                          <span className="text-primary">{event.date}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
