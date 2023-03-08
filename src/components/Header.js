function Header(props){
    return(
    <nav><div class="navflex">
        <div class="menu">
            <button className="button" onClick={props.toggleNotes}>&#9776;</button>
        </div>
        <div className ="header" >
            <div className="app-title">
            <h1 className="title">Lotion</h1>
            <p>Like Notion, but worse.</p>
            </div>
        </div>
    </div>   
    </nav>
        
    );
}

export default Header;


