import { useState, useEffect } from "react";
import FoldersList from "../FoldersList/FoldersList.jsx";
import NotesList from "../NotesList/NotesList.jsx";
import NoteEditor from "../Note/NoteEditor/NoteEditor.jsx";
import "./Layout.scss";

export default function Layout() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [folders, setFolders] = useState(["Unassigned"]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    const loadedNotes = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = localStorage.getItem(key);

      try {
        const note = JSON.parse(item);
        if (note && note.title && note.content) {
          if (!folders.includes(note.folder)) {
            note.folder = "Unassigned";
            localStorage.setItem(key, JSON.stringify(note));
          }
          loadedNotes.push(note);
        }
      } catch (err) {
        console.error("Error parsing note from storage: ", err);
      }
    }

    setNotes(loadedNotes);
  }, [folders]);

  function addNoteToNotesList(newNote) {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      return updatedNotes;
    });
  }

  return (
    <div className="Layout">
      <FoldersList
        folders={folders}
        setFolders={setFolders}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />
      <NotesList
        notes={notes}
        setNotes={setNotes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        setEditMode={setEditMode}
        selectedFolder={selectedFolder}
      />
      <NoteEditor
        setNotes={setNotes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        addNoteToNotesList={addNoteToNotesList}
        editMode={editMode}
        setEditMode={setEditMode}
        folders={folders}
      />
    </div>
  );
}
