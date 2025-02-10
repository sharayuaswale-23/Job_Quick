import MainHome from "./MainHome/MainHome";
import RecentJobs from "./RecentJobs/RecentJobs";
import Categories from "./Categories/Categories";
import Rules from "./Rules/Rules";
import Career from "./Career/Career";
import TestimonialMarque from "../../Animation/TestimonialMarque/TestimonialMarque";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";


const Home = ()=> {
  
 return(
 <>
    <Header/>
   <MainHome/>
   <RecentJobs/>
   <Career/>
   <Categories/>
   <Rules/>
   <TestimonialMarque/>
   <Footer/>

 </>
 )

}

export default Home;