import React, { useState, useEffect } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "@clerk/clerk-react";
import ax from "../config/axios.js";

const OnboardingForm = () => {
    const { getToken } = useAuth();
    const axiosInstance = ax(getToken);
  const { user, isLoaded } = useUser(); 
  const { updateUser } = useClerk(); 
  const navigate = useNavigate(); 

  const [userData, setUserData] = useState({
    phone: "",
    altPhone: "",
    address: "",
    branch: "",
    panOrAadhar: "",
    companyType: "",
    businessId: "",
    role: "user", 
  });

  const [activeTab, setActiveTab] = useState(1); // Default active tab is 1 (for the "user" role)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      role: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send a PUT request to the backend to update the user profile
      const response = await axiosInstance.put('/users/updateUser', {
        phone: userData.phone,
        address: userData.address,
        role: userData.role,
        branch: userData.branch,
        panOrAadhar: userData.panOrAadhar,
        companyType: userData.companyType,
        businessId: userData.businessId,
      });
  
      // Check the response (optional logging)
      console.log('User profile updated successfully:', response.data);
  
      // After a successful update, navigate to the home page
    //   navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

//   useEffect(() => {
//     if (isLoaded && user) {
//       if (user.metadata?.profileCompleted) {
//         navigate("/"); 
//       }
//     }
//   }, [isLoaded, user, navigate]); 

  // Render dynamic fields based on the role
  const renderRoleFields = () => {
    switch (userData.role) {
      case "staff":
        return (
          <>
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={userData.branch}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </>
        );
      case "collector":
        return (
          <>
            <div>
              <label htmlFor="panOrAadhar" className="block text-sm font-medium text-gray-700">PAN/Aadhar</label>
              <input
                type="text"
                id="panOrAadhar"
                name="panOrAadhar"
                value={userData.panOrAadhar}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </>
        );
      case "company":
        return (
          <>
            <div>
              <label htmlFor="companyType" className="block text-sm font-medium text-gray-700">Company Type</label>
              <input
                type="text"
                id="companyType"
                name="companyType"
                value={userData.companyType}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="businessId" className="block text-sm font-medium text-gray-700">Business ID</label>
              <input
                type="text"
                id="businessId"
                name="businessId"
                value={userData.businessId}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
    // Dynamically set role based on the tab clicked
    if (tabNumber === 1) setUserData((prevData) => ({ ...prevData, role: "user" }));
    if (tabNumber === 2) setUserData((prevData) => ({ ...prevData, role: "staff" }));
    if (tabNumber === 3) setUserData((prevData) => ({ ...prevData, role: "collector" }));
    if (tabNumber === 4) setUserData((prevData) => ({ ...prevData, role: "company" }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Complete Your Profile</h2>

      {/* Tab navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleTabClick(1)}
          className={`py-2 px-4 rounded-md ${activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          User
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`py-2 px-4 rounded-md ${activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Staff
        </button>
        <button
          onClick={() => handleTabClick(3)}
          className={`py-2 px-4 rounded-md ${activeTab === 3 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Collector
        </button>
        <button
          onClick={() => handleTabClick(4)}
          className={`py-2 px-4 rounded-md ${activeTab === 4 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Company
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="altPhone" className="block text-sm font-medium text-gray-700">Alternate Phone</label>
          <input
            type="tel"
            id="altPhone"
            name="altPhone"
            value={userData.altPhone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            id="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Dynamic Role Fields */}
        {renderRoleFields()}

        <div className="text-center">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Complete Onboarding
          </button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingForm;
