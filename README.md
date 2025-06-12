# Clinical Trials Search 🔬

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-green?logo=openai&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss&logoColor=white)

A modern web application for searching and exploring clinical trials data with AI-powered assistance.

## Overview

Clinical Trials Search combines powerful search capabilities with AI-driven conversational assistance to help researchers, healthcare professionals, and patients find relevant clinical trials. Built with Next.js 15 and powered by OpenAI's GPT-4o, it provides an intuitive interface for exploring comprehensive clinical trial information.

### Key Features

- 🔍 **Advanced Search** - Search across trial titles, conditions, descriptions, and sponsors
- 🤖 **AI Chat Assistant** - Get contextual help and insights about clinical trials
- 📊 **Comprehensive Data** - Access detailed trial information including protocols, eligibility, and locations

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/clinical-trials-search.git
   cd clinical-trials-search
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/chat/          # AI chat API endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── assistant-ui/      # AI chat interface components
│   └── ui/                # Reusable UI components (shadcn/ui)
├── data/                  # Clinical trials dataset
│   └── trials.json        # 1000+ trial records from ClinicalTrials.gov
├── lib/                   # Core utilities
│   ├── db.ts              # Database abstraction layer
│   └── utils.ts           # Utility functions
├── services/              # Business logic
│   └── trials-service.ts  # Trials search and filtering service
└── types/                 # TypeScript definitions
    └── clinical-trial.ts  # Complete clinical trial data types
```

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful icons

### AI & Backend
- **OpenAI GPT-4o** - Conversational AI assistance
- **AI SDK** - Vercel's AI toolkit for streaming responses
- **Assistant UI** - Pre-built chat interface components

### Data & Search
- **ClinicalTrials.gov Data** - Real clinical trial information
- **In-memory Database** - Fast search and filtering
- **Full-text Search** - Search across multiple trial fields

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint for code quality |

## API Endpoints

### Search Trials
```typescript
GET /api/trials?q=cancer&page=1&limit=20
```

### Get Trial Details
```typescript
GET /api/trials/NCT12345678
```

### AI Chat
```typescript
POST /api/chat
Content-Type: application/json

{
  "messages": [...],
  "system": "...",
  "tools": {...}
}
```

## Data Model

The application uses the official ClinicalTrials.gov data structure with comprehensive trial information:

- **Identification** - NCT ID, titles, organization
- **Status** - Study phase, enrollment status, dates
- **Design** - Study type, methodology, endpoints
- **Eligibility** - Inclusion/exclusion criteria, demographics
- **Interventions** - Treatments, drugs, procedures
- **Locations** - Study sites and contacts
- **Sponsors** - Lead sponsors and collaborators

## Configuration

### Environment Variables

```env
# Required
OPENAI_API_KEY=your_openai_api_key

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Acknowledgments

- **ClinicalTrials.gov** - Data source for clinical trial information
- **OpenAI** - AI assistance capabilities
- **Vercel** - AI SDK and hosting platform
- **Radix UI** - Accessible UI components
- **shadcn/ui** - Beautiful component library
