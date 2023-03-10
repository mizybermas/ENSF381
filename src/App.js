import React from "react";
import Header from "./components/Header";
import NoteApp from "./components/NoteApp";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState,useEffect } from "react";

function App() {
  const [isNoteVisable, setVisability] = React.useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const notesFromStorage = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(notesFromStorage);
  }, []);

  function hideItem() {
    setVisability(!isNoteVisable);
  }

  return (
    <div className="body">
      <Header toggleNotes={hideItem} />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteApp isVisable={isNoteVisable} />} />
        <Route path="/notes" element={<NoteApp isVisable={isNoteVisable} />} />
          <Route path="/notes/:id" element={<NoteApp isVisable={isNoteVisable} />} />
          <Route path="/notes/:id/edit" element={<NoteApp isVisable={isNoteVisable} />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



