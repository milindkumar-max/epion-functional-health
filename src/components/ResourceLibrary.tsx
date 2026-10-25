import React, { useState } from 'react';
import { ResourceArticle } from '../types';
import { RESOURCE_ARTICLES, FREQUENTLY_ASKED_QUESTIONS } from '../data/resources';
import { EDITORIAL_PHOTOS } from '../data/photography';
import { Search, ChevronDown, ChevronUp, X, ArrowRight, HelpCircle, BookOpen } from 'lucide-react';

const ARTICLE_PHOTOS: Record<string, string> = {
  'functional-vs-conventional-nutrition': EDITORIAL_PHOTOS.articleFunctionalVsConventional,
  'macronutrient-architecture-plate': EDITORIAL_PHOTOS.articlePlateArchitecture,
  'microbiome-diversity-rule': EDITORIAL_PHOTOS.articleMicrobiomeDiversity,
  'testing-scope-and-limitations': EDITORIAL_PHOTOS.articleTestingScope,
};

export const ResourceLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<ResourceArticle | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = ['All', 'Fundamentals', 'Guides', 'Deep Dives'];

  const filteredArticles = RESOURCE_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="resources" className="py-16 lg:py-24 bg-[var(--canvas-bg)] border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="border-b border-[var(--border-subtle)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#5F7065]">
              Scientific Knowledge & Educational Resources
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] font-semibold tracking-tight">
              Evidence-based explainers. <br />
              <span className="italic font-normal text-emerald-900 dark:text-emerald-300">Translating biochemical complexity.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
            Deconstructing gut microbiome ecology, macronutrient gastric emptying kinetics, and biomarker interpretation into clear, actionable clinical knowledge.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#163324] text-[#FAF8F5] font-semibold'
                    : 'bg-[var(--surface-bg)] text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] border border-[var(--border-color)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search clinical topics..."
              className="w-full pl-9 pr-4 py-2 bg-[var(--surface-bg)] text-xs border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)]"
            />
          </div>
        </div>

        {/* Article Editorial Cards Grid with Consistent Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => {
            const photoUrl = ARTICLE_PHOTOS[article.id] || EDITORIAL_PHOTOS.heroBotanicalMacro;
            return (
              <article
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="group cursor-pointer bg-[var(--surface-bg)] border border-[var(--border-color)] hover:border-[var(--text-primary)] transition-all shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden"
              >
                {/* Authentic Still-Life Photo Header */}
                <div className="aspect-[16/9] relative overflow-hidden bg-black/5">
                  <img
                    src={photoUrl}
                    alt={article.title}
                    className="w-full h-full object-cover object-center filter saturate-[0.95] contrast-[1.02] transform transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-[#FAF8F5] px-2 py-0.5 text-[10px] font-mono tracking-wider border border-white/20 uppercase">
                    {article.category}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-[#FAF8F5] px-2 py-0.5 text-[10px] font-mono">
                    {article.readTime}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)] group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Core Scientific Principle Quote */}
                    <div className="pt-3 border-t border-[var(--border-subtle)] space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                        Core Takeaway
                      </span>
                      <p className="text-xs text-[var(--text-primary)] italic font-serif">
                        "{article.keyPoints[0]}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono font-bold text-[var(--text-primary)]">
                    <span className="uppercase tracking-wider">Read Clinical Explainer</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Frequently Asked Questions with Smooth Accessible Accordions */}
        <div className="pt-12 border-t border-[var(--border-subtle)] space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-[var(--text-muted)]">
              <HelpCircle className="w-4 h-4 text-[var(--accent-emerald)] dark:text-[var(--accent-sage)]" />
              <span>Practice Transparency & Clinical Scope</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Honest, direct clarification regarding our methodology, testing scope, and collaborative model.
            </p>
          </div>

          <div className="space-y-3 max-w-4xl">
            {FREQUENTLY_ASKED_QUESTIONS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[var(--surface-bg)] border border-[var(--border-color)] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-[var(--surface-secondary)]/50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg sm:text-xl font-medium text-[var(--text-primary)]">
                      {faq.question}
                    </span>
                    <span className="p-1 text-[var(--text-muted)] shrink-0 transition-transform duration-200">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] image-reveal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Article Modal Reader */}
        {activeArticle && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setActiveArticle(null)}
          >
            <div
              className="bg-[var(--surface-bg)] border border-[var(--border-color)] max-w-3xl w-full p-6 sm:p-9 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative image-reveal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  {activeArticle.category} · {activeArticle.readTime}
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  aria-label="Close article modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-tight">
                  {activeArticle.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] italic font-serif leading-relaxed">
                  {activeArticle.excerpt}
                </p>
              </div>

              {/* Photographic Plate inside Modal */}
              <div className="border border-[var(--border-color)] overflow-hidden">
                <img
                  src={ARTICLE_PHOTOS[activeArticle.id] || EDITORIAL_PHOTOS.heroStillLife}
                  alt={activeArticle.title}
                  className="w-full h-56 object-cover object-center"
                />
              </div>

              {/* Key Points */}
              <div className="p-4 bg-[var(--surface-secondary)] border-l-2 border-[var(--accent-emerald)] space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[var(--text-primary)] block">
                  Summary of Findings:
                </span>
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                  {activeArticle.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--accent-emerald)] dark:text-[var(--accent-sage)] font-bold">·</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Content Paragraphs */}
              <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                {activeArticle.content.map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold text-[#FAF8F5] bg-[#163324] hover:bg-[#204532] cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
