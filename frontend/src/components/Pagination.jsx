/* eslint-disable no-unused-vars */
import paginationHelper from "../helper/pagination";
import { useSearchParams } from "react-router-dom";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [ searchParams, setSearchParams] = useSearchParams();
  const pageNumber = paginationHelper(totalPages, currentPage);

  function handleClick(page) {
    if (typeof page !== "number") return;
    onPageChange(page);
    setSearchParams((prev) => {
      const param = new URLSearchParams(prev);
      param.set("page", page.toString());
      return param;
    });
  }

  return (
    <div className="flex flex-col items-center mt-6">
      <nav className="flex items-center gap-1.5">
        {pageNumber.map((page, index) => (
          <button
            key={index}
            onClick={() => handleClick(page)}
            className={`px-4 py-2 rounded-full ${currentPage === page
                ? "bg-[#55A3F0] text-white"
                  : "bg-white outline-3 outline-gray-300 cursor-pointer"
              }`}
          >
            {page}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Pagination;
