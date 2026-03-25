"use client";

import basePath from "@/lib/basePath";

interface ImageManagerProps {
  folders: string[];
  activeFolder: string | null;
  setActiveFolder: (f: string) => void;
  images: string[];
  uploading: boolean;
  dragOver: boolean;
  setDragOver: (v: boolean) => void;
  onUpload: (files: FileList | File[]) => void;
  onDelete: (fileName: string) => void;
  readOnly: boolean;
}

export function ImageManager({
  folders,
  activeFolder,
  setActiveFolder,
  images,
  uploading,
  dragOver,
  setDragOver,
  onUpload,
  onDelete,
  readOnly,
}: ImageManagerProps) {
  return (
    <div className="grid lg:grid-cols-[220px_1fr] gap-8">
      {/* Folder sidebar */}
      <div className="space-y-1">
        {folders.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFolder(f)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeFolder === f ? "bg-primary/10 text-primary font-medium" : "text-muted-dark hover:bg-muted hover:text-foreground"}`}
          >
            <svg
              className="w-4 h-4 inline-block mr-1.5 -mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>{" "}
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Image grid + upload */}
      <div className="space-y-6">
        {activeFolder && (
          <>
            {/* Upload area */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                if (e.dataTransfer.files.length) onUpload(e.dataTransfer.files);
              }}
              className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border bg-surface"}`}
            >
              <div className="text-muted-dark text-sm">
                <p className="text-lg mb-1">
                  {uploading ? "Laddar upp..." : "Dra & släpp bilder här"}
                </p>
                <p className="text-xs text-muted-dark/70 mb-3">
                  JPG, PNG, WebP eller SVG — max 10 MB
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium cursor-pointer hover:bg-primary-dark transition-colors">
                  Välj filer
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.length) onUpload(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Image grid */}
            {images.length === 0 ? (
              <p className="text-sm text-muted-dark text-center py-8">
                Inga bilder i den här mappen ännu.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img) => (
                  <div
                    key={img}
                    className="group relative bg-surface rounded-xl border border-border overflow-hidden"
                  >
                    <div className="aspect-square">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${basePath}/images/${activeFolder}/${img}`}
                        alt={img}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="px-2 py-1.5 border-t border-border">
                      <p
                        className="text-xs text-muted-dark truncate"
                        title={img}
                      >
                        {img}
                      </p>
                    </div>
                    {!readOnly && (
                      <button
                        onClick={() => onDelete(img)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-red-500/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        title="Ta bort"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
