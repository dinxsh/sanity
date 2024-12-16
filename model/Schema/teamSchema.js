import { z } from "zod";

// Define Zod validation schema for the team
export const teamSchema = z.object({
    teamname: z.string().min(3, "Team name must be at least 3 characters"),
    game: z.string().min(1, "Game is required"),
    role: z.string().min(1, "Role is required"),
    rank: z.string().min(1, "Rank is required"),
    server: z.string().min(1, "Server is required"),
    language: z.string().min(1, "Language is required"),
    players: z.string().min(1, "Players field is required"),
    participantCount: z.string(), // assuming participant count is a number stored as string
});
