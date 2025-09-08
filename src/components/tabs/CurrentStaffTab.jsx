'use client'
import React, { useState } from 'react';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import Button from '@/components/ui/Button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';
import { FaExclamationTriangle, FaCheck } from "react-icons/fa";

const CurrentStaffTab = ({ currentPage, totalPages, handlePageChange }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [showTerminationModal, setShowTerminationModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [terminationReason, setTerminationReason] = useState('');
  const [terminationDate, setTerminationDate] = useState('');
  const [acknowledge, setAcknowledge] = useState(false);

  
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
    paymentMethod: 'Bank Transfer',
    image: '/images/user.jpg' // dummy image
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
    paymentMethod: 'Bank Transfer',
     image: '/images/user.jpg'
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
    paymentMethod: 'Bank Transfer',
     image: '/images/user.jpg'
  },
  
];


  const toggleRowExpansion = (rowIndex) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowIndex]: !prev[rowIndex]
    }));
  };

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
            <FaChevronUp size={10} className="text-black" />
          ) : (
            <FaChevronDown size={10} className="text-black" />
          )}
        </div>
      )
    }
  ];

  const handleEditStaff = (employee) => {
    console.log('Edit staff:', employee);
  };

  const handleDeleteStaff = (employee) => {
    console.log('Delete staff:', employee);
  };

  const handleTerminateEmployment = (employee) => {
    setSelectedEmployee(employee);
    setTerminationDate('');
    setTerminationReason('');
    setShowTerminationModal(true);
  };

  const handleModalClose = () => {
    setShowTerminationModal(false);
    setSelectedEmployee(null);
  };

 // update handleContinue
const handleContinue = () => {
  setShowTerminationModal(false);
  setShowWarningModal(true);
};


  const handleWarningBack = () => {
    setShowWarningModal(false);
    setShowTerminationModal(true);
  };

  const handleWarningTerminate = () => {
    console.log('Termination submitted:', {
      employee: selectedEmployee,
      terminationDate,
      reason: terminationReason
    });
    setShowWarningModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmationModal(false);
    setSelectedEmployee(null);
    setTerminationReason('');
    setTerminationDate('');
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
                  <tr className="text-xs text-black border-b border-gray-300 hover:bg-gray-50">
                    {columns.map((col, colIndex) => (
                      <td className="py-4 px-6 capitalize" key={colIndex}>
                        {col.render ? col.render(row[col.accessor], row, rowIndex) : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                  {expandedRows[rowIndex] && (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-4 bg-gray-50 border-b border-gray-300">
                        <div className="flex items-start gap-6">
                         <div className="flex-shrink-0">
  <img
    src={row.image}
    alt={row.name}
    className="w-16 h-16 rounded-full object-cover border border-gray-300"
  />
</div>

                          <div className="flex-1 grid grid-cols-6 gap-6 text-xs">
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Name</p>
                                <p className="text-black font-medium">{row.name}</p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Employee ID</p>
                                <p className="font-medium bg-black text-white px-2 py-1 rounded text-xs inline-block">
                                  {row.employeeId}
                                </p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Employment Status</p>
                                <p className="text-black font-medium">{row.status}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Department</p>
                                <p className="text-black font-medium">{row.department}</p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Contact No.</p>
                                <p className="text-black font-medium">{row.contactNo}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Position</p>
                                <p className="text-black font-medium">{row.position}</p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Email address</p>
                                <p className="text-black font-medium">{row.emailAddress}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Employment type</p>
                                <p className="text-black font-medium">{row.employmentType}</p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Employment date</p>
                                <p className="text-black font-medium">{row.employmentDate}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Salary</p>
                                <p className="text-black font-medium">₦{row.salary}</p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Bank details</p>
                                <p className="text-black font-medium">{row.bankDetails}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Benefit</p>
                                <p className="text-black font-medium">{row.benefit}</p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Payment method</p>
                                <p className="text-black font-medium">{row.paymentMethod}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                          <Button
                            onClick={() => handleEditStaff(row)}
                            className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
                          >
                            Edit Staff
                          </Button>
                          <Button
                            onClick={() => handleDeleteStaff(row)}
                            className="px-4 py-2 text-xs border border-gray-300 text-white bg-black rounded"
                          >
                            Delete Staff
                          </Button>
                          <Button
                            onClick={() => handleTerminateEmployment(row)}
                            className="px-4 py-2 text-xs border border-red-300 text-white bg-red-600 rounded"
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
      
      {/* Termination Details Modal */}
     {/* Termination Details Modal */}
<Modal open={showTerminationModal} setOpen={setShowTerminationModal}>
  <div className="p-6">
    <h3 className="text-lg font-bold mb-4 text-black">Termination Details</h3>
    <p className="text-sm text-gray-600 mb-4">Provide details about the termination</p>
    <div className="space-y-4">
      <div>
        <p className="text-sm text-black mb-1">Employee:</p>
        <p className="text-sm font-medium text-black">{selectedEmployee?.name}</p>
      </div>
      <div>
        <p className="text-sm text-black mb-1">Department:</p>
        <p className="text-sm font-medium text-black">{selectedEmployee?.department}</p>
      </div>
      <div>
        <p className="text-sm text-black mb-1">Position:</p>
        <p className="text-sm font-medium text-black">{selectedEmployee?.position}</p>
      </div>
      <div>
        <p className="text-sm text-black mb-1">Employment date:</p>
        <p className="text-sm font-medium text-black">{selectedEmployee?.employmentDate}</p>
      </div>
      <div>
        <p className="text-sm text-black mb-1">Termination Date</p>
        <Input
          type="date"
          name="terminationDate"
          value={terminationDate}
          onChange={(e) => setTerminationDate(e.target.value)}
          className="w-full text-black"
        />
      </div>
      <div>
        <p className="text-sm text-black mb-1">Reason for Termination</p>
        <Textarea
          rows={4}
          value={terminationReason}
          onChange={(e) => setTerminationReason(e.target.value)}
          placeholder="Enter detailed reason for termination"
          className='text-black'
        />
      </div>
    </div>
    <div className="flex justify-end gap-2 mt-6">
      <Button
        onClick={handleModalClose}
        className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
      >
        Back
      </Button>
      <button
        onClick={handleContinue}
        className="px-4 py-2 text-xs border border-gray-300 text-white bg-black rounded"
      >
        Continue
      </button>
    </div>
  </div>
</Modal>


      {/* Warning Modal */}
     {/* Warning Modal */}
<Modal open={showWarningModal} setOpen={setShowWarningModal}>
  <div className="p-6 text-center">
    {/* <div className="flex justify-center mb-4">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
        <FaExclamationTriangle className="w-6 h-6 text-red-500" />
      </div>
    </div>
    <h3 className="text-lg font-bold mb-2 text-black">Warning</h3> */}
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex justify-center mb-4">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
        <FaExclamationTriangle className="w-6 h-6 text-red-500" />
      </div>
    </div>
      <p className="text-sm text-red-700 mb-2">
        <span className='text-black font-bold'>Warning:</span>This action cannot be undone. Once terminated, the employee will lose access to all systems immediately
      </p>
      <label className="flex items-center gap-2 text-sm text-red-600">
        <input
          type="checkbox"
          checked={acknowledge}
          onChange={(e) => setAcknowledge(e.target.checked)}
          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 text-center"
        />
        I Understand this action is permanent
      </label>
    </div>
    <div className="flex justify-center gap-3">
      <Button
        onClick={handleWarningBack}
        className="px-6 py-2 text-xs border border-gray-300 text-white bg-black rounded"
      >
        Back
      </Button>
      <Button
        onClick={handleWarningTerminate}
        disabled={!acknowledge} // Disable until checked
        className={`px-6 py-2 text-xs border border-red-300 text-white rounded ${
          acknowledge
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-red-300 cursor-not-allowed'
        }`}
      >
        Terminate
      </Button>
    </div>
  </div>
</Modal>


      {/* Success Confirmation Modal */}
      <Modal open={showConfirmationModal} setOpen={setShowConfirmationModal}>
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2 text-black text-center">Employment Terminated Successfully</h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            The employment of {selectedEmployee?.name} has been terminated effective {terminationDate}.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={handleConfirmationClose}
              className="px-6 py-2 text-xs border border-gray-300 text-white bg-black rounded"
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CurrentStaffTab;