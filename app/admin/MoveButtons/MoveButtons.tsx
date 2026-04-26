type MoveButtonsProps = {
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
};

export function MoveButtons({ index, total, onMove }: MoveButtonsProps) {
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted disabled:opacity-30"
        title="Flytta upp"
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
        disabled={index === total - 1}
        onClick={() => onMove(index, index + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted disabled:opacity-30"
        title="Flytta ner"
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
