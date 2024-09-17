import Appbar from "../components/Appbar"
import Balance from "../components/Balance"

function Dashboard(){
    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={10000}/>
            </div>
        </div>
    )
}

export default Dashboard