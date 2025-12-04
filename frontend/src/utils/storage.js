// src/utils/storage.js
// Loads notes from localStorage (preferred).
// If nothing in localStorage, tries to read JSON files placed in src/Resources/*.json
// using webpack's require.context (works with CRA / webpack).
//
// Exports:
// - loadNotes() -> notes[]
// - loadPendingActions() -> pendingActions[]
// - saveNotes(notes, pendingActions) -> persists both to localStorage

const STORAGE_KEY = "notes_app_state_v1";

export function loadNotes() {
  // 1) If we have saved state in localStorage, return saved notes
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.notes || [];
    } catch (e) {
      console.warn("Failed to parse saved notes from localStorage", e);
      return [];
    }
  }

  // 2) Fallback: try to load from src/Resources/*.json (build-time JSON files)
  // Note: require.context is webpack-specific (CRA). If your bundler doesn't
  // support it, this block will throw and we return [].
  try {
    // require.context(pathRelativeToThisFile, includeSubdirs=false, regex)
    const req = require.context("../Resources", false, /\.json$/);
    const notes = [];

    req.keys().forEach((key, fileIndex) => {
      try {
        const moduleExport = req(key);
        // moduleExport may be the array directly or exported as default
        const fileContent = Array.isArray(moduleExport)
          ? moduleExport
          : moduleExport.default || moduleExport;

        if (!Array.isArray(fileContent)) return;

        fileContent.forEach((actionObj, idx) => {
          const rawAction = actionObj.Action || actionObj.action || "";
          const action = String(rawAction).trim();

          // Apply only create/put/add to initial visible notes.
          // Delete actions mean the file wants that file removed (so we skip).
          if (/^(create|add|put)$/i.test(action)) {
            notes.push({
              // create a stable-ish id: filename + index
              id: `${fileIndex}_${idx}_${String(
                actionObj.Filename || "note"
              ).replace(/\s+/g, "_")}`,
              Action: actionObj.Action || "Create",
              Filename: actionObj.Filename || `Note_${fileIndex}_${idx}`,
              Content: actionObj.Content || "",
              createdAt: new Date().toISOString(),
            });
          }
          // else if Action is Delete -> do not include it in visible notes
        });
      } catch (err) {
        // ignore file parse errors but log
        // eslint-disable-next-line no-console
        console.warn("Failed to load resource file", key, err);
      }
    });

    return notes;
  } catch (err) {
    // require.context not available or Resources folder missing -> return empty
    // eslint-disable-next-line no-console
    console.warn(
      "Could not load Resources JSON files (require.context failed).",
      err
    );
    return [];
  }
}

export function loadPendingActions() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.pendingActions || [];
    } catch {
      return [];
    }
  }
  return [];
}

export function saveNotes(notes, pendingActions = []) {
  const payload = { notes, pendingActions };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("Failed to save notes to localStorage", e);
  }
}
