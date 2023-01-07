import { useState } from "react";
import styles from "./InputStock.module.css";

const index = ({ product }) => {
  const [stock, setStock] = useState(product.stock);

  const handleSubmitStock = async (product) => {
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
          price: product.price,
          thumbnail: product.thumbnail,
          stock,
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
        className={`${styles.inputStock} fw-bold mb-1 fit-content form-control text-center`}
        type="text"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        onBlur={() => handleSubmitStock(product)}
      />
    </>
  );
};

export default index;
