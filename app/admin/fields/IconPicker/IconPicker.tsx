"use client";

import { useState } from "react";
import { Icon, ICON_REGISTRY, ICON_NAMES } from "@/lib/icons";

type IconPickerProps = {
  value: string;
  onChange: (v: string) => void;
};

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-foreground mb-1">
        Ikon
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border hover:border-primary/30 text-sm w-full"
      >
        <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-primary-dark shrink-0">
          <Icon name={value} className="w-5 h-5" />
        </div>
        <span className="text-muted-dark">
          {ICON_REGISTRY[value]?.label || value}
        </span>
        <svg
          className="w-4 h-4 ml-auto text-muted-dark"
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
      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto bg-surface border border-border rounded-xl shadow-lg p-2 grid grid-cols-4 gap-1">
          {ICON_NAMES.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                onChange(name);
                setOpen(false);
              }}
              title={ICON_REGISTRY[name].label}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary-light transition-colors ${value === name ? "bg-primary-light ring-1 ring-primary/30" : ""}`}
            >
              <Icon name={name} className="w-5 h-5 text-primary-dark" />
              <span className="text-[9px] text-muted-dark truncate w-full text-center">
                {ICON_REGISTRY[name].label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
