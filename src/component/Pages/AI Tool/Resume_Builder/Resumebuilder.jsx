import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Header from "../../../common/header/Header";
import Footer from "../../../common/Footer/Footer";
import { FileText, User, BookOpen, Briefcase, ChevronLeft, ChevronRight, Download, NotepadText } from 'lucide-react';

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
  
    // Add Header
    const drawHeader = () => {
      doc.setFillColor(...colors.primary);
      doc.rect(0, 0, pageWidth, 50, 'F');
  
      doc.setFont("times", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...colors.text.light);
      doc.text(personalInfo.fullName.toUpperCase(), pageWidth / 2, 30, { align: "center" });
  
      doc.setFontSize(11);
      doc.text(
        `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`,
        pageWidth / 2,
        40,
        { align: "center" }
      );
  
      yPos = 60;
    };
  
    const drawSectionTitle = (title) => {
      doc.setFont("times", "bold");
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
  
        doc.setFont("times", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...colors.text.dark);
  
        doc.text("•", 22, yPos + 6);
        doc.text(formatter(item), 30, yPos + 6);
  
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
      doc.setFont("times", "normal");
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
  

    drawHeader();
    drawSections();
  
  
    doc.setFont("times", "italic");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Professional Resume | Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 10, { align: "center" });
  
    doc.save(`${personalInfo.fullName}_Resume.pdf`);
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
 
    <div className="min-h-screen bg-gradient-to-br mt-20 from-blue-50 to-gray-100">
  <div className="container mx-auto px-4 py-8">
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
        Professional Resume Builder
      </h1>
      <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
        Create a stunning resume in minutes with our easy-to-use builder
      </p>
    </div>

    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
      {/* Left Side Description */}
      <div className="hidden md:block lg:w-1/4 space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            Step-by-Step Guide
          </h3>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg transition-all ${currentStep === 1 ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Personal Information</span>
              </div>
            </div>
            <div className={`p-4 rounded-lg transition-all ${currentStep === 2 ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Education Details</span>
              </div>
            </div>
            <div className={`p-4 rounded-lg transition-all ${currentStep === 3 ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Work Experience</span>
              </div>
            </div>
            <div className={`p-4 rounded-lg transition-all ${currentStep === 4 ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <NotepadText className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Skills & Expertise</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="lg:w-3/4">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="md:hidden grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 mx-2 text-center mb-2 py-2 px-4 rounded-full text-sm font-semibold ${
                  currentStep === step ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                } transition duration-300 flex items-center justify-center gap-2`}
              >
                {step === 1 && <User className="w-4 h-4" />}
                {step === 2 && <BookOpen className="w-4 h-4" />}
                {step === 3 && <Briefcase className="w-4 h-4" />}
                {step === 4 && <NotepadText className="w-4 h-4" />}
                Step {step}
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {/* Keep all the existing form content here, just updating the styling classes */}
            {currentStep === 1 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-500" />
                  Personal Information
                </h2>
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
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                  Education
                </h2>
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
          {education.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold">Added Education:</h3>
                {education.map((edu, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-md mb-2">
                    {edu.school} - {edu.degree} in {edu.major} ({edu.graduationYear})
                  </div>
                ))}
              </div>
            )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                  Work Experience
                </h2>
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
          {workExperience.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold">Added Work Experiences:</h3>
                {workExperience.map((work, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-md mb-2">
                    {work.company} - {work.position} ({work.startDate} - {work.endDate})
                  </div>
                ))}
              </div>
            )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <NotepadText className="w-6 h-6 text-blue-500" />
                  Skills
                </h2>
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
          {skills.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold">Added Skills:</h3>
                <div className="flex flex-wrap">
                  {skills.map((skill, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded-md mr-2 mb-2">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
              </div>
            )}

            <div className="flex justify-between gap-4 mt-8 pt-4 border-t">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ml-auto"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={generatePDF}
                  className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ml-auto"
                >
                  Generate PDF
                  <Download className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      <Footer/>
  </>
  );
}
export default ResumeBuilder;
