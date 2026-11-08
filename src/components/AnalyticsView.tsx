'use client';

import React, { useState } from 'react';
import { ANALYTICS_TIMESERIES, CHANNEL_PERFORMANCE_DATA } from '../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Download, 
  Filter, 
  FileText, 
  Sparkles, 
  Check, 
  Layers, 
  Share2, 
  ArrowUpRight, 
  Clock, 
  RefreshCw,
  Printer
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'roas' | 'cac'>('revenue');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<number | null>(null);

  // Custom Report Generator state
  const [showReportBuilder, setShowReportBuilder] = useState(false);
  const [reportBrandName, setReportBrandName] = useState('Tensorspark Client Portal');
  const [includeAIInsights, setIncludeAIInsights] = useState(true);
  const [includeChannels, setIncludeChannels] = useState(true);
  const [generatedReportText, setGeneratedReportText] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const data = ANALYTICS_TIMESERIES;

  // Chart calculation metrics
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const maxSpend = Math.max(...data.map(d => d.adSpend));

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const summary = `TENSORSPARK GROWTH LABS • EXECUTIVE PERFORMANCE REPORT
Date Generated: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
Target Entity: ${reportBrandName}
Timeframe: Past ${timeRange.toUpperCase()}

==================================================
EXECUTIVE KPI SUMMARY
==================================================
• Total Attributed Gross Revenue: $${data.reduce((acc, curr) => acc + curr.revenue, 0).toLocaleString()}
• Total Media Ad Spend: $${data.reduce((acc, curr) => acc + curr.adSpend, 0).toLocaleString()}
• Net Blended ROAS: 5.86x (Target: 4.0x, +46.5% benchmark)
• Total Qualified Conversions: ${data.reduce((acc, curr) => acc + curr.conversions, 0).toLocaleString()} orders
• Blended Customer Acquisition Cost (CAC): $11.42 (Down 28.4% MoM)

${includeChannels ? `==================================================
CHANNEL ATTRIBUTION BREAKDOWN
==================================================
1. Google Search AI Intent: $54,400 Rev | 6.4x ROAS | CPL: $10.36
2. Meta Hyper-Targeted Ads: $68,200 Rev | 5.5x ROAS | CPL: $9.25
3. LinkedIn B2B Precision: $43,200 Rev | 6.0x ROAS | CPL: $17.56
4. TikTok Creative Reels: $27,840 Rev | 5.8x ROAS | CPL: $5.27
` : ''}
${includeAIInsights ? `==================================================
AI STRATEGIC INSIGHTS & ALLOCATION RECOMMENDATIONS
==================================================
1. High-Intent Expansion: Google Search AI intent yields the highest marginal ROAS. Recommend re-allocating 15% of low-performing generic keywords into high-context LLM search campaigns.
2. Creative Fatigue Alert: Ad set 'Meta_V3_Demo' has crossed 4.2 frequency; auto-inject 6 new variants via AuraSynth Studio.
3. Conversion Funnel: Checkout step 2 drop-off reduced from 14% to 8.2% after latency improvements.
` : ''}
Report certified by Tensorspark Telemetry Engine.`;

      setGeneratedReportText(summary);
      setIsGenerating(false);
    }, 600);
  };

  const handleDownloadJson = () => {
    const jsonBlob = new Blob([JSON.stringify({ timeseries: data, channels: CHANNEL_PERFORMANCE_DATA }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tensorspark_analytics_report_${Date.now()}.json`;
    a.click();
  };

  const handleCopyReport = () => {
    if (!generatedReportText) return;
    navigator.clipboard.writeText(generatedReportText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-mono mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>ENTERPRISE TELEMETRY & ATTRIBUTION STUDIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Custom Analytics & Reporting Tools
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Real-time attribution modeling, custom executive PDF/JSON export, and AI predictive insights for tech startups.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Timeframe Selector */}
          <div className="p-1 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-xs font-medium uppercase font-mono transition-colors ${
                  timeRange === range
                    ? 'bg-neutral-800 text-cyan-400 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            id="btn-open-report-generator"
            type="button"
            onClick={() => setShowReportBuilder(!showReportBuilder)}
            className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Custom Report</span>
          </button>

          <button
            id="btn-download-analytics-json"
            type="button"
            onClick={handleDownloadJson}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition-colors"
            title="Download raw JSON telemetry"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Attributed Revenue</span>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +32.4%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            $210,200
          </div>
          <p className="text-[11px] text-neutral-500 font-mono">
            Across 5 primary ad channels
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Blended Return (ROAS)</span>
            <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-0.5">
              <Sparkles className="w-3 h-3" /> 5.86x
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">
            6.48x Max
          </div>
          <p className="text-[11px] text-neutral-500 font-mono">
            Target: 4.0x • Above forecast
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Average Blended CAC</span>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-0.5">
              -18.2% MoM
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            $10.13
          </div>
          <p className="text-[11px] text-neutral-500 font-mono">
            Decreasing due to viral creative
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Total Conversions</span>
            <span className="text-[11px] font-mono text-sky-400 flex items-center gap-0.5">
              +48%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-display">
            3,181
          </div>
          <p className="text-[11px] text-neutral-500 font-mono">
            High intent trials & paid accounts
          </p>
        </div>
      </div>

      {/* Interactive Custom Report Builder Modal / Drawer */}
      {showReportBuilder && (
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-cyan-500/40 shadow-2xl backdrop-blur-xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-cyan-400" />
              <h3 className="font-display font-bold text-lg text-white">
                Custom Executive Report Builder
              </h3>
            </div>
            <button
              onClick={() => setShowReportBuilder(false)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Close Builder
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">Company / Brand Name</label>
              <input
                type="text"
                value={reportBrandName}
                onChange={(e) => setReportBrandName(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex flex-col justify-center space-y-2 pt-4">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                <input
                  type="checkbox"
                  checked={includeChannels}
                  onChange={(e) => setIncludeChannels(e.target.checked)}
                  className="rounded bg-neutral-950 border-neutral-800 text-cyan-400"
                />
                <span>Include Channel Attribution Details</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                <input
                  type="checkbox"
                  checked={includeAIInsights}
                  onChange={(e) => setIncludeAIInsights(e.target.checked)}
                  className="rounded bg-neutral-950 border-neutral-800 text-cyan-400"
                />
                <span>Include AI Attribution Insights</span>
              </label>
            </div>

            <div className="flex items-end">
              <button
                id="btn-generate-report-action"
                type="button"
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-cyan-500/20"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing Report...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Compile Executive Summary</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {generatedReportText && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Report Ready for Stakeholders
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyReport}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {copiedNotification ? (
                      <span className="text-emerald-400 font-medium">Copied to Clipboard!</span>
                    ) : (
                      <span>Copy Clean Text</span>
                    )}
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save as PDF</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                {generatedReportText}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Interactive Multi-Axis Chart */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
              Performance Timeline
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Attributed Revenue vs. Media Spend Over Time
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-1 bg-cyan-400 rounded-full" /> Gross Revenue ($)
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span className="w-3 h-1 bg-neutral-500 rounded-full" /> Media Spend ($)
            </span>
          </div>
        </div>

        {/* Dynamic SVG Chart */}
        <div className="relative pt-6 pb-2 w-full overflow-x-auto">
          <div className="min-w-[600px] h-64 relative flex items-end justify-between px-4 pb-8 border-b border-neutral-800">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-neutral-600 w-full" />
              <div className="border-b border-neutral-600 w-full" />
              <div className="border-b border-neutral-600 w-full" />
              <div className="border-b border-neutral-600 w-full" />
            </div>

            {/* Bars and Data points */}
            {data.map((pt, idx) => {
              const revHeight = (pt.revenue / maxRevenue) * 190;
              const spendHeight = (pt.adSpend / maxRevenue) * 190;
              const isHovered = hoveredDataPoint === idx;

              return (
                <div
                  key={pt.date}
                  onMouseEnter={() => setHoveredDataPoint(idx)}
                  onMouseLeave={() => setHoveredDataPoint(null)}
                  className="flex flex-col items-center relative group cursor-pointer z-10"
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-24 bg-neutral-950 border border-cyan-500/50 rounded-xl p-2.5 shadow-2xl text-[10px] font-mono text-white z-30 min-w-36 pointer-events-none">
                      <div className="text-cyan-400 font-bold border-b border-neutral-800 pb-1 mb-1">
                        {pt.date}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Revenue:</span>
                        <span className="text-white font-bold">${pt.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Spend:</span>
                        <span className="text-neutral-300">${pt.adSpend.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">ROAS:</span>
                        <span className="text-emerald-400 font-bold">{pt.roas}x</span>
                      </div>
                    </div>
                  )}

                  {/* Dual Bar Column */}
                  <div className="flex items-end gap-1.5">
                    {/* Revenue Bar */}
                    <div
                      style={{ height: `${revHeight}px` }}
                      className={`w-6 sm:w-8 rounded-t-lg transition-all ${
                        isHovered
                          ? 'bg-cyan-400 shadow-lg shadow-cyan-400/40'
                          : 'bg-gradient-to-t from-cyan-600/70 to-cyan-400/90'
                      }`}
                    />
                    {/* Spend Bar */}
                    <div
                      style={{ height: `${spendHeight}px` }}
                      className="w-3 sm:w-4 rounded-t-md bg-neutral-700/80 group-hover:bg-neutral-500 transition-colors"
                    />
                  </div>

                  {/* Date Label */}
                  <span className="absolute -bottom-6 text-[10px] font-mono text-neutral-400">
                    {pt.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Channel Attribution Breakdown Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-white">
            Omnichannel Marketing Breakdown
          </h3>
          <span className="text-xs text-neutral-400 font-mono">
            Sorted by Total Attributed Pipeline
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Monthly Spend</th>
                <th className="py-3 px-4">Attributed Revenue</th>
                <th className="py-3 px-4">Return (ROAS)</th>
                <th className="py-3 px-4">Leads / Deals</th>
                <th className="py-3 px-4">Cost Per Lead (CPL)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {CHANNEL_PERFORMANCE_DATA.map((ch) => (
                <tr key={ch.channel} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-semibold text-white">
                    {ch.channel}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-300">
                    ${ch.spend.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-cyan-400 font-bold">
                    ${ch.revenue.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">
                    {ch.roas}x
                  </td>
                  <td className="py-3.5 px-4 text-white">
                    {ch.leads}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400">
                    ${ch.cpl.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
