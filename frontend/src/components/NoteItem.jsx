function NoteItem({ note, onDelete }) {
  // Truncate content to 200 chars
  const truncatedContent =
    note.Content.length > 200
      ? note.Content.substring(0, 200) + "..."
      : note.Content;

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "2px solid black",
        borderRadius: "12px",
        padding: "16px",
        width: "260px",
        height: "260px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {/* Title */}
      <h3
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          marginBottom: "8px",
          color: "black",
          wordBreak: "break-word",
        }}
      >
        {note.Filename}
      </h3>

      {/* Content */}
      <p
        style={{
          flexGrow: 1,
          fontSize: "0.95rem",
          color: "#444",
          lineHeight: "1.4",
          wordBreak: "break-word",
        }}
      >
        {truncatedContent}
      </p>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <small style={{ color: "#666" }}>
          {new Date(note.createdAt).toLocaleString()}
        </small>

        <button
          onClick={() => onDelete(note.id)}
          style={{
            padding: "4px 8px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteItem;
