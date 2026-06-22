"use client";

import React, { useState } from "react";

interface ProspectFormProps {
  onGenerate: (formData: any) => void;
  isLoading: boolean;
}

export default function ProspectForm({
  onGenerate,
  isLoading,
}: ProspectFormProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "Fashion",
    targetMarket: "",
    strategicGoal: "Increase Average Order Value",
  });

  const presets = [
    {
      name: "NordStyle",
      industry: "Fashion",
      market: "Germany",
      goal: "Increase Average Order Value",
      desc: "Premium Alpine Wear • Germany • Focus on cross-sells & bundles",
      tag: "AOV Boost",
      tagClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      name: "BarkBites",
      industry: "Pet Care",
      market: "United Kingdom",
      goal: "Drive Repeat Purchase Rate",
      desc: "Organic Dog Nutrition • UK • Auto-replenish subscriber flows",
      tag: "Retention",
      tagClass: "bg-purpleAccent/20 text-purpleBright border-purpleAccent/30",
    },
    {
      name: "ElectroPulse",
      industry: "Electronics",
      market: "United States",
      goal: "Cross-Sell High Margin Accessories",
      desc: "Audiophile Workspaces • US • Custom DAC and accessory kits",
      tag: "Margins",
      tagClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
  ];

  const handlePresetClick = (p: (typeof presets)[0]) => {
    setFormData({
      companyName: p.name,
      industry: p.industry,
      targetMarket: p.market,
      strategicGoal: p.goal,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* FAST-TRACK SOLUTION PRESETS */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-textMuted text-center">
          Fast-Track Solution Presets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {presets.map((p) => (
            <div
              key={p.name}
              onClick={() => handlePresetClick(p)}
              className="group p-4 bg-cardBg border border-borderPurple/30 rounded-xl hover:border-purpleAccent cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-purpleBright">
                  {p.name}
                </span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded border ${p.tagClass}`}
                >
                  {p.tag}
                </span>
              </div>
              <p className="text-[11px] text-textMuted">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TARGET INPUTS FORM */}
      <div className="bg-cardBg border border-borderPurple/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purpleAccent to-purpleBright"></div>

        {/* FIXED: THE EXACT SPECIFICATION LAYOUT MATCHING YOUR INPUT BLUEPRINT */}
        <div className="flex items-center justify-between border-b border-borderPurple/30 pb-4 mb-5">
          <h2 className="text-lg font-bold flex items-center gap-2.5 text-textLight">
            <i className="fa-solid fa-sliders text-purpleBright"></i> Configure
            Prospect Parameters
          </h2>
          <span className="text-[10px] font-mono bg-codeBg border border-borderPurple/60 px-2.5 py-1 rounded text-purpleBright">
            POST /api/generate-demo
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-1.5">
                Company / Prospect Name
              </label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g., NordStyle"
                className="w-full bg-darkBg border border-borderPurple/50 rounded-lg px-3 py-2.5 text-xs text-textLight focus:outline-none focus:border-purpleAccent transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-1.5">
                Commerce Industry Sector
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full bg-darkBg border border-borderPurple/50 rounded-lg px-3 py-2.5 text-xs text-textLight focus:outline-none focus:border-purpleAccent transition-all"
              >
                <option value="Fashion">Fashion & Apparel</option>
                <option value="Pet Care">Pet Care & Nutrition</option>
                <option value="Electronics">Consumer Electronics</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-1.5">
                Target Regional Country
              </label>
              <input
                type="text"
                name="targetMarket"
                required
                value={formData.targetMarket}
                onChange={handleChange}
                placeholder="e.g., Germany"
                className="w-full bg-darkBg border border-borderPurple/50 rounded-lg px-3 py-2.5 text-xs text-textLight focus:outline-none focus:border-purpleAccent transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-1.5">
                Strategic Solution Goal
              </label>
              <select
                name="strategicGoal"
                value={formData.strategicGoal}
                onChange={handleChange}
                className="w-full bg-darkBg border border-borderPurple/50 rounded-lg px-3 py-2.5 text-xs text-textLight focus:outline-none focus:border-purpleAccent transition-all"
              >
                <option value="Increase Average Order Value">
                  Increase Average Order Value / AOV
                </option>
                <option value="Drive Repeat Purchase Rate">
                  Drive Repeat Subscriber Purchase Rates
                </option>
                <option value="Cross-Sell High Margin Accessories">
                  Cross-Sell Premium Margin Accessories
                </option>
              </select>
            </div>
          </div>

          {/* DYNAMIC PROMPT SCHEMA PAYLOAD BOX */}
          <div className="bg-codeBg border border-borderPurple/50 rounded-lg p-3 space-y-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-bold text-purpleBright flex items-center gap-1">
                <i className="fa-solid fa-code"></i> OpenAI Prompt Schema
                Payload:
              </span>
              <span className="text-textMuted">application/json</span>
            </div>
            <pre className="text-[10px] text-emerald-400 font-mono overflow-x-auto whitespace-pre-wrap leading-tight">
              {JSON.stringify(
                {
                  companyName: formData.companyName || "...",
                  industry: formData.industry,
                  targetMarket: formData.targetMarket || "...",
                  strategicGoal: formData.strategicGoal,
                },
                null,
                2,
              )}
            </pre>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purpleAccent to-purpleBright hover:opacity-95 text-darkBg font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-lg shadow-purpleAccent/25 flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i> Synthesize Demo
            Environment
          </button>
        </form>
      </div>
    </div>
  );
}
