import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { query, collection, getDocs, onSnapshot } from "firebase/firestore";
//import firebaseDB from "./Backend/Firebase_Init";

function TODO() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    // Initialize Firebase (make sure to replace the config with your own Firebase configuration)
    const firebaseConfig = {
      apiKey: "AIzaSyAJiPxri_NhpfhSjhO-3XSlW7oaWNaz0dY",
      authDomain: "csci-621-project-fb6a2.firebaseapp.com",
      projectId: "csci-621-project-fb6a2",
      storageBucket: "csci-621-project-fb6a2.appspot.com",
      messagingSenderId: "676915185863",
      appId: "1:676915185863:web:1512f6e1c5834dd7b016e2",
      measurementId: "G-4PDHW67XV0",
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Fetch data from Firebase
    // const fetchData = async () => {
    //   try {
    //     const snapshot = await db.collection("todos").get();
    //     const fetchedData = snapshot.docs.map((doc) => doc.data());
    //     setData(fetchedData);
    //   } catch (error) {
    //     console.error("Error fetching data: ", error);
    //   }
    // };
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
  }, []);

  //   const fetchPost = async () => {
  //     await getDocs(collection(db, "todos")).then((querySnapshot) => {
  //       const newData = querySnapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       //setTodos(newData);
  //       console.log(data, newData);
  //     });
  //   };

  //   useEffect(() => {
  //     fetchPost();
  //   }, []);

  return (
    <div>
      <h1>Your Data:</h1>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// async function getTodos() {
//   const todosCol = collection(firebaseDB, "todos");
//   const todosSnapshot = await getDocs(todosCol);
//   const todosList = todosSnapshot.docs.map((doc) => doc.data());
//   console.log(todosList);
//   //return todosList;
// }

export default TODO;
