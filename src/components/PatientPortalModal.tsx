import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Video,
  Download,
  Utensils,
  Pill,
  FileText,
  User,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Printer,
  Plus
} from 'lucide-react';
import { auth, logOut, getUserAppointments, getUserCarePlans, StoredAppointment, StoredCarePlan } from '../lib/firebase';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  user: any;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  user,
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'mealPlan' | 'supplements' | 'notes'>('appointments');
  const [appointments, setAppointments] = useState<StoredAppointment[]>([]);
  const [carePlans, setCarePlans] = useState<StoredCarePlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDefaultTemplate, setIsDefaultTemplate] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !user) return;

    let isMounted = true;
    setIsLoading(true);

    const loadPortalData = async () => {
      try {
        const userEmail = (user.email || '').toLowerCase().trim();
        const userId = user.uid || '';

        // 1. Fetch appointments: attempt Firestore first, fallback/merge with server API
        let firestoreApts: StoredAppointment[] = [];
        try {
          firestoreApts = await getUserAppointments(userId, userEmail);
        } catch (e) {
          console.warn('Firestore user appointments fetch fallback:', e);
        }

        let serverApts: StoredAppointment[] = [];
        try {
          const res = await fetch(`/api/user/appointments?email=${encodeURIComponent(userEmail)}&userId=${encodeURIComponent(userId)}`);
          if (res.ok) {
            const data = await res.json();
            serverApts = (data.appointments || []).map((b: any) => ({
              id: b.id,
              userId: b.userId || userId,
              userEmail: b.email,
              userName: b.fullName,
              consultationId: b.consultationId,
              consultationName: b.consultationName,
              consultationMode: b.consultationMode,
              date: b.date,
              time: b.time,
              durationMinutes: b.durationMinutes,
              priceINR: b.priceINR,
              priceUSD: b.priceUSD,
              phone: b.phone,
              reason: b.reason,
              status: b.status,
            }));
          }
        } catch (serverErr) {
          console.warn('Server user appointments fetch fallback:', serverErr);
        }

        // Deduplicate appointments by ID or date+time
        const aptMap = new Map<string, StoredAppointment>();
        [...firestoreApts, ...serverApts].forEach((apt) => {
          const key = apt.id || `${apt.date}_${apt.time}`;
          aptMap.set(key, apt);
        });
        const combinedApts = Array.from(aptMap.values()).sort((a, b) => b.date.localeCompare(a.date));

        // 2. Fetch care plans: attempt Firestore first, fallback to server API
        let firestorePlans: StoredCarePlan[] = [];
        try {
          firestorePlans = await getUserCarePlans(userId, userEmail);
        } catch (e) {
          console.warn('Firestore user care plans fetch fallback:', e);
        }

        let serverPlans: StoredCarePlan[] = [];
        let isDefault = false;
        try {
          const planRes = await fetch(`/api/careplans?email=${encodeURIComponent(userEmail)}&userId=${encodeURIComponent(userId)}`);
          if (planRes.ok) {
            const planData = await planRes.json();
            serverPlans = planData.carePlans || [];
            isDefault = !!planData.isDefaultTemplate;
          }
        } catch (planErr) {
          console.warn('Server care plans fetch fallback:', planErr);
        }

        const planMap = new Map<string, StoredCarePlan>();
        [...firestorePlans, ...serverPlans].forEach((p) => {
          if (p.id) planMap.set(p.id, p);
        });
        const combinedPlans = Array.from(planMap.values());

        if (isMounted) {
          setAppointments(combinedApts);
          setCarePlans(combinedPlans);
          setIsDefaultTemplate(isDefault);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load patient portal data:', err);
        if (isMounted) setIsLoading(false);
      }
    };

    loadPortalData();

    return () => {
      isMounted = false;
    };
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const currentPlan = carePlans[0] || null;

  // Generate downloadable .ics calendar file
  const downloadCalendarInvite = (apt: StoredAppointment) => {
    const [year, month, day] = apt.date.split('-').map(Number);
    const [hours, minutes] = apt.time.split(':').map(Number);
    
    // Construct local date time in Asia/Kolkata
    const startDate = new Date(Date.UTC(year, month - 1, day, hours - 5, minutes - 30));
    const endDate = new Date(startDate.getTime() + (apt.durationMinutes || 60) * 60 * 1000);

    const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
    const formatICSDate = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const isVirtual = apt.consultationMode?.toLowerCase().includes('virtual') || apt.consultationMode?.toLowerCase().includes('telehealth');
    const location = isVirtual
      ? 'Virtual Telehealth HD Video Room'
      : 'Sarada Residency, Bellandur, Bengaluru - 560103, Karnataka, India';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Epion Functional Health//Consultation Engine//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${apt.id || 'EPN-' + Date.now()}@epionfunctionalhealth.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:Epion Consultation: ${apt.consultationName}`,
      `DESCRIPTION:Clinical Functional Nutrition Session with Milind Kumar (Functional Nutritionist).\\nMode: ${apt.consultationMode || 'In-Clinic'}\\nReference: ${apt.id || 'N/A'}\\nClinic Location: ${location}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Epion-Consultation-${apt.id || 'Invite'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] dark:bg-[#0C1811] border border-[#E8E2D8] dark:border-[#1E3326] w-full max-w-5xl rounded-xs shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-[#E8E2D8] dark:border-[#1E3326] bg-[#F4EFEA] dark:bg-[#08120C] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#163324] text-[#FAF8F5] flex items-center justify-center font-serif text-lg font-semibold border border-[#E8E2D8]/40 shadow-xs">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'P')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif font-medium text-[#163324] dark:text-[#FAF8F5]">
                  {user.displayName || 'Client Portal'}
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-full bg-[#EAEFE9] dark:bg-[#163324] text-[#163324] dark:text-[#C5D7CC] border border-[#163324]/10">
                  <ShieldCheck className="w-3 h-3 text-[#163324] dark:text-[#78A88E]" />
                  Verified Patient
                </span>
              </div>
              <p className="text-xs text-[#5F7065] dark:text-[#9FB7A8] font-mono mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#163324] dark:text-[#FAF8F5] border border-[#E8E2D8] dark:border-[#1E3326] bg-[#FAF8F5] dark:bg-[#0C1811] hover:bg-[#EAEFE9] dark:hover:bg-[#163324]/40 transition-colors cursor-pointer rounded-xs"
              title="Print Care Plan / Appointments"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Protocol</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#163324] hover:bg-[#204532] transition-colors cursor-pointer rounded-xs shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#5F7065] hover:text-[#163324] dark:text-[#9FB7A8] dark:hover:text-[#FAF8F5] transition-colors cursor-pointer rounded-xs"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-[#E8E2D8] dark:border-[#1E3326] bg-[#FAF8F5] dark:bg-[#0C1811] flex overflow-x-auto gap-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-3.5 flex items-center gap-2 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'appointments'
                ? 'border-[#163324] text-[#163324] dark:border-[#78A88E] dark:text-[#FAF8F5] font-semibold'
                : 'border-transparent text-[#5F7065] dark:text-[#9FB7A8] hover:text-[#163324]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Consultations ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('mealPlan')}
            className={`py-3.5 flex items-center gap-2 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'mealPlan'
                ? 'border-[#163324] text-[#163324] dark:border-[#78A88E] dark:text-[#FAF8F5] font-semibold'
                : 'border-transparent text-[#5F7065] dark:text-[#9FB7A8] hover:text-[#163324]'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Meal Plan & Macronutrients</span>
            {isDefaultTemplate && (
              <span className="text-[10px] px-1.5 py-0.2 bg-[#EAEFE9] text-[#163324] dark:bg-[#163324] dark:text-[#9FB7A8] rounded-full">
                Baseline
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('supplements')}
            className={`py-3.5 flex items-center gap-2 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'supplements'
                ? 'border-[#163324] text-[#163324] dark:border-[#78A88E] dark:text-[#FAF8F5] font-semibold'
                : 'border-transparent text-[#5F7065] dark:text-[#9FB7A8] hover:text-[#163324]'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>Targeted Nutraceuticals</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3.5 flex items-center gap-2 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'notes'
                ? 'border-[#163324] text-[#163324] dark:border-[#78A88E] dark:text-[#FAF8F5] font-semibold'
                : 'border-transparent text-[#5F7065] dark:text-[#9FB7A8] hover:text-[#163324]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Clinical Notes & Lifestyle</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#FAF8F5] dark:bg-[#0C1811]">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-8 h-8 border-2 border-[#163324] border-t-transparent dark:border-[#78A88E] dark:border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm font-medium text-[#163324] dark:text-[#FAF8F5]">
                Loading your clinical records & meal plan...
              </p>
              <p className="text-xs text-[#5F7065] dark:text-[#9FB7A8] mt-1 font-mono">
                Synchronizing with Epion Functional Health database
              </p>
            </div>
          ) : (
            <>
              {/* TAB 1: APPOINTMENTS */}
              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E8E2D8] dark:border-[#1E3326]">
                    <div>
                      <h3 className="text-base font-serif font-medium text-[#163324] dark:text-[#FAF8F5]">
                        Your Scheduled Consultations
                      </h3>
                      <p className="text-xs text-[#5F7065] dark:text-[#9FB7A8] mt-0.5">
                        Consultations led by Milind Kumar, Functional Nutritionist. Timezone: Asia/Kolkata (IST).
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#163324] dark:text-[#FAF8F5] hover:underline cursor-pointer"
                    >
                      <span>Book New Session</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {appointments.length === 0 ? (
                    <div className="p-8 border border-dashed border-[#E8E2D8] dark:border-[#1E3326] bg-[#F4EFEA]/60 dark:bg-[#122218]/40 rounded-xs text-center">
                      <Calendar className="w-10 h-10 text-[#5F7065] mx-auto mb-3 opacity-60" />
                      <h4 className="text-sm font-serif font-medium text-[#163324] dark:text-[#FAF8F5]">
                        No Appointments Recorded Yet
                      </h4>
                      <p className="text-xs text-[#5F7065] dark:text-[#9FB7A8] max-w-md mx-auto mt-1 mb-5">
                        You have not scheduled any clinical consultations under {user.email}. Book your initial functional intake or follow-up to begin your personalized protocol.
                      </p>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenBooking();
                        }}
                        className="inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#FAF8F5] bg-[#163324] hover:bg-[#204532] transition-colors rounded-xs shadow-xs cursor-pointer"
                      >
                        Book Initial Intake (₹2,000 · 75 min)
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {appointments.map((apt) => {
                        const isVirtual =
                          apt.consultationMode?.toLowerCase().includes('virtual') ||
                          apt.consultationMode?.toLowerCase().includes('telehealth');

                        return (
                          <div
                            key={apt.id || `${apt.date}_${apt.time}`}
                            className="p-5 border border-[#E8E2D8] dark:border-[#1E3326] bg-[#FAF8F5] dark:bg-[#08120C] rounded-xs shadow-xs flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="text-[11px] font-mono tracking-wider text-[#5F7065] dark:text-[#9FB7A8]">
                                  REF: {apt.id}
                                </span>
                                <span
                                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                    apt.status === 'confirmed'
                                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                      : apt.status === 'completed'
                                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                  }`}
                                >
                                  {apt.status}
                                </span>
                              </div>

                              <h4 className="text-sm font-serif font-medium text-[#163324] dark:text-[#FAF8F5] mb-1">
                                {apt.consultationName}
                              </h4>

                              <div className="space-y-1.5 text-xs text-[#4E5B54] dark:text-[#C5D7CC] mt-3">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-3.5 h-3.5 text-[#163324] dark:text-[#78A88E]" />
                                  <span>{apt.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-3.5 h-3.5 text-[#163324] dark:text-[#78A88E]" />
                                  <span>{apt.time} IST ({apt.durationMinutes || 60} mins)</span>
                                </div>
                                <div className="flex items-start gap-2 pt-1 border-t border-[#E8E2D8]/60 dark:border-[#1E3326]/60">
                                  {isVirtual ? (
                                    <>
                                      <Video className="w-3.5 h-3.5 text-[#163324] dark:text-[#78A88E] shrink-0 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-[#163324] dark:text-[#FAF8F5]">Virtual Telehealth (HD Video)</p>
                                        <p className="text-[11px] text-[#5F7065] dark:text-[#9FB7A8]">Link emailed 24 hours prior</p>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <MapPin className="w-3.5 h-3.5 text-[#163324] dark:text-[#78A88E] shrink-0 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-[#163324] dark:text-[#FAF8F5]">In-Clinic Session</p>
                                        <p className="text-[11px] text-[#5F7065] dark:text-[#9FB7A8]">Sarada Residency, Bellandur, Bengaluru - 560103</p>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>

                              {apt.reason && (
                                <div className="mt-3 p-2 bg-[#F4EFEA] dark:bg-[#122218]/40 border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs text-[11px] text-[#5F7065] dark:text-[#9FB7A8]">
                                  <span className="font-semibold text-[#163324] dark:text-[#FAF8F5]">Goal/Reason:</span> {apt.reason}
                                </div>
                              )}
                            </div>

                            <div className="pt-4 mt-4 border-t border-[#E8E2D8] dark:border-[#1E3326] flex items-center justify-between gap-2">
                              <button
                                onClick={() => downloadCalendarInvite(apt)}
                                className="inline-flex items-center gap-1.5 text-xs text-[#163324] dark:text-[#FAF8F5] hover:underline cursor-pointer font-medium"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Add to Calendar (.ics)</span>
                              </button>

                              {!isVirtual && (
                                <a
                                  href="https://maps.google.com/?q=Sarada+Residency+Bellandur+Bengaluru"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-[#5F7065] dark:text-[#9FB7A8] hover:text-[#163324] dark:hover:text-[#FAF8F5]"
                                >
                                  <span>Directions</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Clinic Address & Contact Information Box */}
                  <div className="p-4 bg-[#EAEFE9]/70 dark:bg-[#122218] border border-[#163324]/20 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#163324] dark:text-[#78A88E] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#163324] dark:text-[#FAF8F5]">
                          Clinic Location & Rescheduling Support
                        </h4>
                        <p className="text-xs text-[#5F7065] dark:text-[#C5D7CC] mt-0.5">
                          Sarada Residency, Bellandur, Bengaluru - 560103, Karnataka, India · Direct Email: <a href="mailto:milindkumar@epionfunctionalhealth.com" className="underline font-mono">milindkumar@epionfunctionalhealth.com</a>
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Sarada+Residency+Bellandur+Bengaluru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#163324] dark:text-[#FAF8F5] bg-white dark:bg-[#0C1811] border border-[#163324]/20 rounded-xs hover:bg-[#FAF8F5] transition-colors whitespace-nowrap"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {/* TAB 2: MEAL PLAN & MACRONUTRIENTS */}
              {activeTab === 'mealPlan' && currentPlan && (
                <div className="space-y-6">
                  <div className="p-5 bg-[#F4EFEA] dark:bg-[#08120C] border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#5F7065] dark:text-[#9FB7A8]">
                        Practitioner: {currentPlan.practitioner}
                      </span>
                      <span className="text-xs font-mono text-[#5F7065] dark:text-[#9FB7A8]">
                        Assigned: {currentPlan.dateAssigned}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif font-medium text-[#163324] dark:text-[#FAF8F5]">
                      {currentPlan.title}
                    </h3>
                    <p className="text-xs text-[#4E5B54] dark:text-[#C5D7CC] mt-1">
                      <span className="font-semibold text-[#163324] dark:text-[#FAF8F5]">Clinical Focus:</span> {currentPlan.clinicalFocus}
                    </p>
                  </div>

                  {/* Macronutrient & Caloric Architecture */}
                  {currentPlan.macroTargets && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-[#163324] dark:text-[#FAF8F5] mb-3">
                        Macronutrient Architecture & Daily Baseline ({currentPlan.dailyCalorieTarget || 'Calculated Individually'})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="p-3.5 bg-[#FAF8F5] dark:bg-[#08120C] border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs">
                          <p className="text-[11px] font-semibold uppercase text-[#5F7065] dark:text-[#9FB7A8]">Target Protein</p>
                          <p className="text-xs font-medium text-[#163324] dark:text-[#FAF8F5] mt-1">{currentPlan.macroTargets.protein}</p>
                        </div>
                        <div className="p-3.5 bg-[#FAF8F5] dark:bg-[#08120C] border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs">
                          <p className="text-[11px] font-semibold uppercase text-[#5F7065] dark:text-[#9FB7A8]">Prebiotic Fiber</p>
                          <p className="text-xs font-medium text-[#163324] dark:text-[#FAF8F5] mt-1">{currentPlan.macroTargets.fiber}</p>
                        </div>
                        <div className="p-3.5 bg-[#FAF8F5] dark:bg-[#08120C] border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs">
                          <p className="text-[11px] font-semibold uppercase text-[#5F7065] dark:text-[#9FB7A8]">Essential Lipids</p>
                          <p className="text-xs font-medium text-[#163324] dark:text-[#FAF8F5] mt-1">{currentPlan.macroTargets.healthyFats}</p>
                        </div>
                        <div className="p-3.5 bg-[#FAF8F5] dark:bg-[#08120C] border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs">
                          <p className="text-[11px] font-semibold uppercase text-[#5F7065] dark:text-[#9FB7A8]">Complex Starches</p>
                          <p className="text-xs font-medium text-[#163324] dark:text-[#FAF8F5] mt-1">{currentPlan.macroTargets.complexCarbs}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Daily Meal Schedule */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#163324] dark:text-[#FAF8F5] mb-3">
                      Structured Daily Meal Protocol
                    </h4>
                    <div className="space-y-4">
                      {currentPlan.mealPlan.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 border border-[#E8E2D8] dark:border-[#1E3326] bg-[#FAF8F5] dark:bg-[#08120C] rounded-xs shadow-xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-[#E8E2D8]/60 dark:border-[#1E3326]/60">
                            <span className="font-serif font-medium text-sm text-[#163324] dark:text-[#FAF8F5]">
                              {item.meal}
                            </span>
                            <span className="text-xs font-mono text-[#5F7065] dark:text-[#9FB7A8] flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.timing}
                            </span>
                          </div>

                          <div className="space-y-1.5 my-2.5">
                            {item.dishes.map((dish, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-2 text-xs text-[#283B30] dark:text-[#E2ECE5]">
                                <span className="text-[#163324] dark:text-[#78A88E] font-bold">•</span>
                                <span>{dish}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-3 pt-2 border-t border-[#E8E2D8]/40 dark:border-[#1E3326]/40 text-[11px] text-[#5F7065] dark:text-[#9FB7A8] italic">
                            <span className="font-semibold not-italic text-[#163324] dark:text-[#FAF8F5]">Clinical Rationale:</span> {item.clinicalRationale}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Foods to Prioritize vs Avoid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 rounded-xs">
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Foods & Botanical Allies to Prioritize
                      </h4>
                      <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200">
                        {currentPlan.foodsToPrioritize.map((food, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{food}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 rounded-xs">
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-2.5">
                        <X className="w-3.5 h-3.5 text-amber-600" />
                        Foods to Avoid / Phase-Exclude
                      </h4>
                      <ul className="space-y-1.5 text-xs text-amber-950 dark:text-amber-200">
                        {currentPlan.foodsToAvoid.map((food, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5">
                            <span className="text-amber-600 font-bold">✕</span>
                            <span>{food}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SUPPLEMENTS & NUTRACEUTICALS */}
              {activeTab === 'supplements' && currentPlan && (
                <div className="space-y-6">
                  <div className="pb-2 border-b border-[#E8E2D8] dark:border-[#1E3326]">
                    <h3 className="text-base font-serif font-medium text-[#163324] dark:text-[#FAF8F5]">
                      Targeted Clinical Nutraceutical Protocol
                    </h3>
                    <p className="text-xs text-[#5F7065] dark:text-[#9FB7A8] mt-0.5">
                      High-potency, pure-form supplement schedule customized for your metabolic biology. Take strictly with the designated timing and food pairings.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentPlan.supplements.map((supp, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-4 border border-[#E8E2D8] dark:border-[#1E3326] bg-[#FAF8F5] dark:bg-[#08120C] rounded-xs shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-serif font-medium text-sm text-[#163324] dark:text-[#FAF8F5]">
                            {supp.name}
                          </h4>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#EAEFE9] dark:bg-[#163324] text-[#163324] dark:text-[#C5D7CC] rounded-full shrink-0">
                            {supp.dosage}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs text-[#4E5B54] dark:text-[#C5D7CC] mt-2">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#163324] dark:text-[#78A88E]" />
                            <span className="font-medium text-[#163324] dark:text-[#FAF8F5]">Timing:</span>
                            <span>{supp.timing}</span>
                          </div>
                          <div className="pt-2 border-t border-[#E8E2D8]/60 dark:border-[#1E3326]/60 text-[11px] text-[#5F7065] dark:text-[#9FB7A8]">
                            <span className="font-semibold text-[#163324] dark:text-[#FAF8F5]">Target Mechanism:</span> {supp.purpose}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-[#F4EFEA] dark:bg-[#122218]/50 border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs text-xs text-[#5F7065] dark:text-[#9FB7A8]">
                    <span className="font-semibold text-[#163324] dark:text-[#FAF8F5]">Practitioner Safety Notice:</span> Nutraceutical recommendations are adjunctive to whole-food dietary modifications. Do not adjust doses without discussing in follow-up consultations. Store sensitive probiotics in a cool, dark refrigerator.
                  </div>
                </div>
              )}

              {/* TAB 4: CLINICAL NOTES & PROTOCOLS */}
              {activeTab === 'notes' && currentPlan && (
                <div className="space-y-6">
                  {/* Practitioner Narrative Notes */}
                  <div className="p-5 border border-[#E8E2D8] dark:border-[#1E3326] bg-[#FAF8F5] dark:bg-[#08120C] rounded-xs shadow-xs">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-[#163324] dark:text-[#78A88E]" />
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-[#163324] dark:text-[#FAF8F5]">
                        Clinical Narrative from Milind Kumar
                      </h4>
                    </div>
                    <p className="text-xs leading-relaxed text-[#283B30] dark:text-[#D7E4DC] whitespace-pre-line">
                      {currentPlan.practitionerNotes}
                    </p>
                    {currentPlan.nextFollowUp && (
                      <div className="mt-4 pt-3 border-t border-[#E8E2D8] dark:border-[#1E3326] flex items-center justify-between text-xs">
                        <span className="text-[#5F7065] dark:text-[#9FB7A8]">Recommended Milestone Review:</span>
                        <span className="font-semibold text-[#163324] dark:text-[#FAF8F5] font-mono">{currentPlan.nextFollowUp}</span>
                      </div>
                    )}
                  </div>

                  {/* Circadian & Lifestyle Pillars */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#163324] dark:text-[#FAF8F5] mb-3">
                      Circadian & Lifestyle System Pillars
                    </h4>
                    <div className="space-y-2.5">
                      {currentPlan.lifestyleProtocols.map((protocol, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-3.5 border border-[#E8E2D8] dark:border-[#1E3326] bg-[#FAF8F5] dark:bg-[#08120C] rounded-xs text-xs text-[#283B30] dark:text-[#C5D7CC] flex items-start gap-2.5"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#163324] dark:text-[#78A88E] shrink-0 mt-0.5" />
                          <span>{protocol}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info & sign out */}
        <div className="px-6 py-3.5 border-t border-[#E8E2D8] dark:border-[#1E3326] bg-[#F4EFEA] dark:bg-[#08120C] flex flex-wrap items-center justify-between text-xs gap-3">
          <p className="text-[#5F7065] dark:text-[#9FB7A8] text-[11px]">
            Epion Functional Health · Bellandur, Bengaluru · Confidential Patient Care Record
          </p>

          <button
            onClick={async () => {
              await logOut();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-[#5F7065] hover:text-red-700 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out of portal</span>
          </button>
        </div>

      </div>
    </div>
  );
};
