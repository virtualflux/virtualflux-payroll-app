// // pages/ManageStaff.jsx
// 'use client'

// import React, { useState, useRef } from 'react';
// import { FaPlus, FaUpload, FaTimes, FaTrash } from 'react-icons/fa';
// import Container from '@/components/ui/Container';
// import Button from '@/components/ui/Button';
// import { Tabs, Tab } from '@/components/ui/Tabs';
// import Modal from '@/components/ui/Modal';
// import CurrentStaffTab from '@/components/tabs/CurrentStaffTab';
// import TerminatedStaffTab from '@/components/tabs/TerminatedStaffTab';

// const ManageStaff = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [uploadModalOpen, setUploadModalOpen] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [fileError, setFileError] = useState('');
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null);

//   const totalPages = 10;

//   const handlePageChange = (page) => setCurrentPage(page);
//   const handleAddStaff = () => setUploadModalOpen(true);

//   // File upload logic
//   const validateFile = (file) => {
//     const allowedTypes = [
//       'text/csv',
//       'application/vnd.ms-excel',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     ];
//     const allowedExtensions = ['.csv', '.xlsx', '.xls'];
//     const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
//     return allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension);
//   };

//   const handleFileUpload = (file) => {
//     setFileError('');
//     if (!validateFile(file)) {
//       setFileError('Request contains an unknown file or unsupported file type');
//       return;
//     }
//     setUploadedFile(file);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = Array.from(e.dataTransfer.files);
//     if (files.length > 0) handleFileUpload(files[0]);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleFileInputChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) handleFileUpload(files[0]);
//   };

//   const handleBrowseFiles = () => {
//     fileInputRef.current?.click();
//   };

//   const handleRemoveFile = () => {
//     setUploadedFile(null);
//     setFileError('');
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   const handlePreviewUpload = () => {
//     if (uploadedFile) {
//       console.log('Processing file:', uploadedFile.name);
//       setUploadModalOpen(false);
//       setUploadedFile(null);
//       setFileError('');
//     }
//   };

//   const closeModal = () => {
//     setUploadModalOpen(false);
//     setUploadedFile(null);
//     setFileError('');
//   };

//   return (
//     <Container>
//       <div className="w-full space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-semibold text-black">Manage Staff</h1>
//           <Button onClick={handleAddStaff} className="flex items-center gap-2 bg-black text-white">
//             <FaPlus size={14} /> Add Staff
//           </Button>
//         </div>

//         {/* Tabs */}
//         <Tabs>
//           <Tab title="Current staff">
//             <CurrentStaffTab
//               currentPage={currentPage}
//               totalPages={totalPages}
//               handlePageChange={handlePageChange}
//             />
//           </Tab>
//           <Tab title="Terminated staff">
//             <TerminatedStaffTab
//               currentPage={currentPage}
//               totalPages={totalPages}
//               handlePageChange={handlePageChange}
//             />
//           </Tab>
//         </Tabs>

//         {/* Upload Modal */}
//         <Modal open={uploadModalOpen} setOpen={setUploadModalOpen}>
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold text-black">Upload staff data file</h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 transition-colors">
//                 <FaTimes size={16} />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div
//                 className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                   isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
//                 }`}
//                 onDrop={handleDrop}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//               >
//                 {!uploadedFile ? (
//                   <>
//                     <FaUpload size={24} className="mx-auto mb-4 text-gray-400" />
//                     <p className="text-sm text-black mb-2">
//                       Drag and drop or <span className="font-medium">choose a file</span> to upload data
//                     </p>
//                     <p className="text-xs text-gray-500 mb-4">supported formats .csv, .xlsx and .xls</p>
//                     <Button onClick={handleBrowseFiles} className="bg-black hover:bg-gray-800">
//                       Browse Files
//                     </Button>
//                   </>
//                 ) : (
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-center gap-3 p-3 bg-green-50 rounded-lg">
//                       <span className="text-sm text-black font-medium">{uploadedFile.name}</span>
//                       <button onClick={handleRemoveFile} className="text-red-500 hover:text-red-700 transition-colors">
//                         <FaTrash size={14} />
//                       </button>
//                     </div>
//                     <p className="text-xs text-green-600">File uploaded successfully!</p>
//                   </div>
//                 )}
//               </div>

//               {fileError && <p className="text-red-500 text-sm">{fileError}</p>}

//               <p className="text-xs text-gray-600">
//                 <strong>Note:</strong> Upload a CSV or Excel file containing staff information
//               </p>

//               <div className="flex justify-end pt-4">
//                 <Button
//                   onClick={handlePreviewUpload}
//                   disabled={!uploadedFile}
//                   className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300"
//                 >
//                   Preview Upload
//                 </Button>
//               </div>
//             </div>

//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileInputChange}
//               accept=".csv,.xlsx,.xls"
//               className="hidden"
//             />
//           </div>
//         </Modal>
//       </div>
//     </Container>
//   );
// };

// export default ManageStaff;

// pages/ManageStaff.jsx
'use client'

import React, { useState } from 'react';
import { FaSync } from 'react-icons/fa'; // only need refresh icon now
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Tabs, Tab } from '@/components/ui/Tabs';
import CurrentStaffTab from '@/components/tabs/CurrentStaffTab';
import TerminatedStaffTab from '@/components/tabs/TerminatedStaffTab';

const ManageStaff = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 10;

  const handlePageChange = (page) => setCurrentPage(page);

  // 🔄 Refresh handler
  const handleRefresh = () => {
    console.log("Refreshing staff data...");
    // Add API call or data reload logic here if needed
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
            />
          </Tab>
          <Tab title="Terminated staff">
            <TerminatedStaffTab
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default ManageStaff;
