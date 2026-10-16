// Parse's browser build imports Node's "events" module; the "events" npm
// package (a dependency) provides it so Vite can bundle Parse normally.
import Parse from "parse";

/*
 * Parse initialization.
 *
 * This is the ONLY place the Parse SDK is configured. The keys come from
 * Vite environment variables (see .env.example) so they are never hardcoded
 * or committed. Models import Parse from this file instead of from "parse"
 * directly, which guarantees initialize() has run before any query.
 */
const appId = import.meta.env.VITE_PARSE_APP_ID;
const javascriptKey = import.meta.env.VITE_PARSE_JS_KEY;
const serverURL =
  import.meta.env.VITE_PARSE_SERVER_URL || "https://parseapi.back4app.com";

// True when the app has the keys it needs to reach the Parse server.
export const isParseConfigured = Boolean(appId && javascriptKey);

if (isParseConfigured) {
  Parse.initialize(appId, javascriptKey);
  Parse.serverURL = serverURL;
}

// Models call this before querying so a missing .env.local produces a clear
// message in the UI instead of a cryptic network error.
export function assertParseConfigured() {
  if (!isParseConfigured) {
    throw new Error(
      "Parse is not configured. Copy .env.example to .env.local and add your Back4App keys.",
    );
  }
}

export default Parse;
