// 'use client'

// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
// import { FaUsers, FaWallet, FaCreditCard, FaClock } from 'react-icons/fa';
// import Card from '@/components/ui/Card';
// import Select from '@/components/ui/Select';
// import Container from '@/components/ui/Container';

// const Overview = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState('30days');

//   // Chart data
//   const chartData = [
//     { month: 'Jan', amount: 1200000 },
//     { month: 'Feb', amount: 1400000 },
//     { month: 'Mar', amount: 900000 },
//     { month: 'Apr', amount: 1700000 },
//     { month: 'May', amount: 2000000 }
//   ];

//   const handlePeriodChange = (e) => {
//     setSelectedPeriod(e.target.value);
//   };

//   return (
//     <Container>
//       <div className="w-full space-y-6 text-black">
        
//         {/* Page Header */}
//         <h1 className="text-2xl font-bold">Overview</h1>

//         {/* Metrics Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
//           <Card
//             title="Total Staff"
//             icon={FaUsers}
//             number="30"
//           />
//           <Card
//             title="Wallet Balance"
//             icon={FaWallet}
//             number="₦20,000,000"
//           />
//           <Card
//             title="Paid This Month"
//             icon={FaCreditCard}
//             number="₦5,000,000"
//           />
//           <Card
//             title="Pending Salaries"
//             icon={FaClock}
//             number="₦500,000"
//           />
//         </div>

//         {/* Dropdown Filter under metrics */}
//         <div className="w-full flex justify-end">
//           <div className="w-48">
//             <Select
//               value={selectedPeriod}
//               onChange={handlePeriodChange}
//               placeholder="Select period"
//             >
//               <option value="7days">Last 7 days</option>
//               <option value="30days">Last 30 days</option>
//               <option value="90days">Last 90 days</option>
//               <option value="1year">Last 1 year</option>
//             </Select>
//           </div>
//         </div>

//         {/* Chart Section */}
//         <div className="w-full">
//           <div className="bg-white border border-gray-300 rounded-lg p-6">
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold">Monthly Payroll Expenses</h2>
//             </div>
            
//             <div className="w-full h-96">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
//                   <XAxis 
//                     dataKey="month" 
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fontSize: 12, fill: '#000000' }}
//                   />
//                   <YAxis
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fontSize: 12, fill: '#000000' }}
//                     tickFormatter={(value) => {
//                       if (value >= 1000000) {
//                         return `${(value / 1000000).toFixed(1)}M`;
//                       }
//                       if (value >= 1000) {
//                         return `${(value / 1000).toFixed(0)}K`;
//                       }
//                       return value;
//                     }}
//                     domain={[0, 2200000]}
//                     ticks={[0, 550000, 1100000, 1750000, 2200000]}
//                   />
//                   <Bar 
//                     dataKey="amount" 
//                     fill="#000000"
//                     radius={[4, 4, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Overview;
 

'use client'

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { FaUsers, FaWallet, FaCreditCard, FaClock } from 'react-icons/fa';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';

const Overview = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  });

  // Chart data
  const chartData = [
    { month: 'Jan', amount: 1200000 },
    { month: 'Feb', amount: 1400000 },
    { month: 'Mar', amount: 900000 },
    { month: 'Apr', amount: 1700000 },
    { month: 'May', amount: 2000000 }
  ];

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    console.log("Selected month:", e.target.value); // you can filter chartData based on this
  };

  return (
    <Container>
      <div className="w-full space-y-6 text-black">
        
        {/* Page Header */}
        <h1 className="text-2xl font-bold">Overview</h1>

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
          <Card
            title="Total Staff"
            icon={FaUsers}
            number="30"
          />
          <Card
            title="Wallet Balance"
            icon={FaWallet}
            number="₦20,000,000"
          />
          <Card
            title="Paid This Month"
            icon={FaCreditCard}
            number="₦5,000,000"
          />
          <Card
            title="Pending Salaries"
            icon={FaClock}
            number="₦500,000"
          />
        </div>

        {/* Calendar Filter under metrics */}
        <div className="w-full flex justify-end">
          <div className="w-48">
            <input
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Chart Section */}
        <div className="w-full">
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Monthly Payroll Expenses</h2>
            </div>
            
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#000000' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#000000' }}
                    tickFormatter={(value) => {
                      if (value >= 1000000) {
                        return `${(value / 1000000).toFixed(1)}M`;
                      }
                      if (value >= 1000) {
                        return `${(value / 1000).toFixed(0)}K`;
                      }
                      return value;
                    }}
                    domain={[0, 2200000]}
                    ticks={[0, 550000, 1100000, 1750000, 2200000]}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#000000"
                    radius={[4, 4, 0, 0]}
                  />
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
