import styles from "./ItemDetailOrder.module.css";

const index = ({ product }) => {
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
        <p>{product.quantity}</p>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p className="fw-semibold">Total</p>
        <p>${product.price * product.quantity}</p>
      </div>
    </div>
  );
};

export default index;
