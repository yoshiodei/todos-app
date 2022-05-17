import ListItem from "./ListItem";
import {useState, useEffect} from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
import db from "./firebaseConfig";
import { signOut, getAuth, onAuthStateChanged } from "@firebase/auth";

function Home() {

  const auth = getAuth();
  
  let user =  auth.currentUser;

  const [todos, setTodos] = useState([
    // {
    //   title: "Solve programming problems on Codewars",
    //   status: true,
    //   tid: "1"
    // },
    // {
    //   title: "Go to the codetrain hub",
    //   status: true,
    //   tid: "2"
    // },
    // {
    //   title: "Read on Javascript concepts",
    //   status: false,
    //   tid: "3"
    // },
    // {
    //   title: "Push my project codes to Github",
    //   status: true,
    //   tid: "4"
    // }
  ]);

  const [todo, setTodo] = useState("");
 
  const handleChange = (e) =>{
      e.preventDefault();
      setTodo(e.target.value);
  }

 const navigate = useNavigate();

// ---------- UPDATE TODO ----------

  const handleUpdate = (id, status) => {
    let newTodos = { status: !status }
    updateDoc(doc(db,"todos",id), newTodos)
  }

// ---------- ADD NEW TODO ----------  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(todo){
    let newTodo = { title: todo , status: true, uid: user.uid }
    addDoc(collection(db, "todos"), newTodo)
    .then(()=>{
        setTodo("");
    })
    .catch((error)=>{
        console.log(error.message)
    })
  }
  else alert("Please type before sending!");
  }

//   ---------- DELETE TODO ----------

  const deleteItem = (id) => {
    deleteDoc(doc(db,"todos",id))  
  }

  useEffect(() => {

    // ---------- READ TODO ----------
    onAuthStateChanged(auth, (user)=>{
      
    });

    const colRef = collection(db, "todos");
    // let userId = user ? user.uid : "" ; 
    
    // console.log("ther userId is", userId)
    const q = query(colRef, where("uid","==", user.uid))
    const unSub = onSnapshot(q, snapshot => {
       setTodos(snapshot.docs.map(doc =>( {...doc.data(), id:doc.id } ) ))
      //  setActiveTodos(todos.filter(( todo => todo.status )))
      //  setCompletedTodos(todos.filter(( todo => !todo.status )))
      }
    );
    
    let tabs = document.querySelectorAll('.tab-btn');
    let tab_contents = document.querySelectorAll('.content');
  
    tabs.forEach((tab,index)=>{
      console.log(tab);
      tab.addEventListener("click",(e)=>{
      for(tab of tabs){
      tab.classList.remove("active");
      }
      e.target.classList.add("active");
          
      tab_contents.forEach((content, cont_index)=>{
          content.style.display = "none";
          if(index === cont_index){
              content.style.display = "flex";
          }
      })    
      })
  });

  return unSub;
  }, []);

  // ---------- LOG OUT ----------

  const handleLogOut = () => {
      signOut(auth)
      .then(() => {
        navigate("/");
        console.log("user signed out successfully");
      })
      .catch(() => {
        console.log("signout failed");
      })
  }


  return (
     <div className="App">
      <div className="header">
        <div className="header_label">
          <div className="header_title">
            <div className="header_image"></div>
            <h1>{ user &&  ("Hi, " + user.displayName)}</h1>
          </div>
          <div>
            <button onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="todos">
          <form onSubmit={handleSubmit}>
            <input
             onChange={handleChange}
             value={todo}
             placeholder="What are you up to?"
             className="todos__input"/>
             <button type="submit" className="todos__input-btn">+</button>
          </form>
          <div className="todos__list">
            <div className="todos__list-div content todos__list-div--content">
              { !!todos.length &&
                (
                todos.map((todo) => {
                  return(
                    <ListItem  todo={todo} deleteItem={deleteItem} handleUpdate={handleUpdate} />
                  );
                })
                )
              }
              {
                !todos.length && 
                (
                  <div className="todos__list-item todos__list-item--empty" >
                      <h4>No Item in List</h4>
                  </div>
                )
              }
            </div>
            <div className="todos__list-div content ">
              {/* { !!activeTodos.length &&
                  (  
                    activeTodos.map((todo) => {
                      return(
                        <ListItem  todo={todo} deleteItem={deleteItem} handleUpdate={handleUpdate} />
                      );
                    })
                  )
                }
                {
                  !activeTodos.length && 
                  (
                    <div className="todos__list-item todos__list-item--empty" >
                        <h4>No Item in List</h4>
                    </div>
                  )
                }
                 */}
            </div>
            <div className="todos__list-div content ">
              {/* { !!completedTodos.length &&
                    (  
                      completedTodos.map((todo) => {
                        return(
                          <ListItem  todo={todo} deleteItem={deleteItem} handleUpdate={handleUpdate} />
                        );
                      })
                    )
                  }
                  {
                    !completedTodos.length && 
                    (
                      <div className="todos__list-item todos__list-item--empty" >
                          <h4>No Item in List</h4>
                      </div>
                    )
                  }
                   */}
            </div>
            <div className="todos__list-footer">
                <h5><span>0</span> item(s) left</h5>
                <h5 className="active tab-btn">All</h5>
                <h5 className="tab-btn">Active</h5>
                <h5 className="tab-btn">Completed</h5>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <h6>made with love by @KVZU</h6>
      </footer>
    </div>
  );
}

export default Home;
