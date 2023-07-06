import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "./Backend/Firebase_Init";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto shadow-xl  p-4`,
  heading: `text-3xl font-bold text-center text-grey-800 p-2`,
  form: `flex hustify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-400 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const updateNewTodo = (e) => {
    setNewTodo(e.target.value);
  };
  //create todo
  const createNewTodo = async (e) => {
    e.preventDefault(e);
    if (newTodo === "") {
      alert("New Todo cannot be empty");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: newTodo,
      completed: false,
    });
    setNewTodo("");
  };
  //read todo
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);
  //update todo in firebase
  const updateComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  //delete todo

  const deleteTodo = async (todo) => {
    await deleteDoc(doc(db, "todos", todo.id));
  };
  return (
    <div className={style.bg}>
      <div>
        <div className={style.container}>
          <h3 className={style.heading}>Todo App</h3>
          <form className={style.form} onSubmit={createNewTodo}>
            <input
              value={newTodo}
              onChange={updateNewTodo}
              type="text"
              className={style.input}
              placeholder="Add Todo"
            />
            <button className={style.button}>
              <AiOutlinePlus size={30} />
            </button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                updateComplete={updateComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
          <p className={style.count}>You have {todos.length} todos</p>
        </div>
      </div>
    </div>
  );
}

export default App;
