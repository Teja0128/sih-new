# AyuLink - Traditional Medicine Platform

## Overview
AyuLink is a Next.js application that bridges traditional Indian medicine (Ayurveda, Siddha, Unani) with modern ICD-11 coding. It provides an intelligent platform integrating NAMASTE and ICD-11 codes to streamline diagnosis and reporting for traditional Indian medicine.

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15.3.3 with Turbopack
- **Language**: TypeScript
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS with Radix UI components
- **AI Integration**: Google Genkit with Gemini 2.5 Flash
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation

### Project Structure
```
src/
├── ai/                 # AI flows and Genkit configuration
│   ├── flows/         # Chat, diagnosis search, and reporting flows
│   ├── genkit.ts      # Genkit AI setup
│   └── dev.ts         # Development entry point
├── app/               # Next.js app router pages
│   ├── (auth)/       # Authentication pages
│   ├── (main)/       # Main application pages
│   └── layout.tsx    # Root layout
├── components/        # React components
│   ├── ui/           # Reusable UI components
│   ├── auth/         # Authentication components
│   ├── chatbot/      # AI chatbot component
│   ├── layout/       # Layout components
│   ├── patients/     # Patient management components
│   └── reporting/    # Reporting components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and mock data
└── services/         # API services (NAMASTE, WHO)
```

## Configuration

### Development Setup
- **Port**: 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 (allows Replit proxy access)
- **Dev Server**: Next.js with Turbopack enabled

### Environment Variables
The application uses Google Genkit AI which requires:
- `GOOGLE_GENAI_API_KEY` - Google Gemini API key (optional for basic functionality)

### Next.js Configuration
- TypeScript and ESLint build errors ignored for flexibility
- Configured for Replit proxy with experimental.allowedDevOrigins
- External packages configured for Genkit AI
- Remote image patterns configured for various CDNs

## Deployment
- **Target**: Autoscale deployment
- **Build**: `npm run build`
- **Start**: `npm run start` (production server on port 5000)

## Core Features
1. **Intelligent Diagnosis Search** - Auto-complete search for NAMASTE and ICD-11 TM2 codes
2. **NAMASTE Code Validation** - Real-time validation against NAMASTE coding rules
3. **ICD-11 TM2 Integration** - Standardized terminology and coding
4. **FHIR R4 Patient Records** - Healthcare interoperability
5. **Dual Coding Support** - NAMASTE and ICD-11 codes
6. **Ministry of Ayush Reporting** - Generate formatted reports
7. **AI Chatbot** - AyuLink Assistant powered by Gemini

## Design
- **Primary Color**: Deep saffron (#FF9933)
- **Background**: Pale sand (#F5F5DC)
- **Accent**: Sky blue (#87CEEB)
- **Font**: Alegreya (humanist serif)

## Recent Changes
*September 30, 2025*
- Imported GitHub project to Replit environment
- Configured Next.js for Replit proxy (port 5000, host 0.0.0.0)
- Updated Next.js config for v15.3.3 compatibility
- Set up workflow for development server
- Configured autoscale deployment
- Installed all npm dependencies
