import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Signup.css';

export default function Signup() {
    const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3009/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
  return (
	<div class="container">
	<section class="vh-70" style={{backgroundColor: '#e4ccee'}}>
		<div class="container py-2 h-100 w-100">
		  <div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-12 col-md-8 col-lg-6 col-xl-5">
			  <div class="card shadow-2-strong" style={{borderRadius:'1rem'}}>
				<div class="card-body px-4 py-1">


					<form  onSubmit={handleSubmit}>
					<h2 class="text-center py-3">Signup</h2>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className="input"
							style={{backgroundColor:'#e4ccee'}}

						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className="input"
							style={{backgroundColor:'#e4ccee'}}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="input"
							style={{backgroundColor:'#e4ccee'}}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="input"
							style={{backgroundColor:'#e4ccee'}}
						/>
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn" style={{backgroundColor:'#d28eee'}}>
							Sing Up
						</button>
					</form>
					<hr style={{backgroundColor:'red'}}/>
				<div className="lastsec">
					<p className="oldusr">Back to Signin</p>
					<Link to="/login">
						<button type="button" className="white_btn">
							Sing in
						</button>
					</Link>
				</div>
			</div>
			</div>
			</div>
			</div>
			</div>
			</section>
			</div>
  )
}
