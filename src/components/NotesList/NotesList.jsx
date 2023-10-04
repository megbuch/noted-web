import { MdOutlineAddCircleOutline } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import "./NotesList.scss";

export default function NotesList({
  notes,
  setNotes,
  setSelectedNote,
  setEditMode,
  selectedFolder,
}) {
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

  return (
    <div className="NotesList">
      {notes ? (
        notes
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
