
import { z } from 'zod';
import mockData from '@/lib/mock-data.json';

export const WhoIcd11Record = z.object({
  icd11Code: z.string(),
  description: z.string(),
});
export type WhoIcd11Record = z.infer<typeof WhoIcd11Record>;

export async function searchWhoIcd11(query: string): Promise<WhoIcd11Record[]> {
  console.log(`Searching mock WHO data for: "${query}"`);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 250));

  const results = mockData.filter((item: any) => {
    const description = item.description || item.Long_definition || item.Short_definition || item.NUMC_TERM || "";
    const icd11Code = item.icd11Code || "";
    const queryLower = query.toLowerCase();

    return description.toLowerCase().includes(queryLower) || icd11Code.toLowerCase().includes(queryLower);
  });
  
  const mappedResults = results.map((item: any) => ({
    icd11Code: item.icd11Code || 'N/A',
    description: item.description || item.Long_definition || item.Short_definition || item.NUMC_TERM,
  })).filter(item => item.icd11Code !== 'N/A');

  // Remove duplicates
  const uniqueResults = Array.from(new Map(mappedResults.map(item => [item.icd11Code, item])).values());
  
  return uniqueResults;
}
