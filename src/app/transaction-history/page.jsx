'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiChevronDown, FiCreditCard } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import SearchInput from '@/components/ui/SearchInput';
import Pagination from '@/components/ui/Pagination';
import Container from '@/components/ui/Container';
import axiosClient from '@/components/axiosClient';
import { formatCurrency } from '@/utils/formatCurrency';
import toast from 'react-hot-toast';

const TransactionHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [overviewData, setOverviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  const [walletBalance, setWalletBalance] = useState(null)

  const fetchOverview = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(`/payroll/payroll/transaction-history?page=${page}&limit=${pageSize}`);
      const walletResponse = await axiosClient.get(`/payroll/wallet`);
      setWalletBalance(formatCurrency(walletResponse.data.data?.balance))
      const results = response.data.data?.results || [];
      const pageInfo = response.data.data?.pageInfo || {};
      const mappedData = results.map((tx) => {
        const dateObj = new Date(tx.createdAt);
        const status =
          tx.status === 'success'
            ? 'Successful'
            : tx.status === 'failed'
            ? 'Failed'
            : tx.status;

        return {
          id: tx.id,
          date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
          transactionType: tx.transactionType === 'TOPUP' ? 'Income' : 'Expense',
          description: tx.companyUserCode ? `Payroll for ${tx.companyUserCode}` : 'Wallet funding',
          total: tx.total,
          amount: formatCurrency(tx.total / 100 || 0),
          status,
        };
      });
      setOverviewData(mappedData);
      setCurrentPage(pageInfo.page || 1);
      setTotalPages(pageInfo.pages || 1);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message  || "Failed to load transactions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview(currentPage);
  }, [currentPage]);

  const totalIncome = overviewData
  .filter(tx => tx.transactionType === 'Income' && tx.status === 'Successful')
  .reduce((sum, tx) => sum + (tx.total || 0), 0);

  const totalExpenses = overviewData
    .filter(tx => tx.transactionType === 'Expense' && tx.status === 'Successful')
    .reduce((sum, tx) => sum + (tx.total || 0), 0);

  const formattedIncome = formatCurrency(totalIncome / 100);
  const formattedExpenses = formatCurrency(totalExpenses / 100);

  const filteredData = useMemo(() => {
    let data = [...overviewData];

    if (searchTerm) {
      data = data.filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'All') {
      data = data.filter((item) => item.type === filterType);
    }

    if (sortBy === 'Amount') {
      data.sort((a, b) => {
        const amountA = parseInt(a.amount.replace(/[₦, ]/g, ''), 10);
        const amountB = parseInt(b.amount.replace(/[₦, ]/g, ''), 10);
        return amountB - amountA;
      });
    } else if (sortBy === 'Date') {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return data;
  }, [searchTerm, filterType, sortBy, overviewData]);

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
      accessor: 'transactionType',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs ${value === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
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
    if (page >= 1 && page <= totalPages) {
      fetchOverview(page);
    }
  };

  return (
    <Container> 
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black">Transaction History</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card title="Total Transactions" icon={FiDollarSign} number={overviewData.length} />
          <Card title="Total Income" icon={FiTrendingUp} number={formattedIncome} />
          <Card title="Total Expenses" icon={FiTrendingDown} number={formattedExpenses} />
          <Card title="Wallet Balance" icon={FiCreditCard} number={walletBalance} />
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-6 text-black relative">
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <div className="flex gap-3 relative">
            <div className="relative">
              <Button className="bg-black text-white border border-gray-300 hover:bg-gray-600 flex items-center gap-2" onClick={() => setShowFilter(!showFilter)}>
                Filter <FiChevronDown size={16} />
              </Button>
              {showFilter && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {['All', 'Income', 'Expense'].map((type) => (
                    <div key={type} onClick={() => { setFilterType(type); setShowFilter(false); }} className="px-4 py-2 cursor-pointer hover:bg-gray-100">{type}</div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <Button className="bg-black text-white border border-gray-300 hover:bg-gray-600 flex items-center gap-2" onClick={() => setShowSort(!showSort)}>
                Sort by <FiChevronDown size={16} />
              </Button>
              {showSort && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {['Date', 'Amount'].map((sort) => (
                    <div key={sort} onClick={() => { setSortBy(sort); setShowSort(false); }} className="px-4 py-2 cursor-pointer hover:bg-gray-100">{sort}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <Table data={filteredData} columns={columns} isLoading={isLoading} emptyMessage="No transactions found" />
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </Container>
  );
};

export default TransactionHistoryPage;
