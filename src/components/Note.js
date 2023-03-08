function Note(props){
  return (
    <div className="note-item-flex">
      <h4 className="note-item">{props.title}</h4>
      <small className="date-text note-item">{props.dateTime}</small>
      <div className="note-text note-item">{props.content}</div>
    </div>
  );
}

export default Note;