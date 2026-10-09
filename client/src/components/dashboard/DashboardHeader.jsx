import { Link, useNavigate } from "react-router-dom";
import { Plus, Download, LogOut, Loader2, Users } from "lucide-react";

function DashboardHeader({
  onAddInterview,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* BRAND
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-extrabold text-xl">
              ₹
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                Expense<span className="text-blue-600">Flow</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Hr Dashboard
              </p>
            </div>
          </div> */}
          {/* Logo */}
<div className="mb-8 flex justify-center ">
  <Link  className="inline-flex items-center gap-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
      <Users size={22} strokeWidth={2} />
    </div>

    <span className="text-2xl font-bold tracking-tight text-slate-900">
      Smart Interview
      <span className="text-blue-600"> Flow</span>
    </span>
  </Link>
</div>


          {/* ACTIONS */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">

           
            {/* ADD Interview */}
            <button
              type="button"
              onClick={onAddInterview}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-4
                py-2.5
                rounded-xl
                text-xs sm:text-sm
                font-semibold
                transition
                shadow-md
                shadow-blue-500/20
                hover:shadow-lg
                hover:shadow-blue-500/30
                whitespace-nowrap
                cursor-pointer
              "
            >
              <Plus className="w-4 h-4" />
              <span>Add Transaction</span>
            </button>

            {/* LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              className="
                inline-flex
                items-center
                justify-center
                gap-1.5
                px-3.5
                py-2.5
                border
                border-slate-200
                rounded-xl
                text-xs sm:text-sm
                font-medium
                text-slate-600
                hover:bg-slate-100/80
                hover:text-slate-900
                transition
                whitespace-nowrap
                cursor-pointer
              "
            >
              <LogOut className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Logout</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;