// 'use client'

// import React, { useState } from 'react';
// import Table from '@/components/ui/Table';
// import Pagination from '@/components/ui/Pagination';
// import Button from '@/components/ui/Button';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// const CurrentStaffTab = ({ currentPage, totalPages, handlePageChange }) => {
//   const [expandedRows, setExpandedRows] = useState({});

//   // Current staff data with additional details
//   const staffData = [
//     { 
//       sn: 1, 
//       employeeId: 'OP/VFLA/1705/099', 
//       name: 'Ayobami Joy', 
//       department: 'Operations', 
//       position: 'Head of department', 
//       employmentType: 'Full Time', 
//       salary: '650,000', 
//       status: 'Active',
//       contactNo: '08068245623',
//       emailAddress: 'ayobami15joy@gmail.com',
//       employmentDate: '2020-07-22',
//       bankDetails: '3134275188 Firstbank',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     },
//     { 
//       sn: 2, 
//       employeeId: 'TE/VFLA/1005/079', 
//       name: 'Bethel Esther', 
//       department: 'Tech', 
//       position: 'Intern', 
//       employmentType: 'Full Time', 
//       salary: '70,000', 
//       status: 'Active',
//       contactNo: '08162351131',
//       emailAddress: 'bethel.esther@gmail.com',
//       employmentDate: '2023-01-15',
//       bankDetails: '2245178965 GTBank',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     },
//     { 
//       sn: 3, 
//       employeeId: 'DEV/VFLA/1005/049', 
//       name: 'Ohagbu Chika', 
//       department: 'Dev team', 
//       position: 'Front end developer', 
//       employmentType: 'Full Time', 
//       salary: '550,000', 
//       status: 'On leave',
//       contactNo: '08162357107',
//       emailAddress: 'ohagbu.chika@gmail.com',
//       employmentDate: '2021-03-10',
//       bankDetails: '1122334455 UBA',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     },
//     { 
//       sn: 4, 
//       employeeId: 'DEV/VFLA/1005/099', 
//       name: 'John Paul', 
//       department: 'Dev team', 
//       position: 'Ui/ux designer', 
//       employmentType: 'Full Time', 
//       salary: '500,000', 
//       status: 'Active',
//       contactNo: '09183902058',
//       emailAddress: 'john.paul@gmail.com',
//       employmentDate: '2022-05-20',
//       bankDetails: '7788990011 Access Bank',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     },
//     { 
//       sn: 5, 
//       employeeId: 'TE/VFLA/1005/079', 
//       name: 'Okeke Sandra', 
//       department: 'Tech team', 
//       position: 'IT student', 
//       employmentType: 'Full Time', 
//       salary: '70,000', 
//       status: 'Active',
//       contactNo: '09123768365',
//       emailAddress: 'okeke.sandra@gmail.com',
//       employmentDate: '2023-09-01',
//       bankDetails: '5566778899 Zenith Bank',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     }
//   ];

//   const toggleRowExpansion = (rowIndex) => {
//     setExpandedRows(prev => ({
//       ...prev,
//       [rowIndex]: !prev[rowIndex]
//     }));
//   };

//   // Columns for current staff
//   const columns = [
//     { title: 'S/N', accessor: 'sn' },
//     { title: 'Employee id', accessor: 'employeeId' },
//     { title: 'Name', accessor: 'name' },
//     { title: 'Department', accessor: 'department' },
//     { title: 'Position', accessor: 'position' },
//     { title: 'Employment type', accessor: 'employmentType' },
//     { 
//       title: 'Salary', 
//       accessor: 'salary', 
//       render: (value) => `₦${value}` 
//     },
//     { 
//       title: 'Status', 
//       accessor: 'status', 
//       render: (value) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium ${
//             value === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//           }`}
//         >
//           {value}
//         </span>
//       ) 
//     },
//     { 
//       title: 'Action', 
//       accessor: 'action', 
//       render: (_, row, index) => (
//         <div 
//           className="flex items-center gap-1 cursor-pointer"
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleRowExpansion(index);
//           }}
//         >
//           <span className="text-black text-xs">Manage</span>
//           {expandedRows[index] ? (
//             <FaChevronUp size={10} className="text-black" />
//           ) : (
//             <FaChevronDown size={10} className="text-black" />
//           )}
//         </div>
//       ) 
//     }
//   ];

//   const handleEditStaff = (employee) => {
//     console.log('Edit staff:', employee);
//     // Implement edit functionality
//   };

//   const handleDeleteStaff = (employee) => {
//     console.log('Delete staff:', employee);
//     // Implement delete functionality
//   };

//   const handleTerminateEmployment = (employee) => {
//     console.log('Terminate employment:', employee);
//     // Implement termination functionality
//   };

//   return (
//     <div className="space-y-4">
//       <div className="bg-white rounded-lg border border-gray-300">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray">
//                 {columns.map((column, index) => (
//                   <th key={index} className="py-3 px-6 text-left">
//                     {column.title}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {staffData.map((row, rowIndex) => (
//                 <React.Fragment key={rowIndex}>
//                   {/* Main Table Row */}
//                   <tr className="text-xs text-black border-b border-gray-300 hover:bg-gray-50">
//                     {columns.map((col, colIndex) => (
//                       <td className="py-4 px-6 capitalize" key={colIndex}>
//                         {col.render ? col.render(row[col.accessor], row, rowIndex) : row[col.accessor]}
//                       </td>
//                     ))}
//                   </tr>
                  
//                   {/* Expanded Row Content */}
//                   {expandedRows[rowIndex] && (
//                     <tr>
//                       <td colSpan={columns.length} className="px-6 py-4 bg-gray-50 border-b border-gray-300">
//                         <div className="flex items-start gap-6">
//                           {/* Avatar */}
//                           <div className="flex-shrink-0">
//                             <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
//                               <span className="text-white text-lg font-semibold">
//                                 {row.name.split(' ').map(n => n[0]).join('')}
//                               </span>
//                             </div>
//                           </div>
                          
//                           {/* Employee Details Grid */}
//                           <div className="flex-1 grid grid-cols-6 gap-6 text-xs">
//                             {/* Column 1 */}
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Name</p>
//                                 <p className="text-black font-medium">{row.name}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Employee ID</p>
//                                 <p className="font-medium bg-black text-white px-2 py-1 rounded text-xs inline-block">
//                                   {row.employeeId}
//                                 </p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Employment Status</p>
//                                 <p className="text-black font-medium">{row.status}</p>
//                               </div>
//                             </div>
                            
//                             {/* Column 2 */}
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Department</p>
//                                 <p className="text-black font-medium">{row.department}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Contact No.</p>
//                                 <p className="text-black font-medium">{row.contactNo}</p>
//                               </div>
//                             </div>
                            
//                             {/* Column 3 */}
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Position</p>
//                                 <p className="text-black font-medium">{row.position}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Email address</p>
//                                 <p className="text-black font-medium">{row.emailAddress}</p>
//                               </div>
//                             </div>
                            
//                             {/* Column 4 */}
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Employment type</p>
//                                 <p className="text-black font-medium">{row.employmentType}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Employment date</p>
//                                 <p className="text-black font-medium">{row.employmentDate}</p>
//                               </div>
//                             </div>
                            
//                             {/* Column 5 */}
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Salary</p>
//                                 <p className="text-black font-medium">₦{row.salary}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Bank details</p>
//                                 <p className="text-black font-medium">{row.bankDetails}</p>
//                               </div>
//                             </div>
                            
//                             {/* Column 6 */}
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Benefit</p>
//                                 <p className="text-black font-medium">{row.benefit}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Payment method</p>
//                                 <p className="text-black font-medium">{row.paymentMethod}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
                        
//                         {/* Action Buttons */}
//                         <div className="flex items-center gap-3 mt-6">
//                           <Button 
//                             onClick={() => handleEditStaff(row)}
//                             className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
//                           >
//                             Edit Staff
//                           </Button>
//                           <Button 
//                             onClick={() => handleDeleteStaff(row)}
//                             className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
//                           >
//                             Delete Staff
//                           </Button>
//                           <Button 
//                             onClick={() => handleTerminateEmployment(row)}
//                             className="px-4 py-2 text-xs border border-red-300 text-white bg-red-500 hover:bg-red-50 rounded"
//                           >
//                             Terminate Employment
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
//     </div>
//   );
// };

// export default CurrentStaffTab;

// 'use client'

// import React, { useState } from 'react';
// import Table from '@/components/ui/Table';
// import Pagination from '@/components/ui/Pagination';
// import Button from '@/components/ui/Button';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import Modal from '@/components/ui/Modal';
// import Input from '@/components/ui/Input';
// import Textarea from '@/components/ui/Textarea';

// const CurrentStaffTab = ({ currentPage, totalPages, handlePageChange }) => {
//   const [expandedRows, setExpandedRows] = useState({});
//   const [showTerminateModal, setShowTerminateModal] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [terminationReason, setTerminationReason] = useState('');
//   const [terminationDate, setTerminationDate] = useState('');

//   const staffData = [
//     { 
//       sn: 1, 
//       employeeId: 'OP/VFLA/1705/099', 
//       name: 'Ayobami Joy', 
//       department: 'Operations', 
//       position: 'Head of department', 
//       employmentType: 'Full Time', 
//       salary: '650,000', 
//       status: 'Active',
//       contactNo: '08068245623',
//       emailAddress: 'ayobami15joy@gmail.com',
//       employmentDate: '2020-07-22',
//       bankDetails: '3134275188 Firstbank',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     },
//     { 
//       sn: 2, 
//       employeeId: 'TE/VFLA/1005/079', 
//       name: 'Bethel Esther', 
//       department: 'Tech', 
//       position: 'Intern', 
//       employmentType: 'Full Time', 
//       salary: '70,000', 
//       status: 'Active',
//       contactNo: '08162351131',
//       emailAddress: 'bethel.esther@gmail.com',
//       employmentDate: '2023-01-15',
//       bankDetails: '2245178965 GTBank',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     },
//     { 
//       sn: 3, 
//       employeeId: 'DEV/VFLA/1005/049', 
//       name: 'Ohagbu Chika', 
//       department: 'Dev team', 
//       position: 'Front end developer', 
//       employmentType: 'Full Time', 
//       salary: '550,000', 
//       status: 'On leave',
//       contactNo: '08162357107',
//       emailAddress: 'ohagbu.chika@gmail.com',
//       employmentDate: '2021-03-10',
//       bankDetails: '1122334455 UBA',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     },
//     { 
//       sn: 4, 
//       employeeId: 'DEV/VFLA/1005/099', 
//       name: 'John Paul', 
//       department: 'Dev team', 
//       position: 'Ui/ux designer', 
//       employmentType: 'Full Time', 
//       salary: '500,000', 
//       status: 'Active',
//       contactNo: '09183902058',
//       emailAddress: 'john.paul@gmail.com',
//       employmentDate: '2022-05-20',
//       bankDetails: '7788990011 Access Bank',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     },
//     { 
//       sn: 5, 
//       employeeId: 'TE/VFLA/1005/079', 
//       name: 'Okeke Sandra', 
//       department: 'Tech team', 
//       position: 'IT student', 
//       employmentType: 'Full Time', 
//       salary: '70,000', 
//       status: 'Active',
//       contactNo: '09123768365',
//       emailAddress: 'okeke.sandra@gmail.com',
//       employmentDate: '2023-09-01',
//       bankDetails: '5566778899 Zenith Bank',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     }
//   ];

//   const toggleRowExpansion = (rowIndex) => {
//     setExpandedRows(prev => ({
//       ...prev,
//       [rowIndex]: !prev[rowIndex]
//     }));
//   };

//   const columns = [
//     { title: 'S/N', accessor: 'sn' },
//     { title: 'Employee id', accessor: 'employeeId' },
//     { title: 'Name', accessor: 'name' },
//     { title: 'Department', accessor: 'department' },
//     { title: 'Position', accessor: 'position' },
//     { title: 'Employment type', accessor: 'employmentType' },
//     { 
//       title: 'Salary', 
//       accessor: 'salary', 
//       render: (value) => `₦${value}` 
//     },
//     { 
//       title: 'Status', 
//       accessor: 'status', 
//       render: (value) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium ${
//             value === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//           }`}
//         >
//           {value}
//         </span>
//       ) 
//     },
//     { 
//       title: 'Action', 
//       accessor: 'action', 
//       render: (_, row, index) => (
//         <div 
//           className="flex items-center gap-1 cursor-pointer"
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleRowExpansion(index);
//           }}
//         >
//           <span className="text-black text-xs">Manage</span>
//           {expandedRows[index] ? (
//             <FaChevronUp size={10} className="text-black" />
//           ) : (
//             <FaChevronDown size={10} className="text-black" />
//           )}
//         </div>
//       ) 
//     }
//   ];

//   const handleEditStaff = (employee) => {
//     console.log('Edit staff:', employee);
//   };

//   const handleDeleteStaff = (employee) => {
//     console.log('Delete staff:', employee);
//   };

//   const handleTerminateEmployment = (employee) => {
//     setSelectedEmployee(employee);
//     setTerminationDate('');
//     setTerminationReason('');
//     setShowTerminateModal(true);
//   };

//   const handleModalClose = () => {
//     setShowTerminateModal(false);
//     setSelectedEmployee(null);
//     setTerminationReason('');
//     setTerminationDate('');
//   };

//   const handleContinue = () => {
//     if (terminationReason.trim() && terminationDate) {
//       console.log('Termination submitted:', {
//         employee: selectedEmployee,
//         terminationDate,
//         reason: terminationReason
//       });
//       handleModalClose();
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="bg-white rounded-lg border border-gray-300">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray">
//                 {columns.map((column, index) => (
//                   <th key={index} className="py-3 px-6 text-left">
//                     {column.title}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {staffData.map((row, rowIndex) => (
//                 <React.Fragment key={rowIndex}>
//                   <tr className="text-xs text-black border-b border-gray-300 hover:bg-gray-50">
//                     {columns.map((col, colIndex) => (
//                       <td className="py-4 px-6 capitalize" key={colIndex}>
//                         {col.render ? col.render(row[col.accessor], row, rowIndex) : row[col.accessor]}
//                       </td>
//                     ))}
//                   </tr>
//                   {expandedRows[rowIndex] && (
//                     <tr>
//                       <td colSpan={columns.length} className="px-6 py-4 bg-gray-50 border-b border-gray-300">
//                         <div className="flex items-start gap-6">
//                           <div className="flex-shrink-0">
//                             <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
//                               <span className="text-white text-lg font-semibold">
//                                 {row.name.split(' ').map(n => n[0]).join('')}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="flex-1 grid grid-cols-6 gap-6 text-xs">
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Name</p>
//                                 <p className="text-black font-medium">{row.name}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Employee ID</p>
//                                 <p className="font-medium bg-black text-white px-2 py-1 rounded text-xs inline-block">
//                                   {row.employeeId}
//                                 </p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Employment Status</p>
//                                 <p className="text-black font-medium">{row.status}</p>
//                               </div>
//                             </div>
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Department</p>
//                                 <p className="text-black font-medium">{row.department}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Contact No.</p>
//                                 <p className="text-black font-medium">{row.contactNo}</p>
//                               </div>
//                             </div>
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Position</p>
//                                 <p className="text-black font-medium">{row.position}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Email address</p>
//                                 <p className="text-black font-medium">{row.emailAddress}</p>
//                               </div>
//                             </div>
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Employment type</p>
//                                 <p className="text-black font-medium">{row.employmentType}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Employment date</p>
//                                 <p className="text-black font-medium">{row.employmentDate}</p>
//                               </div>
//                             </div>
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Salary</p>
//                                 <p className="text-black font-medium">₦{row.salary}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Bank details</p>
//                                 <p className="text-black font-medium">{row.bankDetails}</p>
//                               </div>
//                             </div>
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Benefit</p>
//                                 <p className="text-black font-medium">{row.benefit}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Payment method</p>
//                                 <p className="text-black font-medium">{row.paymentMethod}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-3 mt-6">
//                           <Button 
//                             onClick={() => handleEditStaff(row)}
//                             className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
//                           >
//                             Edit Staff
//                           </Button>
//                           <Button 
//                             onClick={() => handleDeleteStaff(row)}
//                             className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
//                           >
//                             Delete Staff
//                           </Button>
//                           <Button 
//                             onClick={() => handleTerminateEmployment(row)}
//                             className="px-4 py-2 text-xs border border-red-300 text-white bg-red-500 hover:bg-red-50 rounded"
//                           >
//                             Terminate Employment
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
      
//       <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      
//       {/* Termination Modal */}
//       <Modal open={showTerminateModal} setOpen={setShowTerminateModal}>
//         <div className="bg-white rounded-lg p-6 relative">
//           {/* Close Button */}
//           <button 
//             onClick={handleModalClose}
//             className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
//           >
//             ×
//           </button>
          
//           {/* Modal Header */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-black mb-1">Termination Details</h2>
//             <p className="text-sm text-black">Provide details about the termination</p>
//           </div>
          
//           {/* Employee Info Grid */}
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div>
//               <p className="text-sm text-black mb-1">Employee:</p>
//               <p className="text-sm font-medium text-black">{selectedEmployee?.name}</p>
//             </div>
//             <div>
//               <p className="text-sm text-black mb-1">Department:</p>
//               <p className="text-sm font-medium text-black">{selectedEmployee?.department}</p>
//             </div>
//             <div>
//               <p className="text-sm text-black mb-1">Position:</p>
//               <p className="text-sm font-medium text-black">{selectedEmployee?.position}</p>
//             </div>
//             <div>
//               <p className="text-sm text-black mb-1">Employment date:</p>
//               <p className="text-sm font-medium text-black">{selectedEmployee?.employmentDate}</p>
//             </div>
//           </div>
          
//           {/* Form Fields */}
//           <div className="space-y-4 mb-6">
//             <div>
//               <label className="block text-sm text-black mb-2">Termination Date</label>
//               <Input
//                 type="date"
//                 value={terminationDate}
//                 onChange={(e) => setTerminationDate(e.target.value)}
//                 className="w-full text-black"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm text-black mb-2">Reason for Termination</label>
//               <Textarea
//                 value={terminationReason}
//                 onChange={(e) => setTerminationReason(e.target.value)}
//                 placeholder="Enter detailed reason for termination"
//                 rows={4}
//                 className="w-full text-black"
//               />
//             </div>
//           </div>
          
//           {/* Action Buttons */}
//           <div className="flex justify-end gap-3">
//             <Button 
//               onClick={handleModalClose}
//               className="px-6 py-2 text-sm bg-black text-white hover:bg-gray-300"
//             >
//               Back
//             </Button>
//             <Button
//               onClick={handleContinue}
//               disabled={!terminationReason.trim() || !terminationDate}
//               className={`px-6 py-2 text-sm ${
//                 !terminationReason.trim() || !terminationDate
//                   ? 'bg-gray-300 text-black cursor-not-allowed hover:opacity-100' 
//                   : 'bg-black text-white hover:opacity-60'
//               }`}
//             >
//               Continue
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default CurrentStaffTab

// 'use client'
// import React, { useState } from 'react';
// import Table from '@/components/ui/Table';
// import Pagination from '@/components/ui/Pagination';
// import Button from '@/components/ui/Button';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import Modal from '@/components/ui/Modal';
// import Input from '@/components/ui/Input';
// import Textarea from '@/components/ui/Textarea';
// import Card from '@/components/ui/Card';

// const CurrentStaffTab = ({ currentPage, totalPages, handlePageChange }) => {
//   const [expandedRows, setExpandedRows] = useState({});
//   const [showTerminationModal, setShowTerminationModal] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [terminationReason, setTerminationReason] = useState('');
//   const [terminationDate, setTerminationDate] = useState('');

//   const staffData = [
//     {
//       sn: 1,
//       employeeId: 'OP/VFLA/1705/099',
//       name: 'Ayobami Joy',
//       department: 'Operations',
//       position: 'Head of department',
//       employmentType: 'Full Time',
//       salary: '650,000',
//       status: 'Active',
//       contactNo: '08068245623',
//       emailAddress: 'ayobami15joy@gmail.com',
//       employmentDate: '2020-07-22',
//       bankDetails: '3134275188 Firstbank',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     },
//     {
//       sn: 2,
//       employeeId: 'TE/VFLA/1005/079',
//       name: 'Bethel Esther',
//       department: 'Tech',
//       position: 'Intern',
//       employmentType: 'Full Time',
//       salary: '70,000',
//       status: 'Active',
//       contactNo: '08162351131',
//       emailAddress: 'bethel.esther@gmail.com',
//       employmentDate: '2023-01-15',
//       bankDetails: '2245178965 GTBank',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     },
//     {
//       sn: 3,
//       employeeId: 'DEV/VFLA/1005/049',
//       name: 'Ohagbu Chika',
//       department: 'Dev team',
//       position: 'Front end developer',
//       employmentType: 'Full Time',
//       salary: '550,000',
//       status: 'On leave',
//       contactNo: '08162357107',
//       emailAddress: 'ohagbu.chika@gmail.com',
//       employmentDate: '2021-03-10',
//       bankDetails: '1122334455 UBA',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     },
//     {
//       sn: 4,
//       employeeId: 'DEV/VFLA/1005/099',
//       name: 'John Paul',
//       department: 'Dev team',
//       position: 'Ui/ux designer',
//       employmentType: 'Full Time',
//       salary: '500,000',
//       status: 'Active',
//       contactNo: '09183902058',
//       emailAddress: 'john.paul@gmail.com',
//       employmentDate: '2022-05-20',
//       bankDetails: '7788990011 Access Bank',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     },
//     {
//       sn: 5,
//       employeeId: 'TE/VFLA/1005/079',
//       name: 'Okeke Sandra',
//       department: 'Tech team',
//       position: 'IT student',
//       employmentType: 'Full Time',
//       salary: '70,000',
//       status: 'Active',
//       contactNo: '09123768365',
//       emailAddress: 'okeke.sandra@gmail.com',
//       employmentDate: '2023-09-01',
//       bankDetails: '5566778899 Zenith Bank',
//       benefit: 'Health Insurance',
//       paymentMethod: 'Bank Transfer'
//     }
//   ];

//   const toggleRowExpansion = (rowIndex) => {
//     setExpandedRows(prev => ({
//       ...prev,
//       [rowIndex]: !prev[rowIndex]
//     }));
//   };

//   const columns = [
//     { title: 'S/N', accessor: 'sn' },
//     { title: 'Employee id', accessor: 'employeeId' },
//     { title: 'Name', accessor: 'name' },
//     { title: 'Department', accessor: 'department' },
//     { title: 'Position', accessor: 'position' },
//     { title: 'Employment type', accessor: 'employmentType' },
//     {
//       title: 'Salary',
//       accessor: 'salary',
//       render: (value) => `₦${value}`
//     },
//     {
//       title: 'Status',
//       accessor: 'status',
//       render: (value) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium ${
//             value === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//           }`}
//         >
//           {value}
//         </span>
//       )
//     },
//     {
//       title: 'Action',
//       accessor: 'action',
//       render: (_, row, index) => (
//         <div
//           className="flex items-center gap-1 cursor-pointer"
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleRowExpansion(index);
//           }}
//         >
//           <span className="text-black text-xs">Manage</span>
//           {expandedRows[index] ? (
//             <FaChevronUp size={10} className="text-black" />
//           ) : (
//             <FaChevronDown size={10} className="text-black" />
//           )}
//         </div>
//       )
//     }
//   ];

//   const handleEditStaff = (employee) => {
//     console.log('Edit staff:', employee);
//   };

//   const handleDeleteStaff = (employee) => {
//     console.log('Delete staff:', employee);
//   };

//   const handleTerminateEmployment = (employee) => {
//     setSelectedEmployee(employee);
//     setTerminationDate('');
//     setTerminationReason('');
//     setShowTerminationModal(true);
//   };

//   const handleModalClose = () => {
//     setShowTerminationModal(false);
//     setSelectedEmployee(null);
//   };

//   const handleContinue = () => {
//     if (terminationReason.trim()) {
//       console.log('Termination submitted:', {
//         employee: selectedEmployee,
//         terminationDate,
//         reason: terminationReason
//       });
//       handleModalClose();
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="bg-white rounded-lg border border-gray-300">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray">
//                 {columns.map((column, index) => (
//                   <th key={index} className="py-3 px-6 text-left">
//                     {column.title}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {staffData.map((row, rowIndex) => (
//                 <React.Fragment key={rowIndex}>
//                   <tr className="text-xs text-black border-b border-gray-300 hover:bg-gray-50">
//                     {columns.map((col, colIndex) => (
//                       <td className="py-4 px-6 capitalize" key={colIndex}>
//                         {col.render ? col.render(row[col.accessor], row, rowIndex) : row[col.accessor]}
//                       </td>
//                     ))}
//                   </tr>
//                   {expandedRows[rowIndex] && (
//                     <tr>
//                       <td colSpan={columns.length} className="px-6 py-4 bg-gray-50 border-b border-gray-300">
//                         <div className="flex items-start gap-6">
//                           <div className="flex-shrink-0">
//                             <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
//                               <span className="text-white text-lg font-semibold">
//                                 {row.name.split(' ').map(n => n[0]).join('')}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="flex-1 grid grid-cols-6 gap-6 text-xs">
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Name</p>
//                                 <p className="text-black font-medium">{row.name}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Employee ID</p>
//                                 <p className="font-medium bg-black text-white px-2 py-1 rounded text-xs inline-block">
//                                   {row.employeeId}
//                                 </p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Employment Status</p>
//                                 <p className="text-black font-medium">{row.status}</p>
//                               </div>
//                             </div>
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Department</p>
//                                 <p className="text-black font-medium">{row.department}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Contact No.</p>
//                                 <p className="text-black font-medium">{row.contactNo}</p>
//                               </div>
//                             </div>
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Position</p>
//                                 <p className="text-black font-medium">{row.position}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Email address</p>
//                                 <p className="text-black font-medium">{row.emailAddress}</p>
//                               </div>
//                             </div>
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Employment type</p>
//                                 <p className="text-black font-medium">{row.employmentType}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Employment date</p>
//                                 <p className="text-black font-medium">{row.employmentDate}</p>
//                               </div>
//                             </div>
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Salary</p>
//                                 <p className="text-black font-medium">₦{row.salary}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Bank details</p>
//                                 <p className="text-black font-medium">{row.bankDetails}</p>
//                               </div>
//                             </div>
//                             <div className="space-y-3">
//                               <div>
//                                 <p className="text-black mb-1">Benefit</p>
//                                 <p className="text-black font-medium">{row.benefit}</p>
//                               </div>
//                               <div>
//                                 <p className="text-black mb-1">Payment method</p>
//                                 <p className="text-black font-medium">{row.paymentMethod}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-3 mt-6">
//                           <Button
//                             onClick={() => handleEditStaff(row)}
//                             className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
//                           >
//                             Edit Staff
//                           </Button>
//                           <Button
//                             onClick={() => handleDeleteStaff(row)}
//                             className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
//                           >
//                             Delete Staff
//                           </Button>
//                           <Button
//                             onClick={() => handleTerminateEmployment(row)}
//                             className="px-4 py-2 text-xs border border-red-300 text-white bg-red-500 hover:bg-red-50 rounded"
//                           >
//                             Terminate Employment
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

//       <Modal open={showTerminationModal} setOpen={setShowTerminationModal}>
//         <div className="p-6">
//           <h3 className="text-lg font-bold mb-4 text-black">Termination Details</h3>
//           <p className="text-sm text-gray-800 mb-4">Provide details about the termination</p>
//           <div className="space-y-4">
//             <div>
//               <p className="text-sm text-black mb-1">Employee:</p>
//               <p className="text-sm font-medium text-black">{selectedEmployee?.name}</p>
//             </div>
//             <div>
//               <p className="text-sm text-black mb-1">Department:</p>
//               <p className="text-sm font-medium text-black">{selectedEmployee?.department}</p>
//             </div>
//             <div>
//               <p className="text-sm text-black mb-1">Position:</p>
//               <p className="text-sm font-medium text-black">{selectedEmployee?.position}</p>
//             </div>
//             <div>
//               <p className="text-sm text-black mb-1">Employment date:</p>
//               <p className="text-sm font-medium text-black">{selectedEmployee?.employmentDate}</p>
//             </div>
//             <div>
//               <p className="text-sm text-black mb-1">Termination Date</p>
//               <Input
//                 type="date"
//                 name="terminationDate"
//                 value={terminationDate}
//                 onChange={(e) => setTerminationDate(e.target.value)}
//                 className="w-full text-black"
//               />
//             </div>
//             <div>
//               <p className="text-sm text-black mb-1">Reason for Termination</p>
//               <Textarea
//                 rows={4}
//                 value={terminationReason}
//                 onChange={(e) => setTerminationReason(e.target.value)}
//                 placeholder="Enter detailed reason for termination"
//                 className='text-black'
//               />
//             </div>
//           </div>
//           <div className="flex justify-end gap-2 mt-6">
//             <Button
//               onClick={handleModalClose}
//               className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
//             >
//               Back
//             </Button>
//             <Button
//               onClick={handleContinue}
//             //   disabled={!terminationReason.trim()}
//               className="px-4 py-2 text-xs border border-gray-300 text-white bg-black rounded"
//             >
//               Continue
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default CurrentStaffTab;


'use client'
import React, { useState } from 'react';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import Button from '@/components/ui/Button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';

const CurrentStaffTab = ({ currentPage, totalPages, handlePageChange }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [showTerminationModal, setShowTerminationModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [terminationReason, setTerminationReason] = useState('');
  const [terminationDate, setTerminationDate] = useState('');
  const staffData = [
    {
      sn: 1,
      employeeId: 'OP/VFLA/1705/099',
      name: 'Ayobami Joy',
      department: 'Operations',
      position: 'Head of department',
      employmentType: 'Full Time',
      salary: '650,000',
      status: 'Active',
      contactNo: '08068245623',
      emailAddress: 'ayobami15joy@gmail.com',
      employmentDate: '2020-07-22',
      bankDetails: '3134275188 Firstbank',
      benefit: 'Health Insurance',
      paymentMethod: 'Bank Transfer'
    },
    {
      sn: 2,
      employeeId: 'TE/VFLA/1005/079',
      name: 'Bethel Esther',
      department: 'Tech',
      position: 'Intern',
      employmentType: 'Full Time',
      salary: '70,000',
      status: 'Active',
      contactNo: '08162351131',
      emailAddress: 'bethel.esther@gmail.com',
      employmentDate: '2023-01-15',
      bankDetails: '2245178965 GTBank',
      benefit: 'Health Insurance',
      paymentMethod: 'Bank Transfer'
    },
    {
      sn: 3,
      employeeId: 'DEV/VFLA/1005/049',
      name: 'Ohagbu Chika',
      department: 'Dev team',
      position: 'Front end developer',
      employmentType: 'Full Time',
      salary: '550,000',
      status: 'On leave',
      contactNo: '08162357107',
      emailAddress: 'ohagbu.chika@gmail.com',
      employmentDate: '2021-03-10',
      bankDetails: '1122334455 UBA',
      benefit: 'Health Insurance',
      paymentMethod: 'Bank Transfer'
    },
    {
      sn: 4,
      employeeId: 'DEV/VFLA/1005/099',
      name: 'John Paul',
      department: 'Dev team',
      position: 'Ui/ux designer',
      employmentType: 'Full Time',
      salary: '500,000',
      status: 'Active',
      contactNo: '09183902058',
      emailAddress: 'john.paul@gmail.com',
      employmentDate: '2022-05-20',
      bankDetails: '7788990011 Access Bank',
      benefit: 'Health Insurance',
      paymentMethod: 'Bank Transfer'
    },
    {
      sn: 5,
      employeeId: 'TE/VFLA/1005/079',
      name: 'Okeke Sandra',
      department: 'Tech team',
      position: 'IT student',
      employmentType: 'Full Time',
      salary: '70,000',
      status: 'Active',
      contactNo: '09123768365',
      emailAddress: 'okeke.sandra@gmail.com',
      employmentDate: '2023-09-01',
      bankDetails: '5566778899 Zenith Bank',
      benefit: 'Health Insurance',
      paymentMethod: 'Bank Transfer'
    }
  ];

  const toggleRowExpansion = (rowIndex) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowIndex]: !prev[rowIndex]
    }));
  };

  const columns = [
    { title: 'S/N', accessor: 'sn' },
    { title: 'Employee id', accessor: 'employeeId' },
    { title: 'Name', accessor: 'name' },
    { title: 'Department', accessor: 'department' },
    { title: 'Position', accessor: 'position' },
    { title: 'Employment type', accessor: 'employmentType' },
    {
      title: 'Salary',
      accessor: 'salary',
      render: (value) => `₦${value}`
    },
    {
      title: 'Status',
      accessor: 'status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {value}
        </span>
      )
    },
    {
      title: 'Action',
      accessor: 'action',
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
      )
    }
  ];

  const handleEditStaff = (employee) => {
    console.log('Edit staff:', employee);
  };

  const handleDeleteStaff = (employee) => {
    console.log('Delete staff:', employee);
  };

  const handleTerminateEmployment = (employee) => {
    setSelectedEmployee(employee);
    setTerminationDate('');
    setTerminationReason('');
    setShowTerminationModal(true);
  };

  const handleModalClose = () => {
    setShowTerminationModal(false);
    setSelectedEmployee(null);
  };

 const handleContinue = () => {
  if (terminationReason.trim() && terminationDate) {
    console.log('Termination submitted:', {
      employee: selectedEmployee,
      terminationDate,
      reason: terminationReason
    });
    setShowTerminationModal(false);
    setShowConfirmationModal(true);
  }
};


  const handleConfirmationClose = () => {
    setShowConfirmationModal(false);
    setSelectedEmployee(null);
  };

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
              {staffData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr className="text-xs text-black border-b border-gray-300 hover:bg-gray-50">
                    {columns.map((col, colIndex) => (
                      <td className="py-4 px-6 capitalize" key={colIndex}>
                        {col.render ? col.render(row[col.accessor], row, rowIndex) : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                  {expandedRows[rowIndex] && (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-4 bg-gray-50 border-b border-gray-300">
                        <div className="flex items-start gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                              <span className="text-white text-lg font-semibold">
                                {row.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 grid grid-cols-6 gap-6 text-xs">
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Name</p>
                                <p className="text-black font-medium">{row.name}</p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Employee ID</p>
                                <p className="font-medium bg-black text-white px-2 py-1 rounded text-xs inline-block">
                                  {row.employeeId}
                                </p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Employment Status</p>
                                <p className="text-black font-medium">{row.status}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Department</p>
                                <p className="text-black font-medium">{row.department}</p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Contact No.</p>
                                <p className="text-black font-medium">{row.contactNo}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Position</p>
                                <p className="text-black font-medium">{row.position}</p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Email address</p>
                                <p className="text-black font-medium">{row.emailAddress}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Employment type</p>
                                <p className="text-black font-medium">{row.employmentType}</p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Employment date</p>
                                <p className="text-black font-medium">{row.employmentDate}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Salary</p>
                                <p className="text-black font-medium">₦{row.salary}</p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Bank details</p>
                                <p className="text-black font-medium">{row.bankDetails}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-black mb-1">Benefit</p>
                                <p className="text-black font-medium">{row.benefit}</p>
                              </div>
                              <div>
                                <p className="text-black mb-1">Payment method</p>
                                <p className="text-black font-medium">{row.paymentMethod}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                          <Button
                            onClick={() => handleEditStaff(row)}
                            className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
                          >
                            Edit Staff
                          </Button>
                          <Button
                            onClick={() => handleDeleteStaff(row)}
                            className="px-4 py-2 text-xs border border-gray-300 text-white bg-black hover:bg-gray-50 rounded"
                          >
                            Delete Staff
                          </Button>
                          <Button
                            onClick={() => handleTerminateEmployment(row)}
                            className="px-4 py-2 text-xs border border-red-300 text-white bg-red-500 hover:bg-red-50 rounded"
                          >
                            Terminate Employment
                          </Button>
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
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      <Modal open={showTerminationModal} setOpen={setShowTerminationModal}>
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4 text-black">Termination Details</h3>
          <p className="text-sm text-gray-600 mb-4">Provide details about the termination</p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-black mb-1">Employee:</p>
              <p className="text-sm font-medium text-black">{selectedEmployee?.name}</p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Department:</p>
              <p className="text-sm font-medium text-black">{selectedEmployee?.department}</p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Position:</p>
              <p className="text-sm font-medium text-black">{selectedEmployee?.position}</p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Employment date:</p>
              <p className="text-sm font-medium text-black">{selectedEmployee?.employmentDate}</p>
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
                className='text-black'
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
  disabled={!terminationReason.trim() || !terminationDate}
  className={`px-4 py-2 text-xs border border-gray-300 text-white rounded ${
    !terminationReason.trim() || !terminationDate
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-black'
  }`}
>
  Continue
</button>

          </div>
        </div>
      </Modal>
      <Modal open={showConfirmationModal} setOpen={setShowConfirmationModal}>
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <span className="text-green-500 text-2xl">✔</span>
          </div>
          <h3 className="text-lg font-bold mb-2 text-black text-center">Employment Terminated Successfully</h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            The employment of {selectedEmployee?.name} has been terminated effective {terminationDate || 'the selected date'}.
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