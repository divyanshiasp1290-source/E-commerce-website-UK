export function getWeb3FormsAccessKey(): string {
  // Vite only exposes env vars prefixed with VITE_*
  const env = import.meta.env as { VITE_WEB3FORMS_ACCESS_KEY?: string };
  return env.VITE_WEB3FORMS_ACCESS_KEY?.trim() || "";
}


