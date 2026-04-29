import { MoveButtons } from "../MoveButtons/MoveButtons";
import { ADMIN_TRANSLATIONS } from "../shared/translations";

type LocationCardControlsProps = {
  index: number;
  total: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  isEditing: boolean;
  hasMoved: boolean;
  onMove: (from: number, to: number) => void;
  onEditToggle: () => void;
  onDelete: () => void;
  deleteConfirming: boolean;
  locale: "sv" | "en";
};

export function LocationCardControls({
  index,
  total,
  canMoveUp,
  canMoveDown,
  isEditing,
  hasMoved,
  onMove,
  onEditToggle,
  onDelete,
  deleteConfirming,
  locale,
}: LocationCardControlsProps) {
  const t = ADMIN_TRANSLATIONS[locale];

  return (
    <div className="flex flex-col items-end gap-1 shrink-0">
      <div className="flex items-start gap-1">
        <MoveButtons
          index={index}
          total={total}
          onMove={onMove}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          locale={locale}
        />
        <div className="flex flex-col gap-1">
          <button
            onClick={onEditToggle}
            className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg font-medium transition-colors ${
              isEditing || hasMoved
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-slate-700 text-white hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500"
            }`}
            title={isEditing || hasMoved ? t.saveAndClose : t.edit}
          >
            {isEditing || hasMoved ? "✓" : "✎"}
          </button>
          <button
            onClick={onDelete}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              deleteConfirming
                ? "bg-red-600 text-white hover:bg-red-700 animate-pulse"
                : "bg-red-800 text-white hover:bg-red-900"
            }`}
            title={deleteConfirming ? t.confirmDelete : t.delete}
          >
            {deleteConfirming ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
