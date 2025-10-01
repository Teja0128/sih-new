'use server';
/**
 * @fileOverview Generates reports for the Ministry of Ayush.
 *
 * - generateMinistryOfAyushReport - A function that handles the report generation process.
 * - GenerateMinistryOfAyushReportInput - The input type for the generateMinistryOfAyushReport function.
 * - GenerateMinistryOfAyushReportOutput - The return type for the generateMinistryOfAyushReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { samplePatientFiles } from '@/lib/patient-data';

const GenerateMinistryOfAyushReportInputSchema = z.object({
  startDate: z.string().describe('The start date for the report (YYYY-MM-DD).'),
  endDate: z.string().describe('The end date for the report (YYYY-MM-DD).'),
});
export type GenerateMinistryOfAyushReportInput = z.infer<typeof GenerateMinistryOfAyushReportInputSchema>;


const DiagnosisDetailSchema = z.object({
  code: z.string().describe('The diagnosis code (either NAMASTE or ICD-11).'),
  description: z.string().describe('The description of the diagnosis.'),
  count: z.number().describe('The number of times this diagnosis was recorded.'),
});

const SystemDistributionSchema = z.object({
  system: z.enum(['Ayurveda', 'Siddha', 'Unani', 'ICD-11', 'Namaste', 'Unknown']).describe('The medical system.'),
  count: z.number().describe('The number of diagnoses for this system.'),
  percentage: z.number().describe('The percentage of total diagnoses for this system.'),
});

const GenerateMinistryOfAyushReportOutputSchema = z.object({
  summary: z.object({
    totalDiagnoses: z.number().describe('Total number of diagnoses recorded in the period.'),
    uniquePatients: z.number().describe('Number of unique patients diagnosed.'),
    topSystem: z.string().describe('The most frequently used medical system (e.g., Ayurveda).'),
  }),
  namasteBreakdown: z.array(DiagnosisDetailSchema).describe('Breakdown of the top 5 NAMASTE diagnoses.'),
  icd11Breakdown: z.array(DiagnosisDetailSchema).describe('Breakdown of the top 5 ICD-11 diagnoses.'),
  systemDistribution: z.array(SystemDistributionSchema).describe('Distribution of diagnoses across different systems.'),
  narrative: z.string().describe('A markdown-formatted narrative summary of the key findings and trends.'),
});
export type GenerateMinistryOfAyushReportOutput = z.infer<typeof GenerateMinistryOfAyushReportOutputSchema>;

export async function generateMinistryOfAyushReport(input: GenerateMinistryOfAyushReportInput): Promise<GenerateMinistryOfAyushReportOutput> {
  return generateMinistryOfAyushReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMinistryOfAyushReportPrompt',
  input: {schema: z.object({
    startDate: z.string(),
    endDate: z.string(),
    patientData: z.string(),
  })},
  output: {schema: GenerateMinistryOfAyushReportOutputSchema},
  prompt: `You are an expert in analyzing medical data and generating reports for the Ministry of Ayush.

Analyze the following patient data JSON provided for the period between {{{startDate}}} and {{{endDate}}}.

Patient Data:
\`\`\`json
{{{patientData}}}
\`\`\`

Your task is to generate a structured report based on this data. The output MUST be in the specified JSON format.

Report requirements:
1.  **Summary**: Calculate the total number of diagnoses, the count of unique patients, and identify the most frequent medical system.
2.  **NAMASTE Breakdown**: List the top 5 most frequent diagnoses based on their NAMASTE codes, including their code, description, and count.
3.  **ICD-11 Breakdown**: List the top 5 most frequent diagnoses based on their ICD-11 codes, including their code, description, and count.
4.  **System Distribution**: Provide the count and percentage for each medical system (Ayurveda, Siddha, Unani, and general ICD-11/Namaste).
5.  **Narrative**: Write a brief, insightful narrative in markdown that summarizes the key findings, highlights any noticeable trends, and provides context for the Ministry of Ayush.

Generate the full JSON object as your response.
`,
});

const generateMinistryOfAyushReportFlow = ai.defineFlow(
  {
    name: 'generateMinistryOfAyushReportFlow',
    inputSchema: GenerateMinistryOfAyushReportInputSchema,
    outputSchema: GenerateMinistryOfAyushReportOutputSchema,
  },
  async (input) => {
    // NOTE: In a real app, you'd fetch data from a database based on the date range.
    // Here, we'll use the mock data for demonstration.
    const relevantPatientData = samplePatientFiles; // Using all mock data regardless of date.

    const {output} = await prompt({
      ...input,
      patientData: JSON.stringify(relevantPatientData, null, 2),
    });
    return output!;
  }
);
