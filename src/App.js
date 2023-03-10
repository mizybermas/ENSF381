import React from "react";
import Header from "./components/Header";
import NoteApp from "./components/NoteApp";
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  const [isNoteVisable, setVisability] = React.useState(true);

  function hideItem() {
    setVisability(!isNoteVisable);
  }

  return (
    <div class="body">
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



