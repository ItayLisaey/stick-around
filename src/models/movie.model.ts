import { z } from 'zod';

export const BaseMovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    releaseDate: z.date(),
    overview: z.string(),
    posterPath: z.string(),
});

export const CreditsSchema = z.object({
    during: z.number(),
    after: z.number(),
    trust: z.number().min(1).max(4),
    total: z.number(),
});

export const MovieSchema = BaseMovieSchema.extend({
    credits: CreditsSchema,
});

export const VoteSchema = z.object({
    during: z.boolean(),
    after: z.boolean(),
});

export const CreditsPayload = z.object({
    movie: z.number(),
    vote: VoteSchema,
});

export type BaseMovie = z.infer<typeof BaseMovieSchema>;
export type Movie = z.infer<typeof MovieSchema>;
export type Credits = z.infer<typeof CreditsSchema>;
export type Vote = z.infer<typeof VoteSchema>;
export type CreditsPayload = z.infer<typeof CreditsPayload>;
