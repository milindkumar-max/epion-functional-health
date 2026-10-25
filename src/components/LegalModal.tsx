import React from 'react';
import { X, ShieldAlert, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  type: 'disclaimer' | 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#DDD7CD] rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#63716A]">
            {type === 'disclaimer' && <ShieldAlert className="w-4 h-4 text-[#8B4828]" />}
            {type === 'privacy' && <Lock className="w-4 h-4 text-[#163324]" />}
            {type === 'terms' && <FileText className="w-4 h-4 text-[#163324]" />}
            <span className="uppercase tracking-wider">
              {type === 'disclaimer' && 'Medical & Educational Disclaimer'}
              {type === 'privacy' && 'Privacy Notice & Data Governance'}
              {type === 'terms' && 'Terms of Service'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#46504A] hover:bg-[#EAEFE9] rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Medical Disclaimer */}
        {type === 'disclaimer' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#4E5B55] leading-relaxed">
            <h3 className="font-serif text-2xl font-semibold text-[#163324]">
              Medical & Educational Disclaimer
            </h3>
            <p>
              The content provided across the Epion Functional Health platform—including biological pathway diagrams, biomarker references, dietary frameworks, and educational articles—is published strictly for educational and informational purposes.
            </p>
            <div className="p-4 bg-[#F8F4EE] border border-[#E8E0D2] rounded-xl text-xs space-y-2">
              <strong className="text-[#8B4828] block">Critical Clinical Distinctions:</strong>
              <ul className="list-disc list-inside space-y-1 text-[#4E433C]">
                <li>This platform does not dispense medical diagnoses or prescribe pharmacological treatments.</li>
                <li>Functional nutrition is intended to complement, never supplant, standard licensed medical care.</li>
                <li>Never discontinue or alter prescribed pharmaceutical regimens without direct supervision from your prescribing physician.</li>
                <li>In situations involving acute emergency symptoms, seek immediate emergency medical care.</li>
              </ul>
            </div>
            <p>
              Every individual possesses unique biochemistry, genetic polymorphisms, and health contexts. Always consult with a qualified licensed healthcare provider before implementing significant dietary modifications, targeted botanical extracts, or nutritional supplements.
            </p>
          </div>
        )}

        {/* Privacy Policy */}
        {type === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#4E5B55] leading-relaxed">
            <h3 className="font-serif text-2xl font-semibold text-[#163324]">
              Privacy & Protected Health Information
            </h3>
            <p>
              At Epion Functional Health, we uphold strict standards of patient confidentiality and digital privacy.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-[#163324]">1. Information Collection</h4>
              <p>
                We only collect personal information and health history that you voluntarily provide through our clinical intake questionnaires, consultation bookings, or direct communications.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-[#163324]">2. Zero Commercial Data Brokering</h4>
              <p>
                We will never sell, rent, monetize, or disclose your personal health metrics, email address, or contact details to third-party advertising networks or pharmaceutical marketing entities.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-[#163324]">3. Data Security & Storage</h4>
              <p>
                All transmitted consultation inquiries and intake logs are encrypted via industry-standard SSL/TLS protocols and stored in secure, access-restricted environments compliant with health privacy regulations.
              </p>
            </div>
          </div>
        )}

        {/* Terms of Service */}
        {type === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#4E5B55] leading-relaxed">
            <h3 className="font-serif text-2xl font-semibold text-[#163324]">
              Terms of Service
            </h3>
            <p>
              By accessing the Epion Functional Health platform and utilizing our educational materials or booking clinical consultations, you agree to these Terms of Service.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-[#163324]">1. Professional Relationship</h4>
              <p>
                Browsing this website, reading research summaries, or interacting with biological pathway visualizations does not establish a formal clinical practitioner-patient relationship until a formal intake consultation agreement has been countersigned.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-[#163324]">2. Intellectual Property</h4>
              <p>
                All original diagrams, text, and educational curricula are intellectual property of Epion Functional Health. Content may be shared for non-commercial educational purposes with proper attribution.
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#163324] rounded-md hover:bg-[#204532] transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
