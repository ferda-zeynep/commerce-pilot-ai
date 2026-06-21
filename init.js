const fs = require('fs');
const path = require('path');

// Helper to recursively create nested directories if they do not exist
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

// Helper to write content into a specified file path
function writeFile(targetPath, content) {
  ensureDirectoryExistence(targetPath);
  fs.writeFileSync(targetPath, content.trim(), 'utf8');
  console.log(`[CREATED] ${targetPath}`);
}

console.log("Initializing CommercePilot AI Next.js 15 & TS repository structures...");

// 1. package.json Setup
writeFile('package.json', `{
  "name": "commerce-pilot-ai",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@prisma/client": "^6.0.0",
    "lucide-react": "^0.300.0",
    "next": "^15.1.0",
    "openai": "^4.24.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "postcss": "^8.0.0",
    "prisma": "^6.0.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0"
  }
}`);

// 2. tsconfig.json Setup
writeFile('tsconfig.json', `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`);

// 3. tailwind.config.ts Setup
writeFile('tailwind.config.ts', `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#080610',
        cardBg: '#110d24',
        cardHover: '#181333',
        borderPurple: '#2d1e4d',
        purpleAccent: '#a855f7',
        purpleBright: '#c084fc',
        codeBg: '#0d0a1a',
        textLight: '#f8fafc',
        textMuted: '#94a3b8',
      },
    },
  },
  plugins: [],
};
export default config;`);

// 4. postcss.config.mjs Setup
writeFile('postcss.config.mjs', `const config = {
  plugins: {
    tailwindcss: {},
  },
};
export default config;`);

// 5. Prisma Schema Setup
writeFile('prisma/schema.prisma', `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model DemoSandbox {
  id               String   @id @default(uuid())
  companyName      String
  industry         String
  targetMarket     String
  strategicGoal    String
  generatedCatalog Json     
  createdAt        DateTime @default(now())
}

model CatalogVectorEmbedding {
  id         String   @id @default(uuid())
  productId  String
  embedding  Unsupported("vector")
}`);

// 6. TypeScript Types Setup
writeFile('types/demo.ts', `export interface DemoPayloadSchema {
  companyName: string;
  industry: 'Fashion' | 'Pet Care' | 'Electronics';
  targetMarket: string;
  strategicGoal: string;
}

export interface CatalogProduct {
  name: string;
  price: string;
  tag: string;
  img: string;
}

export interface PersonaCatalogTemplate {
  bannerTag: string;
  bannerTitle: string;
  bannerDesc: string;
  bannerBtn: string;
  bannerHighlight: string;
  products: CatalogProduct[];
}

export interface GeneratedSandboxData {
  brandProfile: string;
  NewCustomer: PersonaCatalogTemplate;
  VIPCustomer: PersonaCatalogTemplate;
  ChurnRisk: PersonaCatalogTemplate;
}`);

// 7. OpenAI Config Library Setup
writeFile('lib/openai.ts', `import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY in environment variables');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 3,
  timeout: 15000
});`);

// 8. Globals CSS Setup
writeFile('app/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #080610;
  color: #f8fafc;
  font-family: ui-sans-serif, system-ui, sans-serif;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #080610;
}
::-webkit-scrollbar-thumb {
  background: #1c1538;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #2d1e4d;
}`);

// 9. Root Layout Setup
writeFile('app/layout.tsx', `import './globals.css';

export const metadata = {
  title: 'CommercePilot AI - Presales Enablement Platform',
  description: 'Instantly generate high-performance personalized commerce demo environments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}`);

// 10. Prospect Form Component Setup
writeFile('components/ProspectForm.tsx', `'use client';

import React, { useState } from 'react';
import type { DemoPayloadSchema } from '@/types/demo';

interface ProspectFormProps {
  onGenerate: (data: DemoPayloadSchema) => void;
  isLoading: boolean;
}

export default function ProspectForm({ onGenerate, isLoading }: ProspectFormProps) {
  const [formData, setFormData] = useState<DemoPayloadSchema>({
    companyName: 'NordStyle',
    industry: 'Fashion',
    targetMarket: 'Germany',
    strategicGoal: 'Increase Average Order Value',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const applyPreset = (company: string, industry: 'Fashion' | 'Pet Care' | 'Electronics', market: string, goal: string) => {
    setFormData({ companyName: company, industry, targetMarket: market, strategicGoal: goal });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Presets Grid */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-textMuted mb-3 text-center">Fast-Track Solution Presets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div 
            onClick={() => applyPreset('NordStyle', 'Fashion', 'Germany', 'Increase Average Order Value')}
            className="group p-4 bg-cardBg border border-borderPurple/30 rounded-xl hover:border-purpleAccent cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-purpleBright">NordStyle</span>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">AOV Boost</span>
            </div>
            <p className="text-[11px] text-textMuted">Premium Alpine Wear • Germany • Focus on cross-sells & bundles</p>
          </div>

          <div 
            onClick={() => applyPreset('BarkBites', 'Pet Care', 'United Kingdom', 'Drive Repeat Purchase Rate')}
            className="group p-4 bg-cardBg border border-borderPurple/30 rounded-xl hover:border-purpleAccent cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-center mb-1">
              <span class="font-bold text-sm text-purpleBright">BarkBites</span>
              <span class="text-[9px] bg-purpleAccent/20 text-purpleBright px-2 py-0.5 rounded border border-purpleAccent/30">Retention</span>
            </div>
            <p className="text-[11px] text-textMuted">Organic Dog Nutrition • UK • Auto-replenish subscriber flows</p>
          </div>

          <div 
            onClick={() => applyPreset('ElectroPulse', 'Electronics', 'United States', 'Cross-Sell High Margin Accessories')}
            className="group p-4 bg-cardBg border border-borderPurple/30 rounded-xl hover:border-purpleAccent cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-purpleBright">ElectroPulse</span>
              <span className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">Margins</span>
            </div>
            <p className="text-[11px] text-textMuted">Audiophile Workspaces • US • Custom DAC and accessory kits</p>
          </div>
        </div>
      </div>

      {/* Main Input Form */}
      <div className="bg-cardBg border border-borderPurple/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purpleAccent to-purpleBright"></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-1.5">Company / Client Brand</label>
              <input 
                type="text" 
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required 
                className="w-full bg-darkBg border border-borderPurple/50 rounded-lg px-3 py-2 text-xs text-textLight focus:outline-none focus:border-purpleAccent transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-1.5">Commerce Industry Sector</label>
              <select 
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value as any })}
                className="w-full bg-darkBg border border-borderPurple/50 rounded-lg px-3 py-2 text-xs text-textLight focus:outline-none focus:border-purpleAccent transition-all"
              >
                <option value="Fashion">Fashion & Apparel</option>
                <option value="Pet Care">Pet Care & Nutrition</option>
                <option value="Electronics">Consumer Electronics</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-1.5">Target Regional Country</label>
              <input 
                type="text" 
                value={formData.targetMarket}
                onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                required 
                className="w-full bg-darkBg border border-borderPurple/50 rounded-lg px-3 py-2 text-xs text-textLight focus:outline-none focus:border-purpleAccent transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-1.5">Strategic Solution Goal</label>
              <select 
                value={formData.strategicGoal}
                onChange={(e) => setFormData({ ...formData, strategicGoal: e.target.value })}
                className="w-full bg-darkBg border border-borderPurple/50 rounded-lg px-3 py-2 text-xs text-textLight focus:outline-none focus:border-purpleAccent transition-all"
              >
                <option value="Increase Average Order Value">Increase Average Order Value / AOV</option>
                <option value="Drive Repeat Purchase Rate">Drive Repeat Subscriber Purchase Rates</option>
                <option value="Cross-Sell High Margin Accessories">Cross-Sell Premium Margin Accessories</option>
              </select>
            </div>
          </div>

          {/* Prompt Payload Display */}
          <div className="bg-codeBg border border-borderPurple/50 rounded-lg p-3 space-y-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-bold text-purpleBright"><i className="fa-solid fa-code mr-1"></i> OpenAI Prompt Schema Payload:</span>
              <span className="text-textMuted">application/json</span>
            </div>
            <pre className="text-[10px] text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-tight">
{JSON.stringify({
  companyName: formData.companyName,
  industry: formData.industry,
  targetMarket: formData.targetMarket,
  strategicGoal: formData.strategicGoal
}, null, 2)}
            </pre>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purpleAccent to-purpleBright hover:opacity-95 disabled:opacity-50 text-darkBg font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-lg shadow-purpleAccent/25 flex items-center justify-center gap-1.5"
          >
            {isLoading ? 'Executing LLM Synthesis...' : 'Synthesize Demo Environment'}
          </button>
        </form>
      </div>
    </div>
  );
}`);

// 11. OpenAI Completion API Route Setup
writeFile('app/api/generate-demo/route.ts', `import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import type { DemoPayloadSchema } from '@/types/demo';

export async function POST(req: NextRequest) {
  try {
    const body: DemoPayloadSchema = await req.json();
    const { companyName, industry, targetMarket, strategicGoal } = body;

    if (!companyName || !industry || !targetMarket || !strategicGoal) {
      return NextResponse.json({ error: 'Missing mandatory fields' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: \`You are an elite Solution Consultant Demo Engineering Assistant.
Generate a structured JSON output representing a commerce catalog demo sandbox.
Return exactly these keys and follow the specified structures:
{
  "brandProfile": "Short strategic synopsis targeting \${targetMarket} under industry \${industry}",
  "NewCustomer": { 
    "bannerTag": "NEW CUSTOMER OFFER",
    "bannerTitle": "A tailored headline",
    "bannerDesc": "Description text promoting \${strategicGoal}",
    "bannerBtn": "Call to action text",
    "bannerHighlight": "Highlighted collection name",
    "products": [{"name": "product 1", "price": "$120.00", "tag": "Best Seller", "img": "image_placeholder_url"}]
  },
  "VIPCustomer": { ... same keys tailored to premium shoppers ... },
  "ChurnRisk": { ... same keys tailored to win-back scenarios ... }
}\`
        },
        {
          role: 'user',
          content: \`Client brand: \${companyName}, Industry: \${industry}, Country: \${targetMarket}, Goal: \${strategicGoal}\`
        }
      ],
      temperature: 0.7
    });

    const parsedResponse = JSON.parse(completion.choices[0].message.content || '{}');

    // In local demo mode, database queries can be mocked if Postgres/Prisma are not configured
    return NextResponse.json({ 
      success: true, 
      id: "mock-uuid-1234-5678", 
      data: parsedResponse 
    });
  } catch (error: any) {
    console.error('[ROUTE_HANDLER_ERROR]', error);
    return NextResponse.json({ error: 'Failed structured catalog synthesis' }, { status: 500 });
  }
}`);

// 12. Main Landing Page Setup
writeFile('app/page.tsx', `'use client';

import React, { useState } from 'react';
import ProspectForm from '@/components/ProspectForm';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<any>(null);

  const handleGenerate = async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setGeneratedData(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 relative z-10 min-h-[calc(100vh-160px)]">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purpleAccent opacity-[0.06] blur-[140px] pointer-events-none z-0"></div>
      
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purpleAccent to-purpleBright flex items-center justify-center shadow-lg shadow-purpleAccent/20">
            <span className="text-darkBg font-bold text-lg">CP</span>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight">CommercePilot <span className="text-purpleAccent">AI</span></span>
            <span className="block text-[10px] text-textMuted uppercase tracking-widest">Presales Enablement Platform</span>
          </div>
        </div>
      </header>

      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          Generate High-Performance <span className="bg-gradient-to-r from-purpleBright to-purpleAccent bg-clip-text text-transparent">Demo Environments</span>
        </h1>
        <p className="text-sm text-textMuted">
          Instantly synthesize personalized brand attributes, target markets, user personas, search vectors, and multi-channel campaign strategies based on strategic objectives.
        </p>
      </div>

      <ProspectForm onGenerate={handleGenerate} isLoading={isLoading} />

      {generatedData && (
        <div className="mt-8 p-6 bg-cardBg rounded-2xl border border-borderPurple max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-purpleBright">Generated Sandbox Data Schema</h2>
          <pre className="text-xs text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
            {JSON.stringify(generatedData, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}`);

console.log("\\n[SUCCESS] Entire Next.js 15 CommercePilot AI codebase compiled in your target folder!");
console.log("Run 'npm install' then 'npm run dev' to start local development.");