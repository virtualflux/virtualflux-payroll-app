'use client'

import React from 'react'
import Button from '@/components/ui/Button'
import { FiPlus, FiArrowUp, FiSend, FiRotateCcw, FiArrowDown } from 'react-icons/fi'
import Container from '@/components/ui/Container'

const FundWallet = () => {
  const transactions = [
    {
      id: 1,
      type: 'Wallet funding',
      method: 'Bank transfer .... 8976',
      amount: '+5,000,000',
      date: 'Jun 12, 2023'
    },
    {
      id: 2,
      type: 'Wallet funding',
      method: 'Card transfer .... 9765',
      amount: '+5000.00',
      date: 'Aug 12, 2023'
    },
    {
      id: 3,
      type: 'Wallet funding',
      method: 'Bank transfer .... 8976',
      amount: '+7,000,000',
      date: 'may 12, 2024'
    },
    {
      id: 4,
      type: 'Wallet funding',
      method: 'Card transfer .... 9765',
      amount: '+1,000,000',
      date: 'July 15, 2025'
    }
  ]

  return (
    <Container> 
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Fund Wallet</h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Left Side - Current Balance */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-10 text-start">Current Balance</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">₦20,000,000</h1>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button className="flex flex-col items-center gap-0 bg-black hover:bg-gray-800">
              <FiPlus size={16} />
              Fund wallet
            </Button>
            <Button className="flex flex-col items-center gap-0 bg-black hover:bg-gray-800">
              <FiArrowUp size={16} />
              Withdraw
            </Button>
            <Button className="flex flex-col items-center gap-0 bg-black hover:bg-gray-800">
              <FiSend size={16} />
              Transfer
            </Button>
          </div>

        
       
        </div>

        {/* Right Side - Balance Display */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col gap-15 items-start justify-start">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Current Balance</p>
            <h1 className="text-3xl font-bold text-gray-900">₦20,000,000</h1>
          </div>

            <div>
                 <div className="grid grid-cols-3 gap-4">
            {/* Total Funding */}
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">₦ 10,000,000</p>
              <p className="text-xs text-gray-500">Total Funding</p>
            </div>

            {/* Total Payment */}
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">₦ 5,000,000</p>
              <p className="text-xs text-gray-500">Total Payment</p>
            </div>

            {/* Transactions */}
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">90</p>
              <p className="text-xs text-gray-500">Transactions</p>
            </div>
          </div>
            </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiRotateCcw size={20} className="text-gray-500" />
              <h2 className="text-lg font-medium text-gray-900">Recent transaction</h2>
            </div>
            <button className="text-blue-600 hover:underline text-sm">see all</button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <FiArrowDown size={18} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{transaction.type}</h3>
                  <p className="text-sm text-gray-500">{transaction.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-blue-600 mb-1">{transaction.amount}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Container>
  )
}

export default FundWallet