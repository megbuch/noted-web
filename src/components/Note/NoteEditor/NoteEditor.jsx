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
  addNoteToNotesList,
  editMode,
  setEditMode,
}) {
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
    let createdAt = Date.now();
    let title = extractTitleFromHTML(userInput);

    if (selectedNote) {
      localStorage.removeItem(selectedNote.createdAt);
      title = extractTitleFromHTML(userInput);
    }

    const newNote = {
      title: title,
      content: userInput,
      createdAt: createdAt,
    };

    localStorage.setItem(createdAt, JSON.stringify(newNote));

    if (selectedNote) {
      setNotes((prevNotes) => {
        return prevNotes.map((note) =>
          note.createdAt === selectedNote.createdAt ? newNote : note
        );
      });
      setSelectedNote(newNote);
    } else {
      addNoteToNotesList(newNote);
    }

    setEditMode(false);
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
      <EditorProvider
        key={selectedNote?.createdAt || Date.now()}
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
