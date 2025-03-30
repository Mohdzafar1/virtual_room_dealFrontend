import React, { useState } from 'react';
import { createDeal, gettingDealList } from '../../apiClients/endPoint';
import { getUserData } from '../../helper/helper';

const CreateDeal = ({setIsModalOpen}) => {
    const userData = getUserData("User");
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    userId:userData?.id
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
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit =async(e) => {
    e.preventDefault();
    await gettingDealList()
    if (validate()) {
      const {title,description,price,userId}=formData
      await createDeal({title,description,price,userId})
      
     
      setFormData({ title: '', description: '', price: '' }); 
      setIsModalOpen(false)
    }

  };

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      {/* <h1 className="font-bold text-2xl mb-4">Create Deal</h1> */}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter deal title"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter deal description"
          ></textarea>
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter deal price"
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 w-full"
        >
          Submit Deal
        </button>
      </form>
    </div>
  );
};

export default CreateDeal;
