import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useRouter } from "next/router";

function BootCard({ product, auth }) {
  const router = useRouter();
  return (
    <Card style={{ width: "20rem", height: "30rem" }}>
      <Card.Img
        variant="top"
        width={300}
        height={300}
        src={product.thumbnail}
        alt={product.title}
      />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Card.Title style={{ fontSize: "20px", fontWeight: "semibold" }}>
          {product.title}
        </Card.Title>
        <Card.Text style={{ fontSize: "24px", fontWeight: "bold" }}>
          $ {product.price}
        </Card.Text>
        {!auth.user?.isAdmin && (
          <div>
            <Button
              variant="success"
              onClick={() => {
                router.push(`/products/${product._id}`);
              }}
            >
              Ver detalle
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default BootCard;
