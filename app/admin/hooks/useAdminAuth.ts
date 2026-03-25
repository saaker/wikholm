import { useState, useCallback, useEffect } from "react";
import basePath from "@/lib/basePath";

export function useAdminAuth() {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Restore session after mount to avoid hydration mismatch
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_secret") || "";
    if (saved) {
      setSecret(saved);
      setAuthenticated(true);
    }
  }, []);

  const showMessage = useCallback((type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  }, []);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${secret}`,
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`${basePath}/api/locations`);
      if (res.ok) {
        sessionStorage.setItem("admin_secret", secret);
        setAuthenticated(true);
        return;
      }
    } catch {
      /* allow read-only */
    }
    sessionStorage.setItem("admin_secret", secret);
    setAuthenticated(true);
    setReadOnly(true);
  }

  return {
    secret,
    setSecret,
    authenticated,
    readOnly,
    setReadOnly,
    message,
    showMessage,
    authHeaders,
    handleLogin,
  };
}
