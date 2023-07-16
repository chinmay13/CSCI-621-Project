import React from "react";
import { Route, Routes } from "react-router-dom";
import TodoHome from "./Todo_Home";
import SignIn from "./AppContext/SignIn";
import { AuthContextProvider } from "./AppContext/AuthenticationCtx";

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
