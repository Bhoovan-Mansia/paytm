import { GetMe } from "../utils/ApiCalls";
import axios from "axios";
import { useEffect, useState } from "react";

const Appbar = () => {
   const [firstName, setfirstName] = useState(".");
   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      const fetchBalance = async () => {
          const token = localStorage.getItem("token");
          const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
          }
          const response = await axios.get(GetMe, {headers});
          console.log(response.data);
          setfirstName(response.data.firstName);
      }
      fetchBalance();
  }, [])

 	return (
      <div className="shadow h-14 flex justify-between">
         <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
         </div>
         <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
               Hello
            </div>
            <div 
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
               <div className="flex flex-col justify-center h-full text-xl">
                  {firstName[0].toUpperCase()}
               </div>
            </div>
         </div>
         {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
               <div className="py-1">
                  <button
                     onClick={() => {
                        setIsOpen(false);
                        localStorage.removeItem("token");
                        window.location.reload();
                     }}
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                     Logout
                  </button>
               </div>
            </div>
            )}
      </div>     
   );
}

export default Appbar;