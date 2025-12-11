import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 5000 }) => {
  const premiumEase = [0.16, 1, 0.3, 1];

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const variants = {
    initial: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      x: '-50%'
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      x: '-50%',
      transition: { 
        duration: 0.4, 
        ease: premiumEase 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      x: '-50%',
      transition: { 
        duration: 0.3, 
        ease: premiumEase 
      }
    }
  };

  const isSuccess = type === 'success';

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed top-6 left-1/2 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl"
        style={{
          background: isSuccess 
            ? 'linear-gradient(135deg, rgba(45, 212, 191, 0.15) 0%, rgba(45, 212, 191, 0.05) 100%)' 
            : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
          borderColor: isSuccess ? 'rgba(45, 212, 191, 0.3)' : 'rgba(239, 68, 68, 0.3)',
          boxShadow: isSuccess 
            ? '0 10px 40px rgba(45, 212, 191, 0.2), 0 0 0 1px rgba(45, 212, 191, 0.1) inset' 
            : '0 10px 40px rgba(239, 68, 68, 0.2), 0 0 0 1px rgba(239, 68, 68, 0.1) inset',
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: premiumEase }}
        >
          {isSuccess ? (
            <CheckCircle className="w-5 h-5 text-teal-400" />
          ) : (
            <XCircle className="w-5 h-5 text-red-400" />
          )}
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: premiumEase }}
          className={`text-sm font-medium ${isSuccess ? 'text-teal-400' : 'text-red-400'}`}
        >
          {message}
        </motion.p>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="ml-2 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </motion.button>

        {/* Progress Bar */}
        {duration && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 rounded-full"
            style={{
              background: isSuccess 
                ? 'linear-gradient(90deg, rgba(45, 212, 191, 0.8) 0%, rgba(45, 212, 191, 0.3) 100%)'
                : 'linear-gradient(90deg, rgba(239, 68, 68, 0.8) 0%, rgba(239, 68, 68, 0.3) 100%)',
            }}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
