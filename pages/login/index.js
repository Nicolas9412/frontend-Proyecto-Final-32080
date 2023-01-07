import React, { useState, useEffect } from "react";
import Layout from "../../layouts/Layout";
import styles from "./Login.module.css";
import Image from "next/Image";
import Link from "next/Link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { autentication } from "../../src/features/auth/authSlice";
import { error, success } from "../../src/utils/toast";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autentication());
  }, []);

  if (auth.auth) {
    router.push("/");
  }

  const submit = async (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.errors) {
          for (const err of result.errors) {
            error(err.msg);
            break;
          }
          return;
        }
        if (result.data?.error) {
          error(result.data?.error);
          return;
        }
        success("login successful");
        setTimeout(() => {
          router.push("/");
        }, 500);
      });
  };

  return (
    <div
      className={`${styles.loginScreen} d-flex justify-content-center align-items-center`}
    >
      <form
        className={`${styles.formSize} shadow-lg p-5 mb-5 bg-body rounded`}
        onSubmit={submit}
      >
        <div className="d-flex justify-content-center mb-3">
          <Image src={"/key.png"} width={64} height={64} alt="login" />
        </div>
        <h2 className="text-center fs-1 fw-bold mb-4 text-dark">Login</h2>
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <button type="submit" className="btn btn-primary w-50 fs-5 ">
            Sign in
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <Link className="btn" href={"/register"}>
            Do you want an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default index;
