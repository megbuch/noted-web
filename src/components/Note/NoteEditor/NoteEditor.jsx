import { useState } from "react";
import { EditorProvider, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "../EditorToolbar/EditorToolbar.jsx";
import "./NoteEditor.scss";

export default function NoteEditor({ handleAddNote }) {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
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

  function handleSaveNote(userInput) {
    const newNote = {
      title: "New Note",
      content: userInput,
    };
    const createdAt = new Date().toISOString();
    localStorage.setItem(createdAt, JSON.stringify(newNote));
    handleAddNote(newNote);
    setContent(userInput);
    setEditMode(false);
  }

  return (
    <>
      <div className="NoteEditor">
        <EditorProvider
          key={editMode.toString()}
          editable={editMode}
          extensions={extensions}
          content={content}
          onChange={(newContent) => setContent(newContent)}
          slotBefore={
            <EditorToolbar
              editMode={editMode}
              setEditMode={setEditMode}
              handleSaveNote={handleSaveNote}
            />
          }
        >
          <EditorContent />
        </EditorProvider>
      </div>
    </>
  );
}
