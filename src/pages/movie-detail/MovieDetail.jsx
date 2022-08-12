import React, { useEffect, useState } from "react";
import Header from "../../components/haeder/Header";
import "./movieDetail.css";
import ReactPlayer from "react-player";
import Footer from '../../components/footer/Footer'
import { useParams,Link } from "react-router-dom";
import { getMovieDetails } from "../../api/movies";

const MovieDetail = () => {

  const params=useParams();

  const [movieDetail, setMovieDetail] = useState({});

  const {movieId} = params;

  useEffect(()=>{
    // props.setProgress(10)
    fetchMovieDetail(movieId)
  },[]);

  const fetchMovieDetail=movieId =>{

    getMovieDetails(movieId)
    .then(res =>{
      const {data, status} =res;
      if(status === 200){
        console.log(data);
        setMovieDetail(data);
      }
    })
    .catch (err =>{
      console.log(err.message);
    });
  }
 
  // give default empty string values to variables if they are undefined
const {trailerUrl="",
 posterUrl="",
name="",
description="",
director ="",
releaseDate = "",
casts = [],
_id = "",
releaseStatus,
}=movieDetail;


 const buttonText =
  releaseStatus === "RELEASED" ? "BOOK TICKETS": "COMING SOON";
const buttonUrl=
releaseStatus === "RELEASED"? `/buy-tickets/${name}/${_id}`: "#"

  return (
    <div className="movie-detail bg-light">
      <Header />
      <div className="video-player d-flex justify-content-center">
        <ReactPlayer
          url={trailerUrl}
          controls
          className="video"
          width="70%"
          height="450px"
        />
      </div>
      <div className="container movie-data m-5">
        <div className="row">
          <div className="col">
            <img src={posterUrl} 
                 className="movie-poster"
                 alt="movie poster"
                 width='50%'
            />
          </div>
          <div className="col">
            <h2 className="text-light">{name}</h2>
            <h4 className="text-light">{description}</h4>

            <hr/>
            <h5 className="text-light">Directed By: {director}</h5>
            <h5 className="text-light">Release Date: {releaseDate}</h5>
            <hr/>
            <h4 className="text-light">Casts</h4>
            {casts.map(cast =>{
              return <h5 key={cast} className="text-light">{cast}</h5>
            })}

            <hr/>
            <Link className='btn btn-danger' to={buttonUrl}>{buttonText}</Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MovieDetail;
