import { useRouter } from "next/router";
import styles from "./Orders.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { autentication } from "../../src/features/auth/authSlice";
import Layout from "../../layouts/Layout";
import { ItemOrder } from "../../components";
import { error } from "../../src/utils/toast";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const [orders, setOrders] = useState([]);
  const auth = useSelector((state) => state.auth);

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
      fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/ordenes/orden/${id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          setOrders(result.data);
          if (result.data?.error) {
            error(result.data?.error);
            router.push("/login");
            retur;
          }
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
          <div className="w-100 h-100 container mt-5">
            <h1 className="mb-4">My orders</h1>
            <div className="d-flex flex-column align-items-center">
              {orders?.map((item) => (
                <ItemOrder
                  order={item}
                  key={item._id}
                  routePush={`/orders/order/${item._id}`}
                />
              ))}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default index;
