"use client";

import React, { useState } from "react";
import type { DemoPayloadSchema } from "@/types/demo";

interface ProspectFormProps {
  onGenerate: (data: DemoPayloadSchema) => void;
  isLoading: boolean;
}

export default function ProspectForm({
  onGenerate,
  isLoading,
}: ProspectFormProps) {
  const [formData, setFormData] = useState<DemoPayloadSchema>({
    companyName: "",
    industry: "Fashion",
    targetMarket: "",
    strategicGoal: "Increase Average Order Value",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Formun boş gönderilmesini kesin olarak engelliyoruz
    if (!formData.companyName.trim() || !formData.targetMarket.trim()) {
      return;
    }

    onGenerate({
      companyName: formData.companyName.trim(),
      industry: formData.industry,
      targetMarket: formData.targetMarket.trim(),
      strategicGoal: formData.strategicGoal,
    });
  };

  const applyPreset = (
    company: string,
    industry: "Fashion" | "Pet Care" | "Electronics",
    market: string,
    goal: string,
  ) => {
    setFormData({
      companyName: company,
      industry,
      targetMarket: market,
      strategicGoal: goal,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative z-10">
      {/* Preset Cards */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-textMuted mb-3 text-center">
          Fast-Track Solution Presets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() =>
              applyPreset(
                "NordStyle",
                "Fashion",
                "Germany",
                "Increase Average Order Value",
              )
            }
            className="group p-4 bg-cardBg/35 border border-borderPurple/30 rounded-xl hover:border-purpleAccent/60 cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-purpleBright">
                NordStyle
              </span>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                AOV Boost
              </span>
            </div>
            <p className="text-[11px] text-textMuted">
              Premium Alpine Wear • Germany • Focus on cross-sells & bundles
            </p>
          </div>

          <div
            onClick={() =>
              applyPreset(
                "BarkBites",
                "Pet Care",
                "United Kingdom",
                "Drive Repeat Purchase Rate",
              )
            }
            className="group p-4 bg-cardBg/35 border border-borderPurple/30 rounded-xl hover:border-purpleAccent/60 cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-purpleBright">
                BarkBites
              </span>
              <span className="text-[9px] bg-purpleAccent/20 text-purpleBright px-2 py-0.5 rounded border border-purpleAccent/30">
                Retention
              </span>
            </div>
            <p className="text-[11px] text-textMuted">
              Organic Dog Nutrition • UK • Auto-replenish subscriber flows
            </p>
          </div>

          <div
            onClick={() =>
              applyPreset(
                "ElectroPulse",
                "Electronics",
                "United States",
                "Cross-Sell High Margin Accessories",
              )
            }
            className="group p-4 bg-cardBg/35 border border-borderPurple/30 rounded-xl hover:border-purpleAccent/60 cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-purpleBright">
                ElectroPulse
              </span>
              <span className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                Margins
              </span>
            </div>
            <p className="text-[11px] text-textMuted">
              Audiophile Workspaces • US • Custom DAC and accessory kits
            </p>
          </div>
        </div>
      </div>

      {/* Main Strategic Form */}
      <div className="bg-cardBg/30 border border-borderPurple/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purpleAccent to-purpleBright opacity-70"></div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-2">
                COMPANY / PROSPECT NAME
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                placeholder="e.g. NordStyle"
                className="w-full bg-transparent border border-borderPurple/50 rounded-lg px-3 py-2.5 text-xs text-textLight/80 placeholder:text-textMuted/30 focus:outline-none focus:border-purpleAccent/80 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-2">
                COMMERCE INDUSTRY SECTOR
              </label>
              <select
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value as any })
                }
                className="w-full bg-transparent border border-borderPurple/50 rounded-lg px-3 py-2.5 text-xs text-textLight/70 focus:outline-none focus:border-purpleAccent/80 transition-all font-medium text-left"
              >
                <option value="Fashion" className="bg-darkBg text-textLight">
                  Fashion & Apparel
                </option>
                <option value="Pet Care" className="bg-darkBg text-textLight">
                  Pet Care & Nutrition
                </option>
                <option
                  value="Electronics"
                  className="bg-darkBg text-textLight"
                >
                  Consumer Electronics
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-2">
                TARGET REGIONAL COUNTRY
              </label>
              <input
                type="text"
                required
                value={formData.targetMarket}
                onChange={(e) =>
                  setFormData({ ...formData, targetMarket: e.target.value })
                }
                placeholder="e.g. Germany"
                className="w-full bg-transparent border border-borderPurple/50 rounded-lg px-3 py-2.5 text-xs text-textLight/80 placeholder:text-textMuted/30 focus:outline-none focus:border-purpleAccent/80 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-2">
                STRATEGIC SOLUTION GOAL
              </label>
              <select
                value={formData.strategicGoal}
                onChange={(e) =>
                  setFormData({ ...formData, strategicGoal: e.target.value })
                }
                className="w-full bg-transparent border border-borderPurple/50 rounded-lg px-3 py-2.5 text-xs text-textLight/70 focus:outline-none focus:border-purpleAccent/80 transition-all font-medium text-left"
              >
                <option
                  value="Increase Average Order Value"
                  className="bg-darkBg text-textLight"
                >
                  Increase Average Order Value / AOV
                </option>
                <option
                  value="Drive Repeat Purchase Rate"
                  className="bg-darkBg text-textLight"
                >
                  Drive Repeat Subscriber Purchase Rates
                </option>
                <option
                  value="Cross-Sell High Margin Accessories"
                  className="bg-darkBg text-textLight"
                >
                  Cross-Sell Premium Margin Accessories
                </option>
              </select>
            </div>
          </div>

          <div className="bg-codeBg/40 border border-borderPurple/30 rounded-lg p-3 space-y-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-bold text-purpleBright">
                <i className="fa-solid fa-code mr-1"></i> OpenAI Prompt Schema
                Payload:
              </span>
              <span className="text-textMuted">application/json</span>
            </div>
            <pre className="text-[10px] text-emerald-400/80 overflow-x-auto whitespace-pre-wrap leading-tight">
              {JSON.stringify(
                {
                  companyName: formData.companyName.trim() || undefined,
                  industry: formData.industry,
                  targetMarket: formData.targetMarket.trim() || undefined,
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
            className="w-full bg-gradient-to-r from-purpleAccent to-purpleBright hover:opacity-95 disabled:opacity-50 text-darkBg font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-lg shadow-purpleAccent/25 flex items-center justify-center gap-1.5 cursor-pointer relative z-20"
          >
            {isLoading
              ? "Executing LLM Synthesis..."
              : "Synthesize Demo Environment"}
          </button>
        </form>
      </div>
    </div>
  );
}
