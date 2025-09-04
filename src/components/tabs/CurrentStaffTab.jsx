'use client'

import React, { useState } from 'react';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import Button from '@/components/ui/Button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CurrentStaffTab = ({ currentPage, totalPages, handlePageChange }) => {
  const [expandedRows, setExpandedRows] = useState({});

  // Current staff data with additional details
  const staffData = [
    { 
      sn: 1, 
      employeeId: 'OP/VFLA/1705/099', 
      name: 'Ayobami Joy', 
      department: 'Operations', 
      position: 'Head of department', 
      employmentType: 'Full Time', 
      salary: '650,000', 
      status: 'Active',
      contactNo: '08068245623',
      emailAddress: 'ayobami15joy@gmail.com',
      employmentDate: '2020-07-22',
      bankDetails: '3134275188 Firstbank',
      benefit: 'Health Insurance',
      paymentMethod: 'Bank Transfer'
    },
    { 
      sn: 2, 
      employeeId: 'TE/VFLA/1005/079', 
      name: 'Bethel Esther', 
      department: 'Tech', 
      position: 'Intern', 
      employmentType: 'Full Time', 
      salary: '70,000', 
      status: 'Active',
      contactNo: '08162351131',
      emailAddress: 'bethel.esther@gmail.com',
      employmentDate: '2023-01-15',
      bankDetails: '2245178965 GTBank',
      benefit: 'Health Insurance',
      paymentMethod: 'Bank Transfer'
    },
    { 
      sn: 3, 
      employeeId: 'DEV/VFLA/1005/049', 
      name: 'Ohagbu Chika', 
      department: 'Dev team', 
      position: 'Front end developer', 
      employmentType: 'Full Time', 
      salary: '550,000', 
      status: 'On leave',
      contactNo: '08162357107',
      emailAddress: 'ohagbu.chika@gmail.com',
      employmentDate: '2021-03-10',
      bankDetails: '1122334455 UBA',
      benefit: 'Health Insurance',
      paymentMethod: 'Bank Transfer'
    },
    { 
      sn: 4, 
      employeeId: 'DEV/VFLA/1005/099', 
      name: 'John Paul', 
      department: 'Dev team', 
      position: 'Ui/ux designer', 
      employmentType: 'Full Time', 
      salary: '500,000', 
      status: 'Active',
      contactNo: '09183902058',
      emailAddress: 'john.paul@gmail.com',
      employmentDate: '2022-05-20',
      bankDetails: '7788990011 Access Bank',
      benefit: 'Health Insurance',
      paymentMethod: 'Bank Transfer'
    },
    { 
      sn: 5, 
      employeeId: 'TE/VFLA/1005/079', 
      name: 'Okeke Sandra', 
      department: 'Tech team', 
      position: 'IT student', 
      employmentType: 'Full Time', 
      salary: '70,000', 
      status: 'Active',
      contactNo: '09123768365',
      emailAddress: 'okeke.sandra@gmail.com',
      employmentDate: '2023-09-01',
      bankDetails: '5566778899 Zenith Bank',
      benefit: 'Health Insurance',
      paymentMethod: 'Bank Transfer'
    }
  ];

  const toggleRowExpansion = (rowIndex) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowIndex]: !prev[rowIndex]
    }));
  };

  // Columns for current staff
  const columns = [
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
      title: 'Status', 
      accessor: 'status', 
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {value}
        </span>
      ) 
    },
    { 
      title: 'Action', 
      accessor: 'action', 
      render: (_, row, index) => (
        <div 
          className="flex items-center gap-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleRowExpansion(index);
          }}
        >
          <span className="text-black text-xs">Manage</span>
          {expandedRows[index] ? (
            <FaChevronUp size={10} className="text-gray-500" />
          ) : (
            <FaChevronDown size={10} className="text-gray-500" />
          )}
        </div>
      ) 
    }
  ];

  const handleEditStaff = (employee) => {
    console.log('Edit staff:', employee);
    // Implement edit functionality
  };

  const handleDeleteStaff = (employee) => {
    console.log('Delete staff:', employee);
    // Implement delete functionality
  };

  const handleTerminateEmployment = (employee) => {
    console.log('Terminate employment:', employee);
    // Implement termination functionality
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-300">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray">
                {columns.map((column, index) => (
                  <th key={index} className="py-3 px-6 text-left">
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staffData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {/* Main Table Row */}
                  <tr className="text-xs text-black border-b border-gray-300 hover:bg-gray-50">
                    {columns.map((col, colIndex) => (
                      <td className="py-4 px-6 capitalize" key={colIndex}>
                        {col.render ? col.render(row[col.accessor], row, rowIndex) : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Expanded Row Content */}
                  {expandedRows[rowIndex] && (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-4 bg-gray-50 border-b border-gray-300">
                        <div className="flex items-start gap-6">
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                              <span className="text-white text-lg font-semibold">
                                {row.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          
                          {/* Employee Details Grid */}
                          <div className="flex-1 grid grid-cols-6 gap-6 text-xs">
                            {/* Column 1 */}
                            <div className="space-y-3">
                              <div>
                                <p className="text-gray-500 mb-1">Name</p>
                                <p className="text-black font-medium">{row.name}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 mb-1">Employee ID</p>
                                <p className="font-medium bg-black text-white px-2 py-1 rounded text-xs inline-block">
                                  {row.employeeId}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 mb-1">Employment Status</p>
                                <p className="text-black font-medium">{row.status}</p>
                              </div>
                            </div>
                            
                            {/* Column 2 */}
                            <div className="space-y-3">
                              <div>
                                <p className="text-gray-500 mb-1">Department</p>
                                <p className="text-black font-medium">{row.department}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 mb-1">Contact No.</p>
                                <p className="text-black font-medium">{row.contactNo}</p>
                              </div>
                            </div>
                            
                            {/* Column 3 */}
                            <div className="space-y-3">
                              <div>
                                <p className="text-gray-500 mb-1">Position</p>
                                <p className="text-black font-medium">{row.position}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 mb-1">Email address</p>
                                <p className="text-black font-medium">{row.emailAddress}</p>
                              </div>
                            </div>
                            
                            {/* Column 4 */}
                            <div className="space-y-3">
                              <div>
                                <p className="text-gray-500 mb-1">Employment type</p>
                                <p className="text-black font-medium">{row.employmentType}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 mb-1">Employment date</p>
                                <p className="text-black font-medium">{row.employmentDate}</p>
                              </div>
                            </div>
                            
                            {/* Column 5 */}
                            <div className="space-y-3">
                              <div>
                                <p className="text-gray-500 mb-1">Salary</p>
                                <p className="text-black font-medium">₦{row.salary}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 mb-1">Bank details</p>
                                <p className="text-black font-medium">{row.bankDetails}</p>
                              </div>
                            </div>
                            
                            {/* Column 6 */}
                            <div className="space-y-3">
                              <div>
                                <p className="text-gray-500 mb-1">Benefit</p>
                                <p className="text-black font-medium">{row.benefit}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 mb-1">Payment method</p>
                                <p className="text-black font-medium">{row.paymentMethod}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 mt-6">
                          <Button 
                            onClick={() => handleEditStaff(row)}
                            className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
                          >
                            Edit Staff
                          </Button>
                          <Button 
                            onClick={() => handleDeleteStaff(row)}
                            className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
                          >
                            Delete Staff
                          </Button>
                          <Button 
                            onClick={() => handleTerminateEmployment(row)}
                            className="px-4 py-2 text-xs border border-red-300 text-white bg-red-500 hover:bg-red-50 rounded"
                          >
                            Terminate Employment
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default CurrentStaffTab;