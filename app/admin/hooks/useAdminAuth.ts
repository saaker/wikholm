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
      // Use functional updates to batch state changes
      queueMicrotask(() => {
        setSecret(saved);
        setAuthenticated(true);
      });
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
      const res = await fetch(`${basePath}/api/auth-check`, {
        method: "POST",
        headers: { Authorization: `Bearer ${secret}` },
      });
      if (res.status === 401) {
        showMessage("error", "Fel lösenord");
        return;
      }
      sessionStorage.setItem("admin_secret", secret);
      setAuthenticated(true);
    } catch {
      showMessage("error", "Kunde inte ansluta till servern");
    }
  }

  function logout() {
    sessionStorage.removeItem("admin_secret");
    setSecret("");
    setAuthenticated(false);
    setReadOnly(false);
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
    logout,
  };
}
