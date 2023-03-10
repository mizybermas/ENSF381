import React from "react";
import Sidebar from './Sidebar'
import Textarea from "./Textarea";
import {useNavigate } from "react-router-dom";

function NoteApp(props) {
  const navigate = useNavigate();
  const [notes, setNotes] = React.useState([]);
  const [title, setTitle] = React.useState("Untitled");
  const [textContent, setTextContent] = React.useState("");
  const [isEditMode, setIsEditMode] = React.useState(true);
  const [activeNote, setActiveNote] = React.useState();
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const currDateTime = new Date(Date.now() - timezoneOffset)
    .toISOString()
    .slice(0, 19);
  const [dateTime, setDateTime] = React.useState(currDateTime);

  function onTitleChange(event) {
    const title = event.target.value;
    setTitle(title);
  }

  function onTextChange(event) {
    setTextContent(event); 
  
  }

  function addNote(newNote) {
    setNotes([
      ...notes.slice(0, activeNote),
      newNote,
      ...notes.slice(activeNote + 1),
      
    ]);
    navigate (`/notes/${activeNote+1}`);
    
  }

  function newNote() {
    const newCurrDateTime = new Date(Date.now() - timezoneOffset)
      .toISOString()
      .slice(0, 19);
    setTextContent("");
    setTitle("Untitled");
    setDateTime(newCurrDateTime);
    setNotes((prevNotes) => {
      return [...prevNotes, { title: "Untitled", content: "", dateTime: "" }];
    });
    setActiveNote(notes.length);
    setIsEditMode(true);
    navigate (`/notes/${notes.length+1}/edit`);
  }

  function onEditToggle() {
   
    setIsEditMode(!isEditMode);
    navigate(`/notes/${activeNote}/edit`);
  }

  function onNoteClick(noteID) {
    setActiveNote(noteID);
    const currNote = notes.at(noteID);
    setTextContent(currNote.content);
    setTitle(currNote.title);
    setDateTime(currNote.dateTime);
    navigate(`/notes/${noteID+1 }`);
  }

  function onDelete() {
    const answer = window.confirm("Are you sure?");
    if (answer){
      setNotes(notes.filter((_, index) => index !== activeNote));
      setActiveNote(-1);
    } else {
       setActiveNote(0);
       const currNote = notes.at(0);
       setTextContent(currNote.content);
       setTitle(currNote.title);
       setDateTime(currNote.dateTime);
    }
  }

  return (
    <div className="body-content">

      {props.isVisable && (
       <Sidebar
          notesList={notes}
          newNote={newNote}
          activeNote={activeNote}
          setActiveNote={onNoteClick}
        />
        
      )}
      {activeNote !== -1 && (
        <Textarea
          onAdd={addNote}
          onTitleChange={onTitleChange}
          onContentChange={onTextChange}
          title={title}
          textContent={textContent}
          setDateTime={setDateTime}
          dateTime={dateTime}
          isEditMode={isEditMode}
          onEditToggle={onEditToggle}
          activeNote={activeNote}
          onDelete={onDelete}
        />
      )}
      
    </div>
    
  );

}

export default NoteApp;