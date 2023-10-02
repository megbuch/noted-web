import NoteEditor from "./../../components/Note/NoteEditor/NoteEditor.jsx";
import "./Layout.scss";

export default function Layout({ handleAddNote }) {
  return (
    <>
      <NoteEditor handleAddNote={handleAddNote} />
    </>
  );
}
