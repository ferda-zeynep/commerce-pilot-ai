"use client";

import React, { useState, useEffect } from "react";
import ProspectForm from "@/components/ProspectForm";
import type { GeneratedSandboxData } from "@/types/demo";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedData, setGeneratedData] =
    useState<GeneratedSandboxData | null>(null);
  const [activeTab, setActiveTab] = useState<
    "storefront" | "search" | "campaign" | "script"
  >("storefront");
  const [currentPersona, setCurrentPersona] = useState<
    "NewCustomer" | "VIPCustomer" | "ChurnRisk"
  >("VIPCustomer");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [prospectProfile, setProspectProfile] = useState({
    company: "",
    industry: "",
    goal: "",
    country: "",
  });

  const steps = [
    "Connecting OpenAI GPT-4o completions API...",
    "Formatting structured brand variables...",
    "Assembling PGVector cosine similarity catalogs...",
    "Writing omnichannel email, SMS, and widget copy...",
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingStep(0);
    }
  }, [isLoading]);

  const handleGenerate = async (formData: any) => {
    setIsLoading(true);
    setLoadingStep(0);
    setGeneratedData(null);
    setProspectProfile({
      company: formData.companyName,
      industry: formData.industry,
      goal: formData.strategicGoal,
      country: formData.targetMarket,
    });

    try {
      const response = await fetch("/api/generate-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      setTimeout(() => {
        if (result && result.success && result.data) {
          setGeneratedData(result.data);
          setSearchResults([]);
          setSearchQuery("");
          setCurrentPersona("VIPCustomer");
          setActiveTab("storefront");
        }
        setIsLoading(false);
      }, 3400);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generatedData) return;

    const queryLower = searchQuery.toLowerCase().trim();
    if (!queryLower) {
      setSearchResults([]);
      return;
    }

    const allProducts = [
      ...(generatedData.NewCustomer?.products || []),
      ...(generatedData.VIPCustomer?.products || []),
      ...(generatedData.ChurnRisk?.products || []),
    ];

    const matched = allProducts.filter((product, index, self) => {
      const matchesQuery =
        product.name?.toLowerCase().includes(queryLower) ||
        product.description?.toLowerCase().includes(queryLower) ||
        product.tag?.toLowerCase().includes(queryLower);

      const isUnique = self.findIndex((p) => p.name === product.name) === index;

      return matchesQuery && isUnique;
    });

    setSearchResults(matched.length > 0 ? matched : allProducts.slice(0, 2));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 relative z-10 min-h-screen font-sans">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purpleAccent opacity-[0.06] blur-[140px] pointer-events-none z-0"></div>

      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 border-b border-borderPurple/40 pb-4">
        <div
          onClick={() => setGeneratedData(null)}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purpleAccent to-purpleBright flex items-center justify-center shadow-lg shadow-purpleAccent/20">
            <span className="text-darkBg font-black text-xl">CP</span>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-textLight">
              CommercePilot <span className="text-purpleAccent">AI</span>
            </span>
            <span className="block text-[10px] text-textMuted uppercase tracking-widest">
              Presales Enablement Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-textMuted select-none">
          <div className="flex items-center gap-4 border-r border-borderPurple/50 pr-6">
            <div className="flex flex-col items-center gap-1 hover:text-purpleBright cursor-pointer transition-colors">
              <i className="fa-solid fa-boxes-stacked text-base text-purpleAccent"></i>
              <span>Collections</span>
            </div>
            <div className="flex flex-col items-center gap-1 hover:text-purpleBright cursor-pointer transition-colors">
              <i className="fa-solid fa-scroll text-base"></i>
              <span>Demo Walkthrough</span>
            </div>
            <div className="flex flex-col items-center gap-1 hover:text-purpleBright cursor-pointer transition-colors">
              <i className="fa-solid fa-rectangle-ad text-base"></i>
              <span>Campaign Assets</span>
            </div>
            <div className="flex flex-col items-center gap-1 hover:text-purpleBright cursor-pointer transition-colors">
              <i className="fa-solid fa-sliders text-base"></i>
              <span>Settings</span>
            </div>
          </div>
          <div className="flex items-center bg-cardBg border border-borderPurple/60 p-1.5 rounded-xl text-xs font-bold text-purpleBright px-4 py-2">
            <i className="fa-solid fa-bolt mr-1.5"></i> Interactive Sandbox
            Connected
          </div>
        </div>
      </header>

      {!generatedData && !isLoading && (
        <>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight text-textLight">
              Generate High-Performance{" "}
              <span className="bg-gradient-to-r from-purpleBright to-purpleAccent bg-clip-text text-transparent">
                Demo Environments
              </span>
            </h1>
            <p className="text-sm text-textMuted">
              Instantly synthesize personalized brand attributes, target
              markets, user personas, search vectors, and multi-channel campaign
              strategies based on strategic objectives.
            </p>
          </div>
          <ProspectForm onGenerate={handleGenerate} isLoading={isLoading} />
        </>
      )}

      {isLoading && (
        <div className="max-w-xl mx-auto my-20 bg-cardBg border border-borderPurple/50 rounded-2xl p-8 shadow-2xl flex flex-col items-center justify-center space-y-8 text-center backdrop-blur-md">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-purpleAccent/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-purpleBright animate-spin"></div>
          </div>
          <h2 className="text-xl font-bold text-textLight">
            Executing LLM Structured Synthesis...
          </h2>
          <div className="w-full text-left space-y-3 bg-darkBg/50 p-5 rounded-xl border border-borderPurple/30">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 text-xs ${loadingStep > idx ? "text-emerald-400" : loadingStep === idx ? "text-purpleBright font-semibold" : "text-textMuted"}`}
              >
                <span>{loadingStep > idx ? "✓" : "○"}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {generatedData && !isLoading && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purpleAccent/10 to-transparent border border-borderPurple/40 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider bg-purpleAccent/25 border border-purpleAccent/30 text-purpleBright px-2 py-0.5 rounded">
                {prospectProfile.industry.toUpperCase()} HUB
              </span>
              <h2 className="text-2xl font-black text-textLight">
                {prospectProfile.company} Live Demo Hub
              </h2>
              <p className="text-xs text-textMuted">
                Successfully generated presales environment ready for
                demonstration walkthrough sequences.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setGeneratedData(null)}
                className="bg-darkBg hover:bg-cardBg border border-borderPurple/60 text-xs font-bold px-3.5 py-2 rounded-lg transition-all text-textLight"
              >
                Reset Sandbox
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-textMuted px-1">
                Touchpoint Canvas
              </h4>
              <nav className="space-y-1.5">
                {[
                  {
                    id: "storefront",
                    label: "Personalised Store",
                    badge: "LIVE",
                    icon: "fa-store",
                    bClass:
                      "bg-purpleAccent/10 border-purpleAccent/30 text-purpleBright",
                  },
                  {
                    id: "search",
                    label: "AI Discovery Search",
                    badge: "VECTORS",
                    icon: "fa-comments",
                    bClass:
                      "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
                  },
                  {
                    id: "campaign",
                    label: "Campaign Copilot",
                    badge: "GENAI",
                    icon: "fa-paper-plane",
                    bClass:
                      "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
                  },
                  {
                    id: "script",
                    label: "Pitch Walkthrough",
                    badge: "SC SCRIPT",
                    icon: "fa-route",
                    bClass: "bg-pink-500/10 border-pink-500/20 text-pink-400",
                  },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`w-full flex items-center justify-between text-left p-3 rounded-lg border transition-all text-xs font-semibold ${activeTab === t.id ? "bg-cardBg border-purpleAccent/50 text-textLight" : "bg-darkBg border-borderPurple/30 text-textMuted hover:text-textLight"}`}
                  >
                    <span className="flex items-center gap-2">
                      <i className={`fa-solid ${t.icon} text-sm`}></i>
                      {t.label}
                    </span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-black border uppercase tracking-wider ${t.bClass}`}
                    >
                      {t.badge}
                    </span>
                  </button>
                ))}
              </nav>
              <div className="bg-cardBg/50 border border-borderPurple/30 rounded-xl p-4 text-xs space-y-3">
                <span className="text-[10px] font-bold uppercase text-purpleBright flex items-center gap-1 border-b border-borderPurple/30 pb-1.5">
                  <i className="fa-solid fa-address-card"></i> Prospect Profile
                </span>
                <div className="space-y-2 text-[11px] text-textMuted">
                  <div>
                    <span className="block text-[9px] uppercase font-bold tracking-wider text-textMuted/60">
                      Synthesized Context:
                    </span>
                    <span className="text-textLight font-medium">
                      Premium {prospectProfile.industry.toLowerCase()} brand
                      targeting {prospectProfile.country} market.
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold tracking-wider text-textMuted/60">
                      Goal Impact Target:
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                      <i className="fa-solid fa-arrow-trend-up"></i>{" "}
                      {prospectProfile.goal}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              {activeTab === "storefront" && generatedData[currentPersona] && (
                <div className="bg-cardBg border border-borderPurple/50 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-darkBg/60 px-5 py-3 border-b border-borderPurple/35 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted">
                      Live Mock Storefront Preview
                    </span>
                    <select
                      value={currentPersona}
                      onChange={(e) => setCurrentPersona(e.target.value as any)}
                      className="bg-cardBg text-[10px] font-bold text-textLight border border-borderPurple/40 rounded px-2 py-0.5 focus:outline-none"
                    >
                      <option value="NewCustomer">New Visitor Segment</option>
                      <option value="VIPCustomer">
                        VIP Elite Loyalty Tier
                      </option>
                      <option value="ChurnRisk">Churn Risk Segment</option>
                    </select>
                  </div>

                  <div className="p-6 space-y-6 bg-gradient-to-b from-darkBg to-cardBg">
                    <div className="flex justify-between items-center pb-3 border-b border-borderPurple/20">
                      <span className="text-base font-black tracking-tight text-textLight">
                        {prospectProfile.company.toUpperCase()}
                      </span>
                      <div className="flex gap-4 text-xs text-purpleBright font-bold underline">
                        <span>
                          {generatedData[currentPersona].bannerHighlight ||
                            "Core Catalog"}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`rounded-xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r ${currentPersona === "VIPCustomer" ? "border-purpleAccent/50 from-purpleAccent/20 to-purpleBright/5" : currentPersona === "NewCustomer" ? "border-emerald-500/50 from-emerald-500/20 to-emerald-400/5" : "border-blue-500/50 from-blue-500/20 to-blue-400/5"}`}
                    >
                      <div className="space-y-1.5 max-w-lg">
                        <span
                          className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded text-darkBg ${currentPersona === "VIPCustomer" ? "bg-purpleBright" : currentPersona === "NewCustomer" ? "bg-emerald-400" : "bg-blue-400"}`}
                        >
                          {generatedData[currentPersona].bannerTag}
                        </span>
                        <h3 className="text-xl font-bold leading-snug text-textLight">
                          {generatedData[currentPersona].bannerTitle}
                        </h3>
                        <p className="text-xs text-textMuted">
                          {generatedData[currentPersona].bannerDesc}
                        </p>
                      </div>
                      <button className="bg-purpleAccent text-darkBg font-bold text-[10px] px-4 py-2.5 rounded-lg shrink-0">
                        {generatedData[currentPersona].bannerBtn}
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <h4 className="text-sm font-bold text-textLight">
                          Curated Recommendations
                        </h4>
                        <span className="text-[10px] text-purpleBright font-bold">
                          Loomi personalization engine active
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {generatedData[currentPersona].products?.map(
                          (p, idx) => (
                            <div
                              key={idx}
                              className="bg-darkBg border border-borderPurple/30 rounded-xl overflow-hidden group hover:border-purpleAccent/50 transition-all"
                            >
                              <div className="h-36 relative overflow-hidden bg-cardBg/40 flex items-center justify-center">
                                <img
                                  className="w-full h-full object-cover"
                                  alt={p.name}
                                  src={p.img}
                                />
                                <span className="absolute top-2.5 left-2.5 text-[8px] bg-purpleAccent text-darkBg font-bold px-1.5 py-0.5 rounded uppercase">
                                  {p.tag}
                                </span>
                              </div>
                              <div className="p-3 space-y-1.5">
                                <h5 className="font-bold text-xs text-textLight truncate">
                                  {p.name}
                                </h5>
                                <div className="flex justify-between items-center text-[11px]">
                                  <span className="font-black text-purpleBright">
                                    {p.price}
                                  </span>
                                  <span className="text-[9px] text-emerald-400 font-semibold">
                                    High-Affinity
                                  </span>
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "search" && (
                <div className="bg-cardBg border border-borderPurple/50 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-3 h-[420px]">
                  <div className="md:col-span-1 bg-darkBg/40 border-r border-borderPurple/35 p-4 flex flex-col justify-between text-xs text-textMuted leading-relaxed">
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold text-purpleBright uppercase tracking-wider block">
                        Supabase PGVector Layer
                      </span>
                      <p>
                        Rather than basic text queries, Bloomreach uses
                        multi-dimensional catalog embeddings to parse intent
                        maps.
                      </p>
                    </div>
                    <div className="bg-purpleAccent/5 border border-borderPurple/40 p-2.5 rounded-lg text-[10px]">
                      <span className="font-bold text-textLight block mb-1">
                        Try Searching For:
                      </span>
                      <code className="text-purpleBright">jacket</code>,{" "}
                      <code className="text-purpleBright">hoodie</code>,{" "}
                      <code className="text-purpleBright">hub</code>,{" "}
                      <code className="text-purpleBright">sound</code> or{" "}
                      <code className="text-purpleBright">food</code>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex flex-col h-full justify-between bg-darkBg/10">
                    <div className="flex-grow p-4 overflow-y-auto space-y-3">
                      <div className="text-xs text-textMuted bg-cardBg border border-borderPurple/45 rounded-xl p-3">
                        <strong>Loomi Search Assistant:</strong> Hello! Query
                        custom descriptive keywords. I will filter the catalog
                        dynamically via structural vector triggers.
                      </div>
                      {searchResults.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block px-1">
                            ✓ Vector Similarity Matches Found:
                          </span>
                          <div className="grid grid-cols-1 gap-2.5">
                            {searchResults.map((p, idx) => (
                              <div
                                key={idx}
                                className="bg-darkBg/80 border border-borderPurple/50 rounded-xl p-3 flex items-center gap-4 hover:border-purpleAccent/40 transition-all"
                              >
                                <img
                                  src={p.img}
                                  alt={p.name}
                                  className="w-12 h-12 rounded-lg object-cover border border-borderPurple/30 shrink-0"
                                />
                                <div className="flex-grow min-w-0">
                                  <div className="flex justify-between items-center gap-2">
                                    <h4 className="font-bold text-xs text-textLight truncate">
                                      {p.name}
                                    </h4>
                                    <span className="text-xs font-black text-purpleBright shrink-0">
                                      {p.price}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-textMuted truncate mt-0.5">
                                    {p.description ||
                                      "Synthesized premium item mapping."}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <form
                      onSubmit={handleSearchSubmit}
                      className="p-2 border-t border-borderPurple/30 bg-cardBg flex gap-2"
                    >
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ask search assistant (e.g. winter jacket, sound setup)..."
                        className="flex-grow bg-darkBg border border-borderPurple/50 rounded-lg px-3 py-2 text-xs text-textLight focus:outline-none focus:border-purpleAccent"
                      />
                      <button
                        type="submit"
                        className="bg-purpleAccent hover:bg-purpleBright text-darkBg px-5 rounded-lg font-bold text-xs transition-colors"
                      >
                        Run
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === "campaign" && generatedData.campaigns && (
                <div className="bg-cardBg border border-borderPurple/50 rounded-2xl p-5 space-y-4">
                  <h3 className="text-base font-bold text-purpleBright">
                    Multi-Channel Campaign Copilot
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-darkBg/50 border border-borderPurple/30 p-4 rounded-xl">
                      <span className="text-[9px] font-bold uppercase text-purpleBright block mb-1">
                        Email Subject Line
                      </span>
                      <p className="text-textLight italic">
                        "{generatedData.campaigns.emailSubject}"
                      </p>
                    </div>
                    <div className="bg-darkBg/50 border border-borderPurple/30 p-4 rounded-xl">
                      <span className="text-[9px] font-bold uppercase text-purpleBright block mb-1">
                        SMS Notification push
                      </span>
                      <p className="text-textLight italic">
                        "{generatedData.campaigns.smsText}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "script" && generatedData.demoScript && (
                <div className="bg-cardBg border border-borderPurple/50 rounded-2xl p-5 space-y-3">
                  <h3 className="text-base font-bold text-purpleBright">
                    Strategic Presales Demo Script
                  </h3>
                  <div className="space-y-2 text-xs">
                    {generatedData.demoScript.map((line, idx) => (
                      <div
                        key={idx}
                        className="bg-darkBg/40 border border-borderPurple/20 p-3 rounded-lg text-textLight"
                      >
                        <strong>Step {idx + 1}:</strong> {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
