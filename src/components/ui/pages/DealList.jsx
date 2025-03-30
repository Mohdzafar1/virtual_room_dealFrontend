import React, { useState } from "react";
import CreateDeal from "../../model/CreateDeal"; // Import CreateDeal component
import DealListTable from "./DealListTable";
import {NotificationBell} from "../NotificationBell"
import { Profile } from "./Profile";

const DealList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateDeal=()=>{
    setIsModalOpen(true)
  }

  return (
     <>
      <div className="flex justify-end">
      <NotificationBell/>
       <Profile/>
      </div>
       <div className="max-w-xxl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
     
     <div className="flex justify-between">
       <h1 className="font-bold text-2xl mb-4">Create Deal</h1>
       <button
         className="btn p-3 bg-slate-500 text-white rounded"
         onClick={handleCreateDeal}
       >
         Create Deal
       </button>
     </div>
     <div className="flex py-16">
     <DealListTable/>
     </div>

     {/* Modal */}
     {isModalOpen && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
           <div className="flex justify-between mb-4">
             <h2 className="text-xl font-bold">Create New Deal</h2>
             <button
               className="text-red-500 font-bold"
               onClick={() => setIsModalOpen(false)}
             >
               ✖
             </button>
           </div>
           <CreateDeal setIsModalOpen={setIsModalOpen}/>
         </div>
       </div>
     )}
   </div>
     </>
  );
};

export default DealList;
