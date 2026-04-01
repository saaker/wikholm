import { useState } from "react";
import { type Location, emptyLocation } from "../adminTypes";
import basePath from "@/lib/basePath";

export function useLocationEditor(
  initialLocations: Location[],
  authHeaders: Record<string, string>,
  showMessage: (type: "success" | "error", text: string) => void,
  setReadOnly: (v: boolean) => void,
) {
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [editing, setEditing] = useState<Location | null>(null);
  const [locForm, setLocForm] = useState<
    Omit<Location, "id"> & { id?: string }
  >(emptyLocation);
  const [loading, setLoading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);

  async function fetchLocations() {
    try {
      const res = await fetch(`${basePath}/api/locations`);
      if (res.ok) {
        setLocations(await res.json());
        return;
      }
    } catch {
      /* ignore */
    }
    setLocations(initialLocations);
    setReadOnly(true);
  }

  async function geocodeAddress() {
    if (!locForm.address.trim()) {
      showMessage("error", "Fyll i en adress först");
      return;
    }
    setGeocoding(true);
    try {
      const query = encodeURIComponent(locForm.address + ", Sweden");
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
        { headers: { "User-Agent": "WikholmOrtodontiAdmin/1.0" } },
      );
      const data = await res.json();
      if (data.length > 0) {
        setLocForm({
          ...locForm,
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
        showMessage("success", "Koordinater hittade!");
      } else {
        showMessage("error", "Kunde inte hitta koordinater");
      }
    } catch {
      showMessage("error", "Fel vid uppslag");
    } finally {
      setGeocoding(false);
    }
  }

  async function handleLocSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editing ? "PUT" : "POST";
      const body = editing ? { ...locForm, id: editing.id } : locForm;
      const res = await fetch(`${basePath}/api/locations`, {
        method,
        headers: authHeaders,
        body: JSON.stringify(body),
      });
      if (res.ok) {
        showMessage(
          "success",
          editing ? "Klinik uppdaterad!" : "Klinik tillagd!",
        );
        setLocForm(emptyLocation);
        setEditing(null);
        await fetchLocations();
      } else {
        const d = await res.json();
        showMessage("error", d.error || "Något gick fel");
      }
    } catch {
      showMessage("error", "Nätverksfel");
    } finally {
      setLoading(false);
    }
  }

  async function handleLocDelete(id: string) {
    if (!confirm("Är du säker på att du vill ta bort denna klinik?")) return;
    setLoading(true);
    try {
      const res = await fetch(`${basePath}/api/locations`, {
        method: "DELETE",
        headers: authHeaders,
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        showMessage("success", "Klinik borttagen!");
        await fetchLocations();
        if (editing?.id === id) {
          setEditing(null);
          setLocForm(emptyLocation);
        }
      } else showMessage("error", "Kunde inte ta bort klinik");
    } catch {
      showMessage("error", "Nätverksfel");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(loc: Location) {
    setEditing(loc);
    setLocForm({
      name: loc.name,
      address: loc.address,
      phone: loc.phone,
      hours: loc.hours,
      lat: loc.lat,
      lng: loc.lng,
      website: loc.website || "",
      type: loc.type,
      alignerBrands: loc.alignerBrands || [],
    });
  }

  function cancelEdit() {
    setEditing(null);
    setLocForm(emptyLocation);
  }

  return {
    locations,
    editing,
    locForm,
    setLocForm,
    loading,
    geocoding,
    fetchLocations,
    geocodeAddress,
    handleLocSave,
    handleLocDelete,
    startEdit,
    cancelEdit,
  };
}
