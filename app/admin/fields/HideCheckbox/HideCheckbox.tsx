type HideCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function HideCheckbox({ checked, onChange }: HideCheckboxProps) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-border text-primary focus:ring-primary"
      />
      <span className="font-medium text-foreground">
        Dold (visas inte på sidan)
      </span>
    </label>
  );
}
