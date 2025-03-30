import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai"; // Import Eye icon from React Icons
import { gettingDealList } from "../../../apiClients/endPoint";
import { getUserData } from "../../../helper/helper";

const DealListTable = () => {
  const[deals,setDeals]=useState([])
  const userData = getUserData('User');
    

     const getDealList=async()=>{
      try{
      const res = await gettingDealList()
      console.log("sdsad",userData?.id)
      const data=  res.deal.filter((item)=>item?.user === userData?.id)
      setDeals(data)
      console.log("res",res)
      }catch(error){
        console.error(error)
      }
     }


     useEffect(()=>{
     getDealList()
     },[userData.id])

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Deal List</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">View</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{deal.title}</td>
                <td className="p-3">{deal.description}</td>
                <td className="p-3">{deal.price}</td>
                <td
                  className={`p-3 font-semibold ${
                    deal.status === "Completed"
                      ? "text-green-600"
                      : deal.status === "Pending"
                      ? "text-yellow-600"
                      : deal.status === "Cancelled" 
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {deal.status}
                </td>
                <td className="p-3 text-center">
                  <button className="text-blue-600 hover:text-blue-800">
                    <AiOutlineEye size={20} /> {/* Eye icon from React Icons */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealListTable;
