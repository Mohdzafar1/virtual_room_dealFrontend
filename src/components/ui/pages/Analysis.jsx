import React from "react";
import PieChart from "../../../chart/Pie";
import LineChart from "../../../chart/Line";
import { NotificationBell } from "../NotificationBell";
import { Profile } from "./Profile";

const Analysis = () => {
      


  return (
    <div>
     <div className="flex justify-end">
          <NotificationBell/>
           <Profile/>
          </div>
      <h1 className="font-bold text-xl py-5">Analysis</h1>
      <div className="bg-white p-5 shadow-lg rounded-lg mt-6">
        <div className="flex flex-row-2 justify-between mt-4">
          <PieChart/>
          <LineChart/>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
