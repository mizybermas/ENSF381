import React from "react";
import Sidebar from './Sidebar'
import Textarea from "./Textarea";

function NoteApp(props) {
  const [notes, setNotes] = React.useState([]);
  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }
  function saveNote(updateNote){
    const index = notes.findIndex((note) => note.id === updateNote.id);

    if (index !== -1) {
  
      setNotes((prevNotes) => {
        const newNotes = [...prevNotes];
        newNotes[index] = updateNote;
        return newNotes;
      });
    } else {
      
      setNotes((prevNotes) => {
        return [...prevNotes, updateNote];
      });
    }
  }
  return (
    <div className="body-content">
      {props.isVisable && <Sidebar sideBar={notes} onAdd={addNote} />}
      <Textarea onAdd={saveNote} />
    </div>
  );
}
export default NoteApp;