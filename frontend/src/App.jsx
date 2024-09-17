import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";

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
							// <ProtectedRoute>
								<Dashboard /> 
							// </ProtectedRoute>
						} 
					/>
				</Routes>
			</BrowserRouter>
		</>
  )
}

export default App