import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
   const isAuthenticated = useAuth();

   if (isAuthenticated === null) {
      return <div>Loading...</div>;
   }

   if (!isAuthenticated) {
      localStorage.removeItem("token");
      return <Navigate to="/signin" replace />;
   }

   return children;
};

export default ProtectedRoute;
