import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, Clock, User, Check, X, RefreshCw, AlertCircle, Ban, Utensils, Pill, Sparkles, Send } from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Authenticated for preview
  const [passcode, setPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string>('');

  const [metrics, setMetrics] = useState<any>({ total: 0, confirmed: 0, completed: 0, cancelled: 0 });
  const [bookings, setBookings] = useState<any[]>([]);
  const [config, setConfig] = useState<any>(null);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [newBlockedDate, setNewBlockedDate] = useState<string>('');
  const [actionMessage, setActionMessage] = useState<string>('');

  // Care Plan Prescriber Modal State
  const [editingCarePlanBooking, setEditingCarePlanBooking] = useState<any | null>(null);
  const [isSavingPlan, setIsSavingPlan] = useState<boolean>(false);
  const [planFormData, setPlanFormData] = useState({
    title: 'Individualized Gut-Barrier & Metabolic Care Protocol',
    clinicalFocus: 'Epithelial Stabilization & Postprandial Glycemic Damping',
    dailyCalorieTarget: '1,850 kcal baseline',
    macroProtein: '95g (1.4g/kg target for lean repair)',
    macroFiber: '35g+ daily prebiotic diversity',
    macroFats: '75g extra virgin olive oil, avocado, wild lipids',
    macroCarbs: '160g low-glycemic slow carbs',
    breakfast: 'Pasture eggs scrambled with spinach & mushrooms, avocado, sprouted sourdough',
    lunch: 'Rainbow cruciferous slaw with wild salmon or organic tempeh and resistant starch black rice',
    dinner: 'Mineral-rich bone or shiitake broth with steamed zucchini, sweet potato, and fresh turmeric',
    prioritize: 'Polyphenol berries, cold-pressed olive oil, fermented vegetables, dark leafy greens, ginger',
    avoid: 'Refined seed oils, commercial wheat flour, ultra-processed emulsifiers, artificial sweeteners',
    supplements: 'Magnesium Glycinate (300mg before sleep)\nZinc Carnosine (37.5mg on empty stomach)\nUltra-Pure Omega-3 (2,000mg with lunch)\nSoil-Based Spore Probiotic (1 capsule with dinner)',
    practitionerNotes: 'Follow the protocol diligently for 4 weeks. Record daily energy, digestion, and sleep scores. A follow-up consultation is scheduled to review biomarker adjustments.',
    nextFollowUp: 'Scheduled in 4 weeks',
  });

  const loadData = () => {
    setIsLoading(true);
    fetch('/api/admin/overview')
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data.metrics || {});
        setBookings(data.recentBookings || []);
        setConfig(data.config || null);
        setConsultations(data.consultations || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Admin overview error:', err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Status update failed');
      setActionMessage(`Booking ${id} marked as ${newStatus}.`);
      loadData();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleAddBlockedDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockedDate) return;
    const currentBlocked = config?.blockedDates || [];
    if (currentBlocked.includes(newBlockedDate)) return;

    const updated = [...currentBlocked, newBlockedDate];
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blockedDates: updated }),
    });
    setNewBlockedDate('');
    setActionMessage(`Date ${newBlockedDate} added to blocked schedule.`);
    loadData();
  };

  const handleRemoveBlockedDate = async (d: string) => {
    const updated = (config?.blockedDates || []).filter((item: string) => item !== d);
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blockedDates: updated }),
    });
    setActionMessage(`Date ${d} unblocked.`);
    loadData();
  };

  const handleOpenCarePlanModal = (b: any) => {
    setEditingCarePlanBooking(b);
    setPlanFormData((prev) => ({
      ...prev,
      title: `${b.fullName}'s Personalized Functional Nutrition Protocol`,
      clinicalFocus: b.reason ? `Targeted Care for: ${b.reason}` : prev.clinicalFocus,
    }));
  };

  const handleSaveCarePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCarePlanBooking) return;
    setIsSavingPlan(true);

    try {
      const payload = {
        userEmail: editingCarePlanBooking.email,
        userId: editingCarePlanBooking.userId || '',
        patientName: editingCarePlanBooking.fullName,
        title: planFormData.title,
        clinicalFocus: planFormData.clinicalFocus,
        dailyCalorieTarget: planFormData.dailyCalorieTarget,
        macroTargets: {
          protein: planFormData.macroProtein,
          fiber: planFormData.macroFiber,
          healthyFats: planFormData.macroFats,
          complexCarbs: planFormData.macroCarbs,
        },
        mealPlan: [
          {
            meal: 'Digestive Awakening & Morning Primer',
            timing: '07:30 - 08:00 AM',
            dishes: ['Warm water with 1 tbsp raw apple cider vinegar & sea salt', 'Fresh ginger root infusion'],
            clinicalRationale: 'Vagal stimulation and gastric acid priming prior to first solid nutrients.',
          },
          {
            meal: 'Nutrient-Dense Breakfast',
            timing: '08:45 - 09:15 AM',
            dishes: [planFormData.breakfast],
            clinicalRationale: 'Protein and essential lipids stabilize early-morning blood glucose and cortisol.',
          },
          {
            meal: 'Midday Systemic Fuel',
            timing: '01:00 - 01:45 PM',
            dishes: [planFormData.lunch],
            clinicalRationale: 'Polyphenols and sulfur amino acids support Phase II liver clearance.',
          },
          {
            meal: 'Circadian Evening Nourishment',
            timing: '07:30 - 08:15 PM',
            dishes: [planFormData.dinner],
            clinicalRationale: 'Supports migrating motor complex (MMC) cleansing during overnight sleep.',
          },
        ],
        foodsToPrioritize: planFormData.prioritize.split(',').map((s: string) => s.trim()).filter(Boolean),
        foodsToAvoid: planFormData.avoid.split(',').map((s: string) => s.trim()).filter(Boolean),
        supplements: planFormData.supplements.split('\n').filter(Boolean).map((line: string) => {
          const match = line.match(/^(.*?)\s*\((.*?)\)\s*(.*)$/);
          if (match) {
            return {
              name: match[1].trim(),
              dosage: match[2].trim(),
              timing: match[3].trim() || 'Daily with food',
              purpose: 'Biochemical cellular pathway support',
            };
          }
          return {
            name: line.trim(),
            dosage: 'Standard therapeutic dose',
            timing: 'With main meal',
            purpose: 'Biochemical cellular pathway support',
          };
        }),
        lifestyleProtocols: [
          'Post-meal movement: 10-15 min easy stroll after lunch and dinner.',
          'Circadian cutoff: finish meals minimum 3 hours before sleep.',
          'Hydration spacing: drink pure water between meals rather than large icy drinks with meals.',
        ],
        practitionerNotes: planFormData.practitionerNotes,
        nextFollowUp: planFormData.nextFollowUp,
        dateAssigned: new Date().toISOString().split('T')[0],
      };

      const res = await fetch('/api/careplans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save care plan.');

      setActionMessage(`Personalized Care Plan successfully published for ${editingCarePlanBooking.fullName} (${editingCarePlanBooking.email}).`);
      setEditingCarePlanBooking(null);
    } catch (err: any) {
      alert(err.message || 'Error saving care plan');
    } finally {
      setIsSavingPlan(false);
    }
  };

  const filteredBookings = filterStatus === 'all'
    ? bookings
    : bookings.filter((b) => b.status === filterStatus);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#DDD7CD] rounded-2xl max-w-5xl w-full p-6 sm:p-10 max-h-[90vh] overflow-y-auto shadow-2xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#163324]" />
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#163324]">
                Clinician Practice & Scheduling Portal
              </h3>
              <p className="text-xs font-mono text-[#63716A]">
                Internal Practice Administration · Epion Functional Health
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="p-2 text-[#46504A] hover:bg-[#EAEFE9] rounded-md transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#46504A] hover:bg-[#EAEFE9] rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {actionMessage && (
          <div className="p-3 bg-[#EAEFE9] border border-[#CCD8CB] rounded-md text-xs text-[#163324] flex items-center justify-between">
            <span>{actionMessage}</span>
            <button onClick={() => setActionMessage('')} className="text-[#163324] font-bold">×</button>
          </div>
        )}

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#DDD7CD] shadow-2xs">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#73827A] block">
              Total Bookings
            </span>
            <div className="font-mono text-3xl font-bold text-[#163324] mt-1 tabular-nums">
              {metrics.total}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DDD7CD] shadow-2xs">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#2A4E38] block">
              Confirmed
            </span>
            <div className="font-mono text-3xl font-bold text-[#2A4E38] mt-1 tabular-nums">
              {metrics.confirmed}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DDD7CD] shadow-2xs">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#163324] block">
              Completed
            </span>
            <div className="font-mono text-3xl font-bold text-[#163324] mt-1 tabular-nums">
              {metrics.completed}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DDD7CD] shadow-2xs">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B4828] block">
              Cancelled
            </span>
            <div className="font-mono text-3xl font-bold text-[#8B4828] mt-1 tabular-nums">
              {metrics.cancelled}
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white p-6 rounded-xl border border-[#DDD7CD] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0ECE4]">
            <h4 className="font-serif text-xl font-semibold text-[#163324]">
              Appointment Records & Patient Requests
            </h4>

            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-md border border-[#E8E2D8]">
              {['all', 'confirmed', 'completed', 'cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 text-xs font-mono uppercase rounded transition-colors ${
                    filterStatus === st
                      ? 'bg-[#163324] text-white'
                      : 'text-[#63716A] hover:text-[#163324]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#73827A]">
              No appointments matching this filter status.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F0ECE4] text-[#73827A] font-mono text-[11px] uppercase">
                    <th className="py-2.5 px-3">Ref ID</th>
                    <th className="py-2.5 px-3">Client</th>
                    <th className="py-2.5 px-3">Service</th>
                    <th className="py-2.5 px-3">Date & Time</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F2EB]">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-3 font-mono font-medium text-[#163324]">{b.id}</td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-[#222725]">{b.fullName}</div>
                        <div className="text-[11px] text-[#73827A]">{b.email}</div>
                        {b.phone && <div className="text-[10px] text-[#8C9892]">{b.phone}</div>}
                      </td>
                      <td className="py-3 px-3">
                        <div className="truncate max-w-xs">{b.consultationName}</div>
                        {b.reason && (
                          <div className="text-[11px] text-[#63716A] italic truncate max-w-xs">
                            "{b.reason}"
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono whitespace-nowrap">
                        <div>{b.date}</div>
                        <div className="text-[#2A4E38]">{b.time} IST</div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                            b.status === 'confirmed'
                              ? 'bg-[#EAEFE9] text-[#163324]'
                              : b.status === 'completed'
                              ? 'bg-blue-50 text-blue-800'
                              : 'bg-red-50 text-red-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenCarePlanModal(b)}
                          className="px-2 py-1 text-[10px] bg-[#163324] hover:bg-[#204532] text-white rounded font-medium inline-flex items-center gap-1 cursor-pointer"
                          title="Prescribe or Edit Care Plan for this Patient"
                        >
                          <Utensils className="w-2.5 h-2.5" />
                          <span>Plan</span>
                        </button>
                        {b.status !== 'completed' && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, 'completed')}
                            className="px-2 py-1 text-[10px] bg-white border border-[#DDD7CD] hover:bg-[#EAEFE9] rounded text-[#163324]"
                            title="Mark as Completed"
                          >
                            Complete
                          </button>
                        )}
                        {b.status !== 'cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                            className="px-2 py-1 text-[10px] bg-white border border-[#DDD7CD] hover:bg-red-50 rounded text-red-700"
                            title="Cancel Appointment"
                          >
                            Cancel
                          </button>
                        )}
                        {b.status === 'cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                            className="px-2 py-1 text-[10px] bg-white border border-[#DDD7CD] hover:bg-[#EAEFE9] rounded text-[#163324]"
                          >
                            Reinstate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Schedule & Blocked Dates Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blocked Dates */}
          <div className="bg-white p-6 rounded-xl border border-[#DDD7CD] space-y-4">
            <h4 className="font-serif text-lg font-semibold text-[#163324] flex items-center gap-2">
              <Ban className="w-4 h-4 text-[#8B4828]" />
              Manage Blocked Dates & Holidays
            </h4>

            <form onSubmit={handleAddBlockedDate} className="flex gap-2">
              <input
                type="date"
                value={newBlockedDate}
                onChange={(e) => setNewBlockedDate(e.target.value)}
                className="p-2 border border-[#DDD7CD] rounded text-xs bg-[#FAF8F5] text-[#222725] flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#163324] text-white rounded text-xs font-semibold hover:bg-[#204532]"
              >
                Block Date
              </button>
            </form>

            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-mono uppercase text-[#73827A] block">
                Currently Blocked Dates:
              </span>
              {(config?.blockedDates || []).map((dateStr: string) => (
                <div
                  key={dateStr}
                  className="flex items-center justify-between p-2 rounded bg-[#FAF8F5] border border-[#E8E2D8] text-xs font-mono"
                >
                  <span>{dateStr}</span>
                  <button
                    onClick={() => handleRemoveBlockedDate(dateStr)}
                    className="text-red-600 hover:text-red-800 text-[11px]"
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Hours Overview */}
          <div className="bg-white p-6 rounded-xl border border-[#DDD7CD] space-y-3 text-xs">
            <h4 className="font-serif text-lg font-semibold text-[#163324] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2A4E38]" />
              Practice Availability Parameters
            </h4>

            <div className="space-y-2 p-3 bg-[#FAF8F5] rounded border border-[#E8E2D8] font-mono text-[11px]">
              <div><strong>Business Hours:</strong> 09:00 to 17:00 PT</div>
              <div><strong>Working Days:</strong> Monday through Friday</div>
              <div><strong>Buffer Between Sessions:</strong> 15 minutes</div>
              <div><strong>Slot Increment:</strong> 30 minutes</div>
            </div>

            <p className="text-[#63716A] text-[11px]">
              These settings dynamically control the public availability engine, preventing slot double-booking across all consultation services.
            </p>
          </div>
        </div>

        {/* Modal: Prescribe / Customize Care Plan for Patient */}
        {editingCarePlanBooking && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
            <div className="bg-[#FAF8F5] border border-[#DDD7CD] rounded-2xl max-w-3xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#163324]" />
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#163324]">
                      Prescribe Patient Care & Meal Plan
                    </h3>
                    <p className="text-xs text-[#5F7065]">
                      Client: <strong>{editingCarePlanBooking.fullName}</strong> ({editingCarePlanBooking.email})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingCarePlanBooking(null)}
                  className="p-1.5 text-[#5F7065] hover:text-[#163324] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCarePlan} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#163324] block mb-1">
                    Protocol Title
                  </label>
                  <input
                    type="text"
                    value={planFormData.title}
                    onChange={(e) => setPlanFormData({ ...planFormData, title: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded font-medium text-[#163324]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#163324] block mb-1">
                      Clinical Focus Area
                    </label>
                    <input
                      type="text"
                      value={planFormData.clinicalFocus}
                      onChange={(e) => setPlanFormData({ ...planFormData, clinicalFocus: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-[#163324]"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#163324] block mb-1">
                      Calorie Baseline Target
                    </label>
                    <input
                      type="text"
                      value={planFormData.dailyCalorieTarget}
                      onChange={(e) => setPlanFormData({ ...planFormData, dailyCalorieTarget: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-[#163324]"
                    />
                  </div>
                </div>

                {/* Macronutrient Architecture */}
                <div className="p-3 bg-white border border-[#DDD7CD] rounded space-y-2">
                  <span className="font-semibold text-[#163324] block text-[11px] uppercase tracking-wider">
                    Macronutrient & Fiber Targets
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    <div>
                      <span className="text-[#5F7065] block">Protein</span>
                      <input
                        type="text"
                        value={planFormData.macroProtein}
                        onChange={(e) => setPlanFormData({ ...planFormData, macroProtein: e.target.value })}
                        className="w-full p-1.5 border border-[#E8E2D8] rounded font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[#5F7065] block">Prebiotic Fiber</span>
                      <input
                        type="text"
                        value={planFormData.macroFiber}
                        onChange={(e) => setPlanFormData({ ...planFormData, macroFiber: e.target.value })}
                        className="w-full p-1.5 border border-[#E8E2D8] rounded font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[#5F7065] block">Lipids / Fats</span>
                      <input
                        type="text"
                        value={planFormData.macroFats}
                        onChange={(e) => setPlanFormData({ ...planFormData, macroFats: e.target.value })}
                        className="w-full p-1.5 border border-[#E8E2D8] rounded font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[#5F7065] block">Complex Carbs</span>
                      <input
                        type="text"
                        value={planFormData.macroCarbs}
                        onChange={(e) => setPlanFormData({ ...planFormData, macroCarbs: e.target.value })}
                        className="w-full p-1.5 border border-[#E8E2D8] rounded font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Meals */}
                <div className="space-y-2">
                  <span className="font-semibold text-[#163324] block text-[11px] uppercase tracking-wider">
                    Prescribed Daily Meals
                  </span>
                  <div>
                    <label className="text-[#5F7065] block mb-0.5">Breakfast</label>
                    <input
                      type="text"
                      value={planFormData.breakfast}
                      onChange={(e) => setPlanFormData({ ...planFormData, breakfast: e.target.value })}
                      className="w-full p-2 bg-white border border-[#DDD7CD] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[#5F7065] block mb-0.5">Lunch</label>
                    <input
                      type="text"
                      value={planFormData.lunch}
                      onChange={(e) => setPlanFormData({ ...planFormData, lunch: e.target.value })}
                      className="w-full p-2 bg-white border border-[#DDD7CD] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[#5F7065] block mb-0.5">Dinner</label>
                    <input
                      type="text"
                      value={planFormData.dinner}
                      onChange={(e) => setPlanFormData({ ...planFormData, dinner: e.target.value })}
                      className="w-full p-2 bg-white border border-[#DDD7CD] rounded"
                    />
                  </div>
                </div>

                {/* Foods Prioritize / Avoid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-emerald-900 block mb-1">
                      Foods to Prioritize (comma separated)
                    </label>
                    <textarea
                      rows={2}
                      value={planFormData.prioritize}
                      onChange={(e) => setPlanFormData({ ...planFormData, prioritize: e.target.value })}
                      className="w-full p-2 bg-white border border-emerald-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-amber-900 block mb-1">
                      Foods to Avoid / Phase-Out (comma separated)
                    </label>
                    <textarea
                      rows={2}
                      value={planFormData.avoid}
                      onChange={(e) => setPlanFormData({ ...planFormData, avoid: e.target.value })}
                      className="w-full p-2 bg-white border border-amber-200 rounded"
                    />
                  </div>
                </div>

                {/* Supplements */}
                <div>
                  <label className="font-semibold text-[#163324] block mb-1">
                    Targeted Nutraceutical Supplements (One per line: Name (Dose) Timing)
                  </label>
                  <textarea
                    rows={3}
                    value={planFormData.supplements}
                    onChange={(e) => setPlanFormData({ ...planFormData, supplements: e.target.value })}
                    className="w-full p-2 bg-white border border-[#DDD7CD] rounded font-mono text-[11px]"
                  />
                </div>

                {/* Practitioner Notes */}
                <div>
                  <label className="font-semibold text-[#163324] block mb-1">
                    Practitioner Clinical Narrative & Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={planFormData.practitionerNotes}
                    onChange={(e) => setPlanFormData({ ...planFormData, practitionerNotes: e.target.value })}
                    className="w-full p-2 bg-white border border-[#DDD7CD] rounded"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E2D8]">
                  <button
                    type="button"
                    onClick={() => setEditingCarePlanBooking(null)}
                    className="px-4 py-2 border border-[#DDD7CD] rounded text-[#5F7065] hover:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingPlan}
                    className="px-5 py-2 bg-[#163324] hover:bg-[#204532] text-white rounded font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSavingPlan ? 'Publishing...' : 'Publish to Patient Portal'}</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
