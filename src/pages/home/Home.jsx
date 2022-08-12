import React, { useEffect, useState } from "react";
import Header from "../../components/haeder/Header";
import img1 from "../../assets/1.avif";
import img2 from "../../assets/2.avif";
import img3 from "../../assets/3.avif";
import img4 from "../../assets/4.avif";
import img5 from "../../assets/5.avif";
import img6 from "../../assets/6.avif";
import "./home.css";
import ImageCarousel from "../../components/image-carousel/ImageCarousel";
import Footer from "../../components/footer/Footer";
import { getAllMovies } from "../../api/movies";
import Loader from "../../components/loader/Loader.jsx";
import { useNavigate } from "react-router-dom";
const Home = (props) => {
    
       const [isLoading, setIsLoading] = useState(false)
       const [movies, setMovies] = useState([]);
       const [allmovies, setAllMovies] =useState([])
       const navigate = useNavigate();
    //    console.log("hello");

       useEffect(() =>{
        // props.setProgress(10);
        setIsLoading(true);
        // props.setProgress(10);
        getAllMovies()
              .then(res => {
                const {data, status} =res;
                if (status === 200) {
                    props.setProgress(30);
                    setMovies(data);
                    props.setProgress(60);
                    setAllMovies(data);
                    props.setProgress(100);
                    setIsLoading(false);
                }
              })
       },[]);

       const filterMoviesBySearch = searchText => {
        const filteredMovies = allmovies.filter(movie => {
            return movie.name.toLowerCase().includes(searchText.toLowerCase());

        });
          setMovies(filteredMovies);
       }

       const handleGotoDetailPage=movieId=>{
        navigate(`/movie-detail/${movieId}`)
       }

    return (
        <div>
            <Header filterMoviesBySearch={filterMoviesBySearch} />

            <ImageCarousel images={[img1, img2, img3, img4, img5, img6]}/>
            <div className="container main-section ">
                {isLoading ? (
                    <Loader/>
                ):(
                    <div className="row">
                        {movies.map(( movie,index )=> {
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-6 movie-tile  text-light"
                                onClick={()=>{handleGotoDetailPage (movie._id)}}
                                 key={index}>
                                    <img 
                                    src={movie.posterUrl}
                                    alt="poster"
                                    className="image-tile"
                                    />
                                <h3>{movie.name}</h3>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};
export default Home;