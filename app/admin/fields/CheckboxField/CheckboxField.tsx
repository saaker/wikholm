type CheckboxFieldProps = {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
};

export function CheckboxField({
  label,
  value,
  onChange,
}: CheckboxFieldProps) {
  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="peer sr-only"
          />
          <div className="w-5 h-5 rounded border-2 border-border bg-surface peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
            {value && (
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {label}
        </span>
      </label>
    </div>
  );
}
