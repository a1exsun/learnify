import { tool } from 'ai';
import Exa from 'exa-js';
import { z } from 'zod';

import { Config } from '../../../base';

export const createExaTool = (config: Config) => {
  return tool({
    description: 'Search the web for information',
    parameters: z.object({
      query: z.string().describe('The query to search the web for.'),
      mode: z
        .enum(['MUST', 'CAN'])
        .optional()
        .describe('The mode to search the web for.'),
    }),
    execute: async ({ query, mode }) => {
      const { key } = config.copilot.exa;
      const exa = new Exa(key);
      const result = await exa.searchAndContents(query, {
        numResults: 10,
        summary: true,
        livecrawl: mode === 'MUST' ? 'always' : undefined,
      });
      return result.results.map(data => ({
        title: data.title,
        url: data.url,
        summary: data.summary,
        favicon: data.favicon,
        publishedDate: data.publishedDate,
        author: data.author,
      }));
    },
  });
};
