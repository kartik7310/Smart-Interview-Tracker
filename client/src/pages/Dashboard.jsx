
import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../config/api";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import InterviewFilters from "../components/dashboard/InterviewFilters";
import InterviewTable from "../components/dashboard/InterviewTable";
import Pagination from "../components/dashboard/Pagination";
import InterviewModal from "../components/dashboard/InterviewModal";

const LIMIT = 10;

const initialForm = {
  candidateName: "",
  position: "",
  status: "pending",
  email: "",
  date: "",
  notes: "",
};

const initialFilters = {
  candidateName: "",
  status: "",
  position: "",
};

function toLocalDateTime(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 16);
}

function Dashboard() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  const [filters, setFilters] = useState(initialFilters);
  const [showModal, setShowModal] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // GET /api/interview
  const fetchInterviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
      });

      if (filters.candidateName.trim()) {
        params.set("candidateName", filters.candidateName.trim());
      }

      if (filters.status) {
        params.set("status", filters.status);
      }

      if (filters.position.trim()) {
        params.set("position", filters.position.trim());
      }

      const data = await apiRequest(`/interview?${params.toString()}`);

      if (!data || !Array.isArray(data.interviews)) {
        throw new Error("Unexpected API response: interviews array is missing.");
      }

      setInterviews(data.interviews);
      setPagination({
        total: Number(data.total ?? data.interviews.length),
        totalPages: Math.max(1, Number(data.totalPages ?? 1)),
      });
    } catch (err) {
      console.error("Fetch interviews error:", err);
      setError(err.message || "Failed to load interviews.");
      setInterviews([]);
      setPagination({ total: 0, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setPage(1);
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setPage(1);
    setFilters({ ...initialFilters });
  };

  const openAddModal = () => {
    setEditingInterview(null);
    setFormData({
      ...initialForm,
      date: toLocalDateTime(new Date().toISOString()),
    });
    setFormError("");
    setShowModal(true);
  };

  // Editing is for status only because PUT only accepts status.
  const openEditModal = (interview) => {
    setEditingInterview(interview);
    setFormData({
      ...initialForm,
      status: interview.status || "pending",
    });
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingInterview(null);
    setFormData({ ...initialForm });
    setFormError("");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (editingInterview) {
    
      if (!formData.status) {
        setFormError("Please select a status.");
        return;
      }
    } else {
      if (
        !formData.candidateName.trim() ||
        !formData.position.trim() ||
        !formData.email.trim() ||
        !formData.date
      ) {
        setFormError("Candidate name, position, email, and date are required.");
        return;
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
      ) {
        setFormError("Enter a valid email address.");
        return;
      }

      if (Number.isNaN(new Date(formData.date).getTime())) {
        setFormError("Enter a valid interview date and time.");
        return;
      }
    }

    setSaving(true);

    try {
      if (editingInterview) {
        // PUT /api/interview/:id
        await apiRequest(`/interview/${editingInterview._id}`, {
          method: "PUT",
          body: JSON.stringify({
            status: formData.status,
          }),
        });
      } else {
        // POST /api/interview
        await apiRequest("/interview", {
          method: "POST",
          body: JSON.stringify({
            candidateName: formData.candidateName.trim(),
            position: formData.position.trim(),
            status: formData.status,
            email: formData.email.trim(),
            date: new Date(formData.date).toISOString(),
            notes: formData.notes.trim(),
          }),
        });
      }

      setShowModal(false);
      setEditingInterview(null);
      setFormData({ ...initialForm });

      await fetchInterviews();
    } catch (err) {
      console.error("Save interview error:", err);
      setFormError(err.message || "Failed to save interview.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      setError("Cannot delete interview: ID is missing.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this interview?")) {
      return;
    }

    setError("");

    try {
     
      await apiRequest(`/interview/${id}`, {
        method: "DELETE",
      });

      if (interviews.length === 1 && page > 1) {
        setPage((previous) => previous - 1);
      } else {
        await fetchInterviews();
      }
    } catch (err) {
      console.error("Delete interview error:", err);
      setError(err.message || "Failed to delete interview.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 font-sans">
      <DashboardHeader onAddInterview={openAddModal} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">
            HR WORKSPACE
          </p>

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Interview Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Schedule interviews, track candidate progress, and manage interview records.
          </p>
        </div>

        <InterviewFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={clearFilters}
        />

        <InterviewTable
          interviews={interviews}
          loading={loading}
          error={error}
          totalInterviews={pagination.total}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onAdd={openAddModal}
          onRefresh={fetchInterviews}
        />

        <Pagination
          page={page}
          totalPages={pagination.totalPages}
          disabled={loading}
          onPrevious={() => setPage((previous) => Math.max(1, previous - 1))}
          onNext={() =>
            setPage((previous) =>
              Math.min(pagination.totalPages, previous + 1)
            )
          }
        />
      </main>

      <InterviewModal
        isOpen={showModal}
        editingInterview={editingInterview}
        formData={formData}
        formError={formError}
        saving={saving}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
    </div>
  );
}

export default Dashboard;
