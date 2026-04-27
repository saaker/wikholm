import { inputCls } from "../../shared/adminTypes";

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  large?: boolean;
  placeholder?: string;
};

export function Field({
  label,
  value,
  onChange,
  multiline,
  large,
  placeholder,
}: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={large ? 8 : 3}
          className={`${inputCls} resize-none ${large ? "min-h-50" : ""}`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
