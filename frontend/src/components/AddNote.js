import { useState } from "react";

function AddNote({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const downloadJsonFile = (filename, content) => {
    const data = [
      {
        Action: "Create",
        Filename: filename,
        Content: content,
      },
    ];

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename.replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAdd = () => {
    if (!text.trim() || !title.trim()) return;

    // Save inside app state
    onAdd(text, title);

    // ALSO generate JSON file and download it
    downloadJsonFile(title, text);

    setText("");
    setTitle("");
    onClose();
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        width: "50%",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Add New Note</h2>

      <input
        style={{
          width: "80%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
        placeholder="Enter title (filename)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        style={{
          width: "80%",
          height: "120px",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          justifyContent: "center",
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your note..."
      />

      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <button
          onClick={onClose}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #aaa",
            background: "#f0f0f0",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={handleAdd}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Note
        </button>
      </div>
    </div>
  );
}

export default AddNote;
