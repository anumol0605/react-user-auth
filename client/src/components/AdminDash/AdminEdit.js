import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminDash.css';

export default function AdminEdit() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const { id } = useParams(); // Extract user ID from URL
    console.log("id",id);
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    // Fetch user data based on ID
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3009/api/admindash/findone/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token.payload}`, // Add token to Authorization header
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };
        fetchUser();
    }, [id,token]);

    // Handle input change
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submit to update user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3009/api/admindash/edit/${id}`, userData, {
                headers: {
                    'Authorization': `Bearer ${token.payload}`, // Add token to Authorization header
                },
            });
            navigate('/admindash'); // Redirect to dashboard after successful update
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    return (
        <div className="edit-user-container">
            <h2 style={{textAlign:'center',padding:'1rem'}}>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div >
                    <label>First Name : </label>
                    <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                        style={{marginLeft:'1rem'}}
                    />
                </div>
                <div>
                    <label>Last Name : </label>
                    <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        style={{marginLeft:'1rem'}}
                    />
                </div>
                <div>
                    <label>Email ID : </label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        style={{marginLeft:'2rem'}}
                    />
                </div>
                <button onClick={()=> navigate('/admindash')} className='buttonback'> BACK...</button>
                <button type="submit" className='editbtn' >Update User</button>
            </form>
        </div>
    );
}
