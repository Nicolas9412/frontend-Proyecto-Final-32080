import { useRouter } from "next/router";
import { BootCard } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { autentication } from "../../../src/features/auth/authSlice";
import Layout from "../../../layouts/Layout";
import styles from "./Categoria.module.css";
import { error } from "../../../src/utils/toast";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState([]);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/auth/user`, {
      credentials: "include",
    }).catch((err) => {
      error(err);
      router.push("/login");
      return;
    });
    dispatch(autentication());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/productos/categoria/${id}`,
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.data?.error) {
            error(result.data?.error);
            router.push("/login");
            return;
          }
          setProducts(result.data);
        })
        .catch((err) => {
          error(err);
          router.reload();
          return;
        });
    }
  }, [id]);
  console.log(auth);
  return (
    <>
      {auth.auth && (
        <Layout auth={auth}>
          <div className={styles.listContainer}>
            <h1 className={`${styles.title} mb-4 pb-3`}>List {id}</h1>
            {/*<div className="d-flex gap-5 px-5">
              {products.map((item) => (
                <BootCard key={item._id} product={item} />
              ))}
            </div>*/
          </div>
        </Layout>
      )}
    </>
  );
};

export default Index;
