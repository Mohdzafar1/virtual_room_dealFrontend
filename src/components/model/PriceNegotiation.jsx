import React, { useEffect, useState } from 'react';
import { socket } from '../../apiClients/socket';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserData } from '../../helper/helper';


const PriceNegotiation = () => {
  const navigate = useNavigate();
  const { id: dealId } = useParams();
  const userData = getUserData('User');

  const [formData, setFormData] = useState({
    newPrice: '',
    dealId: dealId,
    userId: userData?.id
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form validation
  const validate = () => {
    let newErrors = {};
    if (!formData.newPrice.trim()) newErrors.newPrice = "Price is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const { dealId, newPrice, userId } = formData;
      
      console.log("Sending proposePrice event:", { dealId, newPrice, userId });
      socket.emit("proposePrice", { dealId, newPrice, userId });
       navigate("/dashboard/incoming_deal")
      // Listen for an error response
      socket.on("error", (error) => {
          console.error("Socket error:", error);
      });

      setFormData({ ...formData, newPrice: "" }); // Reset form
    }
  };

  // Handle price updates in real-time
  useEffect(() => {
    const handlePriceUpdate = ({ dealId: updatedDealId, newPrice, userId }) => {
      if (updatedDealId === dealId) {
        console.log(`New price: ${newPrice} for deal ${updatedDealId} by user ${userId}`);
        setFormData((prev) => ({ ...prev, newPrice })); // Update state
      }
    };

    socket.on("priceUpdated", handlePriceUpdate);

    return () => {
      socket.off("priceUpdated", handlePriceUpdate); // Cleanup listener
    };
  }, [dealId]);

  // Join and leave deal room
  useEffect(() => {
    socket.emit("joinDealRoom", { dealId });

    return () => {
      socket.emit("leaveDealRoom", { dealId });
    };
  }, [dealId]);

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="newPrice"
            value={formData.newPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter deal price"
          />
          {errors.newPrice && <p className="text-red-500">{errors.newPrice}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 w-full"
        >
          Price Negotiation
        </button>
      </form>
    </div>
  );
};

export default PriceNegotiation;
