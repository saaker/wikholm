type MenuToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function MenuToggle({ isOpen, onToggle }: MenuToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden mb-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-foreground hover:bg-muted transition-colors"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
      <span className="text-sm font-medium">
        {isOpen ? "Stäng meny" : "Öppna meny"}
      </span>
    </button>
  );
}
