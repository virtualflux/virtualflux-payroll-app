'use client'
import React, { useState, useMemo } from 'react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiChevronDown, FiCreditCard } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import SearchInput from '@/components/ui/SearchInput';
import Pagination from '@/components/ui/Pagination';
import Container from '@/components/ui/Container';

// Transaction History Page Component
const TransactionHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data  
  const transactionData = [
    {
      id: '#TX-984573',
      date: 'Oct,15,2023',
      time: '10:30am',
      type: 'Income',
      description: 'Wallet funding',
      amount: '₦ 5,000,000',
      status: 'Successful'
    },
    {
      id: '#TX-984586',
      date: 'June,28,2024',
      time: '09:30am',
      type: 'Expense',
      description: 'Salary payment',
      amount: '₦ 500,000',
      status: 'Successful'
    },
    {
      id: '#TX-984471',
      date: 'June,28,2024',
      time: '09:30am',
      type: 'Expense',
      description: 'Salary payment',
      amount: '₦ 600,000',
      status: 'Successful'
    },
    {
      id: '#TX-984466',
      date: 'June,28,2024',
      time: '09:30am',
      type: 'Expense',
      description: 'Salary payment',
      amount: '₦ 70,000',
      status: 'Successful'
    },
    {
      id: '#TX-984471',
      date: 'Jan,15,2025',
      time: '11:30am',
      type: 'Income',
      description: 'Wallet funding',
      amount: '₦ 10,000,000',
      status: 'Successful'
    }
  ];

  // ✅ Filter transactions based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return transactionData;
    return transactionData.filter((item) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, transactionData]);

  const columns = [
    { title: 'S/N', accessor: 'sn', render: (value, row, index) => index + 1 },
    { 
      title: 'Date & Time', 
      accessor: 'date',
      render: (value, row) => (
        <div>
          <div className="font-medium">{row.date}</div>
          <div className="text-gray-500">{row.time}</div>
        </div>
      )
    },
    { title: 'Transaction ID', accessor: 'id' },
    { 
      title: 'Type', 
      accessor: 'type',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs ${
          value === 'Income' ? 'text-green-600' : 'text-red-600'
        }`}>
          {value}
        </span>
      )
    },
    { title: 'Description', accessor: 'description' },
    { title: 'Amount', accessor: 'amount' },
    { 
      title: 'Status', 
      accessor: 'status',
      render: (value) => (
        <span className="text-green-600 text-xs">{value}</span>
      )
    },
    { 
      title: 'Action', 
      accessor: 'action',
      render: () => (
        <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-black">
          <span>View</span>
          <FiChevronDown size={14} />
        </button>
      )
    }
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container> 
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black">Transaction History</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card 
            title="Total Transactions" 
            icon={FiDollarSign}
            number="142"
          />
          <Card 
            title="Total Income" 
            icon={FiTrendingUp}
            number="₦ 30,000,000"
          />
          <Card 
            title="Total Expenses" 
            icon={FiTrendingDown}
            number="₦ 10,000,000"
          />
          <Card 
            title="Wallet Balance" 
            icon={FiCreditCard}
            number="₦ 20,000,000"
          />
        </div>

        {/* Search and Filters (aligned right) */}
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-6 text-black">
          <SearchInput 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-3">
            <Button className="bg-black text-white border border-gray-300 hover:bg-gray-600 flex items-center gap-2">
              Filter
              <FiChevronDown size={16} />
            </Button>
            <Button className="bg-black text-white border border-gray-300 hover:bg-gray-600 flex items-center gap-2">
              Sort by
              <FiChevronDown size={16} />
            </Button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <Table 
            data={filteredData}
            columns={columns}
          />
        </div>

        {/* Pagination */}
        <Pagination 
          totalPages={10}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </Container>
  );
};

export default TransactionHistoryPage;
