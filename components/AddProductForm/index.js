import styles from "./AddProductForm.module.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCategories } from "../../src/features/categories/categoriesSlice";
import { getProducts } from "../../src/features/products/productsSlice";
import { error, success } from "../../src/utils/toast";

const index = ({ show, handleClose, productEdit, setProductEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    if (productEdit) {
      setTitle(productEdit.title);
      setDescription(productEdit.description);
      setStock(productEdit.stock);
      setPrice(productEdit.price);
      setThumbnail(productEdit.thumbnail);
      setCategory(productEdit.category);
    }
  }, [productEdit]);

  const onHandleSubmitAdd = async () => {
    await fetch("http://localhost:8080/productos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        description,
        stock,
        price,
        thumbnail,
        category,
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
        success("product created!");
        handleClose();
      });
    dispatch(getProducts());
  };

  const onHandleSubmitUpdate = async () => {
    await fetch(`http://localhost:8080/productos/${productEdit._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        description,
        stock,
        price,
        thumbnail,
        category,
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
        success("product updated!");
        handleClose();
      });
    dispatch(getProducts());
    setProductEdit(null);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {productEdit ? "Edit product" : "Register product"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>Thumbnail</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter thumbnail"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={null}>Choose category</option>
              {categories.map((item) => (
                <>
                  <option value={item.name}>{item.name}</option>
                </>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={productEdit ? onHandleSubmitUpdate : onHandleSubmitAdd}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default index;
