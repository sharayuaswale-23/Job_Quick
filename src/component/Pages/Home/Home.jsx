import MainHome from "./MainHome/MainHome";
import RecentJobs from "./RecentJobs/RecentJobs";
import Categories from "./Categories/Categories";
import Rules from "./Rules/Rules";
import Career from "./Career/Career";
import TestimonialMarque from "../../Animation/TestimonialMarque/TestimonialMarque";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";
import TopCompany from "./TopCompany/Topcompany";


const Home = ()=> {
  
 return(
 <>
    <Header/>
   <MainHome/>
   <RecentJobs/>
   <Career/>
   <Categories/>
   <TopCompany/>
   <Rules/>
   <TestimonialMarque/>
   <Footer/>

 </>
 )

}

export default Home;