"use client";

import React, { useEffect } from "react";
import classes from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "small" | "medium" | "large" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = "medium",
  showCloseButton = true,
  closeOnOverlayClick = true,
}: ModalProps) {
  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classes.modalOverlay} onClick={handleOverlayClick}>
      <div
        className={`${classes.modalContent} ${classes[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className={classes.modalHeader}>
            {title && <h2 className={classes.modalTitle}>{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={classes.closeButton}
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className={classes.modalBody}>{children}</div>
      </div>
    </div>
  );
}
