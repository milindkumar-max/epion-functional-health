import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  User,
  Mail,
  Phone,
  FileText,
  ChevronLeft,
  ChevronRight,
  Check,
  MapPin,
  Video,
  Download,
  CalendarCheck,
} from 'lucide-react';
import { auth, saveAppointmentToFirestore } from '../lib/firebase';

export interface ConsultationType {
  id: string;
  name: string;
  durationMinutes: number;
  priceINR: number;
  subtitle: string;
  description: string;
  recommendedFor: string;
  features: string[];
}

interface UnifiedConsultationBookingProps {
  initialConsultationId?: string;
  onOpenAdmin?: () => void;
}

const DEFAULT_PACKAGES: ConsultationType[] = [
  {
    id: 'initial-systems-intake',
    name: 'Initial Functional Nutrition Consultation',
    durationMinutes: 75,
    priceINR: 2000,
    subtitle: '₹2,000 · 75 minutes',
    description:
      'A comprehensive, deep-dive assessment evaluating health history, dietary patterns, digestive function, metabolic markers, and lifestyle triggers to design an individualized nutrition roadmap.',
    recommendedFor: 'Individuals with multi-system symptoms, chronic fatigue, digestive issues, or complex metabolic conditions.',
    features: [
      'Comprehensive chronological medical & dietary analysis',
      'Evaluation of current blood tests & biomarker history',
      'Individualized food protocol & written action plan',
      'Available In-Clinic in Bellandur or via HD Telehealth video',
    ],
  },
  {
    id: 'focused-nutrition-consultation',
    name: 'Focused Nutrition Consultation',
    durationMinutes: 45,
    priceINR: 1500,
    subtitle: '₹1,500 · 45 minutes',
    description:
      'A focused consultation addressing a specific clinical concern — such as blood sugar stability, lipid metabolism, food intolerances, or athletic nutrition.',
    recommendedFor: 'Individuals addressing blood sugar volatility, pre-diabetes, reactive hypoglycemia, or metabolic body composition goals.',
    features: [
      'Targeted analysis for specific metabolic or dietary concern',
      'Practical meal composition & nutrient timing adjustments',
      'Focused lifestyle & evidence-backed supplement guidance',
      'Available In-Clinic in Bellandur or via HD Telehealth video',
    ],
  },
  {
    id: 'follow-up-consultation',
    name: 'Follow-up Consultation',
    durationMinutes: 30,
    priceINR: 1000,
    subtitle: '₹1,000 · 30 minutes',
    description:
      'A clinical check-in to track progress, review symptom resolution or lab changes, overcome dietary obstacles, and calibrate your nutritional protocol.',
    recommendedFor: 'Existing clients undergoing active clinical care protocol adjustments.',
    features: [
      'Progress tracking against baseline symptoms & biomarkers',
      'Refinements to nutrition & supplement protocols',
      'Troubleshooting compliance, travel, or seasonal eating',
      'Available In-Clinic in Bellandur or via HD Telehealth video',
    ],
  },
];

export const UnifiedConsultationBooking: React.FC<UnifiedConsultationBookingProps> = ({
  initialConsultationId,
  onOpenAdmin,
}) => {
  const schedulerRef = useRef<HTMLDivElement>(null);

  // Consultations state
  const [packages, setPackages] = useState<ConsultationType[]>(DEFAULT_PACKAGES);
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationType>(
    DEFAULT_PACKAGES[0]
  );

  // Step state: 1: Service, 2: Date & Time, 3: Details & Mode, 4: Review, 5: Confirmed
  const [currentStep, setCurrentStep] = useState<number>(initialConsultationId ? 2 : 1);

  // Date selection state
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Calendar month navigation
  const [calendarYear, setCalendarYear] = useState<number>(today.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState<number>(today.getMonth());

  // Available slots state
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [slotsError, setSlotsError] = useState<string>('');

  // Mode and Patient Form Fields
  const [consultationMode, setConsultationMode] = useState<'in-clinic' | 'virtual'>('in-clinic');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [emailStatus, setEmailStatus] = useState<any>(null);

  // Load packages from server on mount
  useEffect(() => {
    fetch('/api/consultations')
      .then((res) => res.json())
      .then((data) => {
        if (data.consultations && data.consultations.length > 0) {
          const merged = data.consultations.map((c: any) => {
            const def = DEFAULT_PACKAGES.find((p) => p.id === c.id);
            return {
              ...c,
              priceINR: c.priceINR || def?.priceINR || 2000,
              features: def?.features || [
                'Chronological dietary & lifestyle analysis',
                'Individualized nutrition strategy & written plan',
                'In-Clinic (Bellandur) or Virtual Telehealth access',
              ],
            };
          });
          setPackages(merged);

          if (initialConsultationId) {
            const found = merged.find((p: ConsultationType) => p.id === initialConsultationId);
            if (found) {
              setSelectedConsultation(found);
              setCurrentStep(2);
            }
          }
        }
      })
      .catch((err) => console.warn('Using default consultation packages:', err));
  }, [initialConsultationId]);

  // Synchronize when initialConsultationId prop changes
  useEffect(() => {
    if (initialConsultationId && packages.length > 0) {
      const match = packages.find((p) => p.id === initialConsultationId);
      if (match) {
        setSelectedConsultation(match);
        setCurrentStep(2);
      }
    }
  }, [initialConsultationId, packages]);

  // Fetch slots whenever date or selected package changes
  useEffect(() => {
    if (!selectedDate || !selectedConsultation) return;

    setIsLoadingSlots(true);
    setSlotsError('');
    setSelectedSlot('');

    fetch(`/api/availability?date=${selectedDate}&consultationId=${selectedConsultation.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not retrieve slot availability');
        return res.json();
      })
      .then((data) => {
        if (data.availableSlots && data.availableSlots.length > 0) {
          setAvailableSlots(data.availableSlots);
          setSelectedSlot(data.availableSlots[0]);
        } else {
          setAvailableSlots([]);
        }
        setIsLoadingSlots(false);
      })
      .catch((err) => {
        console.error(err);
        setSlotsError('Could not load appointment slots for this date.');
        setIsLoadingSlots(false);
      });
  }, [selectedDate, selectedConsultation]);

  // Prefill contact if Firebase user is signed in
  useEffect(() => {
    if (auth.currentUser) {
      if (auth.currentUser.displayName) setFullName(auth.currentUser.displayName);
      if (auth.currentUser.email) setEmail(auth.currentUser.email);
    }
  }, []);

  const handleSelectPackage = (pkg: ConsultationType) => {
    setSelectedConsultation(pkg);
    setCurrentStep(2);
    if (schedulerRef.current) {
      schedulerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCreateBooking = async () => {
    if (!privacyAgreed) {
      setSubmissionError('Please confirm the booking consent acknowledgment before proceeding.');
      return;
    }

    setSubmissionError('');
    setIsSubmitting(true);

    const modeText =
      consultationMode === 'virtual'
        ? 'Virtual Telehealth (HD Video)'
        : 'In-Clinic (Bellandur, Bengaluru)';

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultationId: selectedConsultation.id,
          consultationMode: modeText,
          date: selectedDate,
          time: selectedSlot,
          fullName,
          email,
          phone,
          reason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to confirm appointment booking.');
      }

      setConfirmedBooking(data.booking);
      if (data.emailDelivery) {
        setEmailStatus(data.emailDelivery);
      }

      // Sync with Firestore if authenticated
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          await saveAppointmentToFirestore({
            userId: currentUser.uid,
            userEmail: currentUser.email || email,
            userName: currentUser.displayName || fullName,
            consultationId: selectedConsultation.id,
            consultationName: selectedConsultation.name,
            consultationMode: modeText,
            date: selectedDate,
            time: selectedSlot,
            durationMinutes: selectedConsultation.durationMinutes,
            priceINR: selectedConsultation.priceINR,
            phone,
            reason,
            status: 'confirmed',
          });
        } catch (firestoreErr) {
          console.warn('Firestore optional record save:', firestoreErr);
        }
      }

      setCurrentStep(5);
    } catch (err: any) {
      setSubmissionError(
        err.message || 'An unexpected error occurred while processing your booking. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calendar rendering
  const renderCalendar = () => {
    const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const prevMonth = () => {
      if (calendarMonth === 0) {
        setCalendarMonth(11);
        setCalendarYear(calendarYear - 1);
      } else {
        setCalendarMonth(calendarMonth - 1);
      }
    };

    const nextMonth = () => {
      if (calendarMonth === 11) {
        setCalendarMonth(0);
        setCalendarYear(calendarYear + 1);
      } else {
        setCalendarMonth(calendarMonth + 1);
      }
    };

    const dayCells = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      dayCells.push(<div key={`blank-${i}`} className="h-10 w-10" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const monthStr = String(calendarMonth + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      const dateKey = `${calendarYear}-${monthStr}-${dayStr}`;

      const dayDate = new Date(`${dateKey}T12:00:00`);
      const isPast = dateKey < todayStr;
      const isSunday = dayDate.getDay() === 0;
      const isDisabled = isPast || isSunday;
      const isSelected = selectedDate === dateKey;

      dayCells.push(
        <button
          key={dateKey}
          type="button"
          disabled={isDisabled}
          onClick={() => setSelectedDate(dateKey)}
          className={`h-10 w-10 rounded-full text-xs font-mono flex items-center justify-center transition-all ${
            isSelected
              ? 'bg-[#163324] text-[#FAF8F5] font-bold shadow-xs scale-105'
              : isDisabled
              ? 'text-[#C5BEB3] cursor-not-allowed bg-transparent'
              : 'text-[#163324] hover:bg-[#EAE5DC] cursor-pointer'
          }`}
          title={isSunday ? 'Closed on Sundays' : isPast ? 'Past date' : `Select ${dateKey}`}
        >
          {d}
        </button>
      );
    }

    return (
      <div className="bg-[#FAF8F5] border border-[#E8E2D8] p-5 rounded-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-serif text-base font-semibold text-[#163324]">
            {monthNames[calendarMonth]} {calendarYear}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 rounded-xs hover:bg-[#EAE5DC] text-[#163324] transition-colors"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-xs hover:bg-[#EAE5DC] text-[#163324] transition-colors"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px] font-semibold text-[#7E8D84] uppercase tracking-wider">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>

        <div className="grid grid-cols-7 gap-1 justify-items-center">{dayCells}</div>

        <div className="pt-2 border-t border-[#E8E2D8] flex items-center justify-between text-[11px] text-[#5F7065]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#163324]" /> Selected Date
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#88988F]">
            Sundays clinic closed
          </span>
        </div>
      </div>
    );
  };

  // Generate .ics calendar download
  const handleDownloadICS = () => {
    if (!confirmedBooking) return;
    const [h, m] = confirmedBooking.time.split(':').map(Number);
    const dateParts = confirmedBooking.date.split('-').map(Number);
    const startObj = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2], h, m));
    const endObj = new Date(startObj.getTime() + (confirmedBooking.durationMinutes || 60) * 60000);

    const pad = (n: number) => String(n).padStart(2, '0');
    const toICSDate = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const isVirtual = confirmedBooking.consultationMode?.toLowerCase().includes('virtual');
    const locationStr = isVirtual
      ? 'Virtual Telehealth HD Video (Access link sent via email)'
      : 'Sarada Residency, Bellandur, Bengaluru - 560103, Karnataka, India';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Epion Functional Health//Clinical Booking//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${confirmedBooking.id}@epionfunctionalhealth.com`,
      `DTSTAMP:${toICSDate(new Date())}`,
      `DTSTART:${toICSDate(startObj)}`,
      `DTEND:${toICSDate(endObj)}`,
      `SUMMARY:Epion Consultation: ${confirmedBooking.consultationName}`,
      `DESCRIPTION:Functional Nutrition Consultation with Milind Kumar.\\nReference: ${confirmedBooking.id}\\nMode: ${confirmedBooking.consultationMode || 'In-Clinic'}\\nLocation: ${locationStr}`,
      `LOCATION:${locationStr}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `epion-appointment-${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="consultations-and-booking" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-[0.22em] font-medium text-[#5F7065]">
            Consultations & Direct Scheduling
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#163324] tracking-tight leading-[1.12]">
            Evidence-informed clinical consultations. <br />
            <span className="italic font-normal text-[#2A4E38]">Priced transparently in INR.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4E5B54] leading-relaxed pt-1">
            Every consultation is conducted directly with <strong>Milind Kumar, Functional Nutritionist</strong>, in our Bellandur, Bengaluru clinic or worldwide via private HD telehealth video. Choose your package to begin.
          </p>
        </div>

        {/* 1. Comparison of Consultation Packages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => {
            const isFeatured = idx === 0;
            const isSelected = selectedConsultation?.id === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-xs border p-8 transition-all relative ${
                  isSelected
                    ? 'bg-white border-[#163324] ring-2 ring-[#163324] shadow-md'
                    : isFeatured
                    ? 'bg-white border-[#163324]/60 shadow-sm'
                    : 'bg-white/80 border-[#E8E2D8] hover:border-[#163324]/40 shadow-xs'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-8 px-3 py-1 bg-[#163324] text-[#FAF8F5] text-[10px] uppercase font-semibold tracking-wider rounded-xs">
                    Recommended For New Clients
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-[#163324] leading-snug">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#5F7065] mt-2 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#2A4E38]" />
                      <span>{pkg.durationMinutes} Minutes Clinical Session</span>
                    </div>
                  </div>

                  {/* INR Price Tag */}
                  <div className="pt-2 pb-4 border-b border-[#E8E2D8]">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl sm:text-5xl font-semibold text-[#163324] tracking-tight">
                        ₹{pkg.priceINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#63716A] font-medium">
                        / session
                      </span>
                    </div>
                    <p className="text-xs text-[#2A4E38] font-medium mt-1">
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#4E5B54] leading-relaxed font-normal">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  <div className="p-4 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs space-y-2 text-xs text-[#55635B]">
                    <span className="font-semibold text-[#163324] block uppercase tracking-wider text-[10px]">
                      Clinical Deliverables:
                    </span>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select / Book CTA Button */}
                <div className="pt-8">
                  <button
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full py-3.5 px-6 rounded-xs text-xs font-semibold uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#163324] text-[#FAF8F5] ring-2 ring-[#163324] ring-offset-2'
                        : isFeatured
                        ? 'bg-[#163324] hover:bg-[#204532] text-[#FAF8F5] shadow-xs'
                        : 'bg-[#F2EFE9] hover:bg-[#163324] text-[#163324] hover:text-[#FAF8F5] border border-[#DDD7CD]'
                    }`}
                  >
                    <span>{isSelected ? 'Package Selected ✓' : 'Book This Consultation'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Interactive Booking Scheduler Anchor */}
        <div ref={schedulerRef} className="pt-8">
          <div className="bg-white border border-[#E8E2D8] rounded-xs shadow-sm overflow-hidden">
            {/* Step Progress Header */}
            <div className="bg-[#FAF8F5] border-b border-[#E8E2D8] px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[#5F7065]">
                    Step {currentStep} of 5
                  </div>
                  <div className="font-serif text-lg font-medium text-[#163324]">
                    {currentStep === 1 && 'Confirm Consultation Service'}
                    {currentStep === 2 && 'Select Date & Available Time Slot (IST)'}
                    {currentStep === 3 && 'Consultation Mode & Client Information'}
                    {currentStep === 4 && 'Review & Authorize Appointment'}
                    {currentStep === 5 && 'Appointment Confirmed'}
                  </div>
                </div>

                {/* Step Circles */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`w-7 h-7 rounded-full text-xs font-mono flex items-center justify-center transition-all ${
                        currentStep === step
                          ? 'bg-[#163324] text-[#FAF8F5] font-bold ring-2 ring-[#163324]/30'
                          : currentStep > step
                          ? 'bg-[#EAEFE9] text-[#163324] font-medium'
                          : 'bg-[#F2EFE9] text-[#9EA8A1]'
                      }`}
                    >
                      {currentStep > step ? <Check className="w-3.5 h-3.5" /> : step}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 1: Package Selection / Confirmation */}
            {currentStep === 1 && (
              <div className="p-6 sm:p-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-[#163324]">
                    Choose your consultation format
                  </h3>
                  <p className="text-sm text-[#4E5B54]">
                    Select the consultation that aligns with your current clinical objectives.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages.map((pkg) => {
                    const isSelected = selectedConsultation?.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedConsultation(pkg)}
                        className={`p-5 rounded-xs border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#163324] bg-[#FAF8F5] ring-1 ring-[#163324]'
                            : 'border-[#E8E2D8] hover:border-[#163324]/50 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-medium text-lg text-[#163324]">
                              {pkg.name}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#163324]" />}
                          </div>
                          <div className="text-xs text-[#5F7065] mt-1">
                            {pkg.durationMinutes} mins · ₹{pkg.priceINR.toLocaleString('en-IN')}
                          </div>
                          <p className="text-xs text-[#55635B] mt-3 line-clamp-3 leading-relaxed">
                            {pkg.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="py-3 px-6 bg-[#163324] hover:bg-[#204532] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Proceed to Calendar & Time Slots</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Available Time Slots */}
            {currentStep === 2 && (
              <div className="p-6 sm:p-10 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D8]">
                  <div>
                    <div className="text-xs text-[#5F7065] uppercase tracking-wider font-semibold">
                      Selected Service
                    </div>
                    <div className="font-serif text-xl font-medium text-[#163324] flex items-center gap-3">
                      <span>{selectedConsultation?.name}</span>
                      <span className="text-xs font-mono font-normal text-[#2A4E38] bg-[#EAEFE9] px-2.5 py-0.5 rounded-xs">
                        {selectedConsultation?.durationMinutes} mins · ₹{selectedConsultation?.priceINR.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-[#2A4E38] hover:underline font-medium cursor-pointer self-start sm:self-auto"
                  >
                    Change Service
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Calendar Column */}
                  <div className="lg:col-span-6 space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#163324]">
                      1. Select Consultation Date
                    </label>
                    {renderCalendar()}
                  </div>

                  {/* Slots Column */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#163324]">
                        2. Select Time Slot (Asia/Kolkata IST)
                      </label>
                      <span className="text-[11px] text-[#5F7065]">
                        Date: <strong>{selectedDate}</strong>
                      </span>
                    </div>

                    {isLoadingSlots ? (
                      <div className="py-16 text-center text-xs text-[#5F7065] flex flex-col items-center justify-center gap-3 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs">
                        <RefreshCw className="w-5 h-5 animate-spin text-[#163324]" />
                        <span>Querying real-time slot availability...</span>
                      </div>
                    ) : slotsError ? (
                      <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xs text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{slotsError}</span>
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="p-8 text-center bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs space-y-2">
                        <p className="text-sm font-medium text-[#163324]">
                          No available appointments on this date.
                        </p>
                        <p className="text-xs text-[#5F7065]">
                          The clinic operates Monday through Saturday (09:00 - 18:00 IST). Please select another date on the calendar.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-72 overflow-y-auto pr-1">
                          {availableSlots.map((slot) => {
                            const isSelected = selectedSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-2.5 px-3 rounded-xs text-xs font-mono text-center transition-all cursor-pointer border ${
                                  isSelected
                                    ? 'bg-[#163324] text-[#FAF8F5] font-semibold border-[#163324] shadow-xs'
                                    : 'bg-[#FAF8F5] hover:bg-[#EAE5DC] text-[#163324] border-[#E8E2D8]'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                        <div className="p-3 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs text-[11px] text-[#5F7065] flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#2A4E38]" />
                          <span>
                            Selected: <strong>{selectedDate} at {selectedSlot || '—'} IST</strong> ({selectedConsultation?.durationMinutes} min session)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 2 Actions */}
                <div className="pt-6 border-t border-[#E8E2D8] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#5F7065] hover:text-[#163324] flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={!selectedSlot}
                    onClick={() => setCurrentStep(3)}
                    className="py-3 px-6 bg-[#163324] disabled:bg-[#C5BEB3] disabled:cursor-not-allowed hover:bg-[#204532] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Continue to Patient Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Patient Information & Consultation Mode */}
            {currentStep === 3 && (
              <div className="p-6 sm:p-10 space-y-8">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-[#163324]">
                    Consultation mode & client information
                  </h3>
                  <p className="text-sm text-[#4E5B54]">
                    Specify whether you will attend in person at our Bellandur clinic or online via secure telehealth video.
                  </p>
                </div>

                {/* Consultation Mode Selector */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#163324]">
                    Select Consultation Mode <span className="text-rose-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setConsultationMode('in-clinic')}
                      className={`p-4 border rounded-xs cursor-pointer transition-all flex items-start gap-3 ${
                        consultationMode === 'in-clinic'
                          ? 'border-[#163324] bg-[#FAF8F5] ring-1 ring-[#163324]'
                          : 'border-[#E8E2D8] bg-white hover:border-[#163324]/40'
                      }`}
                    >
                      <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${consultationMode === 'in-clinic' ? 'text-[#163324]' : 'text-[#7E8D84]'}`} />
                      <div>
                        <div className="font-semibold text-sm text-[#163324]">
                          In-Clinic Consultation
                        </div>
                        <div className="text-xs text-[#5F7065] mt-1 leading-relaxed">
                          Sarada Residency, Bellandur, Bengaluru - 560103, Karnataka, India
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setConsultationMode('virtual')}
                      className={`p-4 border rounded-xs cursor-pointer transition-all flex items-start gap-3 ${
                        consultationMode === 'virtual'
                          ? 'border-[#163324] bg-[#FAF8F5] ring-1 ring-[#163324]'
                          : 'border-[#E8E2D8] bg-white hover:border-[#163324]/40'
                      }`}
                    >
                      <Video className={`w-5 h-5 shrink-0 mt-0.5 ${consultationMode === 'virtual' ? 'text-[#163324]' : 'text-[#7E8D84]'}`} />
                      <div>
                        <div className="font-semibold text-sm text-[#163324]">
                          Virtual Telehealth (HD Video)
                        </div>
                        <div className="text-xs text-[#5F7065] mt-1 leading-relaxed">
                          Secure private video consultation link dispatched to your email 24h prior
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#163324]">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#7E8D84] absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs text-sm text-[#163324] focus:outline-none focus:border-[#163324]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#163324]">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#7E8D84] absolute left-3 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs text-sm text-[#163324] focus:outline-none focus:border-[#163324]"
                      />
                    </div>
                    <span className="text-[10px] text-[#5F7065]">
                      Instant appointment confirmation will be dispatched here.
                    </span>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#163324]">
                      Phone / WhatsApp Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#7E8D84] absolute left-3 top-3.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs text-sm text-[#163324] focus:outline-none focus:border-[#163324]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#163324]">
                      Health Goals or Primary Concern (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Briefly describe what you'd like to address (e.g. gut health, blood sugar volatility, post-meal fatigue, recent lab panels)..."
                      className="w-full p-3 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs text-sm text-[#163324] focus:outline-none focus:border-[#163324]"
                    />
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-[#4E5B54]">
                    <input
                      type="checkbox"
                      checked={privacyAgreed}
                      onChange={(e) => setPrivacyAgreed(e.target.checked)}
                      className="mt-0.5 rounded-xs accent-[#163324]"
                    />
                    <span>
                      I understand that functional nutrition consultations are educational and clinical nutritional guidance, and do not replace primary medical diagnosis or acute emergency care.
                    </span>
                  </label>
                </div>

                {/* Step 3 Actions */}
                <div className="pt-6 border-t border-[#E8E2D8] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#5F7065] hover:text-[#163324] flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={!fullName.trim() || !email.trim() || !privacyAgreed}
                    onClick={() => setCurrentStep(4)}
                    className="py-3 px-6 bg-[#163324] disabled:bg-[#C5BEB3] disabled:cursor-not-allowed hover:bg-[#204532] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Review Booking Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Summary Review */}
            {currentStep === 4 && (
              <div className="p-6 sm:p-10 space-y-8">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-[#163324]">
                    Review and confirm your consultation
                  </h3>
                  <p className="text-sm text-[#4E5B54]">
                    Please verify your appointment parameters before final scheduling.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E8E2D8] p-6 rounded-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E2D8] gap-2">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#5F7065] font-semibold">
                        Service
                      </div>
                      <div className="font-serif text-xl font-medium text-[#163324]">
                        {selectedConsultation?.name}
                      </div>
                      <div className="text-xs text-[#2A4E38]">
                        Duration: {selectedConsultation?.durationMinutes} minutes
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xs uppercase tracking-wider text-[#5F7065] font-semibold">
                        Total Fee
                      </div>
                      <div className="font-serif text-2xl font-semibold text-[#163324]">
                        ₹{selectedConsultation?.priceINR.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4E5B54]">
                    <div>
                      <span className="font-semibold text-[#163324] block">Date & Time:</span>
                      <span>{selectedDate} at {selectedSlot} IST (Asia/Kolkata)</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#163324] block">Consultation Mode:</span>
                      <span>
                        {consultationMode === 'virtual'
                          ? 'Virtual Telehealth (HD Video link sent via email)'
                          : 'In-Clinic (Sarada Residency, Bellandur, Bengaluru - 560103)'}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#163324] block">Client Name:</span>
                      <span>{fullName}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#163324] block">Confirmation Email:</span>
                      <span>{email}</span>
                    </div>
                    {phone && (
                      <div>
                        <span className="font-semibold text-[#163324] block">Phone / WhatsApp:</span>
                        <span>{phone}</span>
                      </div>
                    )}
                    {reason && (
                      <div className="sm:col-span-2">
                        <span className="font-semibold text-[#163324] block">Focus / Symptoms:</span>
                        <span>{reason}</span>
                      </div>
                    )}
                  </div>
                </div>

                {submissionError && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-900 rounded-xs text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submissionError}</span>
                  </div>
                )}

                {/* Step 4 Actions */}
                <div className="pt-6 border-t border-[#E8E2D8] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#5F7065] hover:text-[#163324] flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Details</span>
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleCreateBooking}
                    className="py-3.5 px-8 bg-[#163324] hover:bg-[#204532] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.14em] rounded-xs flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Securing Slot...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm & Schedule Appointment</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Confirmed Screen */}
            {currentStep === 5 && confirmedBooking && (
              <div className="p-6 sm:p-10 space-y-8 text-center sm:text-left">
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xs flex flex-col sm:flex-row items-center gap-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-800 shrink-0" />
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-medium text-emerald-950">
                      Appointment confirmed successfully!
                    </h3>
                    <p className="text-xs text-emerald-800">
                      Booking reference: <strong className="font-mono text-sm">{confirmedBooking.id}</strong>
                    </p>
                  </div>
                </div>

                {/* Transactional Email Dispatch Status */}
                <div className="p-4 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs text-xs text-[#4E5B54] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#163324] shrink-0" />
                    <span>
                      Confirmation email dispatched from <strong>milindkumar@epionfunctionalhealth.com</strong> to <strong>{confirmedBooking.email}</strong>.
                    </span>
                  </div>
                  {emailStatus?.status === 'sent' && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono text-[10px] rounded-xs font-semibold">
                      Delivered via Resend
                    </span>
                  )}
                </div>

                {/* Details Breakdown */}
                <div className="border border-[#E8E2D8] rounded-xs p-6 space-y-4 text-xs text-[#163324]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[#5F7065] block uppercase tracking-wider text-[10px]">
                        Consultation
                      </span>
                      <strong className="text-sm font-medium">{confirmedBooking.consultationName}</strong>
                    </div>
                    <div>
                      <span className="text-[#5F7065] block uppercase tracking-wider text-[10px]">
                        Date & Time
                      </span>
                      <strong className="text-sm font-medium">
                        {confirmedBooking.date} at {confirmedBooking.time} IST
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#5F7065] block uppercase tracking-wider text-[10px]">
                        Consultation Mode
                      </span>
                      <strong className="text-sm font-medium">
                        {confirmedBooking.consultationMode || 'In-Clinic (Bellandur, Bengaluru)'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#5F7065] block uppercase tracking-wider text-[10px]">
                        Consultation Fee
                      </span>
                      <strong className="text-sm font-medium">
                        ₹{(confirmedBooking.priceINR || 2000).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8E2D8] text-[#55635B] space-y-1">
                    <span className="font-semibold text-[#163324] block">Attendance Notice:</span>
                    {confirmedBooking.consultationMode?.toLowerCase().includes('virtual') ? (
                      <p>
                        Your private Google Meet / video consultation link will be dispatched 24 hours prior to your scheduled session. Please test your audio and microphone prior to connection.
                      </p>
                    ) : (
                      <p>
                        Clinic address: <strong>Sarada Residency, Bellandur, Bengaluru - 560103, Karnataka, India</strong>. Please arrive 5 minutes before your scheduled appointment time.
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions: Download .ics & Schedule Another */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
                  <button
                    type="button"
                    onClick={handleDownloadICS}
                    className="w-full sm:w-auto py-3 px-5 bg-white hover:bg-[#FAF8F5] border border-[#163324] text-[#163324] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Add to Calendar (.ics)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setConfirmedBooking(null);
                      setCurrentStep(1);
                    }}
                    className="w-full sm:w-auto py-3 px-5 bg-[#163324] hover:bg-[#204532] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Schedule Another Appointment</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Clinician Administration Shortcut */}
          {onOpenAdmin && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-[11px] text-[#7E8D84] hover:text-[#163324] uppercase tracking-wider font-mono cursor-pointer"
              >
                Clinician Portal & Schedule Management →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
