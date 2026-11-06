import Parse from "parse";

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

export function assertParseConfigured() {
  if (!isParseConfigured) {
    throw new Error(
      "Parse is not configured. Copy .env.example to .env.local and add your Back4App keys.",
    );
  }
}

export default Parse;
