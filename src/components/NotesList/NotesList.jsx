import "./NotesList.scss";

export default function NotesList({ notes }) {
  console.log(notes);
  return (
    <div className="NotesList">
      {notes ? (
        [...notes].reverse().map((note) => (
          <div className="note" key={note.createdAt}>
            <p>{note.title}</p>
          </div>
        ))
      ) : (
        <p>No notes.</p>
      )}
    </div>
  );
}
