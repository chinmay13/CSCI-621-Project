import React, { useEffect, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "./Backend/Firebase_Init";
import { UserAuth } from "./Authentication/AuthenticationCtx";
import { Link, useNavigate } from "react-router-dom";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  where,
  orderBy,
} from "firebase/firestore";
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#1CB5E0] to-[#DBF7FF]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto shadow-xl p-4 rounded`,
  heading: `text-3xl font-bold text-center text-grey-800 p-2`,
  form: `flex hustify-between`,
  input: `border p-2 w-full text-xl rounded`,
  button: `border p-4 ml-2 bg-[#0D9EFF] text-slate-100 shadow-xl rounded`,
  navbarHead: `flex justify-between bg-gradient-to-r from-[#1CB5E0] to-[#DBF7FF] w-full p-4`,
  navbarTitle: `text-center text-5xl font-bold text-grey-800`,
  navbarTxt: `text-xl text-center font-semibold`,
  count: `text-center p-2`,
  addHeight: `h-3`,
  logoutBtn: `bg-red-800 text-xl text-white rounded shadow-xl m-1 p-2`,
  countFooter: `p-3 flex justify-between`,
  totalCnt: `p-2 ml-1 bg-green-300 text-slate-100 rounded shadow-xl`,
  activeCnt: `p-2 ml-1 bg-red-400 text-slate-100 rounded shadow-xl`,
};

function TodoHome() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [activeTodoCount, setActiveTodoCount] = useState(0);
  const updateNewTodo = (e) => {
    setNewTodo(e.target.value);
  };

  useEffect(() => {
    if (user == null) {
      nav("/signin");
    }
    const todosCollection = collection(db, "todos");
    const q = query(todosCollection, where("user", "==", user.email));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      let activeCnt = 0;
      todosArr.forEach((doc) => {
        if (!doc.completed) {
          activeCnt++;
        }
      });
      setActiveTodoCount(activeCnt);
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

  const editTodo = async (todo, todoText) => {
    await updateDoc(doc(db, "todos", todo.id), {
      text: todoText,
    });
  };
  //delete todo

  const deleteTodo = async (todo) => {
    await deleteDoc(doc(db, "todos", todo.id));
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
      user: user.email,
    });
    setNewTodo("");
  };

  const { authGoogle, user, signingOut, setUser } = UserAuth();
  const nav = useNavigate();

  return (
    <div>
      <div className={style.navbarHead}>
        <div className={style.navbarTxt}>
          Welcome {user == null ? "" : user.displayName}
        </div>
        <h1 className={style.navbarTitle}>Todo List</h1>
        <button
          className={style.logoutBtn}
          onClick={async () => {
            await signingOut();
            setUser(null);
            nav("/signin");
          }}
        >
          Logout
        </button>
      </div>
      <div className={style.bg}>
        <div>
          <div className={style.container}>
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
          </div>
          <div className={style.addHeight}></div>
          <div className={style.container}>
            <ul>
              {todos
                .sort((todo1, todo2) =>
                  todo1.completed > todo2.completed ? 1 : -1
                )
                .map((todo, index) => (
                  <Todo
                    key={index}
                    todo={todo}
                    updateComplete={updateComplete}
                    deleteTodo={deleteTodo}
                  />
                ))}
            </ul>
            <div className={style.countFooter}>
              <p className={style.activeCnt}>Active todos: {activeTodoCount}</p>
              <p className={style.totalCnt}>Total todos: {todos.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoHome;
