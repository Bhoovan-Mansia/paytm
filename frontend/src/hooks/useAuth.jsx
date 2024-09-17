import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(null); // null means loading, false means not authenticated, true means authenticated
 
   useEffect(() => {
     const checkAuth = () => {
       const token = localStorage.getItem("token");
       if (!token) {
         setIsAuthenticated(false);
         return;
       }
 
      //  try {
      //    const response = await axios.get("http://localhost:3000/api/v1/user/me", {
      //      headers: {
      //        Authorization: `Bearer ${token}`
      //      }
      //    });
      //    const data = response.data;
      //    setIsAuthenticated(data.status !== false);
      //  } catch (error) {
      //    setIsAuthenticated(false);
      //  }
     };
 
     checkAuth();
   }, []);
 
   return isAuthenticated;
 };

 export default useAuth;
