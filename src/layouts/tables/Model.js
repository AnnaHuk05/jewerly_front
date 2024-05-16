import React, { useState } from "react";
import { Modal, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
// eslint-disable-next-line react/prop-types
const MyModal = ({ isOpen, handleClose, data }) => {
  const handleStatusChange = () => {
    // Додайте код для зміни статусу тут
    console.log("Change status");
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          bgcolor: "#fff", // блакитний фон
          borderRadius: 8,
          backgroundColor: "#E0FFFF",
        }}
      >
        <Typography variant="h6" component="h2" align="center">
          Order №{data.order.id}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Type: {data.order.jewelleryType.replace("jewelry.", "")} <br />
          Gem: {data.order.mainGem} <br />
          Weight: {data.order.weight} г<br />
          Assay: {data.order.assay} <br />
          Metal: {data.order.mainMetal} <br />
          Color: {data.order.mainColor} <br />
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Amount:</strong> ${data.amount} <br />
          <strong>Paid:</strong> ${data.amountPaid} <br />
          <strong>Conclusion date:</strong> {new Date(data.conclusionDate).toLocaleDateString()}
          <br />
          <strong>Expired:</strong> {new Date(data.expiredDate).toLocaleDateString()} <br />
        </Typography>
        status: {data.order.status} {/* Виділений статус */}
        <br />
        <Button
          onClick={handleClose}
          variant="contained"
          color="black"
          sx={{ mt: 3, width: "100%" }}
        >
          Закрити
        </Button>
      </div>
    </Modal>
  );
};

MyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order: PropTypes.shape({
      id: PropTypes.number.isRequired,
      jewelleryType: PropTypes.string.isRequired,
      mainGem: PropTypes.string.isRequired,
      weight: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      assay: PropTypes.string.isRequired,
      mainMetal: PropTypes.string.isRequired,
      mainColor: PropTypes.string.isRequired,
    }).isRequired,
    amount: PropTypes.number.isRequired,
    amountPaid: PropTypes.number.isRequired,
    conclusionDate: PropTypes.string.isRequired,
    expiredDate: PropTypes.string.isRequired,
  }).isRequired,
};

// eslint-disable-next-line react/prop-types
const MyComponent = ({ data }) => {
  if (!data) {
    return null;
  }
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {/* Your component content */}
      <Button onClick={handleOpenModal}>
        {" "}
        <Icon>more_vert</Icon>
      </Button>
      <MyModal isOpen={openModal} handleClose={handleCloseModal} data={data} />
    </>
  );
};

export default MyComponent;
