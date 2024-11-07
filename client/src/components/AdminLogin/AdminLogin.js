import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import './AdminLogin.css';
import { loggings } from "../../redux/authSlice";

export default function AdminLogin() {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
        console.log(`data for sent ${data.email} and ${data.password}`);
		try {
			const url = "http://localhost:3009/api/adminauth";
			const { data: res } = await axios.post(url, data);
            console.log(res.data);
			//localStorage.setItem("token", res.data);
            dispatch(loggings(res.data));
            Navigate('/admindash');
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
    <div className="container">
    <section className="vh-100" style={{backgroundColor: '#c890bc'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{borderRadius:'1rem'}}>
                <div className="card-body p-4">

            <form  onSubmit={handleSubmit}>
            <h2 className="text-center p-3">Admin Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                    className="input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className="input"
                />
                {error && <div className="error_msg">{error}</div>}
                <button type="submit" className="green_btn">
                    Sing In
                </button>
            </form>
            <hr style={{backgroundColor:'red'}}/>
            <div className="lastsec">
            <Link to="/login" style={{color:'red',fontSize:'1rem',fontWeight:'bold'}}>User Login</Link>
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
