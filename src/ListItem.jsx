const ListItem = ({todo, deleteItem, handleUpdate}) => {

    const handleDelete = ()=> {
         deleteItem(todo.id);
    }

    const handleClick = () =>{
        handleUpdate(todo.id, todo.status);
    }

    return(
        <div className="todos__list-item" key={todo.id}>
            <div className="todos__inner-div">
                <span onClick={handleClick} className="span-btn" style={ todo.status ? {}: {borderColor: "cornflowerblue",borderWidth: 2.5, backgroundColor: "cornflowerblue", borderStyle: "solid"} }></span>
                <p style={ todo.status ? {color: "black"} : {color: "darkgrey", textDecoration: "line-through"}}>{todo.title}</p>
            </div>
            <h6 onClick={handleDelete}>Delete</h6>
        </div>
    );
}

export default ListItem