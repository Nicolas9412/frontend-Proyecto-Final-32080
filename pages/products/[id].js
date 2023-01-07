import { useRouter } from "next/router";
import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
import { ProductDetail } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { autentication } from "../../src/features/auth/authSlice";
import { error } from "../../src/utils/toast";

const Products = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
      fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/productos/${id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.data?.error) {
            error(result.data?.error);
            router.push("/login");
            return;
          }
          setProduct(result.data);
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
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            {product && <ProductDetail product={product} />}
          </div>
        </Layout>
      )}
    </>
  );
};

export default Products;
