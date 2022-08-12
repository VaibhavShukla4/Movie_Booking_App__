import { Modal } from "react-bootstrap";
// import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import Edit from "@material-ui/icons/Edit";
// import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import { getAllMovies,removeMovie, updateMovieDetails } from "../../api/movies";
// import moment from 'moment';
const MoviesList = () => {
  const [moviesList, setMoviesList] = useState([]);
  // const [message, setMessage] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [showMovieEditModal, setShowMovieEditModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchMovies = () => {
    getAllMovies()
      .then((res) => {
        const { status, data, message } = res;
        if (status === 200) {
          console.log({ movies: data });
          setMoviesList(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    /***
     *
     * 1.So first off all fetch the data of api and show the list of movies
     * if successfully response then show the data other wise show the error message
     */
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  var formattedDate =selectedMovie?.releaseDate;
  console.log({formattedDate});

  const editMovie = (rowData) => {
    setSelectedMovie({ ...rowData });
    setShowMovieEditModal(true);
  };

  const handleEditMovieSubmit = (e) => {
    updateMovieDetails(selectedMovie._id, selectedMovie)
    .then(res =>{
      const{ data, status}=res;

      if(status === 200) {
        setErrorMessage("")
        setSelectedMovie({});
        fetchMovies();
        setShowMovieEditModal(false)
      }
    })
    .catch(err => {
      setErrorMessage(err.message);
    })
    e.preventDefault();
  };

  const handleMovieEdit=e=>{

    const tempMovie={...selectedMovie};

    if(e.target.name === "name") {
      tempMovie.name =e.target.value
    }
    else if(e.target.name === "releaseDate") {
      tempMovie.releaseDate=e.target.value
    }
    else if(e.target.name === "releaseStatus") {
      tempMovie.releaseStatus=e.target.value
    }
    else if(e.target.name === "director") {
      tempMovie.director=e.target.value
    }
    else if(e.target.name === "discription") {
      tempMovie.discription=e.target.value
    }
    setSelectedMovie(tempMovie);
  }

  const deleteMovie=rowData=>{
    console.log(rowData)
    const movieId =rowData._id

    removeMovie(movieId)
    .then(res =>{
      console.log(res)

      if(res.status === 200){
        fetchMovies()
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }

  return null;
};

export default MoviesList;

/**
 * <div className="m-5">
      <MaterialTable
        data={moviesList}
        title="movie List"
        columns={[
          { title: "Movie name", field: "name" },
          { title: "Release data", field: "releaseDate" },
          { title: "Release status", field: "releaseStatus" },
          { title: "Director", field: "director" },
          { title: "Description", field: "description" },
        ]}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          filtering: true,
          headerStyle: {
            backgroundColor: "#202429",
            color: "#fff",
          },
          rowStyle: {
            backgroundColor: "#EEE",
          },
          exportMenu: [
            {
              label: "Download Pdf",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Movies Records"),
            },
            {
              label: "Download Csv",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Movies Records"),
            },
          ],
        }}
        actions={[
          {
            icon: Edit,
            tooltip: "Edit Movie",
            onClick: (event, rowData) => editMovie(rowData),
          },
         /*  {
                        icon: Delete,
                        tooltip: "Delete Movie",
                        onClick: (event, rowData) => deleteMovie(rowData),
                    }, */
                  // ]}
                //   />
                //   {showMovieEditModal && (
                //     <Modal
                //       show={showMovieEditModal}
                //       onHide={() => {
                //         setErrorMessage("");
                //         setShowMovieEditModal(false);
                //       }}
                //       backdrop="static"
                //       keyboard={false}
                //       centered
                //     >
                //       <Modal.Header closeButton>
                //         <Modal.Title>EDIT MOVIE</Modal.Title>
                //       </Modal.Header>
                //       <Modal.Body>
                //         <div>
                //           <h4>TheatreId :{selectedMovie._id}</h4>
                //         </div>
                //         <hr />
            
                //         <form onSubmit={handleEditMovieSubmit}>
                //           <div className="input-group">
                //             <label>
                //               Movie Name:
                //               <input
                //                 type="text"
                //                 className="form-control m-1"
                //                 name="name"
                //                 value={selectedMovie.name}
                //                 required
                //                 onChange={handleMovieEdit}
                //               />{" "}
                //             </label>
                //           </div>
                //           <div className="input-group">
                //             <label>
                //               Release Date:
                //               <input
                //                 type="text"
                //                 className="form-control m-1"
                //                 name="releaseDate"
                //                 value={selectedMovie.releaseDate}
                //                 required
                //                 onChange={handleMovieEdit}
                //               />{" "}
                //             </label>
                //           </div>
                //           <div className="input-group">
                //             <label>
                //               Release Status:
                //               <input
                //                 type="text"
                //                 className="form-control m-1"
                //                 name="releaseStatus"
                //                 value={selectedMovie.releaseStatus}
                //                 required
                //                 onChange={handleMovieEdit}
                //               />{" "}
                //             </label>
                //           </div>
            
                //           <div className="input-group">
                //             <label>
                //               Movie Director:
                //               <input
                //                 type="text"
                //                 className="form-control m-1"
                //                 name="director"
                //                 value={selectedMovie.director}
                //                 required
                //                 onChange={handleMovieEdit}
                //               />{" "}
                //             </label>
                //           </div>
                //           <div className="input-group">
                //             <label>
                //               Movie Discription:
                //               <input
                //                 type="text"
                //                 className="form-control m-1"
                //                 name="discription"
                //                 value={selectedMovie.discription}
                //                 required
                //                 onChange={handleMovieEdit}
                //               />{" "}
                //             </label>
                //           </div>
                //           <div className="input-group">
                //             <button type="button" className="btn btn-warning">
                //               Cancel
                //             </button>
                //             <button type="button" className="btn btn-primary">
                //               Save
                //             </button>
                //           </div>
                //         </form>
                //       </Modal.Body>
                //     </Modal>
                //   )}
                // </div>
 