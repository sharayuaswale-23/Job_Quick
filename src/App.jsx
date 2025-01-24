// import { Routes, Route } from "react-router-dom";
// import Home from "./component/Pages/Home/Home";
// import ContactPage from "./component/Pages/Contact/Contact";
// import Category from "./component/Pages/Category/Category";
// import ATS_Score from "./component/Pages/AI Tool/ATS_Score/ATS_Score";
// import Salary from "./component/Pages/AI Tool/Salary/Salary";
// import ResumeBuilder from "./component/Pages/AI Tool/Resume_Builder/Resumebuilder";
// import JobDetail from "./component/Pages/Job_Detail/JobDetail";
// import Profile from "./component/Pages/Profile/Profile";

// const App = ()=> {
  
//  return(
//  <>
//    <Routes>

//         <Route path="/" element = {<Home/>}></Route>

//         <Route path="/contact" element = {<ContactPage/>}></Route>

//         <Route path="/category" element = {<Category/>}></Route>

//         <Route path="/atsscore" element = {<ATS_Score/>}></Route>

//         <Route path="/salary" element = {<Salary/>}></Route>

//         <Route path="/resumebuilder" element = {<ResumeBuilder/>}></Route>

//         <Route path="/jobdetail" element = {<JobDetail/>}></Route>

//         <Route path="/profile" element = {<Profile/>}></Route>

//     </Routes>

//  </>
//  )

// }

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";
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

// Create a context for authentication
export const AuthContext = createContext();

const RequireAuth = ({ children }) => {
  const { isAuthorized } = useContext(AuthContext);
  const isLoggedIn = !!isAuthorized;

  // Redirect logic for unauthorized users
  if (!isLoggedIn) {
    const currentPath = window.location.pathname;
    return currentPath === "/" ? children : <Navigate to="/signup" />;
  }

  return children;
};

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false); // Authorization state

  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
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
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;