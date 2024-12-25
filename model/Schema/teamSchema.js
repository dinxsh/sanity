import { z } from "zod";

export const teamSchema = z.object({
  teamname: z
    .string()
    .min(4, { message: "Team name must be at least 4 characters long" }),
  game: z
    .string()
    .min(4, { message: "Game name must be at least 4 characters long" }),
  role: z
    .string()
    .min(4, { message: "Role must be at least 4 characters long" }),
  rank: z
    .string()
    .min(4, { message: "Rank must be at least 4 characters long" }),
  server: z
    .string()
    .min(4, { message: "Server must be at least 4 characters long" }),
  language: z
    .string()
    .min(4, { message: "Language must be at least 4 characters long" }),
  players: z
    .union([
      // Handle string input (from frontend form)
      z.string().transform((val) =>
        typeof val === "string"
          ? val
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s !== "")
          : val,
      ),
      // Handle array input (for direct API calls)
      z.array(z.string()),
    ])
    .transform((val) => (Array.isArray(val) ? val : [val])),
});
