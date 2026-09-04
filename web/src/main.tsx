import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import "./index.css";

/** Screens where a surprise reload would throw the student out of their work. */
const busy = () => /^#\/(session|eule)\//.test(location.hash);

// The service worker precaches lessons and questions. After a deploy the new worker activates in the
// background; without this the old content stayed on screen until the next manual reload.
registerSW({
  immediate: true,
  onNeedReload() {
    if (!busy()) {
      location.reload();
      return;
    }
    const onHash = () => {
      if (busy()) return;
      removeEventListener("hashchange", onHash);
      location.reload();
    };
    addEventListener("hashchange", onHash);
  },
  onRegisteredSW(_url, registration) {
    // Look for a new version whenever the tab or the installed app comes back into view.
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") void registration?.update();
    });
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
