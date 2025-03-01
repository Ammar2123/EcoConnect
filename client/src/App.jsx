import { useAuth } from "@clerk/clerk-react";
import ax from "./config/axios.js";
import Contribution from "./Pages/Contribution.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import { Routes, Route } from "react-router-dom";
import Log from "./Pages/Log.jsx";
import SignIn from "./Pages/SignIn.jsx";

export default function App() {
  const { getToken } = useAuth();
  const axios = ax(getToken);

  return (
    <Routes>
    <Route path="/" element={<Contribution></Contribution>}></Route>
    <Route path="/login" element={<SignIn></SignIn>}></Route>
      {/* <Route element={<ProtectedRoute />}>
        <Route path="/log" element={<Log />} />
      </Route> */}
      <Route path="*" element={<Log></Log>}></Route>
    </Routes>
  );
}
