import { useState, useEffect } from "react";
import { EditorProvider, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "../EditorToolbar/EditorToolbar.jsx";
import "./NoteEditor.scss";

export default function NoteEditor({
  setNotes,
  selectedNote,
  setSelectedNote,
  editMode,
  setEditMode,
  folders,
}) {
  const [assignedFolder, setAssignedFolder] = useState(
    selectedNote?.folder || folders[0]
  );

  useEffect(() => {
    setAssignedFolder(selectedNote?.folder || folders[0]);
  }, [selectedNote, folders]);

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    Placeholder.configure({
      placeholder: "Enter your note title here, on the first line.",
    }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ];

  function saveNote(userInput) {
    let createdAt = selectedNote ? selectedNote.createdAt : Date.now();
    let title = extractTitleFromHTML(userInput);

    if (selectedNote) {
      localStorage.removeItem(selectedNote.createdAt);
    }

    const newNote = {
      title: title,
      content: userInput,
      createdAt: createdAt,
      folder: assignedFolder || folders[0],
    };

    /* TODO: In the future, wrap anything with setting in local storage
     in a try catch block, and in the catch, display some Toast alert
     notifying a user that their storage limit has been reached. */
    localStorage.setItem(createdAt, JSON.stringify(newNote));
    updateNotesList(newNote);
    setSelectedNote(newNote);
    setEditMode(false);
  }

  function updateNotesList(newNote) {
    if (selectedNote) {
      setNotes((prevNotes) => {
        return prevNotes.map((note) =>
          note.createdAt === selectedNote.createdAt ? newNote : note
        );
      });
    } else {
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }
  }

  function extractTitleFromHTML(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const firstElement = doc.body.querySelector("p, h1, h2, h3, h4, h5, h6");
    if (!firstElement) return "Empty note";
    return firstElement.textContent || firstElement.innerText;
  }

  return (
    <div className={`NoteEditor ${editMode ? "editing" : ""}`}>
      <div className="header">
        <p>{selectedNote?.title || "New Note"}</p>
        {editMode && (
          <select
            value={assignedFolder}
            onChange={(e) => setAssignedFolder(e.target.value)}
          >
            {folders.map((folder, index) => (
              <option key={index} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        )}
      </div>

      <EditorProvider
        key={selectedNote?.createdAt}
        content={selectedNote?.content || ""}
        editable={editMode}
        extensions={extensions}
        slotBefore={
          <EditorToolbar
            editMode={editMode}
            setEditMode={setEditMode}
            saveNote={saveNote}
          />
        }
      >
        <EditorContent />
      </EditorProvider>
    </div>
  );
}
