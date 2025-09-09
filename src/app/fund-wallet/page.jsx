'use client'

import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import { FiPlus, FiArrowUp, FiSend, FiRotateCcw, FiArrowDown, FiX, FiCreditCard, FiDollarSign } from 'react-icons/fi'
import Container from '@/components/ui/Container'

const FundWallet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalStep, setModalStep] = useState(1)
  const [depositAmount, setDepositAmount] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  const currentBalance = 20000000

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

  const openModal = () => {
    setIsModalOpen(true)
    setModalStep(1)
    setDepositAmount('')
    setSelectedPaymentMethod('')
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalStep(1)
  }

  const handleContinueStep1 = () => {
    if (depositAmount && parseFloat(depositAmount) > 0) {
      setModalStep(2)
    }
  }

  const handleContinueStep2 = () => {
    if (selectedPaymentMethod) {
      if (selectedPaymentMethod === 'bank') {
        setModalStep(3)
      } else {
        console.log('Processing deposit:', {
          amount: depositAmount,
          method: selectedPaymentMethod
        })
        closeModal()
      }
    }
  }

  const handleContinueStep3 = () => {
    console.log('Processing bank transfer deposit:', {
      amount: depositAmount,
      method: selectedPaymentMethod
    })
    setModalStep(4)
  }

  const handleDone = () => {
    closeModal()
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Container> 
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Fund Wallet</h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          
          {/* Left Side - Current Balance */}
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
            <div className="mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-10 text-start">Current Balance</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">₦20,000,000</h1>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button 
                className="flex flex-col items-center gap-0 bg-black hover:bg-gray-800 text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4"
                onClick={openModal}
              >
                <FiPlus size={14} className="sm:w-4 sm:h-4" />
                Fund wallet
              </Button>
              <Button className="flex flex-col items-center gap-0 bg-black hover:bg-gray-800 text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4">
                <FiArrowUp size={14} className="sm:w-4 sm:h-4" />
                Withdraw
              </Button>
              <Button className="flex flex-col items-center gap-0 bg-black hover:bg-gray-800 text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4">
                <FiSend size={14} className="sm:w-4 sm:h-4" />
                Transfer
              </Button>
            </div>
          </div>

          {/* Right Side - Balance Display */}
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 flex flex-col gap-6 sm:gap-15 items-start justify-start">
            <div className="w-full text-center">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Current Balance</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">₦20,000,000</h1>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {/* Total Funding */}
                <div className="text-center">
                  <p className="text-base sm:text-lg font-bold text-gray-900">₦ 10,000,000</p>
                  <p className="text-xs text-gray-500">Total Funding</p>
                </div>

                {/* Total Payment */}
                <div className="text-center">
                  <p className="text-base sm:text-lg font-bold text-gray-900">₦ 5,000,000</p>
                  <p className="text-xs text-gray-500">Total Payment</p>
                </div>

                {/* Transactions */}
                <div className="text-center">
                  <p className="text-base sm:text-lg font-bold text-gray-900">90</p>
                  <p className="text-xs text-gray-500">Transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiRotateCcw size={16} className="text-gray-500 sm:w-5 sm:h-5" />
                <h2 className="text-base sm:text-lg font-medium text-gray-900">Recent transaction</h2>
              </div>
              <button className="text-blue-600 hover:underline text-xs sm:text-sm">see all</button>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiArrowDown size={16} className="text-blue-600 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1">{transaction.type}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{transaction.method}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right mt-3 sm:mt-0 w-full sm:w-auto">
                  <p className="font-medium text-blue-600 text-sm sm:text-base mb-1">{transaction.amount}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deposit Modal - Unchanged as per request */}
        <Modal open={isModalOpen} setOpen={setIsModalOpen}>
          <div className="p-6">
            {modalStep !== 4 && (
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Deposit</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX size={20} />
                </button>
              </div>
            )}

            {modalStep === 1 && (
              <div>
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Total balance</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {formatCurrency(currentBalance)}
                  </h3>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₦</span>
                    <Input
                      type="number"
                      className="pl-8"
                      placeholder="1,000,000"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={handleContinueStep1}
                  disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                >
                  Continue
                </Button>
              </div>
            )}

            {modalStep === 2 && (
              <div>
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Total balance</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {formatCurrency(currentBalance)}
                  </h3>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Select payment method</h4>
                  
                  <div 
                    className={`border-2 rounded-lg p-4 mb-3 cursor-pointer transition-all ${
                      selectedPaymentMethod === 'bank' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPaymentMethod('bank')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FiDollarSign size={18} className="text-gray-600" />
                        </div>
                        <span className="font-medium text-gray-900">Bank account</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedPaymentMethod === 'bank' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedPaymentMethod === 'bank' && (
                          <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`border-2 rounded-lg p-4 mb-3 cursor-pointer transition-all ${
                      selectedPaymentMethod === 'card' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPaymentMethod('card')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FiCreditCard size={18} className="text-gray-600" />
                        </div>
                        <span className="font-medium text-gray-900">Credit card</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedPaymentMethod === 'card' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedPaymentMethod === 'card' && (
                          <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPaymentMethod === 'code' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPaymentMethod('code')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-600 font-bold text-lg">#</span>
                        </div>
                        <span className="font-medium text-gray-900">USSD code</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedPaymentMethod === 'code' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedPaymentMethod === 'code' && (
                          <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={handleContinueStep2}
                  disabled={!selectedPaymentMethod}
                >
                  Continue
                </Button>
              </div>
            )}

            {modalStep === 3 && (
              <div>
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900">Bank transfer details</h4>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Bank Name</p>
                    <p className="text-sm font-medium text-gray-900">Global Bank Inc</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Account Name</p>
                    <p className="text-sm font-medium text-gray-900">Virtualflux Payroll Limited</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Account Number</p>
                    <p className="text-sm font-medium text-gray-900">3134524177</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Routing Number</p>
                    <p className="text-sm font-medium text-gray-900">021000003</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Reference Code</p>
                    <p className="text-sm font-medium text-gray-900">FLUXPAY-789345</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Amount to Transfer</p>
                    <p className="text-sm font-medium text-gray-900">
                      ₦{parseFloat(depositAmount).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Yes, I've made payment</span>
                  </label>
                </div>

                <Button 
                  className="w-full"
                  onClick={handleContinueStep3}
                >
                  Continue
                </Button>
              </div>
            )}

            {modalStep === 4 && (
              <div className="text-center py-8">
                <div className="absolute top-6 right-6">
                  <button 
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Deposit Successful</h3>
                  <p className="text-sm text-gray-500 px-4">
                    You have successfully deposited ₦{parseFloat(depositAmount).toLocaleString()} to virtualflux payroll limited
                  </p>
                </div>

                <Button 
                  className="w-full bg-black hover:bg-gray-800"
                  onClick={handleDone}
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </Container>
  )
}

export default FundWallet