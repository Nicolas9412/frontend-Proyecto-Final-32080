import styles from "./CartBadge.module.css";

const index = ({ cart }) => {
  return (
    <button type="button" className="btn btn-dark position-relative">
      <i className="bi bi-cart"></i>
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {cart.length}
      </span>
    </button>
  );
};

export default index;
