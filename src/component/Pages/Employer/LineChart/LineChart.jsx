import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Cookies from "js-cookie";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ jobs }) => {
    console.log(jobs);
  const [selectedJob, setSelectedJob] = useState("");
  const [graphData, setGraphData] = useState({
    labels: [],
    dataPoints: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("jwtToken");

  // Function to get ordered days ending with today
  const getOrderedDays = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Start from tomorrow (relative to last week) and end with today
    const orderedDays = [];
    for (let i = 1; i <= 7; i++) {
      const index = (today + i) % 7;
      orderedDays.push(days[index]);
    }
    // Move the last day (which is today) to the end
    orderedDays.pop(); // Remove today from its current position
    orderedDays.push(days[today]); // Add today at the end
    
    return orderedDays;
  };

  useEffect(() => {
    if (jobs.length > 0) {
      if (!selectedJob) {
        setSelectedJob(jobs[0]._id);
      } else {
        fetchGraphData(selectedJob);
      }
    } else {
      setSelectedJob("");
      setGraphData({ labels: [], dataPoints: [] });
    }
  }, [jobs, selectedJob]);

  const fetchGraphData = async (jobId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://jobquick.onrender.com/applicants/graph/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success && data.data) {
        const orderedDays = getOrderedDays();
        const dataPoints = orderedDays.map(day => {
          const dayData = data.data.find(d => d.day === day);
          return dayData ? dayData.applicants : 0;
        });

        setGraphData({ labels: orderedDays, dataPoints });
      }
    } catch (error) {
      console.error("Error fetching graph data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getYAxisMax = () => {
    if (!graphData) return 8;
    const maxApplicants = Math.max(...graphData.dataPoints);
    return maxApplicants <= 8 ? 8 : Math.ceil(maxApplicants / 4) * 4;
  };

  const getStepSize = () => {
    const max = getYAxisMax();
    return max <= 8 ? 1 : Math.ceil(max / 8);
  };

  const chartData = {
    labels: graphData.labels,
    datasets: [
      {
        label: selectedJob ? "Applicants" : "Select a job to view applications",
        data: graphData.dataPoints,
        borderColor: "#32cd32",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        borderWidth: 2,
        pointBackgroundColor: "#008000",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          weight: "600",
        },
        bodyFont: {
          size: 13,
        },
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} Applicants`;
          }
        }
      },
    },
    scales: {
      y: {
        min: 0,
        max: getYAxisMax(),
        ticks: {
          stepSize: getStepSize(),
          precision: 0,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.06)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl sm:text-2xl font-semibold text-green-800">
            Applicants Per Day
          </h2>
          
          <div className="w-full sm:w-64">
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg 
                         text-sm text-gray-700 focus:border-green-500 focus:ring-2 
                         focus:ring-green-200 outline-none transition-colors duration-200"
            >
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="lg:relative w-full h-[350px] sm:h-[420px] bg-white rounded-lg">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">Loading chart data...</p>
              </div>
            </div>
          ) : (
            <Line data={chartData} options={options} />
          )}
        </div>

        {selectedJob && graphData && (
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-black">Total Applicants</p>
              <p className="text-xl font-semibold text-black">
                {graphData.dataPoints.reduce((a, b) => a + b, 0)}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-black">Peak Day</p>
              <p className="text-xl font-semibold text-black">
                {graphData.labels[graphData.dataPoints.indexOf(Math.max(...graphData.dataPoints))]}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-black">Average/ Day</p>
              <p className="text-xl font-semibold text-black">
                {(graphData.dataPoints.reduce((a, b) => a + b, 0) / 7).toFixed(1)}
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm  text-black">Active Days</p>
              <p className="text-xl font-semibold text-black">
                {graphData.dataPoints.filter(x => x > 0).length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;
