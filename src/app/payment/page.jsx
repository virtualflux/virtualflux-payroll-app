'use client'

import React, { useState, useEffect } from 'react';
import { FaSync, FaWallet, FaUsers, FaCalendar, FaChevronDown, FaTimes, FaCheck } from 'react-icons/fa';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SearchInput from '@/components/ui/SearchInput';
import Select from '@/components/ui/Select';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import Modal from '@/components/ui/Modal';
import axiosClient from '@/components/axiosClient';
import { formatCurrency } from '@/utils/formatCurrency';
import toast from 'react-hot-toast';

const Payment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('11,sept 2025');
  const [showPaymentSelectionModal, setShowPaymentSelectionModal] = useState(false);
  const [showPaymentProcessModal, setShowPaymentProcessModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const [overviewData, setOverviewData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  // New state for year and month selection
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonthDropdown, setSelectedMonthDropdown] = useState('');

  const [paymentData, setPaymentData] = useState([
    { 
      id: 1, 
      name: 'Ayobami Joy', 
      department: 'Operation', 
      basicSalary: 550000,
      allowances: 100000,
      deductions: 0,
      netSalary: 650000,
      status: 'Active', 
      paymentStatus: 'Paid' 
    },
    { 
      id: 2, 
      name: 'Bethel Esther', 
      department: 'Tech', 
      basicSalary: 65000,
      allowances: 5000,
      deductions: 0,
      netSalary: 70000,
      status: 'Active', 
      paymentStatus: 'Paid' 
    },
    { 
      id: 3, 
      name: 'Ohagbu Chika', 
      department: 'Dev team', 
      basicSalary: 500000,
      allowances: 50000,
      deductions: 0,
      netSalary: 550000,
      status: 'On leave', 
      paymentStatus: 'Paid' 
    },
    { 
      id: 4, 
      name: 'John Paul', 
      department: 'Dev team', 
      basicSalary: 450000,
      allowances: 50000,
      deductions: 0,
      netSalary: 500000,
      status: 'Active', 
      paymentStatus: 'Paid' 
    },
    { 
      id: 5, 
      name: 'Victor Ben', 
      department: 'Operation', 
      basicSalary: 350000,
      allowances: 50000,
      deductions: 0,
      netSalary: 400000,
      status: 'Active', 
      paymentStatus: 'Unpaid' 
    },
    { 
      id: 6, 
      name: 'Okek Sandra', 
      department: 'Tech team', 
      basicSalary: 65000,
      allowances: 5000,
      deductions: 0,
      netSalary: 70000,
      status: 'On leave', 
      paymentStatus: 'Unpaid' 
    },
    { 
      id: 7, 
      name: 'Yusuf Lawal', 
      department: 'Marketing', 
      basicSalary: 150000,
      allowances: 50000,
      deductions: 0,
      netSalary: 200000,
      status: 'On leave', 
      paymentStatus: 'Unpaid' 
    },
    { 
      id: 8, 
      name: 'hamaza jeilli', 
      department: 'Dev', 
      basicSalary: 200000,
      allowances: 50000,
      deductions: 0,
      netSalary: 250000,
      status: 'Active', 
      paymentStatus: 'Unpaid' 
    },
    { 
      id: 9, 
      name: 'Obi Paul', 
      department: 'Marketing', 
      basicSalary: 200000,
      allowances: 50000,
      deductions: 0,
      netSalary: 250000,
      status: 'Active', 
      paymentStatus: 'Unpaid' 
    }
  ]);

  const fetchOverview = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get('/payroll/dashboard');
      setOverviewData(response.data.data);
    } catch (error) {
      toast.error(error?.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const totalPages = 10;
  const itemsPerPage = 10;

  // Calculate metrics
  const totalPayment = totalPaidAmount;
  
  const totalStaff = paymentData.length;
  const paidStaff = paymentData.filter(emp => emp.paymentStatus === 'Paid').length;
  const unpaidStaff = totalStaff - paidStaff;

  // Generate years array (current year and 5 years back)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  // Months array
  const months = [
    { value: 'january', label: 'January' },
    { value: 'february', label: 'February' },
    { value: 'march', label: 'March' },
    { value: 'april', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'june', label: 'June' },
    { value: 'july', label: 'July' },
    { value: 'august', label: 'August' },
    { value: 'september', label: 'September' },
    { value: 'october', label: 'October' },
    { value: 'november', label: 'November' },
    { value: 'december', label: 'December' }
  ];

  // Handle checkbox selection
  const handleSelectEmployee = (employeeId, checked) => {
    if (checked) {
      setSelectedEmployees(prev => [...prev, employeeId]);
    } else {
      setSelectedEmployees(prev => prev.filter(id => id !== employeeId));
    }
  };

  const isPayButtonEnabled = selectedEmployees.length > 0;

  // Table columns configuration
  const columns = [
    {
      title: (
        <input
          type="checkbox"
          className="w-4 h-4"
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedEmployees(paymentData.map(emp => emp.id));
            } else {
              setSelectedEmployees([]);
            }
          }}
        />
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
    { title: 'Name', accessor: 'name' },
    { title: 'Department', accessor: 'department' },
    { 
      title: 'Basic Salary', 
      accessor: 'basicSalary',
      render: (value) => formatCurrency(value)
    },
    { 
      title: 'Allowances', 
      accessor: 'allowances',
      render: (value) => formatCurrency(value)
    },
    { 
      title: 'Deductions', 
      accessor: 'deductions',
      render: (value) => formatCurrency(value)
    },
    { 
      title: 'Net Salary', 
      accessor: 'netSalary',
      render: (value) => formatCurrency(value)
    },
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
    }
  ];

  // Actions
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRefresh = () => {
    console.log('Refreshing payment data...');
  };

  const handlePay = () => {
    if (selectedEmployees.length > 0) {
      setShowPaymentSelectionModal(true);
    }
  };

  const getSelectedEmployeesData = () => {
    return paymentData.filter(emp => selectedEmployees.includes(emp.id));
  };

  const calculateTotalAmount = () => {
    return getSelectedEmployeesData().reduce((sum, emp) => {
      return sum + emp.netSalary;
    }, 0);
  };

  // Calculate totals for selected employees
  const calculateTotals = () => {
    const selectedData = getSelectedEmployeesData();
    return {
      basicSalary: selectedData.reduce((sum, emp) => sum + emp.basicSalary, 0),
      totalAllowance: selectedData.reduce((sum, emp) => sum + emp.allowances, 0),
      totalDeduction: selectedData.reduce((sum, emp) => sum + emp.deductions, 0),
      netSalary: selectedData.reduce((sum, emp) => sum + emp.netSalary, 0),
    };
  };

  // Handle continue from payment selection modal
  const handleContinueToPaymentProcess = () => {
    if (!selectedYear || !selectedMonthDropdown) {
      alert('Please select both year and month');
      return;
    }
    
    // Format the selected month for display
    const monthLabel = months.find(m => m.value === selectedMonthDropdown)?.label;
    setSelectedMonth(`${monthLabel} ${selectedYear}`);
    
    setShowPaymentSelectionModal(false);
    setShowPaymentProcessModal(true);
  };

  const handleProcessPayment = () => {
    const selectedData = getSelectedEmployeesData();
    const amount = calculateTotalAmount();

    // Update metrics
    setTotalTransactions(prev => prev + selectedData.length);
    setTotalPaidAmount(prev => prev + amount);

    // Mark employees as Paid
    const updatedData = paymentData.map(emp =>
      selectedEmployees.includes(emp.id) ? { ...emp, paymentStatus: 'Paid' } : emp
    );
    setPaymentData(updatedData);

    setShowPaymentProcessModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setSelectedEmployees([]);
    setSelectedYear('');
    setSelectedMonthDropdown('');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Filter data based on search and filter
  const filteredData = paymentData.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase());

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
          <Button onClick={handleRefresh} className="flex items-center gap-2">
            <FaSync size={14} />
            Refresh
          </Button>
        </div>

        {/* Balance Section and Metrics Cards */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Balance Section */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 lg:w-1/3">
            <h3 className="text-sm text-gray-400 mb-2">Current Balance</h3>
            <h1 className="text-3xl font-bold text-black mb-6">₦20,000,000</h1>
            
            <Button 
              onClick={handlePay} 
              disabled={!isPayButtonEnabled}
              className={`w-full ${
                isPayButtonEnabled 
                  ? 'bg-black hover:bg-gray-800 text-white' 
                  : 'bg-gray-300 cursor-not-allowed text-gray-600'
              }`}
            >
              Pay
            </Button>
          </div>

          {/* Metrics Cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Total Payment Card */}
            <div className="bg-white rounded-lg p-3 space-y-1">
              <h3 className="text-gray-500 text-sm">Total payment</h3>
              <h2 className="text-black text-xl font-semibold">{formatCurrency(totalPayment)}</h2>
            </div>

            {/* Total Staff Card */}
            <div className="bg-white rounded-lg p-3 space-y-1">
              <h3 className="text-gray-500 text-sm">Total staff</h3>
              <h2 className="text-black text-xl font-semibold">{totalStaff.toLocaleString()}</h2>
              <div className="flex items-center gap-3">
                <span className="text-green-600 text-xs font-medium">{paidStaff} Paid</span>
                <span className="text-red-600 text-xs font-medium">→ {unpaidStaff} Unpaid</span>
              </div>
            </div>

            {/* Last Transactions Card */}
            <div className="bg-white rounded-lg p-3 space-y-1">
              <h3 className="text-gray-500 text-sm">Last transactions</h3>
              <h2 className="text-black text-xl font-semibold">28,august 2025</h2>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <SearchInput
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search"
            />
            <span className="text-sm text-gray-600">
              Selected: {selectedEmployees.length} of {filteredData.length}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Filter Select */}
            <Select
              value={filterValue}
              onChange={handleFilterChange}
              placeholder="Filter"
              className="w-32"
            >
              <option value="">All</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
            </Select>

            {/* Month Picker */}
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-40 border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
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

        {/* Payment Selection Modal (NEW) */}
        <Modal open={showPaymentSelectionModal} setOpen={setShowPaymentSelectionModal}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black">Payment</h2>
              <button 
                onClick={() => setShowPaymentSelectionModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Select the month and year to continue payment processing.
            </p>

            <div className="space-y-4 mb-6">
              {/* Year Select */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Year</label>
                <Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  placeholder="Select year"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Month Select */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Month</label>
                <Select
                  value={selectedMonthDropdown}
                  onChange={(e) => setSelectedMonthDropdown(e.target.value)}
                  placeholder="Select month"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleContinueToPaymentProcess}
              className="w-full bg-black hover:bg-gray-800"
            >
              Process Payment
            </Button>
          </div>
        </Modal>

        {/* Payment Process Modal */}
        <Modal open={showPaymentProcessModal} setOpen={setShowPaymentProcessModal}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">Payment Summary for {selectedMonth}</h2>
              <button 
                onClick={() => setShowPaymentProcessModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-gray-600">
                You are about to process payment {selectedEmployees.length} staff members
              </p>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-black">Salary Breakdown</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Basic Salary:</span>
                    <span className="font-medium text-black">{formatCurrency(calculateTotals().basicSalary)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Allowance:</span>
                    <span className="font-medium text-black">{formatCurrency(calculateTotals().totalAllowance)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Deduction:</span>
                    <span className="font-medium text-black">{formatCurrency(calculateTotals().totalDeduction)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="font-medium text-black">Net Salary (Take-home pay):</span>
                    <span className="font-bold text-lg text-black">{formatCurrency(calculateTotals().netSalary)}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleProcessPayment}
              className="w-full bg-black hover:bg-gray-800"
            >
              Process Payment
            </Button>
          </div>
        </Modal>

        {/* Success Modal */}
        <Modal open={showSuccessModal} setOpen={setShowSuccessModal}>
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck size={24} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold text-black mb-4">
              Salary payment processed successfully
            </h2>
            <div className="text-sm text-gray-400 mb-6 space-y-1">
              <p>Payment for {selectedEmployees.length} staff members has been processed for</p>
              <p>{selectedMonth}</p>
            </div>
            <div className="text-sm mb-8 space-y-1">
              <p className="text-gray-500">
                Total amount disbursed: <span className="font-semibold text-black">{formatCurrency(calculateTotalAmount())}</span>
              </p>
              <p className="text-gray-400">Payment date: {selectedMonth}</p>
            </div>
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