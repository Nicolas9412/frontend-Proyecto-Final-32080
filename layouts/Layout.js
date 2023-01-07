import Link from "next/link";
import styles from "./Layout.module.css";
import Image from "next/Image";
import { useRouter } from "next/router";
import { CartBadge } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../src/features/auth/authSlice";
import { getCart } from "../src/features/cart/cartSlice";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { getCategories } from "../src/features/categories/categoriesSlice";
import { success } from "../src/utils/toast";

const Layout = ({ children, auth }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products);
  const categories = useSelector((state) => state.category.categories);
  useEffect(() => {
    dispatch(getCart({ email: auth?.user?.email }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onHandleLogout = () => {
    dispatch(logout());
    success("logout successful!");
    setTimeout(() => {
      router.push("/login");
    }, 250);
  };

  let menu = null;

  if (!auth?.auth) {
    menu = (
      <>
        <li className="nav-item">
          <Link className="nav-link" href={"/login"}>
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href={"/register"}>
            Register
          </Link>
        </li>
      </>
    );
  } else {
    menu = (
      <>
        <Link className="nav-link " href={"#"}>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Categories"
            menuVariant="dark"
          >
            {categories.map((item) => (
              <Link
                href={`/products/categories/${item.name}`}
                className={styles.link}
              >
                <NavDropdown.Item href={`/products/categories/${item.name}`}>
                  {item.name}
                </NavDropdown.Item>
              </Link>
            ))}
          </NavDropdown>
        </Link>
        <Link className="nav-link" href={"#"}>
          <Nav.Link onClick={onHandleLogout}>Logout</Nav.Link>
        </Link>
        <Link className="nav-link" href="/chat">
          <Nav.Link href="/chat">Chat</Nav.Link>
        </Link>
        <Link className="nav-link" href={`/orders/${auth.user.email}`}>
          <Nav.Link href={`/orders/${auth.user.email}`}>Ordenes</Nav.Link>
        </Link>

        {cart.length > 0 && (
          <Nav.Link className="nav-link">
            <Link href={"/cart"}>
              <CartBadge cart={cart} />
            </Link>
          </Nav.Link>
        )}
      </>
    );
  }

  if (auth?.user.isAdmin) {
    menu = (
      <>
        <Link className="nav-link" href={"#"}>
          <Nav.Link onClick={onHandleLogout}>Logout</Nav.Link>
        </Link>
        <Link className="nav-link" href="/admin/products">
          <Nav.Link href="/admin/products">Products</Nav.Link>
        </Link>
        <Link className="nav-link" href="/admin/orders">
          <Nav.Link href="/admin/orders">Orders</Nav.Link>
        </Link>
        <Link className="nav-link" href="/admin/chat">
          <Nav.Link href="/admin/chat">Chat</Nav.Link>
        </Link>
      </>
    );
  }

  return (
    <>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">
            <Image
              className="me-2"
              src={"/shopping-bag.png"}
              width={32}
              height={32}
              alt="shopping-bag"
            />
            <Link className="navbar-brand" href="/">
              Ecommerce
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav className="me-auto">
              <Link className="nav-link active" aria-current="page" href="/">
                <Nav.Link href="/">Home</Nav.Link>
              </Link>
              {menu}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default Layout;
