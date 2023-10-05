import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import "./NotesList.scss";

export default function NotesList({
  notes,
  setNotes,
  setSelectedNote,
  setEditMode,
  selectedFolder,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  function selectNote(note) {
    setSelectedNote(note);
    setEditMode(false);
  }

  function deleteNote(noteToDelete) {
    if (noteToDelete) {
      localStorage.removeItem(noteToDelete.createdAt);

      setNotes((prevNotes) => {
        return prevNotes.filter(
          (currentNote) => currentNote.createdAt != noteToDelete.createdAt
        );
      });

      setSelectedNote(null);
      setEditMode(true);
    }
  }

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="NotesList">
      <input
        type="text"
        placeholder="Search Notes.."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {notes ? (
        filteredNotes
          .slice()
          .sort((a, b) => b.createdAt - a.createdAt)
          .filter((note) => !selectedFolder || note.folder === selectedFolder)
          .map((note) => (
            <div
              className="note"
              key={note.createdAt}
              onClick={() => selectNote(note)}
            >
              <p>
                {note.title.length > 30
                  ? `${note.title.slice(0, 30)}...`
                  : note.title}
              </p>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  deleteNote(note);
                }}
              >
                <LuTrash2 />
              </button>
            </div>
          ))
      ) : (
        <p>No notes.</p>
      )}
    </div>
  );
}
