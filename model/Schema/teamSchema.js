import { z } from 'zod';

export const teamSchema = z.object({
    teamname: z.string().min(4, { message: 'Team name must be at least 4 characters long' }),
    game: z.string().min(4, { message: 'Game name must be at least 4 characters long' }),
    role: z.string().min(4, { message: 'Role must be at least 4 characters long' }),
    rank: z.string().min(4, { message: 'Rank must be at least 4 characters long' }),
    server: z.string().min(4, { message: 'Server must be at least 4 characters long' }),
    language: z.string().min(4, { message: 'Language must be at least 4 characters long' }),
    players: z.string().min(4, { message: 'Players field must be at least 4 characters long' }),
    requests: z.string().min(4, { message: 'Requests field must be at least 4 characters long' }),
});