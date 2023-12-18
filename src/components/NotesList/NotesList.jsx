import { useState } from "react";
import { MdCreate } from "react-icons/md";
import "./NotesList.scss";

export default function NotesList({
  notes,
  createNewNote,
  setSelectedNote,
  setEditMode,
  selectedFolder,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  function selectNote(note) {
    setSelectedNote(note);
    setEditMode(false);
  }

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="NotesList">
      <div className="create-new-note" onClick={createNewNote}>
        <MdCreate />
        <p>Create New Note</p>
      </div>
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
              <p>{note.title}</p>
            </div>
          ))
      ) : (
        <p>No notes.</p>
      )}
    </div>
  );
}
