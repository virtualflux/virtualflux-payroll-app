'use client'

import React, { useState, useRef } from 'react';
import { FaPlus, FaChevronDown, FaUpload, FaTimes, FaTrash } from 'react-icons/fa';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Tabs, Tab } from '@/components/ui/Tabs';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import Modal from '@/components/ui/Modal';

const ManageStaff = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null); // For terminated staff dropdown
  const fileInputRef = useRef(null);

  const totalPages = 10;

  // Current staff data
  const staffData = [
    { sn: 1, employeeId: 'OP/VFLA/1705/099', name: 'Ayobami Joy', department: 'Operations', position: 'Head of department', employmentType: 'Full Time', salary: '650,000', status: 'Active' },
    { sn: 2, employeeId: 'TE/VFLA/1005/079', name: 'Bethel Esther', department: 'Tech', position: 'Intern', employmentType: 'Full Time', salary: '70,000', status: 'Active' },
    { sn: 3, employeeId: 'DEV/VFLA/1005/049', name: 'Ohagbu Chika', department: 'Dev team', position: 'Front end developer', employmentType: 'Full Time', salary: '550,000', status: 'On leave' },
    { sn: 4, employeeId: 'DEV/VFLA/1005/099', name: 'John Paul', department: 'Dev team', position: 'Ui/ux designer', employmentType: 'Full Time', salary: '500,000', status: 'Active' },
    { sn: 5, employeeId: 'OP/VFLA/1705/120', name: 'Victor Ben', department: 'Operations', position: 'Project manager', employmentType: 'Full Time', salary: '400,000', status: 'On leave' },
    { sn: 6, employeeId: 'TE/VFLA/1005/100', name: 'Okeke Sandra', department: 'Tech team', position: 'IT student', employmentType: 'Full Time', salary: '70,000', status: 'Active' },
    { sn: 7, employeeId: 'MA/VFLA/1005/111', name: 'Yusuf Lawal', department: 'Marketing', position: 'Graphic designer', employmentType: 'Full Time', salary: '200,000', status: 'On leave' }
  ];

  // Terminated staff data
  const terminatedStaffData = [
    { sn: 1, employeeId: 'OP/VFLA/1705/222', name: 'Samuel Ade', department: 'Tech', position: 'Frontend Dev', employmentType: 'Full Time', terminationDate: '2024-08-10', reason: 'Performance' },
    { sn: 2, employeeId: 'MA/VFLA/1705/333', name: 'Grace John', department: 'Marketing', position: 'Analyst', employmentType: 'Intern', terminationDate: '2024-07-05', reason: 'Contract Ended' },
  ];

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
      render: () => (
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-black text-xs">View</span>
          <FaChevronDown size={10} className="text-gray-500" />
        </div>
      ) 
    }
  ];

  // Columns for terminated staff
  const terminatedColumns = [
    { title: 'S/N', accessor: 'sn' },
    { title: 'Employee id', accessor: 'employeeId' },
    { title: 'Name', accessor: 'name' },
    { title: 'Department', accessor: 'department' },
    { title: 'Position', accessor: 'position' },
    { title: 'Employment type', accessor: 'employmentType' },
    { title: 'Termination Date', accessor: 'terminationDate' },
    { 
      title: 'Action', 
      accessor: 'action', 
      render: (_, row, i) => (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setExpandedRow(expandedRow === i ? null : i)}
        >
          <span className="text-black text-xs">Manage</span>
          <FaChevronDown size={10} className="text-gray-500" />
        </div>
      ) 
    },
  ];

  const handlePageChange = (page) => setCurrentPage(page);
  const handleAddStaff = () => setUploadModalOpen(true);

  // File upload logic
  const validateFile = (file) => {
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    const allowedExtensions = ['.csv', '.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    return allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension);
  };

  const handleFileUpload = (file) => {
    setFileError('');
    if (!validateFile(file)) {
      setFileError('Request contains an unknown file or unsupported file type');
      return;
    }
    setUploadedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) handleFileUpload(files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) handleFileUpload(files[0]);
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePreviewUpload = () => {
    if (uploadedFile) {
      console.log('Processing file:', uploadedFile.name);
      setUploadModalOpen(false);
      setUploadedFile(null);
      setFileError('');
    }
  };

  const closeModal = () => {
    setUploadModalOpen(false);
    setUploadedFile(null);
    setFileError('');
  };

  return (
    <Container>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-black">Manage Staff</h1>
          <Button onClick={handleAddStaff} className="flex items-center gap-2 bg-black text-white">
            <FaPlus size={14} /> Add Staff
          </Button>
        </div>

        {/* Tabs */}
        <Tabs>
          {/* Current Staff */}
          <Tab title="Current staff">
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-300">
                <Table 
                  data={staffData} 
                  columns={columns} 
                  tableStyle="border-collapse" 
                  headerStyle="bg-gray-50" 
                  cellStyle="text-black" 
                />
              </div>
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          </Tab>

          {/* Terminated Staff */}
          <Tab title="Terminated staff">
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-300">
                <Table 
                  data={terminatedStaffData} 
                  columns={terminatedColumns} 
                  tableStyle="border-collapse" 
                  headerStyle="bg-gray-50" 
                  cellStyle="text-black" 
                />

                {/* Expanded Row Content */}
                {terminatedStaffData.map((row, i) => (
                  expandedRow === i && (
                    <div key={i} className="p-6 border-t border-gray-200 bg-gray-50">
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <p><strong>Name:</strong> {row.name}</p>
                          <p><strong>Employee ID:</strong> {row.employeeId}</p>
                          <p><strong>Department:</strong> {row.department}</p>
                          <p><strong>Position:</strong> {row.position}</p>
                        </div>
                        <div>
                          <p><strong>Employment Type:</strong> {row.employmentType}</p>
                          <p><strong>Termination Date:</strong> {row.terminationDate}</p>
                          <p><strong>Reason:</strong> {row.reason}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button className="bg-red-500 text-white">Delete Staff</Button>
                        <Button className="bg-gray-300 text-black">Reinstate Staff</Button>
                      </div>
                    </div>
                  )
                ))}
              </div>
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          </Tab>
        </Tabs>

        {/* Upload Modal */}
        <Modal open={uploadModalOpen} setOpen={setUploadModalOpen}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">Upload staff data file</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 transition-colors">
                <FaTimes size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {!uploadedFile ? (
                  <>
                    <FaUpload size={24} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-black mb-2">
                      Drag and drop or <span className="font-medium">choose a file</span> to upload data
                    </p>
                    <p className="text-xs text-gray-500 mb-4">supported formats .csv, .xlsx and .xls</p>
                    <Button onClick={handleBrowseFiles} className="bg-black hover:bg-gray-800">
                      Browse Files
                    </Button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3 p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-black font-medium">{uploadedFile.name}</span>
                      <button onClick={handleRemoveFile} className="text-red-500 hover:text-red-700 transition-colors">
                        <FaTrash size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-green-600">File uploaded successfully!</p>
                  </div>
                )}
              </div>

              {fileError && <p className="text-red-500 text-sm">{fileError}</p>}

              <p className="text-xs text-gray-600">
                <strong>Note:</strong> Upload a CSV or Excel file containing staff information
              </p>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handlePreviewUpload}
                  disabled={!uploadedFile}
                  className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300"
                >
                  Preview Upload
                </Button>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept=".csv,.xlsx,.xls"
              className="hidden"
            />
          </div>
        </Modal>
      </div>
    </Container>
  );
};

export default ManageStaff;
