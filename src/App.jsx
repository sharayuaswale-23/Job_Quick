import { Routes, Route } from "react-router-dom";
import Home from "./component/Pages/Home/Home";
import Header from "./component/common/header/Header";
import Footer from "./component/common/footer/Footer";


const App = ()=> {
  
 return(
 <>
   <Header/>
   <Home/>
   <Footer/>
 </>
 )

}

export default App;