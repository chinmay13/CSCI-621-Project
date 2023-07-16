import React from "react";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize rounded`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize rounded`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
  editBtn: `pr-3`,
};

function Todo({ todo, updateComplete, deleteTodo, editTodo }) {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => updateComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          onClick={() => updateComplete(todo)}
          className={todo.completed ? style.textComplete : style.text}
        >
          {todo.text}
        </p>
      </div>
      <div>
        {/* <button
          className={style.editBtn}
          onClick={() => {
            editTodo(todo);
          }}
        >
          {<FaEdit />}
        </button> */}

        <button
          onClick={() => {
            deleteTodo(todo);
          }}
        >
          {<FaRegTrashAlt />}
        </button>
      </div>
    </li>
  );
}

export default Todo;
