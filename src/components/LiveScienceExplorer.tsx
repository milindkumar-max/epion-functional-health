import React, { useState, useEffect } from 'react';
import { Search, BookOpen, ExternalLink, RefreshCw, Dna, Activity, Bookmark, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ArticleItem {
  id: string;
  title: string;
  authorString: string;
  journalTitle: string;
  pubYear: string | number;
  doi: string;
  pmid: string;
  isOpenAccess: boolean;
  citedByCount: number;
}

interface PubChemCompound {
  cid: number;
  name: string;
  formula: string;
  weight: string;
  canonicalSmiles: string;
  xLogP?: number;
  tpsa?: number;
  hBondDonorCount?: number;
  hBondAcceptorCount?: number;
  imageUrl: string;
  pubChemUrl: string;
}

const COMMON_METABOLITES = [
  { name: 'sulforaphane', label: 'Sulforaphane', category: 'Nrf2 & Phase II GST' },
  { name: 'butyrate', label: 'Butyric Acid', category: 'Microbial SCFA / Barrier' },
  { name: 'resveratrol', label: 'Resveratrol', category: 'SIRT1 & Mitochondrial' },
  { name: 'curcumin', label: 'Curcumin', category: 'NF-κB / SPM Resolution' },
  { name: 'quercetin', label: 'Quercetin', category: 'Mast Cell / Zinc Ionophore' },
  { name: 'berberine', label: 'Berberine', category: 'AMPK & Glucose Disposal' },
];

export const LiveScienceExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'literature' | 'pubchem'>('literature');

  // Literature Search State
  const [query, setQuery] = useState('metabolic health gut barrier short chain fatty acids');
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [savedArticles, setSavedArticles] = useState<Record<string, boolean>>({});

  // PubChem State
  const [compoundName, setCompoundName] = useState('sulforaphane');
  const [compound, setCompound] = useState<PubChemCompound | null>(null);
  const [isLoadingCompound, setIsLoadingCompound] = useState(false);
  const [compoundError, setCompoundError] = useState('');

  const performLiteratureSearch = (searchQuery: string) => {
    setIsLoadingArticles(true);
    fetch(`/api/science/search?q=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setTotalCount(data.total || data.articles?.length || 0);
        setIsLoadingArticles(false);
      })
      .catch((err) => {
        console.error('Science search error:', err);
        setIsLoadingArticles(false);
      });
  };

  const fetchPubChemCompound = (name: string) => {
    setIsLoadingCompound(true);
    setCompoundError('');
    fetch(`/api/science/pubchem?name=${encodeURIComponent(name)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.compound) {
          setCompound(data.compound);
        } else {
          setCompoundError(data.error || 'Compound not found in PubChem.');
        }
        setIsLoadingCompound(false);
      })
      .catch((err) => {
        console.warn('PubChem fetch warning:', err);
        setCompoundError('Could not reach PubChem database.');
        setIsLoadingCompound(false);
      });
  };

  useEffect(() => {
    performLiteratureSearch(query);
    fetchPubChemCompound(compoundName);
  }, []);

  const handleBookmarkArticle = async (article: ArticleItem) => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please sign in with Google to save research bookmarks to your clinical profile.');
      return;
    }

    try {
      await addDoc(collection(db, 'researchBookmarks'), {
        userId: user.uid,
        userEmail: user.email,
        articleId: article.id,
        title: article.title,
        journal: article.journalTitle,
        pubYear: article.pubYear,
        doi: article.doi,
        savedAt: serverTimestamp(),
      });
      setSavedArticles((prev) => ({ ...prev, [article.id]: true }));
    } catch (err) {
      console.error('Error saving bookmark:', err);
    }
  };

  return (
    <div className="bg-white border border-[#DCD5C9] p-6 sm:p-9 shadow-sm space-y-7">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#63716A]">
            <Dna className="w-4 h-4 text-[#163324]" />
            <span className="font-bold text-[#163324] uppercase">DeepMind Science Skills Integration</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#163324] mt-1">
            Biomedical Literature & Metabolomics Observatory
          </h3>
          <p className="text-xs text-[#525E58] mt-0.5">
            Real-time querying across NCBI PubMed, Europe PMC, and PubChem PUG REST API.
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 font-mono text-xs">
          <button
            onClick={() => setActiveTab('literature')}
            className={`px-3 py-1.5 font-bold transition-colors ${
              activeTab === 'literature'
                ? 'bg-[#163324] text-[#FAF8F5]'
                : 'bg-[#F4F1EA] text-[#4E5B54] hover:bg-[#EAE5DC]'
            }`}
          >
            PubMed / Europe PMC
          </button>
          <button
            onClick={() => setActiveTab('pubchem')}
            className={`px-3 py-1.5 font-bold transition-colors ${
              activeTab === 'pubchem'
                ? 'bg-[#163324] text-[#FAF8F5]'
                : 'bg-[#F4F1EA] text-[#4E5B54] hover:bg-[#EAE5DC]'
            }`}
          >
            PubChem Molecular Structures
          </button>
        </div>
      </div>

      {/* Tab 1: Literature Search */}
      {activeTab === 'literature' && (
        <div className="space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              performLiteratureSearch(query);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C9892] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search biomedical keywords (e.g., insulin resistance, sulforaphane, SCFAs)..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-[#DCD5C9] text-xs font-mono text-[#222725] focus:outline-none focus:border-[#163324]"
              />
            </div>
            <button
              type="submit"
              disabled={isLoadingArticles}
              className="px-6 py-2.5 bg-[#163324] hover:bg-[#204532] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {isLoadingArticles ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <span>Search</span>}
            </button>
          </form>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
            <span className="text-[11px] text-[#63716A]">Clinical Topics:</span>
            {[
              'Gut Barrier & Akkermansia',
              'Insulin Signaling & GLUT4',
              'Phase II Glutathione Conjugation',
              'Mitochondrial CoQ10 & ATP',
              'Omega-3 Resolvins & SPMs',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setQuery(chip);
                  performLiteratureSearch(chip);
                }}
                className="px-2.5 py-1 bg-[#FAF8F5] text-[#243029] border border-[#E0D9CD] hover:border-[#163324] text-[11px] whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Article Results Feed */}
          <div className="space-y-3">
            {articles.map((art) => (
              <div
                key={art.id}
                className="p-4 bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#163324] transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#687C71]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#163324]">{art.journalTitle}</span>
                    <span>·</span>
                    <span>{art.pubYear}</span>
                    {art.isOpenAccess && (
                      <span className="px-1.5 py-0.2 bg-[#EAEFE9] text-[#163324] border border-[#CFDFCE] text-[10px]">
                        OPEN ACCESS
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#86968C]">Cited by {art.citedByCount}</span>
                </div>

                <h4 className="font-serif text-base sm:text-lg font-bold text-[#163324] leading-snug">
                  {art.title}
                </h4>

                <div className="text-xs text-[#526058] font-mono truncate">
                  Authors: {art.authorString || 'Multicenter Research Collaborative'}
                </div>

                <div className="pt-2 border-t border-[#EAE5DC] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3 text-[#63716A]">
                    {art.pmid && <span>PMID: {art.pmid}</span>}
                    {art.doi && <span>DOI: {art.doi}</span>}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBookmarkArticle(art)}
                      className={`px-2.5 py-1 text-xs border flex items-center gap-1 transition-colors ${
                        savedArticles[art.id]
                          ? 'bg-[#163324] text-white border-[#163324]'
                          : 'bg-white text-[#163324] border-[#D5D0C6] hover:bg-[#F5F2EB]'
                      }`}
                    >
                      <Bookmark className="w-3 h-3" />
                      <span>{savedArticles[art.id] ? 'Bookmarked' : 'Save'}</span>
                    </button>

                    {art.doi && (
                      <a
                        href={`https://doi.org/${art.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-[#163324] text-[#FAF8F5] text-xs flex items-center gap-1 hover:bg-[#204532]"
                      >
                        <span>Full Paper</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: PubChem Molecular Structures Explorer */}
      {activeTab === 'pubchem' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={compoundName}
              onChange={(e) => setCompoundName(e.target.value)}
              placeholder="Enter compound name (e.g. sulforaphane, resveratrol, curcumin, butyrate)..."
              className="flex-1 px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD5C9] text-xs font-mono text-[#222725] focus:outline-none focus:border-[#163324]"
            />
            <button
              onClick={() => fetchPubChemCompound(compoundName)}
              disabled={isLoadingCompound}
              className="px-6 py-2.5 bg-[#163324] hover:bg-[#204532] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              {isLoadingCompound ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <span>Inspect PubChem CID</span>}
            </button>
          </div>

          {/* Quick Select Presets */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-mono">
            {COMMON_METABOLITES.map((m) => (
              <button
                key={m.name}
                onClick={() => {
                  setCompoundName(m.name);
                  fetchPubChemCompound(m.name);
                }}
                className={`p-2 border text-left transition-colors ${
                  compound?.name.toLowerCase().includes(m.name.toLowerCase())
                    ? 'bg-[#163324] text-[#FAF8F5] border-[#163324]'
                    : 'bg-[#FAF8F5] text-[#222B26] border-[#DCD5C9] hover:bg-[#F5F2EB]'
                }`}
              >
                <div className="font-bold text-xs truncate">{m.label}</div>
                <div className="text-[10px] text-[#6F7F76] truncate mt-0.5">{m.category}</div>
              </button>
            ))}
          </div>

          {compoundError && (
            <div className="p-3 bg-[#FAF2F2] border border-[#E8C4C4] text-[#9A2D2D] text-xs font-mono">
              {compoundError}
            </div>
          )}

          {compound && (
            <div className="p-6 bg-[#FAF8F5] border border-[#E8E2D8] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* 2D Chemical Structure Rendered via PubChem PUG REST */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-white border border-[#DCD5C9]">
                <img
                  src={compound.imageUrl}
                  alt={compound.name}
                  className="w-48 h-48 object-contain"
                />
                <span className="text-[10px] font-mono text-[#687C71] mt-2">
                  Official 2D Structure · PubChem PUG REST
                </span>
              </div>

              {/* Physicochemical Properties Table */}
              <div className="md:col-span-7 space-y-4 font-mono text-xs">
                <div className="border-b border-[#E8E2D8] pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#163324] font-bold uppercase text-[11px]">
                      PUBCHEM CID: {compound.cid}
                    </span>
                    <a
                      href={compound.pubChemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#163324] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>NCBI PubChem Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#163324] mt-1 capitalize">
                    {compound.name}
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-white border border-[#EAE5DC]">
                    <span className="text-[10px] text-[#63716A] uppercase block">Molecular Formula</span>
                    <span className="font-bold text-sm text-[#163324]">{compound.formula}</span>
                  </div>
                  <div className="p-2.5 bg-white border border-[#EAE5DC]">
                    <span className="text-[10px] text-[#63716A] uppercase block">Molecular Weight</span>
                    <span className="font-bold text-sm text-[#163324]">{compound.weight} g/mol</span>
                  </div>
                  <div className="p-2.5 bg-white border border-[#EAE5DC]">
                    <span className="text-[10px] text-[#63716A] uppercase block">LogP (Lipophilicity)</span>
                    <span className="font-bold text-sm text-[#163324]">{compound.xLogP ?? 'N/A'}</span>
                  </div>
                  <div className="p-2.5 bg-white border border-[#EAE5DC]">
                    <span className="text-[10px] text-[#63716A] uppercase block">H-Bond Donors / Acceptors</span>
                    <span className="font-bold text-sm text-[#163324]">
                      {compound.hBondDonorCount ?? 0} / {compound.hBondAcceptorCount ?? 0}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-white border border-[#EAE5DC]">
                  <span className="text-[10px] text-[#63716A] uppercase block">Canonical SMILES String</span>
                  <code className="text-[11px] text-[#163324] break-all block mt-0.5">
                    {compound.canonicalSmiles}
                  </code>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
