import { ADMIN_TRANSLATIONS } from "../shared/translations";

type MoveButtonsProps = {
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  locale: "sv" | "en";
};

export function MoveButtons({ index, total, onMove, canMoveUp, canMoveDown, locale }: MoveButtonsProps) {
  const disableUp = canMoveUp !== undefined ? !canMoveUp : index === 0;
  const disableDown = canMoveDown !== undefined ? !canMoveDown : index === total - 1;
  const t = ADMIN_TRANSLATIONS[locale];

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        disabled={disableUp}
        onClick={() => onMove(index, index - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted disabled:opacity-30"
        title={t.moveUp}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      <button
        type="button"
        disabled={disableDown}
        onClick={() => onMove(index, index + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted disabled:opacity-30"
        title={t.moveDown}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
}
