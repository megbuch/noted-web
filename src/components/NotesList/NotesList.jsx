import { MdOutlineAddCircleOutline } from "react-icons/md";
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
      <div className="create-new-note" onClick={createNewNote}>
        <MdOutlineAddCircleOutline />
        <p>Create New Note</p>
      </div>
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
              <p>
                {note.title.length > 30
                  ? `${note.title.slice(0, 30)}...`
                  : note.title}
              </p>
            </div>
          ))
      ) : (
        <p>No notes.</p>
      )}
    </div>
  );
}
