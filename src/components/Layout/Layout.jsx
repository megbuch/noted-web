import NotesList from "../NotesList/NotesList.jsx";
import NoteEditor from "../Note/NoteEditor/NoteEditor.jsx";
import "./Layout.scss";

export default function Layout({ notes, handleAddNote }) {
  return (
    <div className="Layout">
      <NotesList notes={notes} />
      <NoteEditor handleAddNote={handleAddNote} />
    </div>
  );
}
