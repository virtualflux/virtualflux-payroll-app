'use client'

import React, { useState, useEffect } from 'react';
import { FaSync } from 'react-icons/fa';  
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Tabs, Tab } from '@/components/ui/Tabs';
import CurrentStaffTab from '@/components/tabs/CurrentStaffTab';
import axiosClient from '@/components/axiosClient';
import toast from 'react-hot-toast';

const ManageStaff = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [overviewData, setOverviewData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errors, setErrors] = useState('');

  const fetchOverview = async (page = 1) => {
    try {
      const response = await axiosClient.get(
        `/payroll/staff?page=${page}&limit=10`
      );
      setPageInfo(response?.data?.data?.pageInfo);
      setOverviewData(response?.data?.data?.results);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message  || "Failed to fetch staff data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview(currentPage);
  }, [currentPage]);

  const totalPages = pageInfo?.pages || 1;

  const handlePageChange = (page) => setCurrentPage(page);

  // 🔄 Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await axiosClient.get(`/payroll/staff/refetch-employees`);
      await fetchOverview(currentPage);

      toast.success("Staff data refreshed");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message  || "Failed to refresh staff data");
    } finally {
      setIsRefreshing(false);
    }
  };

  if (errors) return <div>{errors}</div>;
  return (
    <Container>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-black">Manage Staff</h1>

          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-black text-white"
          >
            <FaSync
              size={14}
              className={isRefreshing ? "animate-spin" : ""}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
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
              isLoading={isLoading}
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
