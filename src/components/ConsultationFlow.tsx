import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Calendar, Clock, AlertCircle } from 'lucide-react';

interface ConsultationFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IntakeFormState {
  healthGoals: string[];
  symptomDuration: string;
  hasRecentLabs: string;
  currentDiet: string;
  consultationTier: string;
  fullName: string;
  email: string;
  phone: string;
  clinicalNotes: string;
  privacyAgreed: boolean;
}

export const ConsultationFlow: React.FC<ConsultationFlowProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<IntakeFormState>({
    healthGoals: ['Metabolic Health & Blood Sugar'],
    symptomDuration: '6–12 months',
    hasRecentLabs: 'Yes, within past 6 months',
    currentDiet: 'Omnivore / Whole Foods',
    consultationTier: 'Comprehensive Systems Intake (75 min)',
    fullName: '',
    email: '',
    phone: '',
    clinicalNotes: '',
    privacyAgreed: false,
  });

  if (!isOpen) return null;

  const toggleGoal = (goal: string) => {
    setFormData((prev) => {
      const exists = prev.healthGoals.includes(goal);
      if (exists) {
        if (prev.healthGoals.length === 1) return prev; // keep at least 1
        return { ...prev, healthGoals: prev.healthGoals.filter((g) => g !== goal) };
      }
      return { ...prev, healthGoals: [...prev.healthGoals, goal] };
    });
  };

  const handleNext = () => {
    setErrorMessage('');
    if (currentStep === 1 && formData.healthGoals.length === 0) {
      setErrorMessage('Please select at least one primary health focus.');
      return;
    }
    if (currentStep === 3 && !formData.consultationTier) {
      setErrorMessage('Please select a consultation format.');
      return;
    }
    if (currentStep === 4) {
      if (!formData.fullName.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorMessage('Please provide a valid email address.');
        return;
      }
      if (!formData.privacyAgreed) {
        setErrorMessage('Please acknowledge the privacy and clinical disclaimer notice.');
        return;
      }
      setIsSubmitted(true);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setErrorMessage('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#DDD7CD] rounded-2xl max-w-2xl w-full p-6 sm:p-9 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8] mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#63716A]">
            <ShieldCheck className="w-4 h-4 text-[#163324]" />
            <span>Clinical Intake & Consultation Request</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#46504A] hover:bg-[#EAEFE9] rounded-md transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {isSubmitted ? (
          <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-[#EAEFE9] text-[#163324] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-3xl font-semibold text-[#163324]">
                Intake Profile Received
              </h3>
              <p className="text-sm text-[#46504A] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#163324]">{formData.fullName}</strong>. Your preliminary health systems information has been logged into our secure clinical scheduling system.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#DDD7CD] text-left max-w-md mx-auto text-xs space-y-2">
              <div className="font-semibold text-[#163324] border-b border-[#F0ECE4] pb-1.5">
                Next Clinical Steps:
              </div>
              <p className="text-[#525E58]">
                1. Our clinical coordinator will review your goals and email you within 1 business day with calendar availability for your <span className="font-medium text-[#163324]">{formData.consultationTier}</span>.
              </p>
              <p className="text-[#525E58]">
                2. You will receive a secure portal link to upload recent bloodwork and complete your multi-day nutritional intake log.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#163324] rounded-md hover:bg-[#204532] transition-colors"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Step Indicators */}
            <div className="flex items-center justify-between text-xs font-mono text-[#63716A] mb-6">
              <span>Step 0{currentStep} of 04</span>
              <span>
                {currentStep === 1 && 'Health Focus & Symptoms'}
                {currentStep === 2 && 'Clinical History'}
                {currentStep === 3 && 'Consultation Tier'}
                {currentStep === 4 && 'Contact & Consent'}
              </span>
            </div>

            <div className="w-full bg-[#E8E2D8] h-1 rounded-full mb-8 overflow-hidden">
              <div
                className="bg-[#163324] h-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-3 rounded-md bg-[#FDF2F0] border border-[#F5C6CB] text-xs text-[#9B2C2C] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* STEP 1: Health Goals */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-semibold text-[#163324]">
                    Select Your Primary Health Focus Areas
                  </h3>
                  <p className="text-xs text-[#5C6661]">
                    Which physiological systems are currently experiencing the greatest imbalance? (Select all that apply)
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Gut Health & Digestive Integrity',
                    'Metabolic Health & Blood Sugar',
                    'Liver Health & Fat Metabolism',
                    'Chronic Inflammation & Joint Comfort',
                    'Mitochondrial Fatigue & Cellular Energy',
                    'Nutrient Deficiencies & Anemia Patterns',
                    'Stress, Sleep & HPA Axis Dynamics',
                    'Nutrigenomics & Genetic Profiling'
                  ].map((goal) => {
                    const isChecked = formData.healthGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        className={`text-left p-3.5 rounded-lg border text-xs font-medium transition-all ${
                          isChecked
                            ? 'bg-[#EAEFE9] border-[#163324] text-[#163324]'
                            : 'bg-white border-[#DDD7CD] text-[#46504A] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Clinical Background */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-semibold text-[#163324]">
                    Clinical Context & Timeline
                  </h3>
                  <p className="text-xs text-[#5C6661]">
                    Understanding duration and recent diagnostic history assists in tailoring the initial assessment.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#2E3632] block">
                      How long have you experienced these primary concerns?
                    </label>
                    <select
                      value={formData.symptomDuration}
                      onChange={(e) => setFormData({ ...formData, symptomDuration: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-xs text-[#222725] focus:outline-none focus:ring-1 focus:ring-[#163324]"
                    >
                      <option value="Under 3 months">Under 3 months (Recent onset)</option>
                      <option value="3–6 months">3–6 months</option>
                      <option value="6–12 months">6–12 months</option>
                      <option value="1–3 years">1–3 years</option>
                      <option value="3+ years">3+ years (Longstanding chronic concern)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#2E3632] block">
                      Do you have conventional bloodwork or lab testing from the last 12 months?
                    </label>
                    <select
                      value={formData.hasRecentLabs}
                      onChange={(e) => setFormData({ ...formData, hasRecentLabs: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-xs text-[#222725] focus:outline-none focus:ring-1 focus:ring-[#163324]"
                    >
                      <option value="Yes, within past 6 months">Yes, within past 6 months (Available to upload)</option>
                      <option value="Yes, within 6–12 months">Yes, within 6–12 months</option>
                      <option value="No, but interested in functional panel">No, but interested in functional biomarker recommendations</option>
                      <option value="No recent tests">No recent tests</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#2E3632] block">
                      Current dietary baseline
                    </label>
                    <select
                      value={formData.currentDiet}
                      onChange={(e) => setFormData({ ...formData, currentDiet: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-xs text-[#222725] focus:outline-none focus:ring-1 focus:ring-[#163324]"
                    >
                      <option value="Omnivore / Whole Foods">Omnivore / Whole Foods baseline</option>
                      <option value="Mediterranean style">Mediterranean style</option>
                      <option value="Low carbohydrate / Ketogenic">Low carbohydrate / Ketogenic</option>
                      <option value="Plant-based / Vegetarian">Plant-based / Vegetarian</option>
                      <option value="Specific exclusion diet (Gluten-free, Dairy-free)">Specific exclusion diet</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Consultation Tier */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-semibold text-[#163324]">
                    Select Consultation Format
                  </h3>
                  <p className="text-xs text-[#5C6661]">
                    Every consultation includes clinical history review, written recommendations, and physician coordination options.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: 'Comprehensive Systems Intake (75 min)',
                      duration: '75 Minutes',
                      focus: 'Full-spectrum systems biology review: gut, metabolic, mitochondrial, and immune mapping + individualized nutrition protocol.',
                      idealFor: 'Complex, multi-system, or longstanding symptoms requiring deep investigation.'
                    },
                    {
                      name: 'Targeted Metabolic & Glycemic Review (45 min)',
                      duration: '45 Minutes',
                      focus: 'Continuous glucose monitor data analysis, food sequencing architecture, and insulin sensitivity optimization.',
                      idealFor: 'Focused metabolic health, blood sugar volatility, and athletic fuel partitioning.'
                    }
                  ].map((tier) => {
                    const isSelected = formData.consultationTier === tier.name;
                    return (
                      <div
                        key={tier.name}
                        onClick={() => setFormData({ ...formData, consultationTier: tier.name })}
                        className={`p-5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#EAEFE9] border-[#163324] shadow-xs'
                            : 'bg-white border-[#DDD7CD] hover:border-[#163324]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-[#163324] mb-1">
                          <span>{tier.name}</span>
                          <span className="font-mono text-[#2A4E38]">{tier.duration}</span>
                        </div>
                        <p className="text-xs text-[#525E58] mb-2 leading-relaxed">
                          {tier.focus}
                        </p>
                        <div className="text-[11px] text-[#63716A] italic">
                          Recommended for: {tier.idealFor}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: Contact & Consent */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-semibold text-[#163324]">
                    Contact Information & Consent
                  </h3>
                  <p className="text-xs text-[#5C6661]">
                    Your information is protected by strict confidentiality standards.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2E3632] block">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Julian Reed"
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-xs text-[#222725] focus:outline-none focus:ring-1 focus:ring-[#163324]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2E3632] block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="julian@example.com"
                        className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-xs text-[#222725] focus:outline-none focus:ring-1 focus:ring-[#163324]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2E3632] block">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 012-3456"
                        className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-xs text-[#222725] focus:outline-none focus:ring-1 focus:ring-[#163324]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2E3632] block">
                      Brief Note on Current Health Priorities
                    </label>
                    <textarea
                      rows={2}
                      value={formData.clinicalNotes}
                      onChange={(e) => setFormData({ ...formData, clinicalNotes: e.target.value })}
                      placeholder="Share any specific diagnoses, current medications, or primary goals..."
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-xs text-[#222725] focus:outline-none focus:ring-1 focus:ring-[#163324]"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.privacyAgreed}
                        onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                        className="mt-0.5 rounded text-[#163324] focus:ring-[#163324]"
                      />
                      <span className="text-[11px] text-[#525E58] leading-normal">
                        I acknowledge that functional nutrition consultations provide evidence-informed nutritional guidance and lifestyle coaching, and do not constitute emergency medical care or replace ongoing evaluation by my primary licensed physician.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-8 border-t border-[#E8E2D8] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-xs font-medium text-[#46504A] hover:text-[#163324] flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#163324] hover:bg-[#204532] rounded-md transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>{currentStep === 4 ? 'Submit Clinical Request' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
