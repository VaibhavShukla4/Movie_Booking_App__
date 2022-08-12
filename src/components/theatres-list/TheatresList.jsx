// import { Modal } from "react-bootstrap";
// import MaterialTable from "@material-table/core";

// import Delete from "@material-ui/icons/Delete";
// import Edit from "@material-ui/icons/Edit";
import React, { useState, useEffect } from "react";
// import { ExportCsv, ExportPdf } from "@material-table/exporters";
import TheatresEditModal from "../theatres-edit-modal/TheatresEditModal";
import { getAllTheatres, updateTheatre } from "../../api/theatres";
const TheatresList = () => {
  const [theatresList, setTheatresList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    /**
     * api call to fetch theatre list
     * on success of data , set it to  state -- setTheatreList
     */
    fetchTheatres();
  }, []);

  const fetchTheatres = () => {
    getAllTheatres()
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          console.log(data);
          setTheatresList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTheatre = (rowData) => {
    const TheatreId = rowData._id;
    const theatresListUpdated = theatresList.filter((theatre) => {
      const { _id } = theatre;
      return _id !== TheatreId;
    });
    setTheatresList(theatresListUpdated);
  };

  const editTheatre = (rowData) => {
    setSelectedTheatre({ ...rowData });
    setShowEditModal(true);
  };

  const handleTicketsChange = (e) => {
    const tempTheatre = { ...selectedTheatre };

    if (e.target.name === "name") {
      tempTheatre.name = e.target.value;
    } else if (e.target.name === "city") {
      tempTheatre.city = e.target.value;
    } else if (e.target.name === "discription") {
      tempTheatre.discription = e.target.value;
    } else if (e.target.name === "pinCode") {
      tempTheatre.pinCode = e.target.value;
    }
    setSelectedTheatre(tempTheatre);
  };

  const handleEditTheatreSubmit = (e) => {
    const id = selectedTheatre._id;

    try {
      updateTheatre(id, selectedTheatre).then((res) => {
        const { message, status } = res;
        if (status === 200) {
          setSelectedTheatre({});
          setErrorMessage("");
          setShowEditModal(false);
          fetchTheatres();
        } else if (message) {
          setErrorMessage(message);
        }
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
    e.preventDefault();
    //api call to save the theatre data
    //send the id and the theatre data

    //on success of save i will close the modal
    //and i will fetch the theatre list again

    // empty the selected theatre

    //on error , i will show the error
  };

  
  return (
    <div className="m-5">
      {showEditModal && (
        <TheatresEditModal
          selectedTheatre={selectedTheatre}
          setErrorMessage={setErrorMessage}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          handleEditTheatreSubmit={handleEditTheatreSubmit}
          handleTicketsChange={handleTicketsChange}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default TheatresList;

/***
 * 
 * 
 * <div>
      <MaterialTable
        data={theatresList}
        title="Theaters List"
        columns={[
          {
            title: "Theater Name",
            field: "name",
          },
          {
            title: "Theater ID",
            field: "_id",
          },
          {
            title: "Description",
            field: "description",
          },
          {
            title: "Pin Code",
            field: "pinCode",
          },
          {
            title: "City",
            field: "city",
          },
        ]}
        actions={[
          {
            icon: Edit,
            tooltip: "Edit Theater",
            onClick: (event, rowData) => editTheatre(rowData),
          },
          {
            icon: Delete,
            tooltip: "Delete Theater",
            onClick: (event, rowData) => deleteTheatre(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          sorting: true,
          filtering: true,
          exportMenu: [
            {
              label: "Download Pdf",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Theatre Records"),
            },
            {
              label: "Download Csv",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Theatre Records"),
            },
          ],
          headerStyle: {
            backgroundColor: "#202429",
            color: "#fff",
          },
          rowStyle: {
            backgroundColor: "#EEE",
          },
        }}
      />

      {showEditModal && (
        <Modal
          show={showEditModal}
          onHide={() => {
            setShowEditModal(false);
          }}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>EDIT THEATRE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4>TheatreId: {selectedTheatre._id}</h4>
            </div>
            <hr />
            <form onSubmit={handleEditTheatreSubmit}>
              <div>
                <label>
                  Theater Name:
                  <input
                    type="text"
                    value={selectedTheatre.name}
                    name="name"
                    onChange={handleTicketsChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Theatre City:
                  <input
                    type="text"
                    value={selectedTheatre.city}
                    name="city"
                    onChange={handleTicketsChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Theatre Pincode:
                  <input
                    type="text"
                    value={selectedTheatre.pinCode}
                    name="pinCode"
                    onChange={handleTicketsChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Theatre Description:
                  <textarea name="description" onChange={handleTicketsChange}>
                    {selectedTheatre.description}
                  </textarea>
                </label>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditModal(false);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
          </Modal.Body>
        </Modal>
      )}
    </div>
 */
