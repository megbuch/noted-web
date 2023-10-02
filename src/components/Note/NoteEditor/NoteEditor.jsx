import { useState } from "react";
import { EditorProvider, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "../EditorToolbar/EditorToolbar.jsx";
import NoteViewer from "../NoteViewer/NoteViewer.jsx";

export default function NoteEditor() {
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

  function handleSaveNote() {
    const note = {
      title: "New Note",
      content: content,
    };
    const createdAt = new Date().toISOString();
    localStorage.setItem(createdAt, JSON.stringify(note));
    setEditMode(false);
  }

  return (
    <>
      {editMode ? (
        <div className="NoteEditor">
          <EditorProvider
            key={editMode.toString()}
            editable={editMode}
            extensions={extensions}
            content={content}
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
      ) : (
        <NoteViewer />
      )}
    </>
  );
}
