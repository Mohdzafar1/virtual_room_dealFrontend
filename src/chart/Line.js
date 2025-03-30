import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { gettingDealList } from "../apiClients/endPoint";

const LineChart = () => {
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

    // Count deals per month
    const monthlyData = Array(12).fill(0);
    deals.forEach((deal) => {
      const month = new Date(deal.createdAt).getMonth(); // Get month (0-11)
      monthlyData[month] += 1; // Increment count for that month
    });

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        datasets: [
          {
            label: "Deals per Month",
            data: monthlyData,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.1,
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
        scales: {
          y: {
            beginAtZero: true,
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
    <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Deals Trend Over Time</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
