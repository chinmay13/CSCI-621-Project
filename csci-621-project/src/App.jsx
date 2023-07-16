import React from "react";
import { Route, Routes } from "react-router-dom";
import TodoHome from "./Todo_Home";
import SignIn from "./Authentication/SignIn";
import { AuthContextProvider } from "./Authentication/AuthenticationCtx";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<TodoHome />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
