import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/SignUp";
import Signin from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import SendMoney from "./pages/SendMoney";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/Signup" element={<Signup />} />
					<Route path="/Signin" element={<Signin />} />
					<Route 
						path="/" 
						element={
							<ProtectedRoute>
								<Dashboard /> 
							</ProtectedRoute>} 
					/>
					<Route 
						path="/Dashboard" 
						element={
							<ProtectedRoute>
								<Dashboard /> 
							</ProtectedRoute>
						} 
					/>
					<Route 
						path="/SendMoney" 
						element={
							<ProtectedRoute>
								<SendMoney /> 
							</ProtectedRoute>
						} 
					/>
				</Routes>
			</BrowserRouter>
		</>
  )
}

export default App