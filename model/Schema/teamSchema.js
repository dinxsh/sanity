import { z } from 'zod';

export const teamSchema = z.object({
    teamname: z.string(),
    game: z.string(),
    role: z.string(),
    rank: z.string(),
    server: z.string(),
    language: z.string(),
    players: z.string(),
    requests: z.string(),

});
