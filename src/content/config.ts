import { defineCollection, z } from 'astro:content';

const work = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        role: z.string(),
        year: z.string(),
        tags: z.array(z.string()),
        status: z.enum(['Live', 'In Progress', 'Complete']),
        description: z.string(),
        deliverables: z.array(z.string()),
        coverImage: z.string(),
        serialNumber: z.string(),
        featured: z.boolean().default(false)
    })
});

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        readTime: z.string(),
        excerpt: z.string(),
        tags: z.array(z.string())
    })
});

export const collections = { work, blog };

