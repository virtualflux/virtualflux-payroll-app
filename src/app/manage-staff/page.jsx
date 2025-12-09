'use client'

import React, { useState, useEffect } from 'react';
import { FaSync } from 'react-icons/fa';  
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Tabs, Tab } from '@/components/ui/Tabs';
import CurrentStaffTab from '@/components/tabs/CurrentStaffTab';
import TerminatedStaffTab from '@/components/tabs/TerminatedStaffTab';
import axiosClient from '@/components/axiosClient';
import { formatCurrency } from '@/utils/formatCurrency';

const ManageStaff = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [overviewData, setOverviewData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState('');

  const fetchOverview = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(`/payroll/staff?page=${page}&limit=10`);
      console.log(response.data.data?.pageInfo)
      setPageInfo(response.data.data?.pageInfo)
      setOverviewData(response.data.data?.results);
    } catch (error) {
      console.error(error);
      setErrors('Failed to load staff data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview(currentPage);
  }, [currentPage]);

  const totalPages = pageInfo?.pages;

  const handlePageChange = (page) => setCurrentPage(page);

  // 🔄 Refresh handler
  const handleRefresh = () => {
    console.log("Refreshing staff data...");
     
  };

  return (
    <Container>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-black">Manage Staff</h1>
          <Button onClick={handleRefresh} className="flex items-center gap-2 bg-black text-white">
            <FaSync size={14} /> Refresh
          </Button>
        </div>

        {/* Tabs */}
        <Tabs>
          <Tab title="Current staff">
            <CurrentStaffTab
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              staffData={overviewData}
            />
          </Tab>
          {/* <Tab title="Terminated staff">
            <TerminatedStaffTab
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </Tab> */}
        </Tabs>
      </div>
    </Container>
  );
};

export default ManageStaff;
