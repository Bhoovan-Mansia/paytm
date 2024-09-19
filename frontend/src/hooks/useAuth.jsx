import { useEffect, useState } from "react";
import axios from "axios";
import { GetMe } from "../utils/ApiCalls";

const useAuth = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(null); // null means loading, false means not authenticated, true means authenticated
 
   useEffect(() => {
     const checkAuth = async () => {
       const token = localStorage.getItem("token");
       if (!token) {
         setIsAuthenticated(false);
         return;
       }
 
       try {
         const response = await axios.get(GetMe, {
           headers: {
             Authorization: `Bearer ${token}`
           }
         });
         setIsAuthenticated(true);
       } catch (error) {
         setIsAuthenticated(false);
       }
     };
 
     checkAuth();
   }, []);
 
   return isAuthenticated;
 };

 export default useAuth;
