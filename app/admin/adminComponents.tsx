"use client";

import { useState } from "react";
import { Icon, ICON_REGISTRY, ICON_NAMES } from "@/lib/icons";
import { inputCls } from "./adminTypes";
import basePath from "@/lib/basePath";

/* ═══════════════════════════════════════════════════
   Field — generic text / textarea input
   ═══════════════════════════════════════════════════ */
export function Field({
  label,
  value,
  onChange,
  multiline,
  large,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  large?: boolean;
}) {
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
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   IconPicker — dropdown grid with all icons
   ═══════════════════════════════════════════════════ */
export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
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

/* ═══════════════════════════════════════════════════
   ImagePickerField — text input + modal folder browser
   ═══════════════════════════════════════════════════ */
export function ImagePickerField({
  label,
  value,
  onChange,
  defaultFolder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  defaultFolder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [folders, setFolders] = useState<string[]>([]);
  const [selFolder, setSelFolder] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  function openPicker() {
    setOpen(true);
    fetch(`${basePath}/api/images`)
      .then((r) => r.json())
      .then((d) => {
        setFolders(d.folders ?? []);
        if (
          defaultFolder &&
          !selFolder &&
          (d.folders ?? []).includes(defaultFolder)
        ) {
          loadFolder(defaultFolder);
        }
      })
      .catch(() => {});
  }

  function loadFolder(f: string) {
    setSelFolder(f);
    fetch(`${basePath}/api/images?folder=${encodeURIComponent(f)}`)
      .then((r) => r.json())
      .then((d) => setImages(d.images ?? []))
      .catch(() => setImages([]));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <div className="flex items-start gap-3">
        {value && (
          <div className="w-20 h-20 rounded-xl overflow-hidden border border-border bg-muted shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.startsWith("http") ? value : `${basePath}${value}`}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/images/news/photo.jpg"
              className={`${inputCls} flex-1`}
            />
            <button
              type="button"
              onClick={openPicker}
              className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg border border-border bg-muted hover:bg-primary-light hover:text-primary transition-colors text-muted-dark"
              title="Välj från bildbiblioteket"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Picker modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-surface rounded-2xl shadow-2xl border border-border w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-semibold text-sm">Välj bild</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-dark hover:text-foreground text-lg"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-1 min-h-0">
              {/* Folder list */}
              <div className="w-40 border-r border-border p-2 overflow-y-auto shrink-0">
                {folders.map((f) => (
                  <button
                    key={f}
                    onClick={() => loadFolder(f)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors mb-0.5 ${selFolder === f ? "bg-primary/10 text-primary font-medium" : "text-muted-dark hover:bg-muted"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              {/* Images grid */}
              <div className="flex-1 p-3 overflow-y-auto">
                {!selFolder ? (
                  <p className="text-xs text-muted-dark text-center py-8">
                    Välj en mapp till vänster
                  </p>
                ) : images.length === 0 ? (
                  <p className="text-xs text-muted-dark text-center py-8">
                    Inga bilder i mappen
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((img) => {
                      const path = `/images/${selFolder}/${img}`;
                      const selected = value === path;
                      return (
                        <button
                          key={img}
                          type="button"
                          onClick={() => {
                            onChange(path);
                            setOpen(false);
                          }}
                          className={`rounded-lg overflow-hidden border-2 transition-colors ${selected ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/40"}`}
                        >
                          <div className="aspect-square">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`${basePath}/images/${selFolder}/${img}`}
                              alt={img}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-[10px] text-muted-dark truncate px-1 py-0.5">
                            {img}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CheckboxField — checkbox input
   ═══════════════════════════════════════════════════ */
export function CheckboxField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const checked = value === "true";
  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked ? "true" : "false")}
            className="peer sr-only"
          />
          <div className="w-5 h-5 rounded border-2 border-border bg-surface peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
            {checked && (
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

/* ═══════════════════════════════════════════════════
   MoveButtons — up/down reorder arrows
   ═══════════════════════════════════════════════════ */
export function MoveButtons({
  index,
  total,
  onMove,
}: {
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
}) {
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
