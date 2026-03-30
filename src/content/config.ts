import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    index: z.number(),
    description: z.string(),
    tags: z.array(z.string()),
    href: z.string().url().optional(),
    accentColor: z.string(),
    featured: z.boolean().default(false),
    problem: z.string(),
    constraints: z.array(z.string()),
    architectureDecisions: z.array(z.string()),
    tradeoffs: z.array(z.string()),
    outcome: z.object({
      metrics: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      ),
      summary: z.string(),
    }),
    stack: z.array(z.string()),
    role: z.string(),
    duration: z.string(),
    coverImage: z.string().optional(),
  }),
});

const experience = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    title: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    current: z.boolean().default(false),
    description: z.string(),
    achievements: z.array(z.string()),
    stack: z.array(z.string()),
    index: z.number(),
  }),
});

const certifications = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
  }),
});

export const collections = { projects, experience, certifications };
