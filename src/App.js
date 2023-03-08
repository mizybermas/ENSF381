import React from "react";
import Header from "./components/Header";
import NoteApp from "./components/NoteApp";

function App() {
  const [sidebarVisable, setVisability] = React.useState(true);

  function minimizeSide() {
    setVisability(!sidebarVisable);
  }

  return (
    <div class="body">
      <Header toggleNotes={minimizeSide} />
      <NoteApp isVisable={sidebarVisable} />
    </div>
  );
}



export default App;