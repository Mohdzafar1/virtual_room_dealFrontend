import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Analysis from "../../components/ui/pages/Analysis";
import DealList from "../../components/ui/pages/DealList";
import InComingDeal from "../../components/ui/pages/deal/InComingDeal";
import ViewDealDetails from "../../components/ui/pages/deal/ViewDealDetails";

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar Always Visible */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-5">
        <Routes>
          <Route path="" element={<Analysis />} />
          <Route path="createDeal" element={<DealList />} />
          <Route path="incoming_deal" element={<InComingDeal />} />
          <Route path="incoming_deal/:id" element={<ViewDealDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
