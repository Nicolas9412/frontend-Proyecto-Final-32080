import styles from "./Counter.module.css";
import { useState, useEffect, use } from "react";
import { useDispatch } from "react-redux";
import { updatedQuantity } from "../../src/features/cart/cartSlice";

const index = ({ cart, product, onCounterPicker, initial }) => {
  const dispatch = useDispatch();
  const [initialCount, setInitialCount] = useState(initial || 1);
  const [stock, setStock] = useState(product.stock);
  useEffect(() => {
    const productFind = cart.products.find((item) => item._id == product._id);
    if (productFind) {
      setStock(product.stock - productFind.quantity);
    }
  }, []);

  const onHandleIncrement = () => {
    if (initialCount < stock) {
      setInitialCount((initialCount) => initialCount + 1);
      initial &&
        dispatch(
          updatedQuantity({
            idProduct: product._id,
            email: cart.email,
            quantity: initialCount + 1,
          })
        );
    }
  };

  const onHandleDecrement = () => {
    if (initialCount > 1) {
      setInitialCount((initialCount) => initialCount - 1);
      initial &&
        dispatch(
          updatedQuantity({
            idProduct: product._id,
            email: cart.email,
            quantity: initialCount - 1,
          })
        );
    }
  };

  onCounterPicker(initialCount);

  return (
    <div className="">
      <div className="d-flex">
        <button className="btn btn-primary me-2" onClick={onHandleDecrement}>
          <i className="bi bi-dash"></i>
        </button>
        <span className="fs-4">{initialCount}</span>
        <button className="btn btn-primary ms-2" onClick={onHandleIncrement}>
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default index;
