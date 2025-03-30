import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { gettingDealList } from "../apiClients/endPoint";

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [deals, setDeals] = useState([]);

  // Fetch deal list
  const getDealList = async () => {
    try {
      const res = await gettingDealList();
      setDeals(res.deal || []);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  useEffect(() => {
    getDealList();
  }, []);

  useEffect(() => {
    if (!deals.length) return; // Prevent running before data is loaded

    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy existing chart before creating a new one
    }

    const statusCounts = deals.reduce(
      (acc, deal) => {
        acc[deal.status] = (acc[deal.status] || 0) + 1;
        return acc;
      },
      { Cancelled: 0, Pending: 0, Completed: 0, "In Progress": 0 }
    );

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Cancelled", "Pending", "Completed", "In Progress"],
        datasets: [
          {
            label: "Deal Status Distribution",
            data: [
              statusCounts.Cancelled,
              statusCounts.Pending,
              statusCounts.Completed,
              statusCounts["In Progress"]
            ],
            backgroundColor: [
              "rgb(255, 99, 132)", // Red - Cancelled
              "rgb(54, 162, 235)", // Blue - Pending
              "rgb(0, 128, 0)", // Green - Completed
              "rgb(255, 205, 86)", // Yellow - In Progress
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup on unmount
      }
    };
  }, [deals]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Deal Status Overview</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
