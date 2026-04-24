"use client";

import { useEffect, useState, useRef } from "react";

import { type Location, dentistSidebar, patientSidebar } from "./adminTypes";
import { useAdminAuth } from "./hooks/useAdminAuth";
import { useContentEditor } from "./hooks/useContentEditor";
import { useImageManager } from "./hooks/useImageManager";
import { useLocationEditor } from "./hooks/useLocationEditor";
import { AdminHeader } from "./AdminHeader";
import { LoginScreen } from "./LoginScreen";
import { CardsEditor } from "./CardsEditor";
import { ContentEditor } from "./ContentEditor";
import { LocationsEditor } from "./LocationsEditor";
import { ImageManager } from "./ImageManager";

/* ═══════════════════════════════════════════════════
   Main Admin Panel
   ═══════════════════════════════════════════════════ */
interface AdminPanelProps {
  initialLocations?: Location[];
}

export default function AdminPanel({ initialLocations = [] }: AdminPanelProps) {
  /* ── Auth ── */
  const auth = useAdminAuth();

  /* ── Navigation ── */
  const [tab, setTab] = useState<"dentist" | "patient" | "images">(() => {
    // Restore last active tab from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin-active-tab");
      if (saved === "dentist" || saved === "patient" || saved === "images") {
        return saved;
      }
    }
    return "dentist";
  });

  const [activeIdx, setActiveIdx] = useState(() => {
    // Restore last active index from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin-active-idx");
      if (saved) {
        const idx = parseInt(saved, 10);
        if (!isNaN(idx)) return idx;
      }
    }
    return 0;
  });

  const sidebar =
    tab === "images" ? [] : tab === "dentist" ? dentistSidebar : patientSidebar;
  const activeItem = tab !== "images" ? sidebar[activeIdx] : undefined;

  // Save tab and activeIdx to localStorage when they change
  useEffect(() => {
    localStorage.setItem("admin-active-tab", tab);
  }, [tab]);

  useEffect(() => {
    localStorage.setItem("admin-active-idx", String(activeIdx));
  }, [activeIdx]);

  // Track if this is the initial mount
  const isInitialMount = useRef(true);

  /* ── Hooks ── */
  const content = useContentEditor(
    activeItem,
    auth.authHeaders,
    auth.showMessage,
  );

  const images = useImageManager(
    tab,
    auth.secret,
    auth.readOnly,
    auth.showMessage,
  );

  const loc = useLocationEditor(
    initialLocations,
    auth.authHeaders,
    auth.showMessage,
    auth.setReadOnly,
  );

  /* ── Data fetching on auth ── */
  useEffect(() => {
    if (auth.authenticated) {
      loc.fetchLocations();
      content.fetchContent();
      content.fetchSections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.authenticated]);

  // Reset active idx when switching tab (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setActiveIdx(0);
    content.setEditingCard(null);
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ═══════════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════════ */
  if (!auth.authenticated) {
    return (
      <LoginScreen
        secret={auth.secret}
        setSecret={auth.setSecret}
        onSubmit={auth.handleLogin}
        errorMessage={auth.message?.type === "error" ? auth.message.text : null}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <AdminHeader tab={tab} setTab={setTab} onLogout={auth.logout} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Messages */}
        {auth.readOnly && (
          <div className="mb-6 px-4 py-3 rounded-xl text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200">
            Skrivskyddat läge — redigering kräver lokal utvecklingsmiljö (
            <code>npm run dev</code>).
          </div>
        )}
        {auth.message && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${auth.message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
          >
            {auth.message.text}
          </div>
        )}

        {tab === "images" ? (
          <ImageManager
            folders={images.imageFolders}
            activeFolder={images.activeFolder}
            setActiveFolder={images.setActiveFolder}
            images={images.folderImages}
            uploading={images.uploading}
            dragOver={images.dragOver}
            setDragOver={images.setDragOver}
            onUpload={images.handleImageUpload}
            onDelete={images.handleImageDelete}
            readOnly={auth.readOnly}
          />
        ) : (
          <div className="grid lg:grid-cols-[220px_1fr] gap-8">
            {/* ── Sidebar ── */}
            <div className="space-y-1">
              {sidebar.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIdx(i);
                    content.setEditingCard(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeIdx === i ? "bg-primary/10 text-primary font-medium" : "text-muted-dark hover:bg-muted hover:text-foreground"}`}
                >
                  {item.type === "cards" ? (
                    <>
                      {item.title}{" "}
                      <svg
                        className="inline w-3.5 h-3.5 ml-1 -mt-0.5 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          strokeWidth={2}
                        />
                        <rect
                          x="14"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          strokeWidth={2}
                        />
                        <rect
                          x="3"
                          y="14"
                          width="7"
                          height="7"
                          rx="1"
                          strokeWidth={2}
                        />
                        <rect
                          x="14"
                          y="14"
                          width="7"
                          height="7"
                          rx="1"
                          strokeWidth={2}
                        />
                      </svg>
                    </>
                  ) : item.type === "locations" ? (
                    <>
                      {item.title}{" "}
                      <svg
                        className="inline w-3.5 h-3.5 ml-1 -mt-0.5 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </>
                  ) : (
                    item.title
                  )}
                </button>
              ))}
            </div>

            {/* ── Main content area ── */}
            <div>
              {activeItem?.type === "locations" ? (
                <LocationsEditor
                  locations={loc.locations}
                  editing={loc.editing}
                  form={loc.locForm}
                  setForm={loc.setLocForm}
                  onSave={loc.handleLocSave}
                  onDelete={loc.handleLocDelete}
                  onEdit={loc.startEdit}
                  onCancel={loc.cancelEdit}
                  onGeocode={loc.geocodeAddress}
                  loading={loc.loading}
                  geocoding={loc.geocoding}
                  readOnly={auth.readOnly}
                  locale={content.contentLocale}
                  setLocale={content.setContentLocale}
                />
              ) : activeItem?.type === "cards" ? (
                <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold font-sans">
                      {activeItem.title}
                    </h2>
                    <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                      {(["sv", "en"] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => content.setContentLocale(l)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${content.contentLocale === l ? "bg-surface text-foreground shadow-sm" : "text-muted-dark"}`}
                        >
                          {l === "sv" ? "Svenska" : "English"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <fieldset
                    disabled={auth.readOnly}
                    className={auth.readOnly ? "opacity-60" : ""}
                  >
                    <CardsEditor
                      sectionKey={activeItem.sectionKey}
                      sectionsData={content.sectionsData}
                      setSectionsData={content.setSectionsData}
                      editingCard={content.editingCard}
                      setEditingCard={content.setEditingCard}
                      contentLocale={content.contentLocale}
                      setContentLocale={content.setContentLocale}
                      readOnly={auth.readOnly}
                      onQuickSave={content.handleQuickSave}
                    />
                  </fieldset>
                </div>
              ) : activeItem?.type === "content" ? (
                <ContentEditor
                  sectionId={activeItem.sectionId}
                  locale={content.contentLocale}
                  setLocale={content.setContentLocale}
                  draft={content.draft}
                  onChange={content.handleFieldChange}
                  onSave={content.handleContentSave}
                  onReset={content.resetDraft}
                  saving={content.saving}
                  readOnly={auth.readOnly}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
