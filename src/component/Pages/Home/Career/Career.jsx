export default function Career() {
    const steps = [
      { id: "", title: "Search", icon: "💡", description: "Find the best opportunities tailored for you." },
      { id: "", title: "Discover", icon: "🔍", description: "Explore detailed information about jobs." },
      { id: "", title: "Apply", icon: "📝", description: "Submit your application with ease and confidence." },
      { id: "", title: "Connect", icon: "🔗", description: "Engage with recruiters and grow your network." },
      { id: "", title: "Achieve", icon: "🏆", description: "Land your dream job and celebrate success!" },
    ];
  
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-gray-100 min-h-screen">
        <h2 className="text-4xl md:text-4xl font-extrabold text-gray-800 mb-16 text-center">
          How Job Quick Works for You
        </h2>
        
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              {/* Circle Icon */}
              <div className="w-36 h-36 flex items-center justify-center bg-white shadow-2xl rounded-full border-4 border-gray-400 transform hover:scale-110 transition-all duration-300">
                <span className="text-6xl">{step.icon}</span>
              </div>
              
              {/* Step Number */}
              <div className="absolute -bottom-7 bg-blue-500 text-white text-lg font-bold px-4 py-1 rounded-full shadow-lg">
                {step.id}
              </div>
  
              {/* Title & Description */}
              <p className="mt-12 text-gray-900 font-extrabold text-2xl">{step.title}</p>
              <p className="mt-2 text-gray-600 text-lg max-w-xs">{step.description}</p>
  
              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div className="absolute top-16 left-[110%] w-24 md:w-28 h-2 bg-blue-300 md:block hidden animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }