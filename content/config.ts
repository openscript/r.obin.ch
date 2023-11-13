import { defineCollection, z } from 'astro:content';

const navigation = defineCollection({
  type: 'data',
  schema: ({ image }) => z.array(z.object({
    key: z.string(),
    path: z.string(),
    icon: image()
  }))
});


export const collections = {
  navigation,
};
