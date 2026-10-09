

import { Search, RotateCcw, Filter, X } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-4 pr-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

function InterviewFilters({ filters, onFilterChange, onClear }) {
  const hasFilters = Object.values(filters).some((value) =>
    String(value ?? "").trim()
  );

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Filter size={19} strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-tight text-slate-900">
              Filter Interviews
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Narrow results by candidate, status, or position.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasFilters}
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600 sm:self-auto"
        >
          <RotateCcw
            size={14}
            className="transition-transform duration-300 group-hover:-rotate-45"
          />
          Clear filters
        </button>
      </div>

      {/* Filter fields */}
      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
        {/* Candidate name */}
        <div className="space-y-2">
          <label
            htmlFor="candidateName"
            className="block text-xs font-semibold text-slate-700"
          >
            Candidate name
          </label>

          <div className="group relative">
            <Search
              size={17}
              strokeWidth={1.8}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600"
            />

            <input
              id="candidateName"
              name="candidateName"
              type="text"
              autoComplete="off"
              value={filters.candidateName}
              onChange={onFilterChange}
              placeholder="Search candidate..."
              className={`${inputClass} pl-10 pr-9`}
            />

            {filters.candidateName && (
              <button
                type="button"
                aria-label="Clear candidate name"
                onClick={() =>
                  onFilterChange({
                    target: { name: "candidateName", value: "" },
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label
            htmlFor="status"
            className="block text-xs font-semibold text-slate-700"
          >
            Interview status
          </label>

          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={onFilterChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Position */}
        <div className="space-y-2">
          <label
            htmlFor="position"
            className="block text-xs font-semibold text-slate-700"
          >
            Job position
          </label>

          <div className="group relative">
            <input
              id="position"
              name="position"
              type="text"
              autoComplete="off"
              value={filters.position}
              onChange={onFilterChange}
              placeholder="e.g. Backend Developer"
              className={`${inputClass} pr-9`}
            />

            {filters.position && (
              <button
                type="button"
                aria-label="Clear position"
                onClick={() =>
                  onFilterChange({
                    target: { name: "position", value: "" },
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active filter indicator */}
      {hasFilters && (
        <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-2.5 sm:px-6">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <p className="text-xs text-slate-500">
            Filters active
          </p>
        </div>
      )}
    </section>
  );
}

export default InterviewFilters;