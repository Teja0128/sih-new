"use server";

import { generateMinistryOfAyushReport, GenerateMinistryOfAyushReportOutput } from "@/ai/flows/generate-ministry-of-ayush-report";
import { chat } from "@/ai/flows/chatbot-flow";
import { z } from "zod";

export async function getAyushReport(
  startDate: Date,
  endDate: Date
): Promise<{ report: GenerateMinistryOfAyushReportOutput } | { error: string }> {
  try {
    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];
    
    // The AI flow now returns the entire report object directly.
    const reportData = await generateMinistryOfAyushReport({
      startDate: start,
      endDate: end,
    });

    // Return the full structured report object.
    return { report: reportData };
  } catch (e) {
    console.error("Error in getAyushReport:", e);
    // It's helpful to return a more specific error message if possible.
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to generate report. Details: ${errorMessage}` };
  }
}

const ChatInputSchema = z.object({
  message: z.string(),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({ text: z.string() })),
  })).optional(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;


const ChatOutputSchema = z.object({
  response: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;


export async function getChatbotResponse(input: ChatInput): Promise<ChatOutput> {
  try {
    const result = await chat(input);
    // Safeguard to ensure we always return a valid response object.
    if (!result || typeof result !== 'string') {
        console.error("Chatbot flow returned an invalid response:", result);
        return { response: "I'm sorry, I could not process that. Please try again." };
    }
    return { response: result };
  } catch (e) {
    console.error("Error in getChatbotResponse:", e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { response: `Sorry, I encountered an error: ${errorMessage}` };
  }
}