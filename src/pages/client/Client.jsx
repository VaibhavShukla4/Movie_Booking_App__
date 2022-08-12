import React from "react";
import Header from "../../components/haeder/Header";
import TheatresList from "../../components/theatres-list/TheatresList";
import Footer from "../../components/footer/Footer";
import "./client.css";
import MoviesList from "../../components/movies-list/MoviesList";

const Client = () => {
    
    const name=localStorage.getItem("name");

    return (
        <div>
        <Header/>
            <div className="client-main container bg-light text-dark p-3">
                <h2>Welcome, {name}</h2>
                <h4>Please check these products below</h4>
                <TheatresList/>
                <MoviesList/>
            </div>
           <Footer/>
        </div>
    );
};
export default Client;
    
/**
 * 
 * client01 , Welcome1
 */