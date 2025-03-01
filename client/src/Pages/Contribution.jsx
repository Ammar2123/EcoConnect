import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { useAuth } from "@clerk/clerk-react";
import ax from "../config/axios.js";

const ContributeForm = () => {
  const { getToken } = useAuth();
  const axiosInstance = ax(getToken);
  const [formData, setFormData] = useState({
    quantity: '',
    wasteType: '',
    amount: '',
  });

  const [error, setError] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validation: Check if the quantity is less than 15
    if (formData.quantity < 15) {
      setError('Quantity must be at least 15kg');
      return;  // Prevent form submission
    }

    const res = await axiosInstance.post("/api/v1/createContribute", formData);
    console.log(res);    // Clear error message if the quantity is valid
    setError('');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Contribute Waste Data</h2>

          <form onSubmit={handleSubmit}>
            {/* Quantity */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-gray-700 font-medium">Quantity (kg)</label>
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

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            {/* Waste Type Select */}
            <div className="mb-4">
              <label htmlFor="wasteType" className="block text-gray-700 font-medium">Waste Type</label>
              <select
                id="wasteType"
                name="wasteType"
                value={formData.wasteType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Waste Type</option>
                <option value="e-waste">E-Waste</option>
                <option value="agriculture-waste">Agriculture Waste</option>
                <option value="industry-waste">Industry Waste</option>
                <option value="commercial-waste">Commercial Waste</option>
                <option value="medical-waste">Medical Waste</option>
                <option value="mix-waste">Mix Waste</option>
              </select>
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
