
import { Link } from "react-router-dom";
import {
  Users,
  CalendarDays,
  ClipboardList,
  Search,
  CheckCircle2,
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
} from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Users size={22} />
            </div>

            <span className="text-lg font-bold text-gray-900 sm:text-xl">
              Smart Interview <span className="text-blue-600">Flow</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-700"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="bg-gray-50">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-blue-100 bg-white px-3 py-2 text-sm font-medium text-blue-700">
                <BriefcaseBusiness size={16} />
                HR Interview Management
              </div>

              <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
                A simpler way to manage candidate interviews
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-gray-600">
                Organize candidate details, schedule interviews, search
                records, and update interview statuses from one place.
                Keep your hiring workflow clear and organized.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Get Started
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/login"
                  className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  HR Login
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-blue-600" />
                  Easy candidate search
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-blue-600" />
                  Simple status tracking
                </span>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Interview Dashboard
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Overview of candidate interviews
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                  <CalendarDays size={19} />
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-gray-200 border-b border-gray-200">
                <Summary
                  label="Total"
                  value="24"
                  icon={<Users size={17} />}
                />
                <Summary
                  label="Scheduled"
                  value="10"
                  icon={<CalendarDays size={17} />}
                />
                <Summary
                  label="Completed"
                  value="14"
                  icon={<CheckCircle2 size={17} />}
                />
              </div>

              <div className="p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-900">
                    Recent Interviews
                  </h3>
                  <span className="text-xs text-gray-500">
                    Illustrative data
                  </span>
                </div>

                <div className="mb-4 flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-400">
                  <Search size={16} />
                  Search candidate name...
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[390px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50 text-gray-500">
                        <th className="px-3 py-3 font-medium">Candidate</th>
                        <th className="px-3 py-3 font-medium">Position</th>
                        <th className="px-3 py-3 font-medium">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <Candidate
                        name="Ritika Sharma"
                        position="Frontend Developer"
                        status="Scheduled"
                      />
                      <Candidate
                        name="Aman Verma"
                        position="Backend Developer"
                        status="Pending"
                      />
                      <Candidate
                        name="Priya Singh"
                        position="UI Designer"
                        status="Completed"
                      />
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-md bg-gray-50 p-4">
                  <Clock3
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Keep every interview organized
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-600">
                      View candidate details and track interview progress
                      from one dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-700">
              FEATURES
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Everything you need to manage interviews
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Manage interview records with simple, practical tools
              designed for everyday HR tasks.
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<Users size={21} />}
              title="Candidate Management"
              description="Create and maintain candidate records, including names, email addresses, positions, dates, and notes."
            />

            <Feature
              icon={<Search size={21} />}
              title="Search and Filters"
              description="Find candidates by name and narrow interview records by position or status."
            />

            <Feature
              icon={<ClipboardList size={21} />}
              title="Interview Status"
              description="Track pending, scheduled, and completed interviews and update records when needed."
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="border-y border-gray-200 bg-gray-50">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Ready to get started?
              </h2>
              <p className="mt-2 text-gray-600">
                Sign in to manage your candidate interviews.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Open Dashboard
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="font-semibold text-gray-800">
            Smart Interview <span className="text-blue-600">Flow</span>
          </Link>

          <p>Interview management made simple.</p>
        </div>
      </footer>
    </div>
  );
}

function Summary({ label, value, icon }) {
  return (
    <div className="min-w-0 px-3 py-5 sm:px-4">
      <div className="mb-3 flex flex-col items-start gap-2 text-gray-500 sm:flex-row sm:items-center">
        {icon}
        <span className="text-xs sm:text-sm">{label}</span>
      </div>

      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function Candidate({ name, position, status }) {
  const statusColors = {
    Scheduled: "bg-blue-50 text-blue-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Completed: "bg-green-50 text-green-700",
  };

  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="px-3 py-4 font-medium text-gray-800">{name}</td>
      <td className="px-3 py-4 text-gray-600">{position}</td>
      <td className="px-3 py-4">
        <span
          className={`whitespace-nowrap rounded px-2 py-1 text-xs font-medium ${
            statusColors[status]
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="border-t border-gray-200 pt-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-700">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {description}
      </p>
    </div>
  );
}

export default App;
