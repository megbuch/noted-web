import { useState } from "react";
import { EditorProvider, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "../EditorToolbar/EditorToolbar.jsx";
import "./NoteEditor.scss";

export default function NoteEditor({ handleAddNote }) {
  const [editMode, setEditMode] = useState(true);
  const [content, setContent] = useState("");

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

  function handleSaveNote(userInput) {
    const createdAt = new Date().toISOString();
    const title = extractTitleFromHTML(userInput);

    const newNote = {
      title: title,
      content: userInput,
      createdAt: createdAt,
    };

    localStorage.setItem(createdAt, JSON.stringify(newNote));
    handleAddNote(newNote);
    setContent(userInput);
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
  );
}
