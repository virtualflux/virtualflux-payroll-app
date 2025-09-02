'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ open, setOpen, children }) => {
  const closeModal = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-[rgba(0,0,0,0.1)] mx-auto flex 
          justify-center items-center z-[1000] p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // onClick={closeModal}
        >
          <motion.div
            className="bg-white rounded-lg shadow-md max-w-[450px] max-h-[700px] mt-9
            overflow-y-auto w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
