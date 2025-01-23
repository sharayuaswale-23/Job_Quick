import { Routes, Route } from "react-router-dom";
import Home from "./component/Pages/Home/Home";
import ContactPage from "./component/Pages/Contact/Contact";
import Category from "./component/Pages/Category/Category";
import ATS_Score from "./component/Pages/AI Tool/ATS_Score/ATS_Score";
import Salary from "./component/Pages/AI Tool/Salary/Salary";
import ResumeBuilder from "./component/Pages/AI Tool/Resume_Builder/Resumebuilder";


const App = ()=> {
  
 return(
 <>
   <Routes>

        <Route path="/" element = {<Home/>}></Route>

        <Route path="/contact" element = {<ContactPage/>}></Route>

        <Route path="/category" element = {<Category/>}></Route>

        <Route path="/atsscore" element = {<ATS_Score/>}></Route>

        <Route path="/salary" element = {<Salary/>}></Route>

        <Route path="/resumebuilder" element = {<ResumeBuilder/>}></Route>

    </Routes>

 </>
 )

}

export default App;