
import { useEffect, useState } from "react";
import {
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  Mail,
  Loader2,
  ClipboardList,
  X,
  UserRound,
  BriefcaseBusiness,
  Clock3,
  FileText,
  Hash,
  Eye,
  ChevronRight,
} from "lucide-react";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  scheduled: "bg-blue-50 text-blue-700 ring-blue-600/20",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  cancelled: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

function formatDate(value) {
  if (!value) return "Not provided";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getInitials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "?"
  );
}

function DetailItem({ icon: Icon, label, children, className = "" }) {
  return (
    <div className={`min-w-0 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 sm:p-4 ${className}`}>
      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
        <Icon size={15} className="shrink-0 text-slate-400" />
        {label}
      </div>

      <div className="break-words text-sm font-semibold text-slate-800">
        {children || "Not provided"}
      </div>
    </div>
  );
}

function InterviewTable({
  interviews = [],
  loading = false,
  totalInterviews = 0,
  error = "",
  onEdit,
  onDelete,
  onAdd,
  onRefresh,
}) {
  const [selectedInterview, setSelectedInterview] = useState(null);

  // Close the details popup with Escape.
  useEffect(() => {
    if (!selectedInterview) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedInterview(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedInterview]);

  const openDetails = (interview) => {
    setSelectedInterview(interview);
  };

  const closeDetails = () => {
    setSelectedInterview(null);
  };

  const handleEdit = (interview) => {
    closeDetails();
    onEdit?.(interview);
  };

  const renderStatus = (statusValue) => {
    const status = statusValue?.toLowerCase();

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${
          statusStyles[status] ||
          "bg-slate-100 text-slate-700 ring-slate-500/20"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {statusValue || "Unknown"}
      </span>
    );
  };

  const renderActions = (interview) => (
    <div className="flex items-center gap-1">
      <button
        type="button"
        title="Edit interview status"
        aria-label={`Edit ${interview.candidateName}`}
        onClick={(event) => {
          event.stopPropagation();
          handleEdit(interview);
        }}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Pencil size={16} />
      </button>

      <button
        type="button"
        title="Delete interview"
        aria-label={`Delete ${interview.candidateName}`}
        onClick={(event) => {
          event.stopPropagation();
          onDelete?.(interview._id);
        }}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Table header */}
        <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-bold text-slate-900">Interview Records</h2>
            <p className="mt-1 text-xs text-slate-500">
              Showing {interviews.length} of {totalInterviews} interviews
            </p>
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-blue-50 px-3.5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
          >
            <RefreshCw
              size={15}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="m-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 sm:m-5"
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="px-4 py-16 text-center">
            <Loader2
              size={30}
              className="mx-auto animate-spin text-blue-600"
            />
            <p className="mt-3 text-sm text-slate-500">
              Loading interviews...
            </p>
          </div>
        ) : interviews.length === 0 ? (
          <div className="px-5 py-14 text-center sm:px-10">
            <ClipboardList
              size={38}
              className="mx-auto text-slate-300"
            />
            <h3 className="mt-3 font-semibold text-slate-900">
              No interviews found
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
              Try adjusting your filters or schedule a new interview.
            </p>

            <button
              type="button"
              onClick={onAdd}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              <Plus size={16} />
              Schedule Interview
            </button>
          </div>
        ) : (
          <>
           
            <div className="divide-y divide-slate-100 md:hidden">
              {interviews.map((interview) => (
                <article
                  key={interview._id}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${interview.candidateName}`}
                  onClick={() => openDetails(interview)}
                  onKeyDown={(event) => {
                    if (
                      event.target === event.currentTarget &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      openDetails(interview);
                    }
                  }}
                  className="cursor-pointer p-4 transition-colors hover:bg-blue-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                      {getInitials(interview.candidateName)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="break-words text-sm font-bold text-slate-900">
                            {interview.candidateName}
                          </h3>
                          <p className="mt-1 break-all text-xs text-slate-500">
                            {interview.email}
                          </p>
                        </div>

                        <ChevronRight
                          size={17}
                          className="mt-1 shrink-0 text-slate-400"
                        />
                      </div>

                      <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                        <BriefcaseBusiness
                          size={15}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />
                        <span className="break-words">{interview.position}</span>
                      </p>

                      <p className="mt-2 flex items-start gap-2 text-xs text-slate-500">
                        <CalendarDays
                          size={15}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />
                        <span>{formatDate(interview.date)}</span>
                      </p>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        {renderStatus(interview.status)}
                        {renderActions(interview)}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Tablet and desktop layout: clickable table rows */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3.5 font-semibold lg:px-5">
                      Candidate
                    </th>
                    <th className="px-4 py-3.5 font-semibold lg:px-5">
                      Position
                    </th>
                    <th className="px-4 py-3.5 font-semibold lg:px-5">
                      Interview Date
                    </th>
                    <th className="px-4 py-3.5 font-semibold lg:px-5">
                      Status
                    </th>
                    <th className="px-4 py-3.5 text-right font-semibold lg:px-5">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {interviews.map((interview) => (
                    <tr
                      key={interview._id}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${interview.candidateName}`}
                      onClick={() => openDetails(interview)}
                      onKeyDown={(event) => {
                        if (
                          event.target === event.currentTarget &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          openDetails(interview);
                        }
                      }}
                      className="cursor-pointer transition-colors hover:bg-blue-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                    >
                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                            {getInitials(interview.candidateName)}
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900">
                              {interview.candidateName}
                            </p>
                            <p className="mt-1 max-w-[200px] truncate text-xs text-slate-500">
                              {interview.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm font-medium text-slate-700 lg:px-5">
                        {interview.position}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600 lg:px-5">
                        <div className="flex items-start gap-2">
                          <CalendarDays
                            size={15}
                            className="mt-0.5 shrink-0 text-slate-400"
                          />
                          <span>{formatDate(interview.date)}</span>
                        </div>
                      </td>

                      <td className="px-4 py-4 lg:px-5">
                        {renderStatus(interview.status)}
                      </td>

                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex justify-end">
                          {renderActions(interview)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {/* Full interview details popup */}
{/* Full interview details popup */}
{selectedInterview && (
  <div
    className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm"
    onMouseDown={(event) => {
      if (event.target === event.currentTarget) {
        closeDetails();
      }
    }}
  >
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="interview-details-title"
      className="my-auto max-h-[85dvh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-2xl border border-white/70 bg-white shadow-2xl"
    >
      {/* Popup header */}
      <div className="relative border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 px-5 py-4">
        <button
          type="button"
          onClick={closeDetails}
          aria-label="Close interview details"
          className="absolute right-3 top-3 rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={17} />
        </button>

        <div className="flex items-start gap-3 pr-8">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
            {getInitials(selectedInterview.candidateName)}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
              Interview Details
            </p>

            <h2
              id="interview-details-title"
              className="mt-1 break-words text-lg font-bold tracking-tight text-slate-900"
            >
              {selectedInterview.candidateName}
            </h2>

            <p className="mt-1 break-all text-xs text-slate-500">
              {selectedInterview.email || "No email provided"}
            </p>

            <div className="mt-2">
              {renderStatus(selectedInterview.status)}
            </div>
          </div>
        </div>
      </div>

      {/* Popup body */}
      <div className="space-y-4 p-4">
        {/* Candidate Information */}
        <div>
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Candidate Information
          </h3>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <DetailItem
              icon={UserRound}
              label="Candidate Name"
              className="p-3"
            >
              {selectedInterview.candidateName}
            </DetailItem>

            <DetailItem
              icon={Mail}
              label="Email Address"
              className="p-3"
            >
              {selectedInterview.email}
            </DetailItem>

            <DetailItem
              icon={BriefcaseBusiness}
              label="Position"
              className="p-3 sm:col-span-2"
            >
              {selectedInterview.position}
            </DetailItem>
          </div>
        </div>

        {/* Interview Information */}
        <div>
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Interview Information
          </h3>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <DetailItem
              icon={CalendarDays}
              label="Interview Date & Time"
              className="p-3"
            >
              {formatDate(selectedInterview.date)}
            </DetailItem>

            <DetailItem
              icon={ClipboardList}
              label="Current Status"
              className="p-3"
            >
              <span className="capitalize">
                {selectedInterview.status || "Unknown"}
              </span>
            </DetailItem>

            <DetailItem
              icon={FileText}
              label="Interview Notes"
              className="p-3 sm:col-span-2"
            >
              <p className="whitespace-pre-wrap font-normal leading-5 text-slate-700">
                {selectedInterview.notes || "No notes added."}
              </p>
            </DetailItem>
          </div>
        </div>
      </div>

      {/* Popup footer */}
      <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/70 p-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={closeDetails}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Close
        </button>

        <button
          type="button"
          onClick={() => handleEdit(selectedInterview)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <Pencil size={14} />
          Update Status
        </button>
      </div>
    </section>
  </div>
)}
    </>
  );
}

export default InterviewTable;
