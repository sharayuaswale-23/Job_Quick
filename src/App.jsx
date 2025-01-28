import { Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import Home from "./component/Pages/Home/Home";
import ContactPage from "./component/Pages/Contact/Contact";
import Category from "./component/Pages/Category/Category";
import ATS_Score from "./component/Pages/AI Tool/ATS_Score/ATS_Score";
import Salary from "./component/Pages/AI Tool/Salary/Salary";
import ResumeBuilder from "./component/Pages/AI Tool/Resume_Builder/Resumebuilder";
import JobDetail from "./component/Pages/Job_Detail/JobDetail";
import Profile from "./component/Pages/Profile/Profile";
import Login from "./component/Authentication/Login/Login";
import Signup from "./component/Authentication/SignUp/SignUp";
import Dashboard from "./component/Pages/Dashboard/Dashboard";

// Create a context for authentication
export const AuthContext = createContext();

const RequireAuth = ({ children }) => {
  const { isAuthorized } = useContext(AuthContext);
  const currentPath = window.location.pathname;

  if (!isAuthorized && currentPath !== "/") {
    return<Navigate to="/" />;
  }
  return children;
  
};

const App = () => {
  // Check if the user is already authorized from localStorage
  const [isAuthorized, setIsAuthorized] = useState(
    () => localStorage.getItem("isAuthorized") === "true"
  );

  useEffect(()=>{
    localStorage.setItem("isAuthorized", isAuthorized);
  },[isAuthorized]);
 
  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      <Routes>
        <Route
          path="/"
          element={
              <Home />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/contact"
          element={
            <RequireAuth>
              <ContactPage />
            </RequireAuth>
          }
        />
        <Route
          path="/category"
          element={
            <RequireAuth>
              <Category />
            </RequireAuth>
          }
        />
        <Route
          path="/atsscore"
          element={
            <RequireAuth>
              <ATS_Score />
            </RequireAuth>
          }
        />
        <Route
          path="/salary"
          element={
            <RequireAuth>
              <Salary />
            </RequireAuth>
          }
        />
        <Route
          path="/resumebuilder"
          element={
            <RequireAuth>
              <ResumeBuilder />
            </RequireAuth>
          }
        />
        <Route
          path="/jobdetail"
          element={
            <RequireAuth>
              <JobDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }


          


        />


         <Route
          path="/Dashboard"
          element={

              <Dashboard />
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;