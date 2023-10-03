import { useState, useEffect } from "react";
import NotesList from "../NotesList/NotesList.jsx";
import NoteEditor from "../Note/NoteEditor/NoteEditor.jsx";
import "./Layout.scss";

export default function Layout() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    const loadedNotes = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = localStorage.getItem(key);

      try {
        const note = JSON.parse(item);
        if (note && note.title && note.content) {
          loadedNotes.push(note);
        }
      } catch (err) {
        console.error("Error parsing note from storage: ", err);
      }
    }

    setNotes(loadedNotes);
  }, []);

  function addNoteToNotesList(newNote) {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      return updatedNotes;
    });
  }

  function selectNote(note) {
    setSelectedNote(note);
    setEditMode(false);
  }

  return (
    <div className="Layout">
      <NotesList
        notes={notes}
        selectNote={selectNote}
        setSelectedNote={setSelectedNote}
        setEditMode={setEditMode}
      />
      <NoteEditor
        setNotes={setNotes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        addNoteToNotesList={addNoteToNotesList}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </div>
  );
}
