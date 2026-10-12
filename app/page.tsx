"use client";

import { useState, useCallback, useEffect } from "react";
import { translations, Language } from "@/src/utils/translations";
import { calculateDeposit, formatCurrency } from "@/src/utils/calculations";
import ComparisonList from "@/src/components/ComparisonList";

interface ComparisonItem {
  id: string;
  bankCode: string;
  bankName: string;
  interestRate: number;
  reservationAmount: number;
}

const WITHHOLDING_RATE = 0.15;

export default function Home() {
  const [language, setLanguage] = useState<Language>("tr");
  const [amount, setAmount] = useState(10000);
  const [termDays, setTermDays] = useState(90);
  const [isRounded, setIsRounded] = useState(true);
  const [comparisons, setComparisons] = useState<ComparisonItem[]>([]);
  const [newBankCode, setNewBankCode] = useState("");
  const [newBankName, setNewBankName] = useState("");
  const [newBankRate, setNewBankRate] = useState("");
  const [copied, setCopied] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const t = translations[language];

  const calculation = calculateDeposit(amount, termDays, 0, WITHHOLDING_RATE);

  const handleAddComparison = () => {
    if (!newBankCode.trim() || !newBankName.trim() || !newBankRate.trim()) {
      return;
    }

    const id = Math.random().toString(36).substr(2, 9);
    setComparisons([
      ...comparisons,
      {
        id,
        bankCode: newBankCode,
        bankName: newBankName,
        interestRate: parseFloat(newBankRate),
        reservationAmount: 0,
      },
    ]);

    setNewBankCode("");
    setNewBankName("");
    setNewBankRate("");
  };

  const handleUpdateComparison = (id: string, updates: Partial<ComparisonItem>) => {
    setComparisons(
      comparisons.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const handleRemoveComparison = (id: string) => {
    setComparisons(comparisons.filter((item) => item.id !== id));
  };

  const handleShare = useCallback(async () => {
    const params = new URLSearchParams({
      amount: amount.toString(),
      termDays: termDays.toString(),
      rounded: isRounded.toString(),
      comparisons: JSON.stringify(comparisons),
      language,
    });

    const url = `${window.location.href}?${params}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert(url);
    }
  }, [amount, termDays, isRounded, comparisons, language]);

  const handleFetch = async () => {
    setIsFetching(true);
    try {
      // This will be populated when backend is ready
      // const response = await fetch("/api/banks");
      // const banks = await response.json();
      // Add fetched banks to comparisons
    } catch (error) {
      console.error("Failed to fetch banks:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("amount")) setAmount(parseInt(params.get("amount") || "10000"));
    if (params.has("termDays")) setTermDays(parseInt(params.get("termDays") || "90"));
    if (params.has("rounded")) setIsRounded(params.get("rounded") === "true");
    if (params.has("language")) setLanguage((params.get("language") as Language) || "tr");
    if (params.has("comparisons")) {
      try {
        const comps = JSON.parse(params.get("comparisons") || "[]");
        setComparisons(comps);
      } catch (e) {
        console.error("Failed to parse comparisons:", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-slate-400 text-sm md:text-base">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors font-semibold"
          >
            {language === "tr" ? "EN" : "TR"}
          </button>
        </div>

        {/* Main Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Inputs */}
          <div className="space-y-6">
            {/* Amount */}
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wide mb-2">
                {t.amount}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-blue-500 transition-colors"
                />
                <span className="px-4 py-3 bg-slate-800 rounded-lg font-bold text-slate-400">
                  ₺
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                className="w-full mt-3 accent-blue-500"
              />
            </div>

            {/* Term Days */}
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wide mb-2">
                {t.termDays}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={termDays}
                  onChange={(e) => setTermDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-blue-500 transition-colors"
                />
                <span className="px-4 py-3 bg-slate-800 rounded-lg font-bold text-slate-400">
                  {t.dayCount}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="1095"
                step="1"
                value={termDays}
                onChange={(e) => setTermDays(parseInt(e.target.value))}
                className="w-full mt-3 accent-blue-500"
              />
            </div>

            {/* Display Options */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={isRounded}
                  onChange={() => setIsRounded(true)}
                  className="accent-blue-500"
                />
                <span className="text-sm font-semibold text-slate-400">
                  {t.rounded}
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!isRounded}
                  onChange={() => setIsRounded(false)}
                  className="accent-blue-500"
                />
                <span className="text-sm font-semibold text-slate-400">
                  {t.precise}
                </span>
              </label>
            </div>
          </div>

          {/* Right: Result Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 md:p-8 border border-slate-700 sticky top-8 h-fit">
            <h2 className="text-lg font-bold text-slate-400 uppercase tracking-wide mb-6">
              {t.compoundInterest}
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">{t.netInterest}</p>
                <p className="text-3xl font-black text-emerald-400">
                  {formatCurrency(calculation.netInterest, isRounded)}
                </p>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <p className="text-sm text-slate-500 mb-1">{t.finalAmount}</p>
                <p className="text-3xl font-black text-blue-400">
                  {formatCurrency(calculation.finalAmount, isRounded)}
                </p>
              </div>

              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 text-xs text-slate-400 space-y-1">
                <p>
                  {t.withholdingRate}: %{(WITHHOLDING_RATE * 100).toFixed(0)}
                </p>
                <p>
                  {t.withholdingAmount}:{" "}
                  {formatCurrency(calculation.withholdingAmount, isRounded)}
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-mono bg-slate-900 rounded-lg p-4 overflow-x-auto">
              A = P(1 + r/365)^t
            </div>
          </div>
        </div>

        {/* Add Comparison Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 mb-8 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">{t.addComparison}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder={t.bankName}
              value={newBankCode}
              onChange={(e) => setNewBankCode(e.target.value)}
              className="px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <input
              type="text"
              placeholder={t.enterBankName}
              value={newBankName}
              onChange={(e) => setNewBankName(e.target.value)}
              className="px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors md:col-span-2"
            />
            <input
              type="number"
              placeholder={t.interestRate}
              value={newBankRate}
              onChange={(e) => setNewBankRate(e.target.value)}
              step="0.1"
              className="px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={handleAddComparison}
              className="md:col-span-4 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
            >
              {t.compare}
            </button>
          </div>
        </div>

        {/* Comparison List */}
        <ComparisonList
          amount={amount}
          termDays={termDays}
          isRounded={isRounded}
          language={language}
          items={comparisons}
          onUpdate={handleUpdateComparison}
          onRemove={handleRemoveComparison}
          onShare={handleShare}
          onFetch={handleFetch}
        />

        {copied && (
          <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold">
            {t.copied}
          </div>
        )}
      </div>
    </div>
  );
}
