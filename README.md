# CommercePilot AI

AI-powered presales enablement platform for generating personalized commerce demo environments.

CommercePilot AI helps Solution Consultants quickly generate personalized commerce demo experiences for prospective customers. By providing a company name, industry, target market, and business objective, users can instantly create a tailored demo sandbox featuring customer segmentation, storefront personalization, AI-powered product discovery, marketing campaigns, and executive demo scripts.

---

## Features

### Personalized Demo Environment Generation

Generate custom demo environments based on:

- Company Name
- Industry
- Target Market
- Business Objective

### Dynamic Customer Segmentation

Switch between multiple customer personas:

- New Customer
- VIP Customer
- Churn Risk Customer

Storefront content updates dynamically based on the selected visitor segment.

### AI Discovery Search

Conversational product discovery powered by LLMs and fallback metadata alignment loops.

### Campaign Copilot

Generate AI-powered marketing assets:

- Email Campaigns
- SMS Campaigns
- Homepage Banners

### Executive Demo Script Generator

Automatically generate presentation-ready demo walkthroughs for Solution Consultants.

---

## Why This Project?

CommercePilot AI was built to explore how AI can accelerate presales workflows by generating personalized commerce demo environments on demand.

The project is inspired by modern commerce and personalization platforms such as Bloomreach and focuses on the intersection of AI, Personalization, Commerce, Presales Enablement, and Solution Consulting.

---

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, React 19, Tailwind CSS
- **Backend**: Next.js Route Handlers, Prisma ORM, PostgreSQL
- **AI Integration**: OpenAI API Structure Loops
- **Deployment**: Vercel

---

## Project Structure

```bash
app/
├── api/
│   └── generate-demo/
│       └── route.ts      # Main LLM simulation loop
├── layout.tsx
├── page.tsx              # Dynamic Core workspace dashboard
components/
├── ProspectForm.tsx      # Transparent strategic form component
lib/
├── openai.ts             # Safeguarded OpenAI connection handler
prisma/
└── schema.prisma         # Structural database configurations
types/
└── demo.ts               # Strict TypeScript definitions

```

## Local Development

Clone the repository:

```bash
git clone https://github.com/your-username/commercepilot-ai.git
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Future Improvements

- Shopify Storefront API Integration
- Vector Search with pgvector
- Agentic Campaign Generation
- Multi-Industry Templates
- Demo Sharing Links
- Team Collaboration Features

---

## Project Goal

The goal of CommercePilot AI is to demonstrate how AI-powered personalization, commerce experiences, and presales enablement tools can be combined into a single workflow that helps Solution Consultants create compelling customer demonstrations in minutes.
