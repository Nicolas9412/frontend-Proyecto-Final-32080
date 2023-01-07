import styles from "./ProductDetail.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  saveCart,
  saveProduct,
  getCart,
} from "../../src/features/cart/cartSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Counter from "../Counter/index";

const index = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const email = useSelector((state) => state.auth.user.email);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getCart({ email }));
  }, [router]);

  const onHandleAddCart = (idProduct) => {
    if (cart.email) {
      dispatch(saveProduct({ idProduct, quantity, email }));
    } else {
      dispatch(
        saveCart({
          idProduct,
          quantity,
          email,
          address: "Alberto Williams 2822",
        })
      );
    }
    router.push("/");
  };

  const onCounterPicker = (counter) => {
    setQuantity(counter);
  };

  return (
    <div className="w-50 d-flex justify-content-center items-align-center shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <div className="w-50 d-flex flex-column justify-content-center items-align-center p-4">
        <p className={`${styles.title} fs-1 fw-semibold py-2`}>
          {product.title}
        </p>
        <p className={`${styles.description} w-100 py-2 ms-2`}>
          Descripción: {product.description}
        </p>
        <p className="fs-3 fw-bold ms-2 pb-2">$ {product.price}</p>
        <Counter
          cart={cart}
          product={product}
          onCounterPicker={onCounterPicker}
        />
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => onHandleAddCart(product._id)}
          >
            Agregar
          </button>
        </div>
      </div>
      <div className="w-50 d-flex justify-content-center items-align-center">
        <img
          className={styles.image}
          src={product.thumbnail}
          alt={product.title}
        />
      </div>
    </div>
  );
};

export default index;
