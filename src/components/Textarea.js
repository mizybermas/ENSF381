import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Textarea(props) {
  
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: [] }],
      [{"color": []},{"background":[]}],
      ["bold", "italic", "underline", "blockquote"],
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
  
   props.setDateTime(event.target.value);
   }

   function submitNote() {
    const noteObj = {
      title: props.title,
      content: props.textContent,
      dateTime: props.dateTime,
    };

    props.onEditToggle();
    props.onAdd(noteObj);
    

    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push(noteObj);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  return ( 
    <div className="note-editor">
      <div className="title-header">
        <div className="note-editor-header">
          <div className="note-editor-title">
            <input
              className="note-title"
              contentEditable={props.isEditMode}
              spellCheck="true"
              onChange={props.onTitleChange}
              value={props.title}
            />
            <input
              className="datetime-selector"
              type="datetime-local"
              onChange={onDateChange}
              value={props.dateTime}
              readOnly={!props.isEditMode}
            />
          </div>
          <div className="save-button button" onClick={submitNote}>
            {props.isEditMode ? "Save" : "Edit"}
          </div>
          <div className="delete-button button" onClick={props.onDelete}>
            Delete
          </div>
        </div>
      </div>
      <div className={`text-editor ${props.isEditMode ? "" : "hidden"}`}>
        <ReactQuill
          theme="snow"
          value={props.textContent}
          onChange={props.onContentChange}
          className="editor-input"
          modules={modules}
          readOnly={!props.isEditMode}
        />
      </div>
    </div>
    
  );
}

export default Textarea;