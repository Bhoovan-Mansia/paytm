import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./Button"
import { GetUsersPath } from "../utils/ApiCalls"
import axios from "axios"

const Users = () => {
    // Replace with backend call
    const [searchUserValue, setSearchUserValue] = useState("");
    const [debouncedUserValue, setdebouncedUserValue] = useState("");
    const [users, setUsers] = useState([]);
    const timeoutVal = useRef(null);

    const searchUserHandler = (event) => {
        setSearchUserValue(event.target.value);

        if(timeoutVal.current) {
            clearTimeout(timeoutVal.current);
        }

        timeoutVal.current = setTimeout(() => {
            setdebouncedUserValue(event.target.value);
        }, 300);
    }

    useEffect(() => {
        const getFilteredUsers = async () => {
        const token = localStorage.getItem("token");
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
        const response = await axios.get(GetUsersPath + `?filter=${debouncedUserValue}`, {headers});
        console.log(response.data.users);
        setUsers(response.data.users);
        }

        getFilteredUsers();
    }, [debouncedUserValue])
    

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" 
                placeholder="Search users..." 
                className="w-full px-2 py-1 border rounded border-slate-200"
                value={searchUserValue}
                onChange={searchUserHandler}
            ></input>
        </div>
        <div>
            {users.map((user, index) => <User user={user} key={index}/>)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate("/SendMoney", {state: {user: user}});
    }

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} onClick={onClickHandler} />
        </div>
    </div>
}

export default Users;       