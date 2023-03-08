import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";

function Textarea(props) {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const currDateTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, 19);

   const [dateTime, setDateTime] = useState(currDateTime);

   const [title, setTitle] = useState("Untitled");

   const [textContent, setTextContent] = useState("");

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };

   function onDateChange(event) {
   setDateTime(event.target.value);
   }

   function onTitleChange(event) {
     const title = event.target.value;
     setTitle(title);
   }

   function onTextChange(event) {
     setTextContent(event);
   }

   function saveNote() {
    const noteObj = { id: props.noteId, title: title, content: textContent.replace(/<\/?p>/gi, ""), dateTime: dateTime };
    props.onAddOrUpdateExisting(noteObj);
  }
  
  
  return (
    <div className="note-editor">
      <div className="title-header">
        <div className="note-editor-header">
          <div className="note-editor-title">
            <input
              className="note-title"
              contentEditable="true"
              spellCheck="true"
              onChange={onTitleChange}
              value={title}
            />
            <input
              className="datetime-selector"
              type="datetime-local"
              onChange={onDateChange}
              value={dateTime}
            />
          </div>
          <div className="save-button button" onClick={saveNote}>
            Save
          </div>
          <div className="delete-button button" >Delete</div>
        </div>
      </div>
      <div className="text-editor">
        <ReactQuill
          theme="snow"
          value={textContent}
          onChange={onTextChange}
          className="editor-input"
          modules={modules}
        />
      </div>
    </div>
  );
}

export default Textarea;