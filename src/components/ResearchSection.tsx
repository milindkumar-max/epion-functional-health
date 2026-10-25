import React, { useState } from 'react';
import { ResearchArticle } from '../types';
import { RESEARCH_ARTICLES, EVIDENCE_HIERARCHY_LEVELS } from '../data/research';
import { ArrowRight, BookOpen, ExternalLink, ShieldAlert, X, Filter } from 'lucide-react';
import { LiveScienceExplorer } from './LiveScienceExplorer';

export const ResearchSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<ResearchArticle | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showHierarchyModal, setShowHierarchyModal] = useState<boolean>(false);

  const categories = ['All', 'Metabolic Science', 'Gut Microbiome', 'Immunonutrition', 'Mitochondrial Biology', 'Nutrient Biochemistry'];

  const filteredArticles = activeFilter === 'All'
    ? RESEARCH_ARTICLES
    : RESEARCH_ARTICLES.filter((a) => a.category === activeFilter);

  const featured = RESEARCH_ARTICLES[0];
  const secondaryList = filteredArticles.filter((a) => a.id !== featured.id);

  return (
    <section id="science" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#5F7065]">
              Scientific Evidence Base
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#163324] font-normal leading-tight">
              Rigorous science. <br />
              <span className="italic font-normal text-[#2A4E38]">Traceable biomedical literature.</span>
            </h2>
            <p className="text-base text-[#46504A] leading-relaxed">
              Every dietary recommendation and therapeutic cofactor strategy is traceable to peer-reviewed clinical literature. We transparently differentiate between established randomized clinical trials and preliminary hypotheses.
            </p>
          </div>

          <button
            onClick={() => setShowHierarchyModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#163324] bg-white border border-[#D5D0C6] hover:bg-[#F4F1EA] rounded-md transition-colors shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Our Evidence Hierarchy</span>
          </button>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-[#E8E2D8]">
          <span className="text-xs font-mono text-[#63716A] mr-2 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors shrink-0 ${
                activeFilter === cat
                  ? 'bg-[#163324] text-[#FAF8F5]'
                  : 'bg-white text-[#46504A] hover:bg-[#EAEFE9] border border-[#DDD7CD]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Research Card + Secondary Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Prominent Featured Article (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#DDD7CD] rounded-2xl p-6 sm:p-9 shadow-sm space-y-6">
            
            {/* Meta unboxed line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#5C6661] pb-4 border-b border-[#F0ECE4]">
              <span className="font-semibold text-[#163324]">{featured.category}</span>
              <span aria-hidden="true">·</span>
              <span>{featured.evidenceLevel}</span>
              <span aria-hidden="true">·</span>
              <span>{featured.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{featured.date}</span>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#73827A] block">
                Featured Clinical Investigation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#163324] leading-snug">
                {featured.title}
              </h3>
              <p className="text-sm text-[#46504A] leading-relaxed">
                {featured.summary}
              </p>
            </div>

            {/* Key Findings Box */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163324] block">
                Key Empirical Findings
              </span>
              <ul className="space-y-1.5 text-xs text-[#4E5B55]">
                {featured.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#2A4E38] font-bold">›</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Biological mechanism note */}
            <div className="text-xs text-[#525E58] bg-[#F7F5F0] p-4 rounded-lg border border-[#EBE6DC] space-y-1">
              <span className="font-semibold text-[#163324] block">Biochemical Mechanism</span>
              <p>{featured.biologicalMechanism}</p>
            </div>

            {/* Footer with citation & full review modal trigger */}
            <div className="pt-4 border-t border-[#F0ECE4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-mono text-[#63716A] truncate max-w-sm">
                Ref: {featured.doiCitation}
              </span>
              <div className="flex items-center gap-3">
                {featured.doiCitation.includes('doi:') && (
                  <a
                    href={`https://doi.org/${featured.doiCitation.split('doi:')[1].trim()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#2A4E38] hover:underline"
                  >
                    <span>Journal Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedArticle(featured)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#163324] hover:text-[#234A35] cursor-pointer"
                >
                  <span>Read Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Secondary Research Previews (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#63716A] px-1">
              Recent Scientific Reviews ({filteredArticles.length})
            </div>

            <div className="space-y-4">
              {secondaryList.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="group cursor-pointer bg-white border border-[#DDD7CD] hover:border-[#163324]/50 rounded-xl p-5 transition-all shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between text-[11px] text-[#5C6661]">
                    <span className="font-medium text-[#163324]">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h4 className="font-serif text-lg font-semibold text-[#163324] group-hover:text-[#2A4E38] transition-colors leading-snug">
                    {art.title}
                  </h4>

                  <p className="text-xs text-[#525E58] line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>

                  <div className="pt-2 border-t border-[#F0ECE4] flex items-center justify-between text-xs font-mono text-[#63716A]">
                    <span className="truncate">{art.evidenceLevel}</span>
                    <span className="text-[#163324] font-sans font-semibold text-xs group-hover:translate-x-1 transition-transform">
                      View →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Detailed Article Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
            <div className="bg-[#FAF8F5] border border-[#DDD7CD] rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#63716A]">
                  <span>{selectedArticle.category}</span>
                  <span>·</span>
                  <span>{selectedArticle.evidenceLevel}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 text-[#46504A] hover:bg-[#EAEFE9] rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#163324]">
                  {selectedArticle.title}
                </h3>
                <p className="text-xs font-mono text-[#73827A]">
                  Published: {selectedArticle.date} · Estimated Read: {selectedArticle.readTime}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#163324]">
                  Executive Scientific Abstract
                </span>
                <p className="text-xs sm:text-sm text-[#46504A] leading-relaxed">
                  {selectedArticle.summary}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#DDD7CD] space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#163324] block">
                  Detailed Clinical Findings
                </span>
                <ul className="space-y-1.5 text-xs text-[#525E58]">
                  {selectedArticle.keyFindings.map((kf, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#163324] font-bold">›</span>
                      <span>{kf}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D8] space-y-1 text-xs text-[#525E58]">
                <span className="font-semibold text-[#163324] block">Biochemical Mechanism</span>
                <p>{selectedArticle.biologicalMechanism}</p>
              </div>

              <div className="space-y-1 text-xs text-[#63716A]">
                <span className="font-semibold text-[#2E3632] block">Verified Publication Source:</span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono bg-white p-3 rounded-xs border border-[#E8E2D8] text-[11px] text-[#163324]">
                  <span>{selectedArticle.doiCitation}</span>
                  {selectedArticle.doiCitation.includes('doi:') && (
                    <a
                      href={`https://doi.org/${selectedArticle.doiCitation.split('doi:')[1].trim()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-[#2A4E38] hover:underline shrink-0"
                    >
                      <span>PubMed / Journal DOI</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 text-xs font-medium text-[#FAF8F5] bg-[#163324] rounded-md hover:bg-[#204532] transition-colors"
                >
                  Close Article Review
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Evidence Hierarchy Modal */}
        {showHierarchyModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white border border-[#DDD7CD] rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
                <div className="text-xs uppercase font-mono tracking-wider text-[#63716A]">
                  Clinical Standards & Epistemology
                </div>
                <button
                  onClick={() => setShowHierarchyModal(false)}
                  className="p-1.5 text-[#46504A] hover:bg-[#EAEFE9] rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-semibold text-[#163324]">
                  The Epion Evidence Hierarchy
                </h3>
                <p className="text-xs text-[#525E58] leading-relaxed">
                  How we distinguish settled medical consensus, clinical trial outcomes, and exploratory cellular mechanisms:
                </p>
              </div>

              <div className="space-y-3">
                {EVIDENCE_HIERARCHY_LEVELS.map((lvl, index) => (
                  <div key={index} className="p-4 rounded-xl border border-[#E8E2D8] bg-[#FAF8F5] space-y-1">
                    <span className="text-xs font-semibold text-[#163324] block">{lvl.tier}</span>
                    <p className="text-xs text-[#525E58]">{lvl.description}</p>
                    <div className="text-[11px] font-mono text-[#2A4E38] pt-1">
                      Clinical Application: {lvl.application}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-end">
                <button
                  onClick={() => setShowHierarchyModal(false)}
                  className="px-5 py-2.5 text-xs font-medium text-[#FAF8F5] bg-[#163324] rounded-md hover:bg-[#204532] transition-colors"
                >
                  Understood
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Live Biomedical Literature Explorer (Science Skills Integration) */}
        <div className="pt-12 border-t border-[#E8E2D8]">
          <LiveScienceExplorer />
        </div>

      </div>
    </section>
  );
};
