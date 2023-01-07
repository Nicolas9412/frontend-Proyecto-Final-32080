import styles from "./AdminProducts.module.css";
import Layout from "../../../layouts/Layout";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { autentication } from "../../../src/features/auth/authSlice";
import { useRouter } from "next/router";
import { getProducts } from "../../../src/features/products/productsSlice";
import { InputPrice, InputStock, AddProductForm } from "../../../components";
import { error, success } from "../../../src/utils/toast";

const index = () => {
  const auth = useSelector((state) => state.auth);
  const products = useSelector((state) => state.product.products);
  const router = useRouter();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [productEdit, setProductEdit] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    dispatch(autentication());
    if (!auth.user.isAdmin) {
      error("authentication admin");
      router.push("/login");
    }
    dispatch(getProducts());
  }, []);

  const onRemoveProduct = async (id) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/productos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      success("Product deleted!");
      dispatch(getProducts());
    } catch (err) {
      error(err);
      return;
    }
  };

  return (
    <>
      {auth.user.isAdmin && (
        <Layout auth={auth}>
          <div className={`${styles.containerProducts} container`}>
            <h2 className="fw-bold mb-3">Autogestión de productos</h2>
            <div>
              <button className="btn btn-primary mb-3" onClick={handleShow}>
                <i class="bi bi-plus-circle"></i> Add Product
              </button>
            </div>
            <div
              style={{ backgroundColor: "hsl(0, 0%, 94%)" }}
              className="shadow-4 rounded-5 overflow-hidden"
            >
              <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                  <tr>
                    <th>Product</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.thumbnail}
                            alt=""
                            width={60}
                            height={60}
                            className="rounded"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{item.title}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <InputStock product={item} />
                      </td>
                      <td>
                        <InputPrice product={item} />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-link btn-sm btn-rounded"
                          onClick={() => {
                            handleShow();
                            setProductEdit(item);
                          }}
                        >
                          <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-link btn-sm btn-rounded"
                          onClick={() => onRemoveProduct(item._id)}
                        >
                          <i class="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <AddProductForm
            show={show}
            handleClose={handleClose}
            productEdit={productEdit}
            setProductEdit={setProductEdit}
          />
        </Layout>
      )}
    </>
  );
};
export default index;
