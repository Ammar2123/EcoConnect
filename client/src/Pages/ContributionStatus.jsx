import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useAuth } from "@clerk/clerk-react";
import ax from "../config/axios.js";

const ContributionStatus = () => {
    const { getToken, user } = useAuth();  // Use the user object to get the userId
    const axiosInstance = ax(getToken);

    const [contributions, setContributions] = useState([]);

    // Function to fetch contributions
    const fetchContributions = async () => {
        try {
            const res = await axiosInstance.get("/api/v1/fetchContributions");
            console.log('Fetched Data:', res.data);  // Log the response to check the format
            setContributions(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Function to update the status of a contribution
    const updateStatus = async (contributionId, status) => {
        console.log(contributionId, status);
        try {
            // Send the update request with the status and userId of the person updating
            const response = await axiosInstance.patch(`/collectors/requests/${contributionId}`, {
                status,
            });

            if (response.status === 200) {
                // Update the local state to reflect the status change
                setContributions(prevContributions => 
                    prevContributions.map(contribution => 
                        contribution._id === contributionId 
                            ? { ...contribution, status }  // Update the status locally
                            : contribution
                    )
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchContributions();
    }, []);  // Empty dependency array ensures this runs only once when the component mounts

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Collection Requests</h2>

                {/* Table to display the contributions */}
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Request ID</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Quantity</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Waste Type</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">UpdateBy</th>
                                {/* <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {contributions && Array.isArray(contributions) && contributions.length > 0 ? (
                                contributions.map((contribution) => (
                                    <tr key={contribution._id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-800">{contribution.status || "N/A"}</td>
                                        <td className="py-3 px-4 text-sm text-gray-800">{contribution._id || "N/A"}</td>
                                        <td className="py-3 px-4 text-sm text-gray-800">{contribution.quantity || "N/A"}</td>
                                        <td className="py-3 px-4 text-sm text-gray-800">{contribution.wasteType || "N/A"}</td>
                                        <td className="py-3 px-4 text-sm text-gray-800">{contribution.email || "N/A"}</td>
                                        {/* <td className="py-3 px-4 text-sm">
                                            <button
                                                onClick={() => updateStatus(contribution._id, 'Approved')}
                                                className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg mr-2"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => updateStatus(contribution._id, 'Rejected')}
                                                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                                            >
                                                Reject
                                            </button>
                                        </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-3 text-gray-600">No contributions available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ContributionStatus;
