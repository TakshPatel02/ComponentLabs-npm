import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const UploadButton = ({ className = "" }) => {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let timeout;
    if (status === "uploading") {
      timeout = setTimeout(() => {
        setStatus("success");
      }, 2500);
    } else if (status === "success") {
      timeout = setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [status]);

  const handleClick = () => {
    if (status === "idle") {
      setStatus("uploading");
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={status !== "idle"}
      animate={{
        scale: status === "uploading" ? 0.97 : 1,
        borderColor: status === "success" ? "#11100a" : "#11100a",
        backgroundColor: status === "success" ? "#11100a" : "transparent",
        color: status === "success" ? "#fdf8f7" : "#11100a",
      }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      whileHover={
        status === "idle"
          ? { y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }
          : {}
      }
      whileTap={status === "idle" ? { scale: 0.95 } : {}}
      className={`relative px-6 py-3.5 min-w-50 flex items-center justify-center font-['Space_Grotesk',sans-serif] text-[13px] font-medium tracking-widest uppercase border overflow-hidden ${
        status !== "idle" ? "cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      {/* Progress Bar Background */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{
          width:
            status === "uploading"
              ? "100%"
              : status === "success"
                ? "100%"
                : "0%",
        }}
        transition={{
          duration: status === "uploading" ? 2.5 : 0.3,
          ease: status === "uploading" ? "linear" : "easeOut",
        }}
        className="absolute left-0 top-0 h-full bg-[#11100a]/10 z-0"
      />

      <div className="relative z-10 flex items-center justify-center w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">
                upload
              </span>
              Upload File
            </motion.div>
          )}

          {status === "uploading" && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="material-symbols-outlined text-[18px]"
              >
                sync
              </motion.span>
              Uploading...
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">
                check_circle
              </span>
              Complete
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
};

export default UploadButton;
