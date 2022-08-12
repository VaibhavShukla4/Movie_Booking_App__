import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react'
import Authentication from "./pages/authentication/Authentication.jsx";
// import Customer from "./pages/customer/Customer.jsx";
import Client from "./pages/client/Client.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Home from "./pages/home/Home";
import LoadingBar from "react-top-loading-bar";
import MovieDetail from "./pages/movie-detail/MovieDetail";
import SelectTheatre from "./pages/select-theatre/SelectTheatre";
import SelectedSeats from "./pages/select-seats/SelectSeats";
import Unauthorised403 from "./components/unauthorised/Unauthorised403";
import RequireAuth from "./components/require-auth/RequireAuth";
import NotFound from "./components/notfound/NotFound";


function App() {
     
    const [progress, setProgress] =useState(0)

    return (
        <div className='App'>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
        />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Authentication  />} />
                {/* <Route path='/customer' element={<Customer  />} /> */}
                <Route path='/client' element={<Client />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/unauthorised' element={<Unauthorised403/> }  />
                <Route
                    path='/movie-detail/:movieId'
                    element={<MovieDetail/> }
                />
                <Route
                    path='/buy-tickets/:movieName/:movieId'
                    element={<SelectTheatre/> }
                />
                <Route element={<RequireAuth allowedRoles={["CUSTOMER"]} /> } />
                <Route
                    path='/select-seats/:movieId/:theatreId'
                    element={<SelectedSeats/> }
                />
                <Route path="/*" element={<NotFound/> } />
            </Routes>
        </div>
    );
}

export default App;