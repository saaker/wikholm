import { useState, useCallback } from "react";
import basePath from "@/lib/basePath";

function getSavedSecret() {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("admin_secret") || "";
  }
  return "";
}

export function useAdminAuth() {
  const [secret, setSecret] = useState(getSavedSecret);
  const [authenticated, setAuthenticated] = useState(() => getSavedSecret() !== "");
  const [readOnly, setReadOnly] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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
