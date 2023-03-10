import React from "react";
import Sidebar from './Sidebar'
import Textarea from "./Textarea";
import {useNavigate, useParams} from "react-router-dom";

function NoteApp(props) {
  const navigate = useNavigate();

  const { id } = useParams();
  const [notes, setNotes] = React.useState(() =>{
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  
  const [title, setTitle] = React.useState("Untitled");
  const [textContent, setTextContent] = React.useState("");
  const [isEditMode, setIsEditMode] = React.useState(true);
  const [activeNote, setActiveNote] = React.useState();
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const currDateTime = new Date(Date.now() - timezoneOffset)
    .toISOString()
    .slice(0, 19);
  const [dateTime, setDateTime] = React.useState(currDateTime);

  React.useEffect(() => {
    setActiveNote(parseInt(id, 10) - 1);
  }, [id]);

  React.useEffect(() => {
    if (notes.length > 0 && activeNote >= 0 && activeNote < notes.length) {
      const currNote = notes[activeNote];
      setTextContent(currNote.content);
      setTitle(currNote.title);
      setDateTime(currNote.dateTime);
    }
  }, [notes, activeNote]);
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
    if(activeNote !== undefined){
    navigate(`/notes/${activeNote + 1}/edit`);
    }
  }

  function onNoteClick(noteID) {
    setActiveNote(noteID);
    const currNote = notes[noteID];
    setTextContent(currNote.content);
    setTitle(currNote.title);
    setDateTime(currNote.dateTime);
    navigate(`/notes/${noteID + 1}`);
  }
  

  function onDelete() {
    const answer = window.confirm("Are you sure?");
    if (answer){
      const newNotes = notes.filter((_, index) => index !== activeNote);
      setNotes(newNotes);
      localStorage.setItem();
      setActiveNote(-1);
      if (newNotes.length > 0) {
        setActiveNote(0);
        const currNote = newNotes[0];
        setTextContent(currNote.content);
        setTitle(currNote.title);
        setDateTime(currNote.dateTime);
      }
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