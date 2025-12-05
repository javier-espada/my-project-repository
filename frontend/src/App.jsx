import { useState, useEffect } from "react";
import AddNote from "./components/AddNote";
import NoteList from "./components/NoteList";
import { loadNotes, loadPendingActions, saveNotes } from "./utils/storage";
import "./styles.css";
import { createJsonFile } from "./utils/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [pendingActions, setPendingActions] = useState([]); // action log to send to backend
  const [showModal, setShowModal] = useState(false);

  // Load notes & pending actions on mount
  useEffect(() => {
    setNotes(loadNotes());
    setPendingActions(loadPendingActions());
  }, []);

  // Save notes + pendingActions whenever they change
  useEffect(() => {
    saveNotes(notes, pendingActions);
  }, [notes, pendingActions]);

  // Add new note
  const addNote = (text, filenameInput) => {
    if (!text || !text.trim()) return;

    const fileName =
      filenameInput && filenameInput.trim().length > 0
        ? filenameInput.trim()
        : `Note_${Date.now()}`;

    const newNote = {
      id: Date.now(),
      Action: "Create",
      Filename: fileName,
      Content: text,
      createdAt: new Date().toISOString(),
    };

    // Add note to visible notes
    setNotes((prev) => [newNote, ...prev]);

    // Append action to pendingActions (backend expects action sequence)
    setPendingActions((prev) => [
      ...prev,
      { Action: "Create", Filename: fileName, Content: text },
    ]);
  };

  // Helper: download Delete JSON file
  const saveDeleteJson = async (note) => {
    await createJsonFile("Delete", note.Filename, note.Content);
  };

  // Delete a note
  const deleteNote = async (id) => {
    const noteToDelete = notes.find((n) => n.id === id);
    if (!noteToDelete) return;

    // Download the DELETE file
    await saveDeleteJson(noteToDelete);

    // Remove from UI
    setNotes(notes.filter((n) => n.id !== id));
  };

  // Export JSON in backend format (sequence of actions)
  const exportJson = () => {
    // If we have a pendingActions log, export that. If not, export current notes as Create actions.
    const actionsToExport =
      pendingActions && pendingActions.length > 0
        ? pendingActions
        : notes.map((n) => ({
            Action: n.Action || "Create",
            Filename: n.Filename,
            Content: n.Content,
          }));

    const blob = new Blob([JSON.stringify(actionsToExport, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes_actions.json";
    a.click();

    // optional: keep the pendingActions after export, or clear them if you prefer:
    // setPendingActions([]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Notes App</h1>

      {/* Add Note Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: "10px 16px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Add Note
      </button>

      {/* Export Button */}
      <button
        onClick={exportJson}
        style={{
          padding: "10px 16px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          marginLeft: "10px",
          marginBottom: "20px",
        }}
      >
        Export JSON
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)} // close clicking outside (simple)
        >
          {/* prevent overlay click from closing when interacting with modal */}
          <div onClick={(e) => e.stopPropagation()}>
            <AddNote onAdd={addNote} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {/* Note List */}
      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  );
}

export default App;
