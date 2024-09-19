import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import axios from "axios";
import { GetBalancePath } from "../utils/ApiCalls";

function Dashboard(){
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            const token = localStorage.getItem("token");
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
            const response = await axios.get(GetBalancePath, {headers});
            console.log(response.data);
            setBalance(response.data.balance);
        }
        fetchBalance();
    }, [])
    

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance}/>
                <Users />
            </div>
        </div>
    )
}

export default Dashboard