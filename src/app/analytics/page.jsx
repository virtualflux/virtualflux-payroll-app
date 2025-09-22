"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, DollarSign, Users, Download } from 'lucide-react';
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import Select from "@/components/ui/Select";
import Container from '@/components/ui/Container';

const AnalyticsDashboard = () => {
  // Sample data matching your design
  const departmentData = [
    {
      department: 'Operations',
      headCount: 300,
      totalPayroll: '₦3,500,000',
      averageSalary: '₦2,500,000',
      benefitsBonus: '₦1,000,000'
    },
    {
      department: 'Development',
      headCount: 150,
      totalPayroll: '₦3,000,000',
      averageSalary: '₦2,000,000',
      benefitsBonus: '₦1,000,000'
    },
    {
      department: 'Design',
      headCount: 150,
      totalPayroll: '₦2,500,000',
      averageSalary: '₦1,500,000',
      benefitsBonus: '₦1,000,000'
    },
    {
      department: 'Marketing',
      headCount: 200,
      totalPayroll: '₦3,000,000',
      averageSalary: '₦2,000,000',
      benefitsBonus: '₦1,000,000'
    },
    {
      department: 'Sales',
      headCount: 150,
      totalPayroll: '₦2,000,000',
      averageSalary: '₦1,000,000',
      benefitsBonus: '₦1,000,000'
    },
    {
      department: 'Human Resources',
      headCount: 50,
      totalPayroll: '₦1,500,000',
      averageSalary: '₦1,000,000',
      benefitsBonus: '₦500,000'
    }
  ];

  const chartData = [
    { month: 'Jan', amount: 1200000 },
    { month: 'Feb', amount: 1600000 },
    { month: 'Mar', amount: 1000000 },
    { month: 'Apr', amount: 1800000 },
    { month: 'May', amount: 2200000 }
  ];

  const columns = [
    { title: 'Department', accessor: 'department' },
    { title: 'Head Count', accessor: 'headCount' },
    { title: 'Total Payroll', accessor: 'totalPayroll' },
    { title: 'Average Salary', accessor: 'averageSalary' },
    { title: 'Benefits/Bonus', accessor: 'benefitsBonus' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(value);
  };

  const CustomBar = (props) => {
    const colors = ['#FFC107', '#2196F3', '#000000', '#4CAF50', '#F44336'];
    const { index } = props;
    return <Bar {...props} fill={colors[index % colors.length]} />;
  };

  return (
    <Container> 
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Analytics</h1>
        </div>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            title="Average Monthly Payroll" 
            icon={DollarSign} 
            number="₦15,500,000" 
          />
          <Card 
            title="Overtime Rate" 
            icon={Clock} 
            number="4.8%" 
          />
          <Card 
            title="Average Salary" 
            icon={TrendingUp} 
            number="₦10,000,000" 
          />
          <Card 
            title="Total Staff" 
            icon={Users} 
            number="1000" 
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payroll by Department Table */}
          <div className="lg:col-span-2 bg-white border border-gray-300 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-black text-center">Payroll by Department</h2>
              <div className="flex items-center gap-4">
                {/* <Button className="flex items-center gap-2 text-sm">
                  <Download size={16} />
                  Export
                </Button>
                <Select className="w-40" defaultValue="last30days">
                  <option value="last30days">Last 30 days</option>
                  <option value="last60days">Last 60 days</option>
                  <option value="last90days">Last 90 days</option>
                </Select> */}
              </div>
            </div>
            <Table 
              data={departmentData} 
              columns={columns}
            />
          </div>

          {/* Monthly Payroll Expenses Chart */}
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-6">Monthly Payroll Expenses</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    tickFormatter={(value) => `${value / 1000000}M`}
                  />
                  <Bar 
                    dataKey="amount" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={60}
                  >
                    {chartData.map((entry, index) => {
                      const colors = ['#FFC107', '#2196F3', '#000000', '#4CAF50', '#F44336'];
                      return (
                        <Bar 
                          key={`bar-${index}`} 
                          fill={colors[index % colors.length]} 
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Workforce Analytics */}
        <div className="mt-8">
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-6">Workforce Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Employee</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold text-black">1,000</span>
                  <span className="text-sm text-green-500 flex items-center">
                    <TrendingUp size={16} className="mr-1" />
                    8.4%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">New Hires</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold text-black">50</span>
                  <span className="text-sm text-green-500 flex items-center">
                    <TrendingUp size={16} className="mr-1" />
                    60%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Turnover</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold text-black">10</span>
                  <span className="text-sm text-red-500 flex items-center">
                    <TrendingUp size={16} className="mr-1 rotate-180" />
                    70%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default AnalyticsDashboard;