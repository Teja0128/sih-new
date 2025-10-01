import { z } from 'zod';
import mockData from '@/lib/mock-data.json';

export const NamasteRecord = z.object({
  namasteCode: z.string().optional(),
  description: z.string(),
  system: z.enum(['Ayurveda', 'Siddha', 'Unani', 'Unspecified']).optional(),
  NUMC_CODE: z.string().optional(),
  NUMC_TERM: z.string().optional(),
  Short_definition: z.string().optional(),
});
export type NamasteRecord = z.infer<typeof NamasteRecord>;

export async function searchNamaste(query: string, filter?: 'Ayurveda' | 'Siddha' | 'Unani'): Promise<NamasteRecord[]> {
  console.log(`Searching mock data for: "${query}" with filter: "${filter}"`);
  
  const results = mockData.filter((item: any) => {
    const description = item.description || item.Long_definition || item.Short_definition || item.NUMC_TERM || "";
    const arabicTerm = item.Arabic_term || "";
    const numcCode = item.NUMC_CODE || "";
    const namasteCode = item.namasteCode || "";

    const queryLower = query.toLowerCase();

    // Prioritize exact matches or whole word matches if possible
    const searchTerms = [description, arabicTerm, numcCode, namasteCode].map(t => t.toLowerCase());
    return searchTerms.some(term => term.includes(queryLower));
  });

  const mappedResults = results.map((item: any) => ({
    namasteCode: item.namasteCode || item.NUMC_CODE,
    description: item.description || item.Long_definition || item.Short_definition || item.NUMC_TERM,
    system: item.system || (item.NUMC_CODE?.startsWith('UM-') ? 'Unani' : 'Unspecified'),
  }));

  let finalResults = mappedResults;

  if (filter) {
    finalResults = mappedResults.filter(item => {
        if (filter === 'Unani' && item.system === 'Unspecified' && item.namasteCode?.startsWith('UM-')) {
            return true;
        }
        return item.system === filter;
    });
  }

  // Remove duplicates
  const uniqueResults = Array.from(new Map(finalResults.map(item => [item.namasteCode, item])).values());

  return uniqueResults;
}
