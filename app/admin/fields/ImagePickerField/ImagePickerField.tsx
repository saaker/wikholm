"use client";

import { useState } from "react";
import { inputCls } from "../../shared/adminTypes";
import basePath from "@/lib/basePath";

type ImagePickerFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  defaultFolder?: string;
};

export function ImagePickerField({
  label,
  value,
  onChange,
  defaultFolder,
}: ImagePickerFieldProps) {
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
