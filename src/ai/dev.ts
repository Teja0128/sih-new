'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-ministry-of-ayush-report.ts';
import '@/ai/flows/intelligent-diagnosis-search.ts';
import '@/ai/flows/chatbot-flow.ts';
