"use client";

export function LoginScreen({
  secret,
  setSecret,
  onSubmit,
  errorMessage,
}: {
  secret: string;
  setSecret: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  errorMessage?: string | null;
}) {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="bg-surface rounded-2xl shadow-lg p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-serif font-semibold mb-2">Admin</h1>
        <p className="text-sm text-muted-dark mb-6">
          Ange ditt admin-lösenord för att hantera webbplatsen.
        </p>
        {errorMessage && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            {errorMessage}
          </p>
        )}
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
          className="w-full py-3 rounded-xl bg-primary text-white dark:text-black font-medium hover:bg-primary-dark transition-colors"
        >
          Logga in
        </button>
      </form>
    </div>
  );
}
