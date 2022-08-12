import { Modal } from '@coreui/coreui'
import React from 'react'

const TheatresEditModal = props => {
    const{
        showEditModal
    ,setErrorMessage,
    selectedTheatre,
    setShowEditModal,
    handleEditTheatreSubmit,
    handleTicketsChange,
    errorMessage,
    }=props
  return (
    <Modal
    show={showEditModal}
    onHide={()=> {
        setErrorMessage("")
        setShowEditModal(false);
    }}
    backdrop='static'
    keyboard={false}
        centered
    >
 <Modal.Header closeButton>
            <Modal.Title>EDIT THEATRE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4>TheatreId :{selectedTheatre._id}</h4>
            </div>
            <hr />

            <form onSubmit={handleEditTheatreSubmit}>
              <div className="input-group">
                <label>
                  Theatre Name:
                  <input
                    type="text"
                    className="form-control m-1"
                    name="name"
                    value={selectedTheatre.name}
                    required
                    onChange={handleTicketsChange}
                  />{" "}
                </label>
              </div>
              <div className="input-group">
                <label>
                Theatre City:
                  <input
                    type="text"
                    className="form-control m-1"
                    name="city"
                    value={selectedTheatre.city}
                    required
                    onChange={handleTicketsChange}
                  />{" "}
                </label>
              </div>
              <div className="input-group">
                <label>
                Theatre Pincode:
                  <input
                    type="text"
                    className="form-control m-1"
                    name="pincode"
                    value={selectedTheatre.pincode}
                    required
                    onChange={handleTicketsChange}
                  />{" "}
                </label>
              </div>

              <div className="input-group">
                <label>
                Theatre Discription:
                  <input
                    type="text"
                    className="form-control m-1"
                    name="discription"
                    value={selectedTheatre.discription}
                    required
                    onChange={handleTicketsChange}
                  />{" "}
                </label>
              </div>
              <div className="input-group">
                <label>
                  Movie Discription:
                  <textarea
                   className="form-control m-1"
                    name="discription"
                    value={selectedTheatre.discription}
                    onChange={handleTicketsChange}
                  ></textarea>{" "}
                </label>
              </div>
              <div className="input-group">
                <button type="button" className="btn btn-warning"
                onClick={()=>{
                    setErrorMessage("")
                    setShowEditModal(false)
                }}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
            {errorMessage &&(
                <div className='text-danger'>{errorMessage}</div>
            )}
          </Modal.Body> 
    </Modal>
  )
}

export default TheatresEditModal;