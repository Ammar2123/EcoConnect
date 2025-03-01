import { useAuth } from "@clerk/clerk-react";
import ax from "./config/axios.js";
import Contribution from "./Pages/Contribution.jsx";
import Log from "./Pages/Log.jsx";
import SignIn from "./Pages/SignIn.jsx";
import Onboarding from "./Pages/Onbording.jsx"; // Make sure the path to Onboarding is correct
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CollectionRequest from "./Pages/CollectionRequest.jsx";
import ContributionStatus from "./Pages/ContributionStatus.jsx";

export default function App() {
  const { getToken } = useAuth();
  const axiosInstance = ax(getToken);

  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(null);

  // Fetch the onboarding status when the component mounts
  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      try {
        const response = await axiosInstance.get('/users/checkOnboarding');
        setIsOnboardingCompleted(response.data.onBoarding); // Assuming response contains the "onBoarding" field
      } catch (error) {
        console.error("Error fetching onboarding status", error);
      }
    };

    fetchOnboardingStatus();
  }, [axiosInstance]); // Empty dependency array means this runs once on component mount

  // Handle completing the onboarding
  const completeOnboarding = async () => {
    try {
      const response = await axiosInstance.put('/users/checkOnboarding', { onBoarding: true });
      console.log(response.data); // Log the response, if needed
      setIsOnboardingCompleted(true); // Update the state to true after completing onboarding
    } catch (error) {
      console.error("Error completing onboarding", error);
    }
  };

  // While onboarding status is being fetched, display loading screen
  // if (isOnboardingCompleted === null) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Routes>
      {isOnboardingCompleted === false ? (
        <Route path="/" element={<Onboarding onComplete={completeOnboarding} />} />
      ) : (
        <>
          <Route path="/" element={<Contribution />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/contribute/request" element={<CollectionRequest/>} />
          <Route path="/contrubute/status" element={<ContributionStatus/>} />
          <Route path="*" element={<Log />} />
        </>
      )}
    </Routes>
  );
}
