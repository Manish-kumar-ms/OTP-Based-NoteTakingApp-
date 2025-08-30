import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { UserDataContext } from "./Context/UserContext";

const App = () => {
    const  {userData, setUserData,loading} = useContext(UserDataContext);
    
     if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }
   console.log("User data:", userData)
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path="/signup" element={userData ? <Navigate to="/home" /> : <SignUp />} />
      <Route path="/login" element={userData ? <Navigate to="/home" /> : <Login />} />
    </Routes>
  );
};

export default App;
