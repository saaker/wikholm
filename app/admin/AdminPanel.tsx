"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  website?: string;
  description: string;
}

const emptyLocation: Omit<Location, "id"> = {
  name: "",
  address: "",
  phone: "",
  hours: "",
  lat: 59.33,
  lng: 18.07,
  website: "",
  description: "",
};

interface AdminPanelProps {
  initialLocations?: Location[];
}

export default function AdminPanel({ initialLocations = [] }: AdminPanelProps) {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [editing, setEditing] = useState<Location | null>(null);
  const [form, setForm] = useState<Omit<Location, "id"> & { id?: string }>(
    emptyLocation,
  );
  const [loading, setLoading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${secret}`,
  };

  async function fetchLocations() {
    try {
      const res = await fetch("/api/locations");
      if (res.ok) {
        setLocations(await res.json());
        return;
      }
    } catch {
      // API not available (static export)
    }
    // Fall back to initial data in read-only mode
    setLocations(initialLocations);
    setReadOnly(true);
  }

  useEffect(() => {
    if (authenticated) fetchLocations();
  }, [authenticated]);

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }

  async function geocodeAddress() {
    if (!form.address.trim()) {
      showMessage("error", "Fyll i en adress först");
      return;
    }
    setGeocoding(true);
    try {
      const query = encodeURIComponent(form.address + ", Sweden");
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
        { headers: { "User-Agent": "WikholmOrtodontiAdmin/1.0" } },
      );
      const data = await res.json();
      if (data.length > 0) {
        setForm({
          ...form,
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
        showMessage("success", "Koordinater hittade!");
      } else {
        showMessage("error", "Kunde inte hitta koordinater för den adressen");
      }
    } catch {
      showMessage("error", "Fel vid uppslag av koordinater");
    } finally {
      setGeocoding(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Test the secret by trying to get locations
    try {
      const res = await fetch("/api/locations");
      if (res.ok) {
        setAuthenticated(true);
        return;
      }
    } catch {
      // API not available — allow read-only access
    }
    setAuthenticated(true);
    setReadOnly(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editing ? "PUT" : "POST";
      const body = editing ? { ...form, id: editing.id } : form;

      const res = await fetch("/api/locations", {
        method,
        headers,
        body: JSON.stringify(body),
      });

      if (res.ok) {
        showMessage(
          "success",
          editing ? "Klinik uppdaterad!" : "Klinik tillagd!",
        );
        setForm(emptyLocation);
        setEditing(null);
        await fetchLocations();
      } else {
        const data = await res.json();
        showMessage("error", data.error || "Något gick fel");
      }
    } catch {
      showMessage("error", "Nätverksfel");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Är du säker på att du vill ta bort denna klinik?")) return;
    setLoading(true);

    try {
      const res = await fetch("/api/locations", {
        method: "DELETE",
        headers,
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        showMessage("success", "Klinik borttagen!");
        await fetchLocations();
        if (editing?.id === id) {
          setEditing(null);
          setForm(emptyLocation);
        }
      } else {
        showMessage("error", "Kunde inte ta bort klinik");
      }
    } catch {
      showMessage("error", "Nätverksfel");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(location: Location) {
    setEditing(location);
    setForm({
      name: location.name,
      address: location.address,
      phone: location.phone,
      hours: location.hours,
      lat: location.lat,
      lng: location.lng,
      website: location.website || "",
      description: location.description,
    });
  }

  function cancelEdit() {
    setEditing(null);
    setForm(emptyLocation);
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="bg-surface rounded-2xl shadow-lg p-8 w-full max-w-sm"
        >
          <h1 className="text-2xl font-serif font-semibold mb-2">Admin</h1>
          <p className="text-sm text-muted-dark mb-6">
            Ange ditt admin-lösenord för att hantera kliniker.
          </p>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Lösenord"
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-4"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            Logga in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Top bar */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif font-semibold">
              Klinikhantering
            </h1>
            <p className="text-sm text-muted-dark">
              Lägg till, redigera eller ta bort kliniker
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            &larr; Tillbaka till sidan
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Read-only notice */}
        {readOnly && (
          <div className="mb-6 px-4 py-3 rounded-xl text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200">
            Skrivskyddat läge — redigering kräver lokal utvecklingsmiljö (
            <code>npm run dev</code>).
          </div>
        )}
        {/* Message */}
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form — disabled in read-only mode */}
          <fieldset
            disabled={readOnly}
            className={readOnly ? "opacity-60" : ""}
          >
            <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
              <h2 className="text-lg font-semibold mb-4 font-sans">
                {editing ? "Redigera klinik" : "Lägg till ny klinik"}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Namn
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Adress
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                      placeholder="Gatuadress, Stad"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={geocodeAddress}
                      disabled={geocoding || !form.address.trim()}
                      className="px-3 py-2.5 rounded-xl bg-primary-light text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50 shrink-0"
                      title="Hämta koordinater från adressen"
                    >
                      {geocoding ? "Söker..." : "📍 Hämta koord."}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Öppettider
                    </label>
                    <input
                      type="text"
                      value={form.hours}
                      onChange={(e) =>
                        setForm({ ...form, hours: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Hemsida
                  </label>
                  <input
                    type="url"
                    value={form.website || ""}
                    onChange={(e) =>
                      setForm({ ...form, website: e.target.value })
                    }
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                  />
                </div>
                {/* Lat/Lng — auto-filled, shown as small read-only hint */}
                <div className="flex items-center gap-4 text-xs text-muted-dark bg-muted rounded-xl px-4 py-2.5">
                  <span>
                    Lat: <strong>{form.lat.toFixed(4)}</strong>
                  </span>
                  <span>
                    Lng: <strong>{form.lng.toFixed(4)}</strong>
                  </span>
                  <span className="ml-auto opacity-60">
                    Auto-fylls från adress
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Beskrivning
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors text-sm disabled:opacity-50"
                  >
                    {loading
                      ? "Sparar..."
                      : editing
                        ? "Uppdatera"
                        : "Lägg till"}
                  </button>
                  {editing && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
                    >
                      Avbryt
                    </button>
                  )}
                </div>
              </form>
            </div>
          </fieldset>

          {/* Existing locations */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold font-sans">
              Befintliga kliniker ({locations.length})
            </h2>
            {locations.length === 0 && (
              <p className="text-sm text-muted-dark">
                Inga kliniker tillagda ännu.
              </p>
            )}
            {locations.map((location) => (
              <div
                key={location.id}
                className={`bg-surface rounded-2xl shadow-sm border p-5 ${
                  editing?.id === location.id
                    ? "border-primary"
                    : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground font-sans">
                      {location.name}
                    </h3>
                    <p className="text-sm text-muted-dark mt-0.5">
                      {location.address}
                    </p>
                    <p className="text-xs text-muted-dark mt-1">
                      {location.phone} &middot; {location.hours}
                    </p>
                  </div>
                  {!readOnly && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => startEdit(location)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-light text-primary hover:bg-primary/20 transition-colors"
                      >
                        Redigera
                      </button>
                      <button
                        onClick={() => handleDelete(location.id)}
                        disabled={loading}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        Ta bort
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
