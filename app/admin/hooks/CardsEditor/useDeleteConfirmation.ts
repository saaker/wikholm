import { useState, useEffect } from "react";
import type { SectionsData } from "@/lib/sectionsDefaults";

type UseDeleteConfirmationProps = {
  onQuickSave: () => Promise<void>;
  sectionsData: SectionsData | null;
  sectionKey: keyof SectionsData;
  resetTracking: () => void;
};

export function useDeleteConfirmation({
  onQuickSave,
  sectionsData,
  sectionKey,
  resetTracking,
}: UseDeleteConfirmationProps) {
  const [deleteConfirming, setDeleteConfirming] = useState<number | null>(null);
  const [pendingDeleteSave, setPendingDeleteSave] = useState(false);

  // Reset delete confirmation on click outside or after timeout
  useEffect(() => {
    if (deleteConfirming === null) return;

    const handleClickOutside = () => setDeleteConfirming(null);
    const timer = setTimeout(() => setDeleteConfirming(null), 5000);

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      clearTimeout(timer);
    };
  }, [deleteConfirming]);

  // Save after delete completes
  useEffect(() => {
    if (!pendingDeleteSave || !sectionsData) return;

    const performSave = async () => {
      await onQuickSave();
      resetTracking();
      setPendingDeleteSave(false);
    };

    performSave();
  }, [pendingDeleteSave, sectionsData, sectionKey, onQuickSave, resetTracking]);

  function handleDeleteClick(index: number, onDelete: () => void) {
    const isConfirming = deleteConfirming === index;

    if (isConfirming) {
      onDelete();
      setPendingDeleteSave(true);
      setDeleteConfirming(null);
    } else {
      setDeleteConfirming(index);
    }
  }

  return {
    deleteConfirming,
    setDeleteConfirming,
    handleDeleteClick,
  };
}
