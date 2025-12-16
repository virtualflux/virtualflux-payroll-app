'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { FaUsers, FaWallet, FaCreditCard, FaClock } from 'react-icons/fa';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import axiosClient from '@/components/axiosClient';
import { formatCurrency } from '@/utils/formatCurrency';
import toast from 'react-hot-toast';

const Overview = () => {
  const [overviewData, setOverviewData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  });

  const monthlyOverviewData = useMemo(() => overviewData?.monthlyPayrollExpenses || [], [overviewData]);

  const formatYAxis = useCallback((value) => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    return value;
  }, []);

  const handleMonthChange = useCallback((e) => {
    setSelectedMonth(e.target.value);
  }, []);

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

  if (isLoading) return <div>Loading...</div>;
  if (errors.fetch) return <div>{errors.fetch}</div>;

  return (
    <Container>
      <div className="w-full space-y-6 text-black">
        <h1 className="text-2xl font-bold">Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
          <Card title="Total Staff" icon={FaUsers} number={overviewData?.summary?.totalStaff || 0} />
          <Card title="Wallet Balance" icon={FaWallet} number={formatCurrency(overviewData?.summary?.walletBalance?.balance || 0)} />
          <Card title="Paid This Month" icon={FaCreditCard} number={formatCurrency(overviewData?.summary?.paidThisMonth || 0)} />
          <Card title="Pending Salaries" icon={FaClock} number={formatCurrency(overviewData?.summary?.pendingSalaries || 0)} />
        </div>

        {/* <div className="w-full flex justify-end">
          <div className="w-48">
            <input
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div> */}

        <div className="w-full">
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Monthly Payroll Expenses</h2>
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyOverviewData} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#000000' }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#000000' }}
                    tickFormatter={formatYAxis}
                  />
                  <Bar dataKey="amount" fill="#000000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Overview;
