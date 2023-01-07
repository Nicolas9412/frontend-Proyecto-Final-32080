import styles from "./InputPrice.module.css";
import { useState } from "react";

const index = ({ product }) => {
  const [price, setPrice] = useState(product.price);

  const handleSubmitPrice = async (product) => {
    try {
      await fetch(`http://localhost:8080/productos/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          price,
          thumbnail: product.thumbnail,
          stock: product.stock,
          category: product.category,
        }),
      });
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <input
        className={`${styles.inputPrice} fw-bold mb-1 fit-content form-control text-center`}
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        onBlur={() => handleSubmitPrice(product)}
      />
    </>
  );
};

export default index;
