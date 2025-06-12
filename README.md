# Clinical Trials Search

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-green?logo=openai&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss&logoColor=white)

A modern web application for searching and exploring clinical trials data with AI-powered conversational assistance. Built with cutting-edge technologies to help researchers, healthcare professionals, and patients discover relevant clinical trials efficiently.

## Features

- **🔍 Advanced Search** - Full-text search across trial titles, conditions, descriptions, and sponsors
- **🤖 AI Chat Assistant** - GPT-4o powered conversational interface for contextual help and insights
- **📊 Comprehensive Data** - Access to 1000+ real clinical trials from ClinicalTrials.gov
- **⚡ Real-time Results** - Fast in-memory search with instant pagination

## Demo

<!-- Add a screenshot or GIF demo here when available -->
*Visit the live application to see it in action*

## Quick Start

### Prerequisites

- Node.js 18+ or later
- pnpm (recommended), npm, or yarn
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dylan-gluck/clinical-trials-search.git
   cd clinical-trials-search
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to start exploring clinical trials

## Architecture

### Project Structure

```
clinical-trials-search/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── api/chat/          # AI chat API endpoint
│   │   ├── layout.tsx         # Root layout with global styles
│   │   ├── page.tsx           # Main application page
│   │   └── globals.css        # Global CSS styles
│   ├── components/            # React components
│   │   ├── app/               # Application-specific components
│   │   │   ├── results-view.tsx    # Search results display
│   │   │   └── search-view.tsx     # Search interface
│   │   ├── assistant-ui/      # AI chat interface components
│   │   │   ├── selected-trials-tool.tsx
│   │   │   ├── thread.tsx
│   │   │   └── ...
│   │   └── ui/                # Reusable UI components (shadcn/ui)
│   ├── data/                  # Clinical trials dataset
│   │   └── trials.json        # 1000+ trial records from ClinicalTrials.gov
│   ├── lib/                   # Core utilities and configurations
│   │   ├── db.ts              # In-memory database with search capabilities
│   │   └── utils.ts           # Utility functions
│   ├── services/              # Business logic layer
│   │   └── trials-service.ts  # Trials search, filtering, and data transformation
│   ├── state/                 # Application state management
│   │   └── app-store.ts       # Zustand store for global state
│   └── types/                 # TypeScript type definitions
│       └── clinical-trial.ts  # Complete clinical trial data interfaces
├── docs/                      # Documentation
├── public/                    # Static assets
└── ...config files
```

### Technology Stack

**Frontend Framework**
- **Next.js 15** - React framework with App Router and Turbopack
- **React 19** - Latest React with concurrent features and optimizations
- **TypeScript** - Type-safe development with strict type checking

**Styling & UI**
- **Tailwind CSS 4.0** - Utility-first CSS framework with latest features
- **Radix UI** - Accessible, unstyled UI components
- **shadcn/ui** - Beautiful, customizable component library
- **Lucide React** - Beautiful and consistent icon library

**AI & Backend**
- **OpenAI GPT-4o** - Advanced conversational AI for trial assistance
- **Vercel AI SDK** - Streaming AI responses with tool support
- **Assistant UI** - Pre-built, customizable chat interface components

**Data & State Management**
- **Zustand** - Lightweight state management for global app state
- **Zod** - TypeScript-first schema validation for API safety
- **In-memory Database** - Fast search and filtering for clinical trial data

## API Reference

### Search Trials
```typescript
GET /api/trials?q={query}&page={page}&limit={limit}

// Example
GET /api/trials?q=cancer&page=1&limit=20
```

**Parameters:**
- `q` (string, optional) - Search query for filtering trials
- `page` (number, optional) - Page number for pagination (default: 1)
- `limit` (number, optional) - Number of results per page (default: 20, max: 100)

### AI Chat Interface
```typescript
POST /api/chat
Content-Type: application/json

{
  "messages": [
    {
      "role": "user",
      "content": "Find cancer trials in California"
    }
  ],
  "system": "You are a helpful clinical trials assistant...",
  "tools": {...}
}
```

### Available AI Tools
- `searchTrials` - Search clinical trials with parameters
- `getTrialDetails` - Get detailed information about specific trials
- `selectedTrialsTool` - Manage and analyze selected trials

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack for fast HMR |
| `pnpm build` | Build optimized production bundle |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint for code quality and consistency |
| `pnpm type-check` | Run TypeScript compiler for type checking |

### Environment Variables

```env
# Required - OpenAI API key for AI chat functionality
OPENAI_API_KEY=your_openai_api_key_here

# Optional - Application URL for absolute links
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Data Model

The application uses the official ClinicalTrials.gov data structure with comprehensive trial information:

- **Protocol Section**
  - **Identification** - NCT ID, brief/official titles, organization details
  - **Status** - Study phase, enrollment status, start/completion dates
  - **Design** - Study type, allocation, intervention model, masking
  - **Eligibility** - Inclusion/exclusion criteria, age ranges, demographics
  - **Interventions** - Treatments, drugs, procedures, dosing
  - **Outcomes** - Primary and secondary endpoints
  - **Contacts & Locations** - Study sites, investigators, contact information
  - **Sponsors** - Lead sponsors, collaborators, responsible parties

## Acknowledgments

- **[ClinicalTrials.gov](https://clinicaltrials.gov/)** - Comprehensive clinical trial data source
- **[OpenAI](https://openai.com/)** - Advanced AI capabilities for conversational assistance
- **[Vercel](https://vercel.com/)** - AI SDK, hosting platform, and developer tools
- **[Radix UI](https://www.radix-ui.com/)** - Accessible, unstyled UI components
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, reusable component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
