"use client";

import React, { useState, useEffect } from "react";
import ProspectForm from "@/components/ProspectForm";
import type { GeneratedSandboxData } from "@/types/demo";
import { ShopifyProduct } from "@/types/shopify";

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

  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [searchResults, setSearchResults] = useState<ShopifyProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [shopifyError, setShopifyError] = useState(false);
  const [prospectProfile, setProspectProfile] = useState({
    company: "",
    industry: "",
    goal: "",
    country: "",
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const steps = [
    "Connecting OpenAI GPT-4o completions API...",
    "Formatting structured brand variables...",
    "Assembling PGVector cosine similarity catalogs...",
    "Writing omnichannel email, SMS, and widget copy...",
  ];

  useEffect(() => {
    async function fetchCatalog() {
      try {
        const res = await fetch("/api/shopify/products");
        const json = await res.json();
        if (json.success) {
          setShopifyProducts(json.products);
        } else {
          setShopifyError(true);
        }
      } catch (err) {
        setShopifyError(true);
      }
    }
    fetchCatalog();
  }, [generatedData]);

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

  const triggerToast = (featureName: string) => {
    setToastMessage(
      `Presales Notification: ${featureName} environment matrix is active under local simulation restraints.`,
    );
    setTimeout(() => setToastMessage(null), 3500);
  };

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

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const queryClean = searchQuery.toLowerCase().trim();
    if (!queryClean || shopifyProducts.length === 0) return;

    setIsSearching(true);
    setTimeout(() => {
      const matched = shopifyProducts.filter((product) => {
        return (
          product.title.toLowerCase().includes(queryClean) ||
          product.description.toLowerCase().includes(queryClean)
        );
      });

      if (matched.length > 0) {
        setSearchResults(matched);
      } else {
        setSearchResults(shopifyProducts.slice(0, 4));
      }
      setIsSearching(false);
    }, 1200);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 relative z-10 min-h-screen font-sans text-textLight">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purpleAccent opacity-[0.06] blur-[140px] pointer-events-none z-0"></div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-cardBg border border-purpleAccent/50 px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold text-purpleBright animate-bounce">
          <i className="fa-solid fa-bolt mr-2"></i> {toastMessage}
        </div>
      )}

      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 border-b border-borderPurple/40 pb-4">
        <div
          onClick={() => setGeneratedData(null)}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purpleAccent to-purpleBright flex items-center justify-center shadow-lg shadow-purpleAccent/20">
            <span className="text-darkBg font-black text-xl">CP</span>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight">
              CommercePilot <span className="text-purpleAccent">AI</span>
            </span>
            <span className="block text-[10px] text-textMuted uppercase tracking-widest">
              Presales Enablement Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-textMuted select-none">
          <div className="flex items-center gap-5 border-r border-borderPurple/50 pr-6">
            <div
              onClick={() => triggerToast("Collections Hub")}
              className="flex flex-col items-center gap-1 hover:text-purpleBright cursor-pointer transition-colors"
            >
              <i className="fa-solid fa-boxes-stacked text-base text-purpleAccent"></i>
              <span>Collections</span>
            </div>
            <div
              onClick={() => triggerToast("Walkthrough Engine")}
              className="flex flex-col items-center gap-1 hover:text-purpleBright cursor-pointer transition-colors"
            >
              <i className="fa-solid fa-scroll text-base"></i>
              <span>Demo Walkthrough</span>
            </div>
            <div
              onClick={() => triggerToast("Campaign Assets Agent")}
              className="flex flex-col items-center gap-1 hover:text-purpleBright cursor-pointer transition-colors"
            >
              <i className="fa-solid fa-rectangle-ad text-base"></i>
              <span>Campaign Assets</span>
            </div>
            <div
              onClick={() => triggerToast("Workspace Settings")}
              className="flex flex-col items-center gap-1 hover:text-purpleBright cursor-pointer transition-colors"
            >
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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
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
          <h2 className="text-xl font-bold">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-gradient-to-r from-purpleAccent/10 to-transparent border border-borderPurple/40 rounded-2xl p-6 relative overflow-hidden">
              <span className="text-[9px] font-bold uppercase tracking-wider bg-purpleAccent/25 border border-purpleAccent/30 text-purpleBright px-2 py-0.5 rounded">
                {prospectProfile.industry.toUpperCase()} HUB
              </span>
              <h2 className="text-3xl font-black mt-2">
                Synthetic Sandbox Data
              </h2>
              <p className="text-xs text-textMuted mt-1 max-w-xl">
                Interacts resolution photo-realistic commercePilot AI net
                workflows for presales enablement studio walkthrough arrays.
              </p>
            </div>
            <div className="bg-cardBg border border-borderPurple/40 rounded-2xl p-5 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[10px] text-purpleBright font-bold">
                <span>OpenAI Payload Overview</span>
                <button
                  onClick={() => setGeneratedData(null)}
                  className="text-textMuted hover:text-textLight text-xs font-bold bg-darkBg px-2 py-0.5 rounded border border-borderPurple/30"
                >
                  Reset
                </button>
              </div>
              <p className="text-[11px] text-textMuted italic mt-2">
                "Successfully synchronized headless Shopify data maps with
                OpenAI completions."
              </p>
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

              {/* İLK FOTODAKİ BİREBİR BAŞLIK, İKON VE FORM PARAMETRELERİ PANELİ */}
              <div className="bg-cardBg border border-borderPurple/50 rounded-xl p-4 text-xs space-y-4 shadow-xl">
                <div className="flex items-center gap-2 border-b border-borderPurple/30 pb-2.5">
                  <i className="fa-solid fa-gear text-sm text-purpleAccent"></i>
                  <span className="text-xs font-bold tracking-tight text-textLight">
                    Configure prospect parameters
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-darkBg/60 p-2.5 rounded-lg border border-borderPurple/20">
                    <span className="text-[10px] font-bold text-textMuted block mb-0.5 uppercase tracking-wider">
                      Company Name
                    </span>
                    <span className="text-xs font-semibold text-textLight">
                      {prospectProfile.company || "NordStyle"}
                    </span>
                  </div>

                  <div className="bg-darkBg/60 p-2.5 rounded-lg border border-borderPurple/20 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-textMuted block mb-0.5 uppercase tracking-wider">
                        Industry
                      </span>
                      <span className="text-xs font-semibold text-textLight">
                        {prospectProfile.industry || "Fashion"}
                      </span>
                    </div>
                    <span className="text-[9px] font-black uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.5 rounded tracking-wide">
                      + VALUE COLORED
                    </span>
                  </div>

                  <div className="bg-darkBg/60 p-2.5 rounded-lg border border-borderPurple/20">
                    <span className="text-[10px] font-bold text-textMuted block mb-0.5 uppercase tracking-wider">
                      Strategic Goal
                    </span>
                    <span className="text-xs font-semibold text-purpleBright">
                      {prospectProfile.goal ||
                        "Increase Average Order Value (AOV)"}
                    </span>
                  </div>

                  <div className="bg-darkBg/60 p-2.5 rounded-lg border border-borderPurple/20">
                    <span className="text-[10px] font-bold text-textMuted block mb-0.5 uppercase tracking-wider">
                      Target Market
                    </span>
                    <span className="text-xs font-semibold text-textLight">
                      {prospectProfile.country || "EU"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-borderPurple/25">
                  <span className="text-[10px] font-bold text-purpleBright uppercase tracking-widest block mb-2">
                    Visitor Personas
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-purpleAccent/10 border border-purpleAccent/30 text-[9px] text-purpleBright font-bold px-2 py-0.5 rounded">
                      Germans personas
                    </span>
                    <span className="bg-amber-500/10 border border-amber-500/20 text-[9px] text-amber-400 font-bold px-2 py-0.5 rounded">
                      Roman's personas
                    </span>
                    <span className="bg-rose-500/10 border border-rose-500/20 text-[9px] text-rose-400 font-bold px-2 py-0.5 rounded">
                      Women's antenatags
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              {activeTab === "storefront" && generatedData[currentPersona] && (
                <div className="bg-cardBg border border-borderPurple/50 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-darkBg/60 px-5 py-3 border-b border-borderPurple/35 flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded">
                      <i className="fa-brands fa-shopify mr-1"></i> Powered by
                      Shopify Storefront API
                    </span>
                    <select
                      value={currentPersona}
                      onChange={(e) => setCurrentPersona(e.target.value as any)}
                      className="bg-darkBg text-[10px] font-bold text-textLight border border-borderPurple/40 rounded px-2 py-0.5 focus:outline-none"
                    >
                      <option value="NewCustomer">New Visitor Segment</option>
                      <option value="VIPCustomer">
                        VIP Elite Loyalty Tier
                      </option>
                      <option value="ChurnRisk">Churn Risk Segment</option>
                    </select>
                  </div>

                  <div className="p-6 space-y-6 bg-gradient-to-b from-darkBg to-cardBg">
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
                      <h4 className="text-sm font-bold text-textLight">
                        Live Shopify Storefront Catalog
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {(shopifyProducts.length > 0
                          ? shopifyProducts
                          : Array(5).fill(null)
                        )
                          .slice(0, 5)
                          .map((product, idx) => (
                            <div
                              key={product?.id || idx}
                              className="bg-darkBg border border-borderPurple/30 rounded-xl overflow-hidden group hover:border-purpleAccent/50 transition-all text-center p-2 flex flex-col justify-between"
                            >
                              <div className="h-28 relative overflow-hidden bg-cardBg/40 flex items-center justify-center rounded-lg">
                                {product?.featuredImage?.url ? (
                                  <img
                                    className="w-full h-full object-cover"
                                    alt={product.title}
                                    src={product.featuredImage.url}
                                  />
                                ) : (
                                  <div className="text-[10px] text-textMuted">
                                    Product Asset
                                  </div>
                                )}
                              </div>
                              <div className="mt-2 space-y-1 text-left">
                                <h5 className="font-bold text-[11px] text-textLight truncate">
                                  {product?.title || "Premium Apparel"}
                                </h5>
                                <span className="font-black text-purpleBright block text-xs">
                                  {product?.priceRange.minVariantPrice.amount ||
                                    "95.00"}{" "}
                                  {product?.priceRange.minVariantPrice
                                    .currencyCode || "USD"}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "search" && (
                <div className="bg-cardBg border border-borderPurple/50 rounded-2xl p-6 shadow-2xl space-y-6 backdrop-blur-md">
                  <div className="border-b border-borderPurple/30 pb-3">
                    <span className="text-[10px] font-extrabold text-purpleBright uppercase tracking-wider block">
                      LLM Semantic Intent Matcher
                    </span>
                    <h3 className="text-xl font-black text-textLight mt-1">
                      AI Discovery Recommendation Search
                    </h3>
                    <p className="text-xs text-textMuted mt-1">
                      Queries the live Shopify catalog dataset variables using
                      OpenAI synthesis weights.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSearchSubmit}
                    className="bg-darkBg/60 p-4 border border-borderPurple/50 rounded-xl flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type dynamic descriptive consumer intent models (e.g., lightweight active rain gear, pro dac cables)..."
                      className="flex-1 bg-cardBg border border-borderPurple/60 rounded-lg px-4 py-3.5 text-xs text-textLight focus:outline-none focus:border-purpleAccent"
                    />
                    <button
                      type="submit"
                      className="bg-purpleAccent hover:bg-purpleBright text-darkBg px-6 py-3.5 rounded-lg font-black text-xs transition-all uppercase tracking-wider shadow-lg shadow-purpleAccent/25 flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <i className="fa-solid fa-wand-magic-sparkles"></i> Run AI
                      Query Sequence
                    </button>
                  </form>

                  <div className="space-y-2">
                    {isSearching && (
                      <div className="text-xs text-textMuted animate-pulse bg-darkBg/40 p-4 rounded-xl border border-borderPurple/30">
                        Running neural network evaluation filters over headless
                        assets...
                      </div>
                    )}

                    {searchResults.length > 0 && !isSearching && (
                      <div className="space-y-3">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block px-1">
                          ✓ Ranked Semantic Shopify Catalog Matches:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {searchResults.map((p) => (
                            <div
                              key={p.id}
                              className="bg-darkBg/80 border border-borderPurple/50 rounded-xl p-3 flex items-center gap-4"
                            >
                              <img
                                src={p.featuredImage?.url}
                                alt={p.title}
                                className="w-12 h-12 rounded-lg object-cover shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-bold text-xs text-textLight truncate">
                                    {p.title}
                                  </h4>
                                  <span className="text-xs font-black text-purpleBright shrink-0">
                                    {p.priceRange.minVariantPrice.amount}{" "}
                                    {p.priceRange.minVariantPrice.currencyCode}
                                  </span>
                                </div>
                                <p className="text-[11px] text-textMuted truncate mt-0.5">
                                  {p.description || "Live headless item match."}
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
