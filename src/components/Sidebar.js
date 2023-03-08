import { v4 as uuidv4 } from 'uuid';
import Note from "./Note";

function Sidebar(props) {
    function addNote(event) {
        const noteObj = {title: "Untitled", content: "...", dateTime: "" };
        
        props.onAdd(noteObj);
    }
  return (
    <div className="notes-container">
      <div className="note-header-flex">
        <h3 className="note-header-item">Notes</h3>
        <div className=" plus-logo button" onClick={addNote}>&#43;</div>
      </div>
      <div className="scroller">
        {props.sideBar.map((noteItem,index) => {
          return (
            <Note
                key={index}
              title={noteItem.title}
              dateTime={noteItem.dateTime}
              content={noteItem.content}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;