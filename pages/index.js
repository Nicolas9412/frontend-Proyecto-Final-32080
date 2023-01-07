import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../layouts/Layout";
import { useEffect } from "react";
import { BootCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../src/features/products/productsSlice";
import { autentication } from "../src/features/auth/authSlice";
import { useRouter } from "next/router";

export default function Home() {
  const products = useSelector((state) => state.product.products);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(autentication());
    dispatch(getProducts());
    if (!auth.auth) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      {auth.auth && (
        <Layout auth={auth}>
          <div className={styles.listContainer}>
            <h1 className={`${styles.title} mb-4 pb-3`}>Lista de productos</h1>
            <div className="d-flex gap-5 px-5">
              {products.map((item) => (
                <BootCard key={item._id} product={item} auth={auth} />
              ))}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
