'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, DollarSign, Users, Download } from 'lucide-react';
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import Select from "@/components/ui/Select";
import Container from '@/components/ui/Container';
import axiosClient from '@/components/axiosClient';
import { formatCurrency } from '@/utils/formatCurrency';
import toast from 'react-hot-toast';

const AnalyticsDashboard = () => {
  const [overviewData, setOverviewData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState('');

  const fetchOverview = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get('/payroll/dashboard');
      setOverviewData(response?.data?.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message  || "Failed to load analytics data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const monthlyChartData = useMemo(() => {
    return overviewData?.monthlyPayrollExpenses || [];
  }, [overviewData]);

  const departmentData = useMemo(() => [
    {
      department: 'Operations',
      headCount: 300,
      totalPayroll: formatCurrency(3500000),
      averageSalary: formatCurrency(2500000),
      benefitsBonus: formatCurrency(1000000)
    },
    {
      department: 'Development',
      headCount: 150,
      totalPayroll: formatCurrency(3000000),
      averageSalary: formatCurrency(2000000),
      benefitsBonus: formatCurrency(1000000)
    },
  ], [formatCurrency]);

  const columns = [
    { title: 'Department', accessor: 'department' },
    { title: 'Head Count', accessor: 'headCount' },
    { title: 'Total Payroll', accessor: 'totalPayroll' },
    { title: 'Average Salary', accessor: 'averageSalary' },
    { title: 'Benefits/Bonus', accessor: 'benefitsBonus' }
  ];

  const formatYAxis = useCallback((value) => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    return value;
  }, []);

  if (isLoading) return <div>Loading analytics...</div>;
  if (errors) return <div>{errors}</div>;

  return (
    <Container>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-black mb-8">Analytics</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card 
              title="Average Monthly Payroll" 
              icon={DollarSign} 
              number={formatCurrency(overviewData?.financialSummary?.totalPayroll)} 
            />
            <Card 
              title="Overtime Rate" 
              icon={Clock} 
              number={`${overviewData?.financialSummary?.overtimeRate?.toFixed(1) || 0}%`}
            />
            <Card 
              title="Average Salary" 
              icon={TrendingUp} 
              number={formatCurrency(overviewData?.financialSummary?.averageSalary)} 
            />
            <Card 
              title="Total Staff" 
              icon={Users} 
              number={overviewData?.summary?.totalStaff || 0} 
            />
          </div>

          <div className='flex items-center gap-4 mb-4'>
            <Button className="flex items-center gap-2 text-sm">
              <Download size={16} />
              Export
            </Button>
            <Select className="w-40" defaultValue="last30days">
              <option value="last30days">Last 30 days</option>
              <option value="last60days">Last 60 days</option>
              <option value="last90days">Last 90 days</option>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-gray-300 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-6 text-center">Payroll by Department</h2>
              <Table data={departmentData} columns={columns} />
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-black mb-6">Monthly Payroll Expenses</h3>
              <div className="h-80 flex items-center justify-center">
                {monthlyChartData?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#666' }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#666' }}
                        tickFormatter={formatYAxis}
                      />
                      <Bar dataKey="amount" radius={[4, 4, 0, 0]} maxBarSize={60} fill="#000000" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-gray-500 text-center">
                    <p className="text-lg">No payroll data available for this month.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-6">Workforce Analytics</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Employees</span>
                <span className="text-xl font-semibold text-black">{overviewData?.workforceAnalytics?.totalEmployees || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">New Hires</span>
                <span className="text-xl font-semibold text-black">{overviewData?.workforceAnalytics?.newHires || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Turnover</span>
                <span className="text-xl font-semibold text-black">{overviewData?.workforceAnalytics?.turnover || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AnalyticsDashboard;
