import { useState } from "react";
import styles from "./Register.module.css";
import Image from "next/Image";
import { useRouter } from "next/router";
import { error, success } from "../../src/utils/toast";
import Link from "next/link";

const index = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        fullname,
        phoneNumber,
        password,
        confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
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
        } else {
          success("user created!");
          setTimeout(() => {
            router.push("/login");
          }, 500);
        }
      });
  };

  return (
    <>
      <div
        className={`${styles.registerScreen} d-flex justify-content-center align-items-center`}
      >
        <form
          className={`${styles.formSize} shadow-lg p-5 mb-5 bg-body rounded`}
          onSubmit={submit}
        >
          <div className="d-flex justify-content-center mb-3">
            <Image src={"/form.png"} width={64} height={64} alt="register" />
          </div>
          <h2 className="text-center fs-1 fw-bold mb-4 text-dark">Register</h2>
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
          <div className="form-floating mb-3">
            <input
              type="text"
              name="fullname"
              value={fullname}
              className="form-control"
              placeholder="Enter your fullname"
              onChange={(e) => setFullname(e.target.value)}
            />
            <label htmlFor="floatingInput">Fullname</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              className="form-control"
              placeholder="Enter your phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label htmlFor="floatingInput">Phone number</label>
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
          <div className="form-floating mb-4">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              className="form-control"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-50 fs-5 ">
              Register
            </button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Link className="btn" href={"/login"}>
              Do you already have an account?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default index;
