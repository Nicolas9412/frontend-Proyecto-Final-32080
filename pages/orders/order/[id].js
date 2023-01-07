import { useRouter } from "next/router";
import styles from "./Order.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { autentication } from "../../../src/features/auth/authSlice";
import Layout from "../../../layouts/Layout";
import { ItemDetailOrder } from "../../../components";
import { error } from "../../../src/utils/toast";

const index = () => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/auth/user`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data?.error) {
          error(result.data?.error);
          router.push("/login");
          return;
        }
        if (result.isAdmin) {
          error("Admin not access");
          router.back();
          return;
        }
      });

    dispatch(autentication());
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/ordenes/${id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.data?.error) {
            error(result.data?.error);
            router.push("/login");
            return;
          }
          setOrder(result.data);
        })
        .catch((err) => {
          error(err);
          router.reload();
          return;
        });
    }
  }, [id]);
  return (
    <>
      {auth.auth && (
        <Layout auth={auth}>
          <div className="container">
            <h1 className="fw-bold my-5">Order</h1>
            <div className={styles.orderContainer}>
              {order?.products.length > 0 &&
                order?.products.map((item) => (
                  <ItemDetailOrder key={item._id} product={item} />
                ))}
              {order?.products.length > 0 && (
                <div className="w-50 d-flex justify-content-end align-items-center shadow-lg p-3 mb-4 bg-body-tertiary rounded">
                  <p className="fs-3 fw-bolder me-3">
                    Total{" $"}
                    {order?.products
                      .map((item) => item.price * item.quantity)
                      .reduce((acc, current) => acc + current, 0)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default index;
