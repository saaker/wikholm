import { useEffect, useState } from "react";
import basePath from "@/lib/basePath";

export function useImageManager(
  tab: string,
  secret: string,
  readOnly: boolean,
  showMessage: (type: "success" | "error", text: string) => void,
) {
  const [imageFolders, setImageFolders] = useState<string[]>([]);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [folderImages, setFolderImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Load image folders when images tab is opened
  useEffect(() => {
    if (tab !== "images") return;
    fetch(`${basePath}/api/images`)
      .then((r) => r.json())
      .then((d) => {
        setImageFolders(d.folders ?? []);
        if (!activeFolder && d.folders?.length) setActiveFolder(d.folders[0]);
      })
      .catch(() => {});
  }, [tab, activeFolder]);

  // Load images when folder changes
  useEffect(() => {
    if (tab !== "images" || !activeFolder) return;
    fetch(`${basePath}/api/images?folder=${encodeURIComponent(activeFolder)}`)
      .then((r) => r.json())
      .then((d) => setFolderImages(d.images ?? []))
      .catch(() => setFolderImages([]));
  }, [tab, activeFolder]);

  async function handleImageUpload(files: FileList | File[]) {
    if (!activeFolder || readOnly) return;
    setUploading(true);
    const form = new FormData();
    form.append("folder", activeFolder);
    for (const f of Array.from(files)) form.append("files", f);
    try {
      const res = await fetch(`${basePath}/api/images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${secret}` },
        body: form,
      });
      if (res.ok) {
        const { uploaded } = await res.json();
        showMessage("success", `${uploaded.length} bild(er) uppladdade!`);
        const r2 = await fetch(
          `${basePath}/api/images?folder=${encodeURIComponent(activeFolder)}`,
        );
        if (r2.ok) setFolderImages((await r2.json()).images ?? []);
      } else showMessage("error", "Kunde inte ladda upp");
    } catch {
      showMessage("error", "Nätverksfel");
    } finally {
      setUploading(false);
    }
  }

  async function handleImageDelete(fileName: string) {
    if (!activeFolder || readOnly) return;
    if (!confirm(`Ta bort ${fileName}?`)) return;
    try {
      const res = await fetch(
        `${basePath}/api/images?folder=${encodeURIComponent(activeFolder)}&file=${encodeURIComponent(fileName)}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${secret}` } },
      );
      if (res.ok) {
        setFolderImages((prev) => prev.filter((f) => f !== fileName));
        showMessage("success", "Bilden borttagen!");
      } else showMessage("error", "Kunde inte ta bort");
    } catch {
      showMessage("error", "Nätverksfel");
    }
  }

  return {
    imageFolders,
    activeFolder,
    setActiveFolder,
    folderImages,
    uploading,
    dragOver,
    setDragOver,
    handleImageUpload,
    handleImageDelete,
  };
}
