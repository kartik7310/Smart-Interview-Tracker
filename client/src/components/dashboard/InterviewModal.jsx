
import {
  X,
  Loader2,
  AlertCircle,
  UserRound,
  BriefcaseBusiness,
  CalendarDays,
  Mail,
  FileText,
} from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

function InterviewModal({
  isOpen,
  editingInterview,
  formData,
  formError,
  saving,
  onChange,
  onSubmit,
  onClose,
}) {
  if (!isOpen) return null;

  const isEditing = Boolean(editingInterview);

  const readOnlyClass =
    "w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-600";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="interview-modal-title"
        className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-5">
          <div>
            <h2
              id="interview-modal-title"
              className="text-xl font-bold text-slate-900"
            >
              {isEditing ? "Update Interview Status" : "Schedule Interview"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? "Only the interview status can be updated."
                : "Enter the candidate and interview details."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close modal"
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-200 disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 p-6">
          {formError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-700"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {isEditing ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Candidate
                </label>
                <div className={readOnlyClass}>
                  {editingInterview.candidateName}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Position
                </label>
                <div className={readOnlyClass}>
                  {editingInterview.position}
                </div>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Interview Status *
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  required
                  className={inputClass}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="candidateName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Candidate Name *
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="candidateName"
                    name="candidateName"
                    value={formData.candidateName}
                    onChange={onChange}
                    required
                    maxLength={100}
                    placeholder="e.g. Kartik Kumar"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email Address *
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    required
                    maxLength={254}
                    placeholder="candidate@example.com"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="position"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Position *
                </label>

                <div className="relative">
                  <BriefcaseBusiness
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={onChange}
                    required
                    maxLength={150}
                    placeholder="e.g. Backend Developer"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Initial Status *
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  required
                  className={inputClass}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="date"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Interview Date & Time *
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="date"
                    name="date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={onChange}
                    required
                    className={`${inputClass} pl-10`}
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-500">
                  Enter the interview time in your local timezone.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Interview Notes
                </label>

                <div className="relative">
                  <FileText
                    size={17}
                    className="absolute left-3 top-3 text-slate-400"
                  />
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={onChange}
                    rows={4}
                    maxLength={3000}
                    placeholder="Topics to cover or interviewer instructions..."
                    className={`${inputClass} resize-y pl-10`}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && <Loader2 size={17} className="animate-spin" />}
              {saving
                ? "Saving..."
                : isEditing
                  ? "Update Status"
                  : "Schedule Interview"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InterviewModal;
