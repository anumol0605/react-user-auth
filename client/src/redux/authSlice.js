// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user : null ,
        token : null ,
    },  
    reducers: {
        loggings:(state, action) =>{
            const decodedToken = jwtDecode(action.payload);
            //localStorage.setItem("user", JSON.stringify(decodedToken));
            localStorage.setItem("token", action);
            console.log("decoded data",decodedToken);
            return {
                user: decodedToken, 
                token: action ,
            };
        },
        logouts:(state) =>{
            //localStorage.removeItem("user");
            localStorage.removeItem("token");
            return {
                user: null, 
                token: null,
            };
        },
    },
});

// Export actions and reducer
export const { loggings, logouts } = authSlice.actions;
export default authSlice.reducer;
