'use server';

/**
 * @fileOverview An intelligent diagnosis search flow that provides dual-code suggestions from both NAMASTE and ICD-11 TM2.
 *
 * - intelligentDiagnosisSearch - A function that handles the diagnosis search process.
 * - IntelligentDiagnosisSearchInput - The input type for the intelligentDiagnosisSearch function.
 * - IntelligentDiagnosisSearchOutput - The return type for the intelligentDiagnosisSearch function.
 */

import { z } from 'genkit';
import { searchNamaste } from '@/services/namaste-api';
import { searchWhoIcd11 } from '@/services/who-api';

const IntelligentDiagnosisSearchInputSchema = z.object({
  query: z.string().describe('The diagnosis search query.'),
  filter: z
    .enum(['Ayurveda', 'Siddha', 'Unani'])
    .optional()
    .describe('The filter to apply to the search results.'),
});
export type IntelligentDiagnosisSearchInput = z.infer<typeof IntelligentDiagnosisSearchInputSchema>;

const IntelligentDiagnosisSearchOutputSchema = z.object({
  results: z.array(
    z.object({
      namasteCode: z.string().describe('The NAMASTE code.'),
      icd11Code: z.string().describe('The ICD-11 code.'),
      description: z.string().describe('The description of the diagnosis.'),
    })
  ).describe('The search results.'),
});
export type IntelligentDiagnosisSearchOutput = z.infer<typeof IntelligentDiagnosisSearchOutputSchema>;

/**
 * Performs a local search for NAMASTE data and a live API search for ICD-11 data,
 * then correlates them.
 */
export async function intelligentDiagnosisSearch(
  input: IntelligentDiagnosisSearchInput
): Promise<IntelligentDiagnosisSearchOutput> {
  const { query, filter } = input;

  // 1. Search for NAMASTE records from the local mock data.
  const namasteResults = await searchNamaste(query, filter);

  if (!namasteResults.length) {
    return { results: [] };
  }

  // 2. For each NAMASTE result, find the corresponding ICD-11 code from the WHO API.
  const correlatedResultsPromises = namasteResults.map(async (namasteRecord) => {
    // Use the description from the NAMASTE record to find a matching ICD-11 record.
    const whoResults = await searchWhoIcd11(namasteRecord.description);

    // Find the best match (or first match) from the WHO results.
    const icd11Code = whoResults.length > 0 ? whoResults[0].icd11Code : 'N/A';

    return {
      namasteCode: namasteRecord.namasteCode || 'N/A',
      icd11Code: icd11Code,
      description: namasteRecord.description,
    };
  });
  
  const correlatedResults = await Promise.all(correlatedResultsPromises);

  // Remove duplicates that might arise from the search.
  const uniqueResults = Array.from(new Map(correlatedResults.map(item => [item.namasteCode + item.icd11Code, item])).values());

  return {
    results: uniqueResults,
  };
}
