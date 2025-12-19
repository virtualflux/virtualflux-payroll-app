'use client'

import React, { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FiPlus, FiArrowUp, FiSend, FiRotateCcw, FiArrowDown, FiX } from 'react-icons/fi'
import Container from '@/components/ui/Container'
import axiosClient from '@/components/axiosClient';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import toast from 'react-hot-toast';

const FundWallet = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [withdrawStep, setWithdrawStep] = useState(1)
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [rememberAccount, setRememberAccount] = useState(false)
  const [withdrawPassword, setWithdrawPassword] = useState('')
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', ''])
  const [destination, setDestination] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([])
  const [virtualAccount, setVirtualAccount] = useState({})
  const [walletBalance, setWalletBalance] = useState(null)
  const [totals, setTotals] = useState(null)

  // Nigerian Banks
  const nigerianBanks = [
    'Access Bank',
    'Citibank Nigeria',
    'Ecobank Nigeria',
    'Fidelity Bank',
    'First Bank of Nigeria',
    'First City Monument Bank (FCMB)',
    'Globus Bank',
    'Guaranty Trust Bank (GTBank)',
    'Heritage Bank',
    'Keystone Bank',
    'Parallex Bank',
    'Polaris Bank',
    'Providus Bank',
    'Stanbic IBTC Bank',
    'Standard Chartered Bank',
    'Sterling Bank',
    'SunTrust Bank',
    'Titan Trust Bank',
    'Union Bank of Nigeria',
    'United Bank for Africa (UBA)',
    'Unity Bank',
    'Wema Bank',
    'Zenith Bank'
  ]

  const fetchOverview = async () => {
    setIsLoading(true);
    try {
      const walletResponse = await axiosClient.get('/payroll/wallet');
      const virtualAccountResponse = await axiosClient.get('/payroll/wallet/get-wallet-details');
      const transactionResponse = await axiosClient.get(`/payroll/wallet/transaction-history?page=1&limit=5`);
      setVirtualAccount(virtualAccountResponse.data.data)
      setTransactions(transactionResponse?.data?.data.results)
      setTotals(transactionResponse?.data?.data?.totals)
      setWalletBalance(formatCurrency(walletResponse?.data?.data?.balance))
    } catch (error) {
      toast.error(error.response?.data?.message || error.message  || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const openDepositModal = () => {
    setIsDepositModalOpen(true)
    setDepositAmount('')
  }

  const closeDepositModal = () => {
    setIsDepositModalOpen(false)
    setDepositAmount('')
  }

  const openWithdrawModal = () => {
    setIsWithdrawModalOpen(true)
    setWithdrawStep(1)
    setWithdrawAmount('')
    setSelectedBank('')
    setAccountNumber('')
    setAccountName('')
    setRememberAccount(false)
    setWithdrawPassword('')
    setOtpValues(['', '', '', '', '', ''])
    setDestination('')
  }

  const closeWithdrawModal = () => {
    setIsWithdrawModalOpen(false)
    setWithdrawStep(1)
  }

  const handleWithdrawContinue = () => {
    if (withdrawStep === 1 && withdrawAmount && selectedBank && accountNumber) {
      setWithdrawStep(2)
    } else if (withdrawStep === 2 && withdrawPassword) {
      // Move to OTP verification
      setWithdrawStep(3)
    } else if (withdrawStep === 3 && otpValues.every(val => val !== '')) {
      // Move to confirmation
      setWithdrawStep(4)
    } else if (withdrawStep === 4) {
      // Move to success screen
      setWithdrawStep(5)
    } else if (withdrawStep === 5) {
      // Close modal after viewing success
      closeWithdrawModal()
    }
  }

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return
    
    const newOtpValues = [...otpValues]
    newOtpValues[index] = value
    setOtpValues(newOtpValues)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  // Calculate withdrawal fees
  const withdrawalAmount = parseFloat(withdrawAmount) || 0
  const processingFee = withdrawalAmount * 0.01 // 1%
  const nuboxxFee = 0
  const amountToReceive = withdrawalAmount - processingFee - nuboxxFee

  // call backend to get Paystack URL
  const handleFundWallet = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return

    try {
      const response = await fetch('/api/fund-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: depositAmount })
      })

      const data = await response.json()

      if (data?.authorization_url) {
        // Redirect to Paystack checkout
        window.location.href = data.authorization_url
      } else {
        alert('Unable to get payment link. Try again.')
      }
    } catch (error) {
      console.error('Error funding wallet:', error)
      alert('Something went wrong. Try again.')
    }
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{walletBalance}</h1>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button 
                className="flex flex-col items-center gap-0 bg-black hover:bg-gray-800 text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4"
                onClick={openDepositModal}
              >
                <FiPlus size={14} className="sm:w-4 sm:h-4" />
                Fund wallet
              </Button>
              <Button 
                className="flex flex-col items-center gap-0 bg-black hover:bg-gray-800 text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4"
                onClick={openWithdrawModal}
              >
                <FiArrowUp size={14} className="sm:w-4 sm:h-4" />
                Withdraw
              </Button>
            </div>
          </div>

          {/* Right Side - Balance Display */}
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 flex flex-col gap-6 sm:gap-15 items-start justify-start">
            <div className="w-full text-center">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Current Balance</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{walletBalance}</h1>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="text-center">
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    {formatCurrency(transactions.reduce((sum, tx) => sum + (tx.total || 0), 0) /100)}
                  </p>
                  <p className="text-xs text-gray-500">Total Funding</p>
                </div>
                {/* <div className="text-center">
                  <p className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency((totals?.totalPayment || 0) / 100)}</p>
                  <p className="text-xs text-gray-500">Total Payment</p>
                </div> */}
                <div className="text-center">
                  <p className="text-base sm:text-lg font-bold text-gray-900">{totals?.totalTransactions || transactions?.length}</p>
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
              {/* <button className="text-blue-600 hover:underline text-xs sm:text-sm">see all</button> */}
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
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1">{transaction.transactionType === "topup" ? "Wallet Funding": "Payout"}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{transaction.paymentGateway}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right mt-3 sm:mt-0 w-full sm:w-auto">
                  <p className="font-medium text-blue-600 text-sm sm:text-base mb-1">{formatCurrency((transaction.total || 0) / 100)}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deposit Modal */}
        <Modal open={isDepositModalOpen} setOpen={setIsDepositModalOpen}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Deposit</h2>
              <button 
                onClick={closeDepositModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Total balance</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {walletBalance}
              </h3>

            <div className='my-2'>
              <p className="text-sm text-gray-500 mb-2">
                <b>Bank Name:</b> {virtualAccount.bankName}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <b>Account Number:</b> {virtualAccount.accountNumber}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <b>Account Name:</b> {virtualAccount.accountName}
              </p>
            </div>
            </div>

            {/* <div className="mb-6">
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
              className="w-full bg-black hover:bg-gray-800"
              onClick={handleFundWallet}
              disabled={!depositAmount || parseFloat(depositAmount) <= 0}
            >
              Continue
            </Button> */}
          </div>
        </Modal>

        {/* Withdraw Modal */}
        <Modal open={isWithdrawModalOpen} setOpen={setIsWithdrawModalOpen}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Withdraw</h2>
              <button 
                onClick={closeWithdrawModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            </div>

            {withdrawStep === 1 && (
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Withdrawal Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₦</span>
                    <Input
                      type="number"
                      className="pl-8"
                      placeholder="1,000,000"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Available Balance: {walletBalance}
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <Select
                    placeholder="Select Bank"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                  >
                    {nigerianBanks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Account Number
                  </label>
                  <Input
                    type="text"
                    placeholder="2230980291"
                    value={accountNumber}
                    onChange={(e) => {
                      setAccountNumber(e.target.value)
                      // Simulate account name lookup
                      if (e.target.value.length === 10) {
                        setAccountName('Fidelity Save')
                      }
                    }}
                  />
                </div>

                {accountName && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account name
                    </label>
                    <div className="w-full h-10 p-2 border-2 border-gray-300 rounded-md bg-gray-50 text-sm flex items-center text-gray-500">
                      {accountName}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberAccount}
                        onChange={(e) => setRememberAccount(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors ${
                        rememberAccount ? 'bg-black' : 'bg-gray-300'
                      }`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          rememberAccount ? 'transform translate-x-5' : ''
                        }`}></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-700">Remember and save this account</span>
                  </label>
                </div>

                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Fees Calculation</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Withdrawal Amount:</span>
                      <span className="text-gray-900 font-medium">
                        ₦{withdrawalAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Processing Fee (1%):</span>
                      <span className="text-gray-900 font-medium">
                        ₦{processingFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Nuboxx Fee:</span>
                      <span className="text-gray-900 font-medium">
                        ₦{nuboxxFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-gray-900">Amount Receive:</span>
                        <span className="text-gray-900">
                          ₦{amountToReceive.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50"
                    onClick={closeWithdrawModal}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-black hover:bg-gray-800"
                    onClick={handleWithdrawContinue}
                    disabled={!withdrawAmount || !selectedBank || !accountNumber || parseFloat(withdrawAmount) <= 0}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {withdrawStep === 2 && (
              <div>
                <div className="mb-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiX size={24} className="text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Verification</h3>
                  <p className="text-sm text-gray-500">
                    For security reason, we need to verify your identity before processing this withdrawal.
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your account password"
                    value={withdrawPassword}
                    onChange={(e) => setWithdrawPassword(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50"
                    onClick={() => setWithdrawStep(1)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-black hover:bg-gray-800"
                    onClick={handleWithdrawContinue}
                    disabled={!withdrawPassword}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {withdrawStep === 3 && (
              <div>
                <div className="mb-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-factor Auth</h3>
                  <p className="text-sm text-gray-500">
                    In order to complete this withdrawal, provide the OTP code sent to <span className="font-medium text-gray-900">company@business.com</span>
                  </p>
                </div>

                <div className="mb-6 flex justify-center gap-2">
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-md bg-gray-50 focus:border-black outline-none transition-all"
                    />
                  ))}
                </div>

                <Button 
                  className="w-full bg-black hover:bg-gray-800"
                  onClick={handleWithdrawContinue}
                  disabled={!otpValues.every(val => val !== '')}
                >
                  Continue
                </Button>
              </div>
            )}

            {withdrawStep === 4 && (
              <div>
                <div className="mb-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Withdrawal Details</h3>
                  <p className="text-sm text-gray-500">
                    Please review all details before confirming
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fees Calculation
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Withdrawal Amount:</span>
                      <span className="text-gray-900 font-medium">
                        ₦{withdrawalAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Processing Fee (1%):</span>
                      <span className="text-gray-900 font-medium">
                        ₦{processingFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Network Fee:</span>
                      <span className="text-gray-900 font-medium">
                        ₦{nuboxxFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-2.5 mt-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-gray-900">Amount Receive:</span>
                        <span className="text-gray-900">
                          ₦{amountToReceive.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Access Bank(******0891)"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50"
                    onClick={closeWithdrawModal}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-black hover:bg-gray-800"
                    onClick={handleWithdrawContinue}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
            {withdrawStep === 5 && (
              <div>
                <div className="mb-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Withdrawal Processed Successfully!</h3>
                </div>

                <div className="mb-6 bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Transaction ID</span>
                    <span className="text-sm text-gray-900 font-medium">TX-789547239</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="text-sm text-red-600 font-medium">₦{withdrawalAmount.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Destination</span>
                    <span className="text-sm text-gray-900 font-medium">{selectedBank}(******{accountNumber.slice(-4)})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Date</span>
                    <span className="text-sm text-gray-900 font-medium">
                      {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="text-sm text-green-600 font-medium">Processing</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50"
                    onClick={closeWithdrawModal}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-black hover:bg-gray-800"
                    onClick={handleWithdrawContinue}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </Container>
  )
}

export default FundWallet