import React from 'react';
import Header from "../../common/header/Header";
import Footer from "../../common/Footer/Footer";

const JobDetail = () => {

  const applybtn = ()=> {
    alert("Applied Successfully");
  }
  
  return (
    <>
  <Header />
    <div className="font-sans">
  
      {/* Main Content */}
      <main className="pt-20 pb-6 max-w-7xl mx-auto px-10">
        {/* Job Header */}
        <section className="bg-pink-50 p-8 rounded-md mb-8">
          <h1 className="text-2xl font-bold">Front-end Developer</h1>
          <p className="text-sm text-gray-600">Upwork</p>
          <p className="text-lg font-semibold">$50 - $100 / week</p>
          <button onClick={applybtn} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md">
            Apply Now
          </button>
        </section>

        {/* Job Overview */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Job Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Date Posted:</p>
              <p>October 7, 2022</p>
            </div>
            <div>
              <p className="font-semibold">Location:</p>
              <p>New York</p>
            </div>
            <div>
              <p className="font-semibold">Offered Salary:</p>
              <p>$50 - $100 / week</p>
            </div>
            <div>
              <p className="font-semibold">Expiration Date:</p>
              <p>October 7, 2029</p>
            </div>
          </div>
        </section>

        {/* Job Description */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Job Description</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </section>

        {/* Key Responsibilities */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Key Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Work with teams to lead product design.</li>
            <li>Maintain quality of the design process.</li>
            <li>Contribute to sketching sessions.</li>
            <li>Ensure design choices are data-led.</li>
          </ul>
        </section>

        {/* Related Jobs */}
        <section>
          <h2 className="text-xl font-bold mb-4">Related Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 border rounded-md">
              <h3 className="font-bold">Full-Stack Developer</h3>
              <p className="text-sm text-gray-600">DesignBlue</p>
              <p className="text-sm">$8 - $12 / day</p>
            </div>
            <div className="p-6 border rounded-md">
              <h3 className="font-bold">UX/UI Designer Web</h3>
              <p className="text-sm text-gray-600">Medium</p>
              <p className="text-sm">$25 - $30 / week</p>
            </div>
          </div>
        </section>
      </main>
    </div>
    <Footer />
    </>
  );
};

export default JobDetail;
