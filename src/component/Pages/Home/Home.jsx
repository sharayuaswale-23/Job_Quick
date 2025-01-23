import MainHome from "./MainHome/MainHome";
import RecentJobs from "./RecentJobs/RecentJobs";
import Categories from "./Categories/Categories";
import Rules from "./Rules/Rules";
import TestimonialMarque from "../../Animation/TestimonialMarque/TestimonialMarque";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";


const Home = ()=> {
  
 return(
 <>
    <Header/>
   <MainHome/>
   <RecentJobs/>
   <Categories/>
   <Rules/>
   <TestimonialMarque/>
   <Footer/>

 </>
 )

}

export default Home;