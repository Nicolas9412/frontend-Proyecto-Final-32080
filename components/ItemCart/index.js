import styles from "./ItemCart.module.css";
import Counter from "../Counter/index";
import { useState } from "react";

const index = ({ cart, product, onHandleDelete }) => {
  const [quantity, setQuantity] = useState(0);
  const onCounterPicker = (counter) => {
    setQuantity(counter);
  };
  return (
    <div
      className="w-50 d-flex justify-content-evenly align-items-center shadow-lg p-3 mb-4 bg-body-tertiary rounded"
      key={product._id}
    >
      <img src={product.thumbnail} width={100} height={100} />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p className="fw-semibold">Producto</p>
        <p>{product.title}</p>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p className="fw-semibold">Unidad</p>
        <p>${product.price}</p>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p className="fw-semibold">Cantidad</p>
        <Counter
          cart={cart}
          product={product}
          initial={product.quantity}
          onCounterPicker={onCounterPicker}
        />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p className="fw-semibold">Total</p>
        <p>${product.price * quantity}</p>
      </div>
      <div>
        <button
          className="btn btn-dark"
          onClick={() => onHandleDelete(product._id, cart.email)}
        >
          <i className="bi bi-x-lg"> Quitar</i>
        </button>
      </div>
    </div>
  );
};

export default index;
