import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

const ContributeForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    quantity: '',
    wasteType: '',
    amount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to server or process the data
    console.log('Form Data Submitted:', formData);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Contribute Waste Data</h2>

          <form onSubmit={handleSubmit}>
            {/* User ID */}
            <div className="mb-4">
              <label htmlFor="userId" className="block text-gray-700 font-medium">User ID</label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter User ID"
                required
              />
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-gray-700 font-medium">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Quantity"
                required
              />
            </div>

            {/* Waste Type */}
            <div className="mb-4">
              <label htmlFor="wasteType" className="block text-gray-700 font-medium">Waste Type</label>
              <input
                type="text"
                id="wasteType"
                name="wasteType"
                value={formData.wasteType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Waste Type"
                required
              />
            </div>

            {/* Amount */}
            <div className="mb-6">
              <label htmlFor="amount" className="block text-gray-700 font-medium">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Amount"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContributeForm;
