// Base API backend (proxy/worker) for chat completions.
// Keep server-side key handling; do not expose API keys in browser code.
export const API_BASE = "https://dark-rice-25ee.nicolas-tuor.workers.dev/api";

// Best cost/perf balance for this use case (short in-character answers + routing).
export const CHAT_MODEL = "gpt-4o-mini";
export const ROUTER_MODEL = "gpt-4o-mini";
