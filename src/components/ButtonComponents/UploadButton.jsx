import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * UploadButton - A ready-to-use upload button for file uploads.
 *
 * Props:
 * @param {function} onUpload - (required) Async function called with FileList, should return a Promise. Shows success only when resolved.
 * @param {string} [accept] - File types to accept (e.g. 'image/*').
 * @param {boolean} [multiple] - Allow multiple file selection.
 * @param {string} [idleText] - Text for idle state.
 * @param {string} [uploadingText] - Text for uploading state.
 * @param {string} [successText] - Text for success state.
 * @param {string} [className] - Additional class names.
 * @param {function} [onSuccess] - Callback after successful upload.
 * @param {function} [onError] - Callback after failed upload.
 */
export const UploadButton = ({
  onUpload,
  accept = "",
  multiple = false,
  idleText = "Upload File",
  uploadingText = "Uploading...",
  successText = "Complete",
  className = "",
  onSuccess,
  onError,
}) => {
  const [status, setStatus] = useState("idle");
  const inputRef = useRef();

  // Reset to idle after showing success
  React.useEffect(() => {
    let timeout;
    if (status === "success") {
      timeout = setTimeout(() => setStatus("idle"), 3000);
    }
    return () => clearTimeout(timeout);
  }, [status]);

  const handleButtonClick = () => {
    if (status === "idle" && inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !onUpload) return;
    setStatus("uploading");
    try {
      await onUpload(files);
      setStatus("success");
      if (onSuccess) onSuccess(files);
    } catch (err) {
      setStatus("idle");
      if (onError) onError(err);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        tabIndex={-1}
      />
      <motion.button
        type="button"
        onClick={handleButtonClick}
        disabled={status === "uploading"}
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
          status === "uploading" ? "cursor-not-allowed" : "cursor-pointer"
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
                {idleText}
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
                {uploadingText}
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
                {successText}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </>
  );
};
