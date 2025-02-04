import MainHome from "./MainHome/MainHome";
import RecentJobs from "./RecentJobs/RecentJobs";
import Categories from "./Categories/Categories";
import Rules from "./Rules/Rules";
import TestimonialMarque from "../../Animation/TestimonialMarque/TestimonialMarque";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";


const Home = ()=> {
  
 return(
 <>
    <Header/>
   <MainHome/>
   <RecentJobs/>
   <Categories/>
   <Rules/>
   <TestimonialMarque/>
   <section className="bg-white py-12">
  <div className="container mx-auto px-6">
    {/* Heading */}
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold text-gray-900">Our Contact</h2>
      <p className="text-black">Get in touch with us for any queries</p>
    </div>

    {/* Contact Info Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
      {[
        {
          icon: "fa-phone",
          title: "Phone",
          content: "+91 9999999999",
          color: "bg-green-400",
        },
        {
          icon: "fa-envelope",
          title: "Email",
          content: "sharayuaswale123@gmail.com",
          color: "bg-blue-400",
          link: "mailto:sharayuaswale123@gmail.com",
        },
        {
          icon: "fa-map-marker-alt",
          title: "Address",
          content: "Ram Nagar, Nagpur",
          color: "bg-red-200",
        },
        {
          icon: "fa-globe",
          title: "Follow Us",
          content: "",
          color: "bg-purple-200",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center p-4 bg-gray-100 rounded-full shadow-md w-60 h-60 transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          <div
            className={`w-16 h-16 ${item.color} text-black rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:rotate-12`}
          >
            <i className={`fa-solid ${item.icon}`}></i>
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-4">{item.title}</p>
          {item.link ? (
            <a href={item.link} className="text-gray-600 hover:text-blue-500 transition-all duration-300">
              {item.content}
            </a>
          ) : (
            <p className="text-gray-600 text-center">{item.content}</p>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
   <Footer/>

 </>
 )

}

export default Home;