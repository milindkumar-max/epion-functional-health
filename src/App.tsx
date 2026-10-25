/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageView } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SystemsMap } from './components/SystemsMap';
import { HealthAreasGrid } from './components/HealthAreasGrid';
import { ProcessSection } from './components/ProcessSection';
import { PathwayStudio } from './components/PathwayStudio';
import { ResearchSection } from './components/ResearchSection';
import { ApproachSection } from './components/ApproachSection';
import { PractitionerProfile } from './components/PractitionerProfile';
import { ResourceLibrary } from './components/ResourceLibrary';
import { Footer } from './components/Footer';
import { UnifiedConsultationBooking } from './components/UnifiedConsultationBooking';
import { TraditionScienceBridge } from './components/TraditionScienceBridge';
import { AdminDashboard } from './components/AdminDashboard';
import { VisualStudio } from './components/VisualStudio';
import { LiveScienceExplorer } from './components/LiveScienceExplorer';
import { LegalModal } from './components/LegalModal';
import { ArrowLeft } from 'lucide-react';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedConsultationId, setSelectedConsultationId] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'disclaimer' | 'privacy' | 'terms' | null>(null);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (consultationId?: string) => {
    if (consultationId) {
      setSelectedConsultationId(consultationId);
    }
    if (currentPage === 'home') {
      const el = document.getElementById('consultations-and-booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    handleNavigate('booking');
  };

  return (
    <div className="min-h-screen bg-[var(--canvas-bg)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[#163324] selection:text-[#FAF8F5] relative transition-colors duration-300">
      {/* Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* Section A: Hero with photorealistic whole foods & balanced editorial layout */}
            <Hero
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />

            {/* Section A2: Where Traditional Wisdom Meets Modern Health Science */}
            <TraditionScienceBridge
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />

            {/* Section B: Our philosophy ("Your health is a connected system.") */}
            <ApproachSection
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />

            {/* Section C: Explore health areas (The clinical domains) */}
            <HealthAreasGrid onOpenBooking={handleOpenBooking} />

            {/* Section D: How the approach works (The 5-stage investigative journey) */}
            <ProcessSection onOpenBooking={handleOpenBooking} />

            {/* Section E: Science and biological pathways */}
            <PathwayStudio onOpenBooking={handleOpenBooking} />

            {/* Section F: Research and insights (Editorial peer-reviewed library) */}
            <ResearchSection />

            {/* Section G: About the practitioner (Milind Kumar - Functional Nutritionist) */}
            <PractitionerProfile onOpenBooking={() => handleOpenBooking()} />

            {/* Section H: Unified Consultations & Direct Booking Engine */}
            <UnifiedConsultationBooking
              initialConsultationId={selectedConsultationId}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />
          </>
        )}

        {currentPage === 'approach' && (
          <div className="space-y-6">
            <div className="bg-[var(--surface-bg)] border-b border-[var(--border-color)] py-8">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Overview</span>
                </button>
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Functional Nutrition / Clinical Approach
                </div>
              </div>
            </div>
            <TraditionScienceBridge
              onNavigate={handleNavigate}
              onOpenBooking={() => handleNavigate('booking')}
            />
            <ApproachSection
              onNavigate={handleNavigate}
              onOpenBooking={() => handleNavigate('booking')}
            />
            <ProcessSection onOpenBooking={() => handleNavigate('booking')} />
          </div>
        )}

        {currentPage === 'health-areas' && (
          <div className="space-y-6">
            <div className="bg-[var(--surface-bg)] border-b border-[var(--border-color)] py-8">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Overview</span>
                </button>
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Clinical Domains / Systems Biology
                </div>
              </div>
            </div>
            <HealthAreasGrid onOpenBooking={() => handleNavigate('booking')} />
            <SystemsMap onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === 'pathways' && (
          <div className="space-y-6">
            <div className="bg-[var(--surface-bg)] border-b border-[var(--border-color)] py-8">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Overview</span>
                </button>
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Biochemical Pathways Studio / Metabolic Mechanics
                </div>
              </div>
            </div>
            <PathwayStudio onOpenBooking={() => handleNavigate('booking')} />
            <ResearchSection />
          </div>
        )}

        {currentPage === 'science' && (
          <div className="space-y-6">
            <div className="bg-[var(--surface-bg)] border-b border-[var(--border-color)] py-8">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Overview</span>
                </button>
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Peer-Reviewed Research / Science Skills & Biomedical Literature
                </div>
              </div>
            </div>
            <ResearchSection />
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 space-y-12">
              <LiveScienceExplorer />
              <VisualStudio />
            </div>
          </div>
        )}

        {currentPage === 'resources' && (
          <div className="space-y-6">
            <div className="bg-[var(--surface-bg)] border-b border-[var(--border-color)] py-8">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Overview</span>
                </button>
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Resource Center / Educational Guides & FAQs
                </div>
              </div>
            </div>
            <ResourceLibrary />
          </div>
        )}

        {currentPage === 'practitioner' && (
          <div className="space-y-6">
            <div className="bg-[var(--surface-bg)] border-b border-[var(--border-color)] py-8">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Overview</span>
                </button>
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Practitioner Credentials & Clinical Scope
                </div>
              </div>
            </div>
            <PractitionerProfile onOpenBooking={() => handleOpenBooking()} />
            <ProcessSection onOpenBooking={() => handleOpenBooking()} />
          </div>
        )}

        {currentPage === 'pricing' && (
          <div className="space-y-6">
            <div className="bg-[var(--surface-bg)] border-b border-[var(--border-color)] py-8">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Overview</span>
                </button>
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Consultation Formats & Pricing in INR (₹)
                </div>
              </div>
            </div>
            <UnifiedConsultationBooking
              initialConsultationId={selectedConsultationId}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />
          </div>
        )}

        {currentPage === 'booking' && (
          <div className="space-y-6">
            <div className="bg-[var(--surface-bg)] border-b border-[var(--border-color)] py-8">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Overview</span>
                </button>
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Direct Clinical Scheduling · Live Availability (Asia/Kolkata)
                </div>
              </div>
            </div>
            <UnifiedConsultationBooking
              initialConsultationId={selectedConsultationId}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Footer & Closing Call to Action */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Clinician Administrator Management Dashboard */}
      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}

      {/* Legal & Medical Disclaimer Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
