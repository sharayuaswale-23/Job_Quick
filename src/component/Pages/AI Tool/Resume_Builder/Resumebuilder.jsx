import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Header from "../../../common/header/Header";
import Footer from "../../../common/Footer/Footer";

const ResumeBuilder = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  });

  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  const [currentEducation, setCurrentEducation] = useState({
    school: "",
    degree: "",
    major: "",
    graduationYear: "",
  });

  const [currentWork, setCurrentWork] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [currentSkill, setCurrentSkill] = useState("");

  const [currentStep, setCurrentStep] = useState(1); 

  const generatePDF = () => {
    if (!personalInfo.fullName) {
      alert("Please enter your full name before generating the resume.");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Refined Color Palette
    const colors = {
      primary: [34, 49, 63], 
      accent: [48, 213, 200], 
      text: {
        dark: [40, 40, 40], 
        light: [255, 255, 255], 
      },
      background: {
        main: [255, 255, 255], 
        section: [245, 245, 245],
      },
    };

    let yPos = 20;

    const drawPageBackground = () => {
      doc.setFillColor(...colors.background.main);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.1);
      for (let i = 0; i < pageWidth; i += 5) {
        for (let j = 0; j < pageHeight; j += 5) {
          if (Math.random() > 0.9) {
            doc.line(i, j, i + 1, j + 1);
          }
        }
      }
    };

    const drawHeader = () => {
      doc.setFillColor(...colors.primary);
      doc.rect(0, 0, pageWidth, 50, 'F');
      
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.line(0, 50, pageWidth, 50);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...colors.text.light);
      doc.text(personalInfo.fullName.toUpperCase(), pageWidth / 2, 30, { align: "center" });
      
      doc.setFontSize(10);
      doc.text(
        `${personalInfo.email || ""} | ${personalInfo.phone || ""} | ${personalInfo.location || ""}`,
        pageWidth / 2,
        40,
        { align: "center" }
      );

      yPos = 60;
    };

    const drawSectionTitle = (title) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...colors.primary);

      doc.text(title.toUpperCase(), 20, yPos);
      doc.setDrawColor(...colors.primary);
      doc.setLineWidth(0.7);
      doc.line(20, yPos + 3, 120, yPos + 3);

      yPos += 15;
    };

    const drawProfessionalSection = (title, items, formatter) => {
      drawSectionTitle(title);

      items.forEach((item, index) => {
        doc.setFillColor(...(index % 2 === 0 ? colors.background.section : [255, 255, 255]));
        doc.rect(20, yPos - 2, pageWidth - 40, 12, 'F');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...colors.text.dark);

        doc.text("•", 22, yPos + 6);
        doc.text(formatter(item), 35, yPos + 6);

        yPos += 12;
      });

      yPos += 10;
    };

    const renderSkills = () => {
      drawSectionTitle("Skills");

      const skillsPerLine = 4;
      skills.forEach((skill, index) => {
        if (index % skillsPerLine === 0) {
          yPos += (index > 0 ? 12 : 0);
        }

        const xPosition = 20 + (index % skillsPerLine) * 45;

        doc.setFillColor(...colors.accent);
        doc.setTextColor(...colors.text.light);
        
        doc.roundedRect(xPosition, yPos, 40, 8, 2, 2, 'F');
        doc.setFontSize(9);
        doc.text(skill, xPosition + 20, yPos + 6, { align: 'center' });
      });

      yPos += 20;
    };

    const drawSections = () => {
      drawSectionTitle("Professional Summary");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...colors.text.dark);
      doc.text(doc.splitTextToSize(personalInfo.summary || "No summary provided", pageWidth - 40), 20, yPos);
      
      yPos += 30;

      drawProfessionalSection("Education", education, (edu) => 
        `${edu.school} - ${edu.degree} in ${edu.major} (${edu.graduationYear})`
      );

      drawProfessionalSection("Work Experience", workExperience, (work) => 
        `${work.company} | ${work.position} (${work.startDate} - ${work.endDate})`
      );

      renderSkills();
    };

    drawPageBackground();
    drawHeader();
    drawSections();

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Professional Resume | Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 10, { align: "center" });

    doc.save(`${personalInfo.fullName}_Professional_Resume.pdf`);
  };

  const addEducation = () => {
    if (currentEducation.school || currentEducation.degree || currentEducation.major || currentEducation.graduationYear) {
      setEducation([...education, currentEducation]);
      setCurrentEducation({ school: "", degree: "", major: "", graduationYear: "" });
    } else {
      alert("Please enter at least one education detail.");
    }
  };

  const addWorkExperience = () => {
    if (currentWork.company || currentWork.position || currentWork.startDate || currentWork.endDate || currentWork.description) {
      setWorkExperience([...workExperience, currentWork]);
      setCurrentWork({ company: "", position: "", startDate: "", endDate: "", description: "" });
    } else {
      alert("Please enter at least one work experience detail.");
    }
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    } else {
      alert("Please enter a skill.");
    }
  };

  const nextStep = () => setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
  const prevStep = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));

  return (
    <>
    <Header/>
 
      <div className="bg-gray-50 min-h-screen">
  <div className="max-w-4xl mx-auto py-10 px-6">
    <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8">Resume Builder</h1>

   
    <div className="flex justify-between mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`flex-1 text-center py-2 rounded-full text-sm font-semibold ${
            currentStep === step ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
          } transition duration-300`}
        >
          Step {step}
        </div>
      ))}
    </div>

    <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
 
      {currentStep === 1 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={personalInfo.fullName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Enter your location"
                value={personalInfo.location}
                onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
              <textarea
                placeholder="Write a brief summary about yourself"
                value={personalInfo.summary}
                onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Education</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">College</label>
              <input
                type="text"
                placeholder="College Name"
                value={currentEducation.school}
                onChange={(e) => setCurrentEducation({ ...currentEducation, school: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                placeholder="Degree"
                value={currentEducation.degree}
                onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Major</label>
              <input
                type="text"
                placeholder="Major"
                value={currentEducation.major}
                onChange={(e) => setCurrentEducation({ ...currentEducation, major: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="text"
                placeholder="Graduation Year"
                value={currentEducation.graduationYear}
                onChange={(e) => setCurrentEducation({ ...currentEducation, graduationYear: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2 text-center">
              <button
                type="button"
                onClick={addEducation}
                className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Education
              </button>
            </div>
          </div>
        </div>
      )}

     
      {currentStep === 3 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Work Experience</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                  placeholder="Company Name"
                  value={currentWork.company}
                  onChange={(e) => setCurrentWork({ ...currentWork, company: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                  placeholder="Position"
                  value={currentWork.position}
                  onChange={(e) => setCurrentWork({ ...currentWork, position: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                  placeholder="Start Date"
                  value={currentWork.startDate}
                  onChange={(e) => setCurrentWork({ ...currentWork, startDate: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                  placeholder="End Date"
                  value={currentWork.endDate}
                  onChange={(e) => setCurrentWork({ ...currentWork, endDate: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Job Description</label>
              <textarea
                placeholder="Job Description"
                  value={currentWork.description}
                  onChange={(e) => setCurrentWork({ ...currentWork, description: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>
            <div className="sm:col-span-2 text-center">
              <button
                type="button"
                onClick={addWorkExperience}
                className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Work Experience
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Work Experience</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <input
                type="text"
                  placeholder="Skill"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="sm:col-span-2 text-center">
              <button
                type="button"
                onClick={addSkill}
                className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}
      

 
      <div className="flex justify-between gap-4 mt-8">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-600 focus:outline-none"
          >
            Previous
          </button>
        )}
        {currentStep < 4 ? (
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Next
          </button>
        ) : (
          <button
            onClick={generatePDF}
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Generate PDF
          </button>
        )}
      </div>
    </div>
  </div>
</div>


      <Footer/>
    </>
  );
};

export default ResumeBuilder;



