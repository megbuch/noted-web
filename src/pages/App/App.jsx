import { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout.jsx";
import "./App.scss";

export default function App() {
  const [notes, setNotes] = useState([]);

  console.log(notes);
  useEffect(() => {
    const loadedNotes = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = localStorage.getItem(key);

      try {
        const note = JSON.parse(item);
        if (note && note.title && note.content) {
          loadedNotes.unshift(note);
        }
      } catch (err) {
        console.error("Error parsing note from storage: ", err);
      }
    }

    setNotes(loadedNotes);
  }, []);

  function handleAddNote(newNote) {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      return updatedNotes;
    });
  }

  return (
    <>
      <Layout notes={notes} handleAddNote={handleAddNote} />
    </>
  );
}
