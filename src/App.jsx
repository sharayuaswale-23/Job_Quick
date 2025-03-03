import { Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Home from "./component/Pages/Home/Home";
import ContactPage from "./component/Pages/Contact/Contact";
import Category from "./component/Pages/Category/Category";
import ATS_Score from "./component/Pages/AI Tool/ATS_Score/ATS_Score";
import Salary from "./component/Pages/AI Tool/Salary/Salary";
import ResumeBuilder from "./component/Pages/AI Tool/Resume_Builder/Resumebuilder";
import JobDetail from "./component/Pages/Job_Detail/JobDetail";
import Profile from "./component/Pages/Profile/Profile";
import UserDetails from "./component/Pages/UserDetails/UserDetails";
import Login from "./component/Authentication/Login/Login";
import Signup from "./component/Authentication/SignUp/SignUp";
import Dashboard from "./component/Pages/Employer/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import HosterLogin from "./component/Pages/Employer/HosterLogin/HosterLogin";
import HosterSignup from "./component/Pages/Employer/HosterSignup/HosterSignup";
import HosterDetail from "./component/Pages/Employer/HosterDetail/HosterDetail";
import HosterProfile from "./component/Pages/Employer/HosterProfile/HosterProfile";
import JobPosting from "./component/Pages/Employer/JobPosting/JobPosting";
import NotFound from "./component/Pages/NotFound/NotFound";
import About from "./component/Pages/About/About";
import MyJob from "./component/Pages/Employer/MyJob/MyJob";
import ViewApplicant from "./component/Pages/Employer/ViewApplicant/ViewApplicant";
import Applicant from "./component/Pages/Employer/Applicant/Applicant";
import AiMockTest from "./component/Pages/Mock/Mock";
import QuestionComponent from "./component/Pages/Questions/Questions";
import InterviewApp from "./component/Pages/InterviewApp/InterviewApp";


export const AuthContext = createContext();

const RequireAuth = ({ children }) => {
  const { isAuthorized } = useContext(AuthContext);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const navigate = useNavigate();


  const [isAuthorized, setIsAuthorized] = useState(
    () => Cookies.get("isAuthorized") === "true"
  );


  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token) {
      setIsAuthorized(true);
    }
  }, []);


  useEffect(() => {
    Cookies.set("isAuthorized", isAuthorized, { expires: 7 }); 
  }, [isAuthorized]);

  const handleLogin = (token) => {
    Cookies.set("authToken", token, { expires: 7 }); 
    setIsAuthorized(true);
    navigate("/dashboard"); 
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    Cookies.remove("authToken");
    Cookies.set("isAuthorized", "false", { expires: 7 });
    navigate("/"); 
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized, handleLogin, handleLogout }}>
      <Routes>
        <Route path="/" element={<Home />} />
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
            path='/mocktest'
            element={
              <RequireAuth>
                <AiMockTest />
              </RequireAuth>
            }
          />
          <Route
          path='/questions/:category/:subcategory'
          element={
            <RequireAuth>
              <QuestionComponent/>
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
          path="/interviewapp"
          element={
            <RequireAuth>
              <InterviewApp />
            </RequireAuth>
          }
        />
        <Route
          path="/job/:id"
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
          path="/userdetails"
          element={
            <RequireAuth>
              <UserDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/about"
          element={
            <RequireAuth>
              <About />
            </RequireAuth>
          }
        />
        <Route path="/hosterlogin" element={<HosterLogin />} />
        <Route path="/hostersignup" element={<HosterSignup />} />
        <Route path="/hosterdetail" element={<HosterDetail />} />
        <Route path="/hosterprofile" element={<HosterProfile />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/jobposting" element={<JobPosting />}/>
        <Route path="/myjob" element={<MyJob />}/>
        <Route path="/job/:id/applicants" element={<ViewApplicant />}/>
        <Route path="applicant/:id" element={<Applicant />}/>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;