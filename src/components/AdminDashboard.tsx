import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, Clock, User, Check, X, RefreshCw, AlertCircle, Ban } from 'lucide-react';

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

      </div>
    </div>
  );
};
