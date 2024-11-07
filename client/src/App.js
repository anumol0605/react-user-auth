import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './components/Home/Home'
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminDash from "./components/AdminDash/AdminDash";
import AdminEdit from "./components/AdminDash/AdminEdit";
import AdminCreate from "./components/AdminDash/AdminCreate"
import { useSelector } from "react-redux";
import AdminDelete from "./components/AdminDash/AdminDelete";

function App() {
	//const user = localStorage.getItem("token");
	const user = useSelector((state) => state.auth.token);
	console.log(`user : ${user}`);

	return (
    <Router>
		<Routes>
			{user && <Route path="/" exact element={<Home />} />}
			{user && <Route path="/login"  element={<Navigate replace to="/" />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			{user && <Route path="/adminlogin" element={<Navigate replace to="/admindash" />} />}
			<Route path="/adminlogin" exact element={<AdminLogin />} />
			{user && <Route path="/admincreate" exact element={<AdminCreate />} />}
			{user && <Route path="/admindash" exact element={<AdminDash />} />}
			{user && <Route path="/profile" exact element={<Profile />} /> }
			<Route path="/profile" element={<Navigate replace to="/login" />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/admindash" element={<Navigate replace to="/adminlogin" />} />
			{user && <Route path="/admin/edit/:id" element={<AdminEdit />} />}
			{user && <Route path="/admin/delete/:id" element={<AdminDelete />} />}
		</Routes>
    </Router>
	);
}

export default App;