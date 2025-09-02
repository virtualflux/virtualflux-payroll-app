import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
if (totalPages === 0) return null; 

const getPageNumbers = () => {
    const pages = [];
    const delta = 2;

    if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage > delta + 2) {
    pages.push(1, "..."); 
    }

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
    pages.push(i);
    }

    if (currentPage < totalPages - delta - 1) {
    pages.push("...", totalPages); 
    } else {
    pages.push(totalPages);
    }

    return pages;
};

return (
    <div className="flex justify-between mt-4">
    <span className="py-2 px-4 bg-blue-50 text-xs text-black rounded-md shadow-lg font-semibold">
        Page {currentPage || 0} of {totalPages || 0}
    </span>

    <div className="flex items-center gap-2 bg-transparent">
        {/* Previous Button */}
        <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`text-sm py-0.5 px-2 rounded-full ${
            currentPage === 1 ? 'disabled:text-gray-300' : 'bg-black text-white'
        }`}
        >
        {"<"}
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
        <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={`text-xs py-1 px-3 rounded-md ${
            currentPage === page ? 'bg-catalineBlue text-white' : 'text-black'
            }`}
            disabled={page === "..."}
        >
            {page}
        </button>
        ))}

        {/* Next Button */}
        <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`text-sm py-0.5 px-2 rounded-full ${
            currentPage === totalPages ? 'disabled:text-gray-300' : 'bg-black text-white'
        }`}
        >
        {">"}
        </button>
    </div>
    </div>
);
};

export default Pagination;
