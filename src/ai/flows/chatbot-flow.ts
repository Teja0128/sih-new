'use server';
/**
 * @fileOverview A simple chatbot flow that uses Gemini to generate responses.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatHistorySchema = z.array(
  z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({ text: z.string() })),
  })
);

const ChatInputSchema = z.object({
  message: z.string().describe("The user's message."),
  history: ChatHistorySchema.optional().describe('The chat history.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;


export async function chat(input: ChatInput): Promise<string> {
    const { message, history } = input;
  
    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      history: history,
      prompt: `You are a helpful AI assistant named AyuLink Assistant. 
    Your role is to assist users of the AyuLink platform, which integrates traditional Indian medicine (Ayurveda, Siddha, Unani) with modern ICD-11 coding.

    - Be friendly, professional, and concise.
    - If you don't know an answer, say so.
    - Your knowledge is based on the application's context.
    - If asked about something you cannot do, politely explain your limitations.
    
    When you provide a direct answer to the user's question, wrap it in markdown bold syntax like this: **This is the answer.**

    Start the conversation by introducing yourself and asking how you can help, unless a history is provided.
    
    User Question: ${message}
    
    Your Answer:`,
    });
  
    const responseText = result.text || "Sorry, I am having trouble responding right now. Please try again later.";
  
    return responseText;
  }