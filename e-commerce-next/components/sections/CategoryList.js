import { useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import Link from "next/link";

const CategoryList = () => {
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let token = cookies.get("token");
    async function getData() {
      try {
        let res = await axios.get("http://localhost:8000/api/category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          console.log(res.data);
          setCategory(res.data);
          cookies.set("category",JSON.stringify(res.data));
        } else {
          console.log(res);
        }
      } catch (error) {
        if (error.response) {
          const errorMessages = Object.values(error.response.data.errors || {})
            .flat()
            .join(", ");
          setError(errorMessages || "An error occurred. Please try again.");
        }
      }
    }
    getData();
  }, []);

  return (
    <div className="container mt-5">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {category ? (
        <div className="container row">
          {category.map((item, index) => (
            <Link href={`/product/${item.id}`} className="col-4 border ms-2" key={index}>
              <h2 >{item.name.toUpperCase()}</h2>
              <img src={item.category_image?item.category_image:"/product.jpg"} className="border rounded" width="100%" height="70%"  alt={item.name}/>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default CategoryList;
