import React, { useState } from "react";
import { Toast } from "react-bootstrap";

const BootToast = ({ title, message }) => {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  let variant = null;
  let emoticon = null;
  switch (title) {
    case "FAILED":
      variant = "danger";
      emoticon = "❌";
      break;

    default:
      emoticon = "✅";
      variant = "success";
  }
  return (
    <div className="position-absolute" style={{ top: "70px", right: "20px" }}>
      <Toast bg={variant} show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <strong className="me-1">{emoticon}</strong>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className="text-white ">{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default BootToast;
