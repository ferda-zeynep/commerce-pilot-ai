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
    "storefront" | "search" | "campaign" | "script" | "json"
  >("storefront");
  const [currentPersona, setCurrentPersona] = useState<
    "NewCustomer" | "VIPCustomer" | "ChurnRisk"
  >("NewCustomer");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [prospectProfile, setProspectProfile] = useState({
    company: "",
    industry: "",
    goal: "",
    country: "",
  });

  const steps = [
    "Analyzing metadata & market benchmarks...",
    "Generating custom brand profiles and persona triggers...",
    "Assembling custom product catalog using PGVector similarity...",
    "Setting up automation paths for email, SMS & web campaigns...",
    "Drafting tailored SC walkthrough script for presentation...",
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
      }, 700);
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
          setCurrentPersona("NewCustomer");
          setActiveTab("storefront");
        }
        setIsLoading(false);
      }, 3800);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generatedData) return;

    const keywords = searchQuery.toLowerCase();
    const allProducts = [
      ...(generatedData.NewCustomer?.products || []),
      ...(generatedData.VIPCustomer?.products || []),
      ...(generatedData.ChurnRisk?.products || []),
    ];

    const matched = allProducts.filter((p) => {
      return (
        p.name?.toLowerCase().includes(keywords) ||
        p.description?.toLowerCase().includes(keywords)
      );
    });
    setSearchResults(matched.length > 0 ? matched : allProducts.slice(0, 2));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 relative z-10 min-h-screen font-sans">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purpleAccent opacity-[0.06] blur-[140px] pointer-events-none z-0"></div>

      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div
          onClick={() => setGeneratedData(null)}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purpleAccent to-purpleBright flex items-center justify-center shadow-lg shadow-purpleAccent/20">
            <span className="text-darkBg font-black text-xl">CP</span>
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-textLight">
              CommercePilot <span className="text-purpleAccent">AI</span>
            </span>
            <span className="block text-[11px] text-textMuted uppercase tracking-widest font-bold">
              Presales Enablement Studio
            </span>
          </div>
        </div>
        <div className="text-xs bg-purpleAccent/10 border border-purpleAccent/30 text-purpleBright px-4 py-1.5 rounded-full font-bold">
          <i className="fa-solid fa-bolt mr-1"></i> Bloomreach Presales Sandbox
        </div>
      </header>

      {!generatedData && !isLoading && (
        <>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-5xl font-black tracking-tight mb-4 leading-tight text-textLight">
              Generate High-Performance{" "}
              <span className="bg-gradient-to-r from-purpleBright to-purpleAccent bg-clip-text text-transparent">
                Demo Environments
              </span>
            </h1>
            <p className="text-sm text-textMuted">
              Instantly synthesize personalized brand attributes and
              multi-channel campaign strategies based on strategic objectives.
            </p>
          </div>
          <ProspectForm onGenerate={handleGenerate} isLoading={isLoading} />
        </>
      )}

      {isLoading && (
        <div className="max-w-xl mx-auto my-20 bg-cardBg border border-borderPurple/50 rounded-2xl p-8 shadow-2xl flex flex-col items-center justify-center space-y-8 text-center backdrop-blur-md">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-purpleAccent/20 border-t-purpleAccent animate-spin"></div>
          </div>
          <h2 className="text-2xl font-black text-textLight">
            Assembling Custom Demo Sandbox...
          </h2>
          <div className="w-full text-left space-y-3 bg-darkBg/50 p-5 rounded-xl border border-borderPurple/30">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-purpleAccent text-xs font-bold">
                  {loadingStep > idx ? "✓" : "○"}
                </span>
                <span className="text-xs text-textLight">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {generatedData && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold text-purpleBright tracking-wider block px-1">
                Demo Touchpoints
              </span>
              <div className="flex flex-col gap-2.5">
                {["storefront", "search", "campaign", "script"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold border ${activeTab === tab ? "border-purpleAccent bg-purpleAccent/10 text-purpleBright" : "border-borderPurple/30 bg-cardBg/50 text-textLight"}`}
                  >
                    <span className="capitalize">{tab} Preview</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-cardBg/25 border border-borderPurple/40 rounded-2xl p-5 text-sm text-textLight">
              <span className="block font-bold text-purpleBright mb-1">
                Brand: {prospectProfile.company}
              </span>
              <span>
                Targeting {prospectProfile.country} market to{" "}
                {prospectProfile.goal.toLowerCase()}.
              </span>
            </div>
          </div>

          <div className="lg:col-span-9 space-y-6">
            {activeTab === "storefront" && generatedData[currentPersona] && (
              <div className="bg-cardBg/30 border border-borderPurple/40 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                <div className="bg-darkBg/50 p-4 border-b border-borderPurple/40 flex justify-between items-center">
                  <span className="text-sm font-bold text-textLight">
                    Live Storefront
                  </span>
                  <select
                    value={currentPersona}
                    onChange={(e) => setCurrentPersona(e.target.value as any)}
                    className="bg-cardBg border border-purpleAccent/50 rounded-lg px-2 py-1 text-xs text-purpleBright font-bold"
                  >
                    <option value="NewCustomer">New Customer</option>
                    <option value="VIPCustomer">VIP Loyalty</option>
                    <option value="ChurnRisk">Churn Risk</option>
                  </select>
                </div>

                <div className="p-8 bg-gradient-to-br from-purpleAccent/10 via-darkBg/60 to-cardBg/40 relative">
                  <h3 className="text-3xl font-black text-textLight leading-tight">
                    {generatedData[currentPersona].bannerTitle}
                  </h3>
                  <p className="text-sm text-textMuted mt-2">
                    {generatedData[currentPersona].bannerDesc}
                  </p>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedData[currentPersona].products?.map((p, idx) => (
                    <div
                      key={idx}
                      className="bg-darkBg/60 border border-borderPurple/40 rounded-xl p-5 flex items-center gap-5"
                    >
                      {/* REAL-WORLD RENDER COMPONENT INSTEAD OF ICON EMOJIS */}
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-20 h-20 rounded-xl object-cover border border-borderPurple/30 shrink-0"
                      />
                      <div className="space-y-1 flex-1">
                        <div className="flex justify-between font-bold text-sm text-textLight">
                          <span>{p.name}</span>
                          <span className="text-purpleBright">{p.price}</span>
                        </div>
                        <p className="text-xs text-textMuted leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
