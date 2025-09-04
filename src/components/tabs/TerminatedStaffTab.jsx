// components/staff/TerminatedStaffTab.jsx
import React, { useState } from 'react';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import Button from '@/components/ui/Button';
import { FaChevronDown } from 'react-icons/fa';

const TerminatedStaffTab = ({ currentPage, totalPages, handlePageChange }) => {
  const [expandedRow, setExpandedRow] = useState(null);

 
  const terminatedStaffData = [
    { sn: 1, employeeId: 'OP/VFLA/1705/222', name: 'Samuel Ade', department: 'Tech', position: 'Frontend Dev', employmentType: 'Full Time', salary: '450,000', date: '2024-08-10', reason: 'Performance' },
    { sn: 2, employeeId: 'MA/VFLA/1705/333', name: 'Grace John', department: 'Marketing', position: 'Analyst', employmentType: 'Intern', salary: '100,000', date: '2024-07-05', reason: 'Contract Ended' },
  ];

  // Columns for terminated staff
  const terminatedColumns = [
    { title: 'S/N', accessor: 'sn' },
    { title: 'Employee id', accessor: 'employeeId' },
    { title: 'Name', accessor: 'name' },
    { title: 'Department', accessor: 'department' },
    { title: 'Position', accessor: 'position' },
    { title: 'Employment type', accessor: 'employmentType' },
    { 
      title: 'Salary', 
      accessor: 'salary', 
      render: (value) => `₦${value}` 
    },
    { 
      title: 'Date', 
      accessor: 'date',
      render: (value) => (
        <span className="text-red-500">{value}</span>
      )
    },
    { 
      title: 'Action', 
      accessor: 'action', 
      render: (_, row, i) => (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setExpandedRow(expandedRow === i ? null : i)}
        >
          <span className="text-black text-xs">View</span>
          <FaChevronDown size={10} className="text-gray-500" />
        </div>
      ) 
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-300">
        <Table 
          data={terminatedStaffData} 
          columns={terminatedColumns} 
          tableStyle="border-collapse" 
          headerStyle="bg-gray-50" 
          cellStyle="text-black" 
        />
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default TerminatedStaffTab;
