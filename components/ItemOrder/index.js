import styles from "./ItemOrder.module.css";
import { useRouter } from "next/router";

const index = ({ order, routePush }) => {
  const router = useRouter();
  return (
    <div
      className={
        order.state == "generada"
          ? `${styles.itemContainerGenerada} my-2`
          : `${styles.itemContainerFinalizada} my-2`
      }
      onClick={() => router.push(routePush)}
    >
      <div className="d-flex justify-content-between">
        <p className="fs-2 fw-bold">#{order.numberOrder}</p>
        <p className="fs-4 fw-semibold">
          {new Date(order.datetime).toLocaleDateString()}{" "}
          {new Date(order.datetime).toLocaleTimeString()}
        </p>
      </div>

      <p className="fs-4 fw-semibold">For {order.email}</p>
    </div>
  );
};

export default index;
