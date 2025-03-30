import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaHandshakeSimple } from "react-icons/fa6";
import { Profile } from "../Profile";
import { NotificationBell } from "../../NotificationBell";
import { Link } from "react-router-dom";
import { gettingDealList } from "../../../../apiClients/endPoint";
import { getUserData } from "../../../../helper/helper";
import { SiAccenture } from "react-icons/si";
import { socket } from "../../../../apiClients/socket";
import { FcCancel } from "react-icons/fc";



const InComingDeal = () => {
  const [deals, setDeals] = useState([]);
  const userData = getUserData("User");

  // Fetch deals where the current user is NOT the owner
  const getDealList = async () => {
    try {
      const res = await gettingDealList();
      const filteredDeals = res.deal.filter((item) => item?.user !== userData?.id);
      setDeals(filteredDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  // Handle Accept Price
  const handleAccept = (dealId, newPrice) => {
    // Optimistically update the UI
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal._id === dealId ? { ...deal, status: "In Progress" } : deal
      )
    );
  
    // Emit event to server
    socket.emit("acceptPrice", { dealId, newPrice });
  
    // Listen for confirmation from the server
    socket.on("dealAccepted", ({ dealId: acceptedDealId, newPrice }) => {
      if (acceptedDealId === dealId) {
        setDeals((prevDeals) =>
          prevDeals.map((deal) =>
            deal._id === acceptedDealId ? { ...deal, price: newPrice, status: "In Progress" } : deal
          )
        );
      }
    });
  
    // Handle errors
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  };
  
  const handleReject = (dealId, newPrice) => {
   
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal._id === dealId ? { ...deal, status: "Cancelled" } : deal
      )
    );
  
    // Emit event to server
    socket.emit("rejectPrice", { dealId});
  
    // Listen for confirmation from the server
    socket.on("dealRejected", ({ dealId: acceptedDealId }) => {
      if (acceptedDealId === dealId) {
        setDeals((prevDeals) =>
          prevDeals.map((deal) =>
            deal._id === acceptedDealId ? { ...deal, status: "Cancelled" } : deal
          )
        );
      }
    });
  
    // Handle errors
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  };

 

  useEffect(() => {
    getDealList();

    // Cleanup socket listeners when component unmounts
    return () => {
      socket.off("dealAccepted");
      socket.off("error");
    };
  }, [userData.id]);

  return (
    <>
      <div className="flex justify-end">
        <NotificationBell />
        <Profile />
      </div>
      <div className="max-w-xxl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-2xl mb-4">Incoming Deals</h1>
            <p>Deals from {userData?.role}</p>
          </div>
        </div>

        <div className="flex pt-10">
          <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg py-5">
            <h1 className="text-2xl font-bold mb-4">Deal List</h1>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Negotiation Price</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal) => (
                    <tr key={deal._id} className="border-t">
                      <td className="p-3">{deal.title}</td>
                      <td className="p-3">{deal.description}</td>
                      <td className="p-2">{deal.price}</td>
                      <td className="p-2">{deal.negotiationPrice || "N/A"}</td>
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
                        <div className="flex space-x-4">
                          {/* View Deal */}
                          <div className="relative group">
                            <Link to={`${deal._id}`} className="text-blue-600 hover:text-blue-800">
                              <AiOutlineEye size={20} />
                            </Link>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                              View Deal
                            </span>
                          </div>

                          {/* Negotiate Price */}
                          <div className="relative group">
                            <Link to={`${deal._id}`} className="text-blue-600 hover:text-blue-800">
                              <FaHandshakeSimple size={20} />
                            </Link>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                              Negotiate Price
                            </span>
                          </div>

                          {/* Accept Deal */}
                        
                            <div className="relative group">
                              <button
                                onClick={() => handleAccept(deal._id, deal.price)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <SiAccenture size={20} />
                              </button>
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                                Accept Price
                              </span>
                            </div>
                            <div className="relative group">
                              <button
                                onClick={() => handleReject(deal._id)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <FcCancel size={20} />
                              </button>
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                                Reject deal
                              </span>
                            </div>
                       
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InComingDeal;
