import { useEffect, useState } from "react";
import cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";

const product = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState();
  const router = useRouter();
  const { id } = router.query;
  
  useEffect(() => {
    let categories = cookies.get("category");
    if (categories) {
      categories = JSON.parse(categories);
      let c = categories.find((val) => val.id === Number(id));
      if (c) {
        setProduct(c.products || null);
      }
    } else {
      let token = cookies.get("token");
      async function getData() {
        try {
          let res = await axios.get(
            "http://localhost:8000/api/category/${id}",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.status === 200) {
            setProduct(res.data.products || null);
            cookies.set("category", JSON.stringify(res.data));
          }
        } catch (error) {
          if (error.response) {
            const errorMessages = Object.values(
              error.response.data.errors || {}
            )
              .flat()
              .join(", ");
            setError(errorMessages || "An error occurred. Please try again.");
          }
        }
      }
      getData();
    }
  }, [id]);


  return (
    <Layout>
      <div className="container mt-5">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {product ? (
          <div className="container row">
            {product.map((item, index) => (
              <Link
                href={`/product/${item.id}`}
                key={index}
                className="col-4 border ms-2 text-decoration-none text-dark"
              >
                <img
                  src={item.product_image ? item.product_image : "/product.jpg"}
                  className="border rounded"
                  width="100%"
                  height="60%"
                  alt={item.name}
                />
                <h2 className="text-capitalize">{item.name}</h2>
                <p>{item.description}</p>
                <p className="text-decoration-line-through text-danger">
                  price : {item.price}
                </p>
                <p>Offer price : {item.offer_price}</p>
                <button className="btn btn-primary"> Add Cart </button>
                <button className="btn btn-warning ms-2"> Favirate </button>
              </Link>
            ))}
          </div>
        ) : (
          !error && <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
};

export default product;
