import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import Cookies from 'js-cookie';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ jobs }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasJobs, setHasJobs] = useState(false);

  const defaultPieData = {
    labels: ['Software Development', 'Data Science', 'Product Management', 'Design'],
    datasets: [{
      data: [40, 25, 20, 15],
      backgroundColor: [
        'hsla(210, 70%, 50%, 0.8)',
        'hsla(280, 70%, 50%, 0.8)',
        'hsla(150, 70%, 50%, 0.8)',
        'hsla(45, 70%, 50%, 0.8)'
      ],
      borderColor: 'white',
      borderWidth: 2,
    }]
  };

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setHasJobs(true);
      fetchAllCompaniesData();
    } else {
      setHasJobs(false);
      setChartData([]);
    }
  }, [jobs]);

  const fetchAllCompaniesData = async () => {
    setIsLoading(true);
    try {
      const jobTotals = {};
      
      await Promise.all(
        jobs.map(async (job) => {
          const response = await fetch(`https://jobquick.onrender.com/applicants/graph/${job._id}`, {
            headers: { Authorization: `Bearer ${Cookies.get("jwtToken")}` },
          });
          const result = await response.json();
          const applicants = result.data ? 
            result.data.reduce((sum, day) => sum + day.applicants, 0) : 0;
          
          jobTotals[job.title] = (jobTotals[job.title] || 0) + applicants;
        })
      );

      const data = Object.entries(jobTotals).map(([job, total]) => ({
        name: job,
        applicants: total
      }));

      setChartData(data);
    } catch (error) {
      console.error("Error fetching jobs data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsla(${hue}, 70%, 50%, 0.8)`);
    }
    return colors;
  };

  const pieChartData = hasJobs ? {
    labels: chartData.map(item => item.name),
    datasets: [
      {
        data: chartData.map(item => item.applicants),
        backgroundColor: generateColors(chartData.length),
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  } : defaultPieData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600',
        },
        bodyFont: {
          size: 13,
        },
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return hasJobs 
              ? `${value} Applicants (${percentage}%)`
              : `${value} Sample Units (${percentage}%)`;
          }
        }
      },
    },
  };

  const totalApplicants = chartData.reduce((sum, item) => sum + item.applicants, 0);

  return (


    <div className="w-full bg-white rounded-xl shadow-lg p-3 sm:p-4 lg:p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-4 md:mb-6 text-center sm:text-left">
        {hasJobs ? "Job Applications Distribution" : "Sample Distribution Overview"}
      </h2>
  
        <div className="flex flex-col lg:flex-row gap-4">

          <div className="w-full lg:w-1/2 flex justify-center items-center mb-4 lg:mb-0">
            <div className="relative w-full h-48 sm:h-56 md:h-64">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">              
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <Pie data={pieChartData} options={options} />
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col px-2 sm:px-4">
          <div className="h-auto sm:h-[200px] overflow-y-scroll -ms-overflow-style-none" style={{ scrollbarWidth: 'none' }}>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1 sm:gap-2 lg:mt-8">
                {pieChartData.labels.map((label, index) => (
                  <div key={label} className="flex items-center p-1 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div 
                      className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2 flex-shrink-0" 
                      style={{ backgroundColor: pieChartData.datasets[0].backgroundColor[index] }}
                    />
                    <span className="text-xs md:text-sm text-gray-700 truncate">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
        
        <div className="mt-4 sm:mt-6">
          {hasJobs && chartData.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              
              <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <p className="text-xs sm:text-sm text-purple-700 font-medium">Average/Job</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-purple-600">
                  {(totalApplicants / chartData.length).toFixed(1)}
                </p>
              </div>
              <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <p className="text-xs sm:text-sm text-orange-700 font-medium">Most Applied</p>
                <p className="text-xs sm:text-sm md:text-base font-bold text-orange-600 truncate">
                  {chartData.reduce((max, item) => 
                    item.applicants > max.applicants ? item : max
                  ).name}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center p-3 sm:p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 italic text-xs sm:text-sm">No job data available</p>
            </div>
          )}
        </div>
    </div>
  );
};

export default PieChart;