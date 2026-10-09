// import { ChevronLeft, ChevronRight } from "lucide-react";

// function Pagination({
//   page,
//   totalPages,
//   onPrevious,
//   onNext,
// }) {
//   if (totalPages <= 1) {
//     return null;
//   }

//   return (
//     <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 py-2">

//       <p className="text-xs sm:text-sm text-slate-500 font-medium">
//         Showing Page{" "}
//         <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
//           {page}
//         </span>{" "}
//         of{" "}
//         <span className="font-bold text-slate-900">
//           {totalPages}
//         </span>
//       </p>

//       <div className="flex items-center gap-2">

//         <button
//           disabled={page === 1}
//           onClick={onPrevious}
//           className="
//             inline-flex items-center gap-1
//             px-3.5 py-2
//             border border-slate-200
//             rounded-xl
//             text-xs font-semibold
//             text-slate-700
//             bg-white
//             hover:bg-slate-50
//             hover:border-slate-300
//             disabled:opacity-40
//             disabled:cursor-not-allowed
//             disabled:hover:bg-white
//             disabled:hover:border-slate-200
//             transition
//             cursor-pointer
//             shadow-2xs
//           "
//         >
//           <ChevronLeft className="w-4 h-4" />
//           Previous
//         </button>

//         <button
//           disabled={page === totalPages}
//           onClick={onNext}
//           className="
//             inline-flex items-center gap-1
//             px-3.5 py-2
//             border border-slate-200
//             rounded-xl
//             text-xs font-semibold
//             text-slate-700
//             bg-white
//             hover:bg-slate-50
//             hover:border-slate-300
//             disabled:opacity-40
//             disabled:cursor-not-allowed
//             disabled:hover:bg-white
//             disabled:hover:border-slate-200
//             transition
//             cursor-pointer
//             shadow-2xs
//           "
//         >
//           Next
//           <ChevronRight className="w-4 h-4" />
//         </button>

//       </div>

//     </div>
//   );
// }

// export default Pagination;



import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
  disabled = false,
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Interview pagination"
      className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row"
    >
      <p className="text-sm text-slate-500">
        Page{" "}
        <span className="font-semibold text-slate-900">{page}</span>
        {" "}of{" "}
        <span className="font-semibold text-slate-900">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          disabled={disabled || page <= 1}
          onClick={onPrevious}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <button
          type="button"
          aria-label="Next page"
          disabled={disabled || page >= totalPages}
          onClick={onNext}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
