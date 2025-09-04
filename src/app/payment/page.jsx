'use client'

import React, { useState } from 'react';
import { FaSync, FaWallet, FaCreditCard, FaCalendar, FaChevronDown, FaTimes, FaCheck } from 'react-icons/fa';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SearchInput from '@/components/ui/SearchInput';
import Select from '@/components/ui/Select';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import Modal from '@/components/ui/Modal';

const Payment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [paymentData, setPaymentData] = useState([
    { id: 1, employeeId: 'OP/VFLA/1705/099', name: 'Ayobami Joy', department: 'Operation', position: 'Head of department', salary: '650,000', status: 'Active', paymentStatus: 'Paid', date: '' },
    { id: 2, employeeId: 'OP/VFLA/1705/099', name: 'Bethel Esther', department: 'Tech', position: 'Intern', salary: '70,000', status: 'Active', paymentStatus: 'Paid', date: '' },
    { id: 3, employeeId: 'OP/VFLA/1705/099', name: 'Ohagbu Chika', department: 'Dev team', position: 'Front end developer', salary: '550,000', status: 'On leave', paymentStatus: 'Paid', date: '' },
    { id: 4, employeeId: 'OP/VFLA/1705/099', name: 'John Paul', department: 'Dev team', position: 'Ui/ux designer', salary: '500,000', status: 'Active', paymentStatus: 'Paid', date: '' },
    { id: 5, employeeId: 'OP/VFLA/1705/099', name: 'Victor Ben', department: 'Operation', position: 'Project manager', salary: '400,000', status: 'Active', paymentStatus: 'Unpaid', date: '' },
    { id: 6, employeeId: 'OP/VFLA/1705/099', name: 'Okek Sandra', department: 'Tech team', position: 'IT student', salary: '70,000', status: 'On leave', paymentStatus: 'Unpaid', date: '' },
    { id: 7, employeeId: 'OP/VFLA/1705/099', name: 'Yusuf Lawal', department: 'Marketing', position: 'Graphic designer', salary: '200,000', status: 'On leave', paymentStatus: 'Unpaid', date: '' },
    { id: 8, employeeId: 'OP/VFLA/1705/099', name: 'hamaza jeilli', department: 'Dev', position: 'Ui/ux designer', salary: '250,000', status: 'Active', paymentStatus: 'Unpaid', date: '' },
    { id: 9, employeeId: 'OP/VFLA/1705/099', name: 'Obi Paul', department: 'Marketing', position: 'Graphic designer', salary: '250,000', status: 'Active', paymentStatus: 'Unpaid', date: '' }
  ]);

  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const totalPages = 10;

  // Handle checkbox selection
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmployees(paymentData.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (employeeId, checked) => {
    if (checked) {
      setSelectedEmployees(prev => [...prev, employeeId]);
    } else {
      setSelectedEmployees(prev => prev.filter(id => id !== employeeId));
    }
  };

  const isAllSelected = selectedEmployees.length === paymentData.length;
  const isPayButtonEnabled = selectedEmployees.length > 0;

  // Table columns configuration
  const columns = [
    {
      title: (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Select all</span>
        </div>
      ),
      accessor: 'select',
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selectedEmployees.includes(row.id)}
          onChange={(e) => handleSelectEmployee(row.id, e.target.checked)}
          className="w-4 h-4"
        />
      )
    },
    { title: 'Employee ID', accessor: 'employeeId' },
    { title: 'Name', accessor: 'name' },
    { title: 'Department', accessor: 'department' },
    { title: 'Position', accessor: 'position' },
    { title: 'Salary', accessor: 'salary', render: (value) => `₦${value}` },
    {
      title: 'Status',
      accessor: 'status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {value}
        </span>
      )
    },
    {
      title: 'Payment status',
      accessor: 'paymentStatus',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {value}
        </span>
      )
    },
    {
      title: 'Date',
      accessor: 'date',
      render: (_, row) => (
        <div className="w-36">
          <input
            type="date"
            value={row.date}
            onChange={(e) => {
              const newDate = e.target.value;
              setPaymentData(prev =>
                prev.map(emp =>
                  emp.id === row.id ? { ...emp, date: newDate } : emp
                )
              );
            }}
            className="border border-gray-300 rounded px-2 py-1 text-xs w-full"
          />
        </div>
      )
    }
  ];

  // Helpers
  const getSelectedEmployeesData = () => {
    return paymentData.filter(emp => selectedEmployees.includes(emp.id));
  };

  const calculateTotalAmount = () => {
    return getSelectedEmployeesData().reduce((sum, emp) => {
      const salary = parseInt(emp.salary.replace(/,/g, ''), 10) || 0;
      return sum + salary;
    }, 0);
  };

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Actions
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRefresh = () => {
    console.log('Refreshing payment data...');
  };

  const handlePay = () => {
    if (selectedEmployees.length > 0) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmPayment = () => {
    const selectedData = getSelectedEmployeesData();
    const amount = selectedData.reduce((sum, emp) => {
      const salary = parseInt(emp.salary.replace(/,/g, ''), 10) || 0;
      return sum + salary;
    }, 0);

    // Update metrics
    setTotalTransactions(prev => prev + selectedData.length);
    setTotalPayment(prev => prev + amount);

    // Mark employees as Paid
    const updatedData = paymentData.map(emp =>
      selectedEmployees.includes(emp.id) ? { ...emp, paymentStatus: 'Paid' } : emp
    );
    setPaymentData(updatedData);

    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setSelectedEmployees([]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  // --- SEARCH + FILTER ---
  const filteredData = paymentData.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (filterValue === 'paid') {
      matchesFilter = emp.paymentStatus.toLowerCase() === 'paid';
    } else if (filterValue === 'unpaid') {
      matchesFilter = emp.paymentStatus.toLowerCase() === 'unpaid';
    } else if (filterValue === 'active') {
      matchesFilter = emp.status.toLowerCase() === 'active';
    } else if (filterValue === 'on-leave') {
      matchesFilter = emp.status.toLowerCase() === 'on leave';
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <Container>
      <div className="w-full space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-black">Payment</h1>
          <Button onClick={handleRefresh} className="flex items-center gap-2 bg-black hover:bg-gray-800">
            <FaSync size={14} />
            Refresh
          </Button>
        </div>

        {/* Balance + Metrics Card */}
        <div className="max-w-md">
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-400">Current Balance</h3>
              <Button 
                onClick={handlePay} 
                disabled={!isPayButtonEnabled}
                className={`px-6 py-2 text-sm ${
                  isPayButtonEnabled 
                    ? 'bg-black hover:bg-gray-800 text-white' 
                    : 'bg-gray-300 cursor-not-allowed text-gray-600'
                }`}
              >
                Pay
              </Button>
            </div>

            <h1 className="text-xl font-bold text-black mb-6">₦20,000,000</h1>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-black">₦{formatAmount(totalPayment)}</p>
                <p className="text-gray-500">Total payment</p>
              </div>
              <div>
                <p className="font-semibold text-black">{totalTransactions}</p>
                <p className="text-gray-500">Total transactions</p>
              </div>
              <div>
                <p className="font-semibold text-black">July 2025</p>
                <p className="text-gray-500">Month paid</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <SearchInput
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search"
            />
            <div className="flex items-center gap-2">
              <Select
                value={filterValue}
                onChange={handleFilterChange}
                placeholder="Filter"
                className="w-32"
              >
                <option value="all">All</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg border border-gray-300">
          <Table
            data={filteredData}
            columns={columns}
            tableStyle="border-collapse"
            headerStyle="bg-gray-50"
            cellStyle="text-black"
          />
        </div>

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        {/* Confirm Payment Modal */}
        <Modal open={showConfirmModal} setOpen={setShowConfirmModal}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">Confirm Salary Payment</h2>
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-gray-600">
                You are about to process salary payment for the following staff members:
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Payment month:</span>
                <span className="font-medium text-black">July 2025</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-black">Staff Members:</h3>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {getSelectedEmployeesData().map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between text-sm py-1">
                      <span className="text-gray-700">{employee.name}</span>
                      <span className="font-medium text-black">₦{employee.salary}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="font-medium text-black">Total Amount</span>
                <span className="font-bold text-lg text-black">₦{formatAmount(calculateTotalAmount())}</span>
              </div>
            </div>

            <Button 
              onClick={handleConfirmPayment}
              className="w-full bg-black hover:bg-gray-800"
            >
              Confirm Payment
            </Button>
          </div>
        </Modal>

        {/* Success Modal */}
        <Modal open={showSuccessModal} setOpen={setShowSuccessModal}>
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheck size={24} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold text-black mb-2">
              Salary payment processed successfully
            </h2>
            <p className="text-sm text-gray-600 mb-12">
              Payment for July 2025 salaries has been completed. Total amount of ₦{formatAmount(calculateTotalAmount())} has been processed.
            </p>
            <Button 
              onClick={handleSuccessModalClose}
              className="w-full bg-black hover:bg-gray-800"
            >
              Done
            </Button>
          </div>
        </Modal>
      </div>
    </Container>
  );
};

export default Payment;
