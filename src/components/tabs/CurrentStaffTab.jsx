"use client";
import React, { useState } from "react";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Button from "@/components/ui/Button";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import { FaExclamationTriangle, FaCheck } from "react-icons/fa";
import { formatCurrency } from "@/utils/formatCurrency";

const CurrentStaffTab = ({ currentPage, totalPages, handlePageChange, staffData, isLoading }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [showTerminationModal, setShowTerminationModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [terminationReason, setTerminationReason] = useState("");
  const [terminationDate, setTerminationDate] = useState("");
  const [acknowledge, setAcknowledge] = useState(false);

  // Convert staffData to state so we can update it
  const [staffData2, setStaffData] = useState([
    {
      sn: 1,
      employeeId: "OP/VFLA/1705/099",
      name: "Ayobami Joy",
      department: "Operations",
      position: "Head of department",
      employmentType: "Full Time",
      salary: "650,000",
      status: "Active",
      contactNo: "08068245623",
      emailAddress: "ayobami15joy@gmail.com",
      employmentDate: "2020-07-22",
      bankDetails: "3134275188 Firstbank",
      benefit: "Health Insurance",
      paymentMethod: "Bank Transfer",
      image: "/images/user.jpg",
    },
    {
      sn: 2,
      employeeId: "TE/VFLA/1005/079",
      name: "Bethel Esther",
      department: "Tech",
      position: "Intern",
      employmentType: "Full Time",
      salary: "70,000",
      status: "Active",
      contactNo: "08162351131",
      emailAddress: "bethel.esther@gmail.com",
      employmentDate: "2023-01-15",
      bankDetails: "2245178965 GTBank",
      benefit: "Health Insurance",
      paymentMethod: "Bank Transfer",
      image: "/images/user.jpg",
    },
    {
      sn: 3,
      employeeId: "DEV/VFLA/1005/049",
      name: "Ohagbu Chika",
      department: "Dev team",
      position: "Front end developer",
      employmentType: "Full Time",
      salary: "550,000",
      status: "On leave",
      contactNo: "08162357107",
      emailAddress: "ohagbu.chika@gmail.com",
      employmentDate: "2021-03-10",
      bankDetails: "1122334455 UBA",
      benefit: "Health Insurance",
      paymentMethod: "Bank Transfer",
      image: "/images/user.jpg",
    },
  ]);

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    name: "",
    department: "",
    position: "",
    employmentType: "",
    salary: "",
    benefit: "",
    paymentMethod: "",
    status: "",
  });

  const toggleRowExpansion = (rowIndex) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

  const columns = [
    { title: "S/N", accessor: "sn" },
    { title: "Employee id", accessor: "employeeId" },
    { title: "Name", accessor: "name" },
    { title: "Department", accessor: "department" },
    { title: "Position", accessor: "position" },
    { title: "Employment type", accessor: "employmentType" },
    {
      title: "Salary",
      accessor: "salary",
      render: (value) => `₦${value}`,
    },
    {
      title: "Status",
      accessor: "status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "active"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      title: "Action",
      accessor: "action",
      render: (_, row, index) => (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleRowExpansion(index);
          }}
        >
          <span className="text-black text-xs">Manage</span>
          {expandedRows[index] ? (
            <FaChevronUp size={10} className="text-black" />
          ) : (
            <FaChevronDown size={10} className="text-black" />
          )}
        </div>
      ),
    },
  ];

  const handleEditStaff = (employee) => {
    setSelectedEmployee(employee);
    setEditFormData({
      name: employee.name,
      department: employee.department,
      position: employee.position,
      employmentType: employee.employmentType,
      salary: employee.salary,
      benefit: employee.benefit,
      paymentMethod: employee.paymentMethod,
      status: employee.status,
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveEditChanges = () => {
    // Update the staff data with the new information
    setStaffData((prevData) =>
      prevData.map((employee) =>
        employee.employeeId === selectedEmployee.employeeId
          ? {
              ...employee,
              ...editFormData,
               
              salary: editFormData.salary.replace(/,/g, ""),
            }
          : employee
      )
    );

    // Close the modal and reset state
    setShowEditModal(false);
    setSelectedEmployee(null);
    setEditFormData({
      name: "",
      department: "",
      position: "",
      employmentType: "",
      salary: "",
      benefit: "",
      paymentMethod: "",
      status: "",
    });
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedEmployee(null);
    setEditFormData({
      name: "",
      department: "",
      position: "",
      employmentType: "",
      salary: "",
      benefit: "",
      paymentMethod: "",
      status: "",
    });
  };

  const handleDeleteStaff = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Remove the staff member from the staffData
    setStaffData((prevData) =>
      prevData.filter((emp) => emp.employeeId !== selectedEmployee.employeeId)
    );
    
    setShowDeleteModal(false);
    setShowDeleteSuccessModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setSelectedEmployee(null);
  };

  const handleDeleteSuccessClose = () => {
    setShowDeleteSuccessModal(false);
    setSelectedEmployee(null);
  };

  const handleTerminateEmployment = (employee) => {
    setSelectedEmployee(employee);
    setTerminationDate("");
    setTerminationReason("");
    setShowTerminationModal(true);
  };

  const handleModalClose = () => {
    setShowTerminationModal(false);
    setSelectedEmployee(null);
  };

  const handleContinue = () => {
    setShowTerminationModal(false);
    setShowWarningModal(true);
  };

  const handleWarningBack = () => {
    setShowWarningModal(false);
    setShowTerminationModal(true);
  };

  const handleWarningTerminate = () => {
    console.log("Termination submitted:", {
      employee: selectedEmployee,
      terminationDate,
      reason: terminationReason,
    });
    setShowWarningModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmationModal(false);
    setSelectedEmployee(null);
    setTerminationReason("");
    setTerminationDate("");
  };

  const tableData = staffData?.map((staff, index) => ({
    sn: index + 1,
    employeeId: staff.user?.employeeId || `EMP-${index + 1}`,
    name: `${staff.user?.firstName} ${staff.user?.lastName}`  || "",
    department: staff.user?.department || "N/A",
    position: staff.user?.position || "N/A",
    employmentType: staff.role || "",
    salary: formatCurrency(staff?.grossSalary) || "0",
    status: staff.employeeStatus || "Active",
    contactNo: staff.user?.contactNo || "",
    emailAddress: staff.user?.email || "",
    employmentDate: staff.user?.createdAt.split('T')[0] || "",
    bankDetails: staff?.bankDetails || {},
    benefit: staff.user?.benefit || "",
    paymentMethod: staff.user?.paymentMethod || "",
    image: staff.user?.image || "/images/user.jpg",
  })) || [];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-300">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray">
                {columns.map((column, index) => (
                  <th key={index} className="py-3 px-6 text-left">
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr className="text-xs text-black border-b border-gray-300 hover:bg-gray-50">
                    {columns.map((col, colIndex) => (
                      <td className="py-4 px-6 capitalize" key={colIndex}>
                        {col.render
                          ? col.render(row[col.accessor], row, rowIndex)
                          : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                  {expandedRows[rowIndex] && (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-4 bg-gray-50 border-b border-gray-300">
                        {/* Expanded Row Details */}
                        <div className="flex items-start gap-6">
                          <div className="flex-shrink-0">
                            <img src={row.image} alt={row.name} className="w-16 h-16 rounded-full object-cover border border-gray-300" />
                          </div>
                          <div className="flex-1 grid grid-cols-6 gap-6 text-xs">
                            <div className="space-y-3">
                              <div><p className="text-black mb-1">Name</p><p className="text-black font-medium">{row.name}</p></div>
                              <div><p className="text-black mb-1">Employee ID</p><p className="font-medium bg-black text-white px-2 py-1 rounded text-xs inline-block">{row.employeeId}</p></div>
                              <div><p className="text-black mb-1">Employment Status</p><p className="text-black font-medium">{row.status}</p></div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Position</p>
                                <p className="text-black font-medium">
                                  {row.position}
                                </p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Email address</p>
                                <p className="text-black font-medium">
                                  {row.emailAddress}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">
                                  Employment type
                                </p>
                                <p className="text-black font-medium">
                                  {row.employmentType}
                                </p>
                              </div>
                              <div>
                                <p className="text-black mb-1">
                                  Employment date
                                </p>
                                <p className="text-black font-medium">
                                  {row.employmentDate}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Salary</p>
                                <p className="text-black font-medium">
                                  {row.salary}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-black">Bank Details</p>
                                <p className="text-[11px]">Bank: {row.bankDetails?.bankName}</p>
                                <p className="text-[11px]">Account Name: {row.bankDetails?.accountName}</p>
                                <p className="text-[11px]">Account Number: {row.bankDetails?.accountNumber}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Benefit</p>
                                <p className="text-black font-medium">
                                  {row.benefit}
                                </p>
                              </div>
                              <div>
                                <p className="text-black mb-1">
                                  Payment method
                                </p>
                                <p className="text-black font-medium">
                                  {row.paymentMethod}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                          {/* <Button
                            onClick={() => handleEditStaff(row)}
                            className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
                          >
                            Edit Staff
                          </Button>
                          <Button
                            onClick={() => handleDeleteStaff(row)}
                            className="px-4 py-2 text-xs border border-gray-300 text-white bg-black rounded"
                          >
                            Delete Staff
                          </Button> */}
                          {/* <Button
                            onClick={() => handleTerminateEmployment(row)}
                            className="px-4 py-2 text-xs border border-red-300 text-white bg-red-600 rounded"
                          >
                            Terminate Employment
                          </Button> */}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Delete Confirmation Modal */}
      <Modal open={showDeleteModal} setOpen={setShowDeleteModal}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-black">Delete Staff Member</h3>
            <button
              onClick={handleDeleteModalClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>

          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-black mb-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedEmployee?.name}</span>{" "}
              (<span className="font-mono text-xs">{selectedEmployee?.employeeId}</span>)?
            </p>
            <p className="text-xs text-red-600">
              This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              onClick={handleDeleteModalClose}
              className="px-6 py-2 text-sm bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="px-6 py-2 text-sm bg-red-600 hover:bg-red-700"
            >
              Delete staff
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Success Modal */}
      <Modal open={showDeleteSuccessModal} setOpen={setShowDeleteSuccessModal}>
        <div className="p-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleDeleteSuccessClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheck className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-black mb-2">
              Staff Member Deleted Successfully!
            </h3>
            
            <p className="text-sm text-gray-600 mb-6">
              The staff member has been removed from the system and
              all related resting processes have been completed.
            </p>

            <Button
              onClick={handleDeleteSuccessClose}
              className="px-8 py-2 text-sm bg-black hover:bg-gray-800"
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Staff Modal */}
      <Modal open={showEditModal} setOpen={setShowEditModal}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-black">Edit Staff Member</h3>
            <button
              onClick={handleEditModalClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Name
              </label>
              <Input
                type="text"
                value={editFormData.name}
                onChange={(e) => handleEditFormChange("name", e.target.value)}
                placeholder="Enter full name"
                className="w-full"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Department
              </label>
              <Select
                value={editFormData.department}
                onChange={(e) =>
                  handleEditFormChange("department", e.target.value)
                }
                placeholder="Select Department"
                className="w-full"
              >
                <option value="Operations">Operations</option>
                <option value="Designer">Designer</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Sales">Sales</option>
              </Select>
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Position
              </label>
              <Select
                value={editFormData.position}
                onChange={(e) =>
                  handleEditFormChange("position", e.target.value)
                }
                placeholder="Select Position"
                className="w-full"
              >
                <option value="Head of department">Head of department</option>
                <option value="Specialist">Specialist</option>
                <option value="Manager">Manager</option>
                <option value="Designer">Designer</option>
                <option value="Developer">Developer</option>
                <option value="Consultant">Consultant</option>
              </Select>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Employment Type
              </label>
              <Select
                value={editFormData.employmentType}
                onChange={(e) =>
                  handleEditFormChange("employmentType", e.target.value)
                }
                placeholder="Select Employment Type"
                className="w-full"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern/Trainee</option>
              </Select>
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Salary
              </label>
              <Input
                type="text"
                value={editFormData.salary}
                onChange={(e) => handleEditFormChange("salary", e.target.value)}
                placeholder="Enter salary amount"
                className="w-full"
              />
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Benefits
              </label>
              <Select
                value={editFormData.benefit}
                onChange={(e) =>
                  handleEditFormChange("benefit", e.target.value)
                }
                placeholder="Select Benefits"
                className="w-full"
              >
                <option value="Health Insurance">Health Insurance</option>
                <option value="Retirement Savings">Retirement Savings</option>
                <option value="Paid Time-Off">Paid Time-Off</option>
                <option value="Financial and Performance Benefits">
                  Financial and Performance Benefits
                </option>
                <option value="None">None</option>
              </Select>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Payment Method
              </label>
              <Select
                value={editFormData.paymentMethod}
                onChange={(e) =>
                  handleEditFormChange("paymentMethod", e.target.value)
                }
                placeholder="Select Payment Method"
                className="w-full"
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Manual Cash Payment">Manual Cash Payment</option>
                <option value="Internal Wallet Transfer">
                  Internal Wallet Transfer
                </option>
                <option value="USSD Transfer">USSD Transfer</option>
              </Select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Status
              </label>
              <Select
                value={editFormData.status}
                onChange={(e) => handleEditFormChange("status", e.target.value)}
                placeholder="Select Status"
                className="w-full"
              >
                <option value="Active">Active</option>
                <option value="Inctive">Inactive</option>
                <option value="On leave">On leave</option>
                <option value="Suspended">Suspended</option>
                <option value="Terminated">Terminated</option>
                <option value="End of Contract">End of Contract</option>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={handleEditModalClose}
              className="px-6 py-2 text-sm bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEditChanges}
              className="px-6 py-2 text-sm bg-black hover:bg-gray-800"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Termination Details Modal */}
      <Modal open={showTerminationModal} setOpen={setShowTerminationModal}>
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4 text-black">
            Termination Details
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Provide details about the termination
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-black mb-1">Employee:</p>
              <p className="text-sm font-medium text-black">
                {selectedEmployee?.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Department:</p>
              <p className="text-sm font-medium text-black">
                {selectedEmployee?.department}
              </p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Position:</p>
              <p className="text-sm font-medium text-black">
                {selectedEmployee?.position}
              </p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Employment date:</p>
              <p className="text-sm font-medium text-black">
                {selectedEmployee?.employmentDate}
              </p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Termination Date</p>
              <Input
                type="date"
                name="terminationDate"
                value={terminationDate}
                onChange={(e) => setTerminationDate(e.target.value)}
                className="w-full text-black"
              />
            </div>
            <div>
              <p className="text-sm text-black mb-1">Reason for Termination</p>
              <Textarea
                rows={4}
                value={terminationReason}
                onChange={(e) => setTerminationReason(e.target.value)}
                placeholder="Enter detailed reason for termination"
                className="text-black"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              onClick={handleModalClose}
              className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
            >
              Back
            </Button>
            <button
              onClick={handleContinue}
              className="px-4 py-2 text-xs border border-gray-300 text-white bg-black rounded"
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>

      {/* Warning Modal */}
      <Modal open={showWarningModal} setOpen={setShowWarningModal}>
        <div className="p-6 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <p className="text-sm text-red-700 mb-2">
              <span className="text-black font-bold">Warning:</span>This action
              cannot be undone. Once terminated, the employee will lose access
              to all systems immediately
            </p>
            <label className="flex items-center gap-2 text-sm text-red-600">
              <input
                type="checkbox"
                checked={acknowledge}
                onChange={(e) => setAcknowledge(e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 text-center"
              />
              I Understand this action is permanent
            </label>
          </div>
          <div className="flex justify-center gap-3">
            <Button
              onClick={handleWarningBack}
              className="px-6 py-2 text-xs border border-gray-300 text-white bg-black rounded"
            >
              Back
            </Button>
            <Button
              onClick={handleWarningTerminate}
              disabled={!acknowledge}
              className={`px-6 py-2 text-xs border border-red-300 text-white rounded ${
                acknowledge
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-red-300 cursor-not-allowed"
              }`}
            >
              Terminate
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Confirmation Modal */}
      <Modal open={showConfirmationModal} setOpen={setShowConfirmationModal}>
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2 text-black text-center">
            Employment Terminated Successfully
          </h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            The employment of {selectedEmployee?.name} has been terminated
            effective {terminationDate}.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={handleConfirmationClose}
              className="px-6 py-2 text-xs border border-gray-300 text-white bg-black rounded"
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CurrentStaffTab;