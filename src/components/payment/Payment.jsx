import { Modal } from "@coreui/coreui";
import React from "react";
import {TICKET_PRICE} from '../../constants/config';
import successful from "../../assets/giphy.gif"
const Payment = (props) => {
  const {
    confirmationModal,
    setConfirmationModal = () => {},
    selectedSeats = [],
    movieName,
    theatreName,
    handleConfirmPayment,
    setPaymentSuccessful,
    handlePostPayment,
  } = props;

  return (
    <div>
      {confirmationModal && (
        <Modal
          show={confirmationModal}
          onHide={() => {
            setConfirmationModal(false);
            setPaymentSuccessful(false);
          }}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header>
            <Modal.Title>
              <div className="p-2">
                {setPaymentSuccessful
                  ? "Congratulation, Booking Confirmed!!"
                  : "Please confirm your booking details"}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {paymentSuccessful && (
              <>
                <div className="d-flex justify-content-center text-align-center">
                  <div className="payment-successful">
                    <img src={successful} alt="" />
                  </div>
                </div>
                <hr />
              </>
            )}

            <div className="row p-2">
              <div className="col-sm-4">Movie Name:</div>
              <div className="col-sm-8">{movieName}</div>
            </div>
            <div className="row p-2">
              <div className="col-sm-4">Theatre Name: </div>
              <div className="col-sm-8">{theatreName}</div>
            </div>
            <div className="row p-2">
              <div className="col-sm-4">Selected Seats:</div>
              <div className="col-sm-8">
                {selectedSeats.join(",")}({selectedSeats.length}seats)
              </div>
            </div>
            <div className="row p-2">
              <div className="col-sm-4">Total Price:</div>
              <div className="col-sm-8">{TICKET_PRICE * selectedSeats}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {!paymentSuccessful && (
              <>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setConfirmationModal(false);
                    setPaymentSuccessful(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmPayment}
                >
                  Confirm
                </button>
              </>
            )}
            {paymentSuccessful && (
              <button
                className="btn btn-danger"
                onClick={() => {
                  handlePostPayment();
                }}
              >
                Clsoe
              </button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Payment;
