import { FaTag, FaDollarSign, FaInfoCircle } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";
import { useEffect, useState } from "react";
import PriceNegotiation from "../../../model/PriceNegotiation";
import { socket } from "../../../../apiClients/socket";
import { gettingSingleDealList } from "../../../../apiClients/endPoint";
import { useParams } from "react-router-dom";


const ViewDealDetails = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const[deal,setDeal]=useState({})
   const { id: dealId } = useParams();
    
    const singleDealData=async()=>{
     try{
       const resp=await gettingSingleDealList({dealId})
       console.log("resp",resp.deal)
       setDeal(resp.deal)
     }catch(error){
      console.log(error)
     }
    }


     useEffect(() => {
             // Listen for price updates from the server
             socket.on("priceUpdated", ({ dealId, newPrice, userId }) => {
                 console.log(`New price: ${newPrice} for deal ${dealId} by user ${userId}`);
                //  setPrice(newPrice);
             });
         
             return () => {
                 socket.off("priceUpdated"); // Cleanup listener
             };
         }, []);

         useEffect(()=>{
           singleDealData()
         },[])

  return (
    <div className="w-full max-w-xxl mx-auto bg-white p-6 rounded-2xl shadow-xl border border-gray-200 ">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <FaTag className="text-blue-500" /> {deal.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 mt-3 flex items-start gap-2">
        <FaInfoCircle className="text-gray-500 mt-1" /> {deal.description}
      </p>

      {/* Price */}
      <p className="text-gray-900 mt-4 flex items-center gap-2 font-semibold text-lg">
        <FaDollarSign className="text-green-500" /> {deal.price}
      </p>

      {/* Status */}
      <div className="mt-5 flex items-center gap-2">
        <MdOutlinePendingActions className="text-yellow-500 text-xl" />
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold capitalize tracking-wide
            ${deal.status === "In Progress" ? "bg-yellow-100 text-yellow-700" :
              deal.status === "Completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {deal.status}
        </span>
      </div>
      <div className="relative group flex items-center gap-2 py-5">
      <FaHandshakeSimple size={20} />
        <button 
         onClick={() => setIsModalOpen(true)}
        
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-4 py-2 border border-blue-500 rounded-lg hover:bg-blue-100 transition">
          <span className="font-medium" >Price Negotiation</span>
        </button>
      </div>
      {isModalOpen && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
           <div className="flex justify-between mb-4">
             <h2 className="text-xl font-bold">Price Negotiation</h2>
             <button
               className="text-red-500 font-bold"
               onClick={() => setIsModalOpen(false)}
             >
               ✖
             </button>
           </div>
           <PriceNegotiation/>
         </div>
       </div>
     )}
    </div>
  );
};

export default ViewDealDetails;