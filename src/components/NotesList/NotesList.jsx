import "./NotesList.scss";

export default function NotesList({
  notes,
  selectNote,
  setSelectedNote,
  setEditMode,
}) {
  function createNewNote() {
    setSelectedNote(null);
    setEditMode(true);
  }

  return (
    <div className="NotesList">
      <button onClick={createNewNote}>Create New Note</button>
      {notes ? (
        notes
          .slice()
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((note) => (
            <div
              className="note"
              key={note.createdAt}
              onClick={() => selectNote(note)}
            >
              <p>{note.title}</p>
            </div>
          ))
      ) : (
        <p>No notes.</p>
      )}
    </div>
  );
}
